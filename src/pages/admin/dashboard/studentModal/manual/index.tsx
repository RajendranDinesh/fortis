import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

import styles from '../addStudent.module.css';
import { studentDetails } from '..';
import { validateStudent } from '../utils';

interface Props {
    students: studentDetails[];
    setStudents: React.Dispatch<React.SetStateAction<studentDetails[]>>;
}

export default function Manual({ students, setStudents }: Props) {

    const [userDetails, setUserDetails] = useState<studentDetails>({
        // do not change the field names as they are used in the backend
        user_name: '',
        roll_number: '',
        email: ''
    });

    const handleStudentDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === 'email' && e.target.value.slice(-1) == '@') {
            setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value + 'bitsathy.ac.in'
            });
            return;
        }

        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleRemove = (index: number) => {
        const newStudents = students.filter((_, i) => i !== index);
        setStudents(newStudents);
    }

    const handleEdit = (index: number) => {
        setUserDetails(students[index]);
        const newStudents = students.filter((_, i) => i !== index);
        setStudents(newStudents);
    }

    const handleEnterClick = () => {
        const isValid = validateStudent({userDetails, students});

        if (isValid) {
            setStudents([...students, userDetails]);

            setUserDetails({
                user_name: '',
                roll_number: '',
                email: ''
            });

            (document.querySelector('input[name="user_name"]') as HTMLElement)?.focus();
        }
    }

    return(
        <div className={styles.manual_container}>
            <div className={styles.input_container}>
                <input placeholder='Name' name='user_name' value={userDetails.user_name} onChange={handleStudentDetailChange} autoComplete='off' />
                <input placeholder='Roll Number' name='roll_number' value={userDetails.roll_number} onChange={handleStudentDetailChange} autoComplete='off' />
                <input placeholder='Email Id' name='email' value={userDetails.email} onChange={handleStudentDetailChange} autoComplete='off' onKeyDown={(e) => e.key === 'Enter' && handleEnterClick()} />
            </div>

            {students.length > 0 && <div className={styles.name_container}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.user_name}</td>
                                <td>{student.roll_number}</td>
                                <td>
                                    {student.email}
                                    <div>
                                        <button onClick={() => handleEdit(index)} className={styles.edit_btn} title='Edit'><CiEdit /></button>
                                        <button onClick={() => handleRemove(index)} className={styles.delete_btn} title='Remove'><CiTrash color='red' /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}