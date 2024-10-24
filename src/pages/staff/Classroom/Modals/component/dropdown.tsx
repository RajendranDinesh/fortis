import React, { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getAllSupervisors } from '../../Controllers';

import styles from "./componentStyles.module.css";

interface Option {
    value: number;
    label: string;
}

interface props {
    setSupervisorId: React.Dispatch<SetStateAction<number | null>>;
}

const CustomDropdown = ({ setSupervisorId }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const [options, setOptions] = useState<Option[]>([]);
  const [original, setOriginal] = useState<Option[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value.trim() === "") setOptions(original);
    else {
      setOptions(original.filter(supervisor => {
        let identifiers = supervisor.label.split('|');
        if (
          identifiers[0].trim().toLowerCase().includes(e.target.value) ||
          identifiers[1].trim().toLowerCase().includes(e.target.value) ||
          identifiers[2].trim().toLowerCase().includes(e.target.value)
        ) return supervisor;
      }));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSupervisorId(option.value);
    setInputValue(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    const getSetSupervisors = async () => {
      try {
        const { supervisors } = await getAllSupervisors();

        let options: Option[] = [];

        for (let index = 0; index < supervisors.length; index++) {
          let label = supervisors[index].user_name + " | " + supervisors[index].email + " | " + supervisors[index].supervisor_id;
          
          options.push({label: label, value: Number(supervisors[index].user_id)});
        }

        setOptions(options);
        setOriginal(options);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch supervisors");
      }
    }

    getSetSupervisors();
  }, []);

  return (
    <div className={styles.dropdown_container}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange}
        onFocus={toggleDropdown}
        placeholder="Type a name / supervisor id / email" 
        autoComplete='off'
      />
      {isOpen && (
        <ol className={styles.dropdown_list}>
          {options.length > 0 ? options.map((option) => (
            <li 
              key={option.value} 
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          )) : <li>Loading..</li>}
        </ol>
      )}
    </div>
  );
};

export default CustomDropdown;