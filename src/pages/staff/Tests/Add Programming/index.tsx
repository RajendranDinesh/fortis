//Dependencies

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//Styles

import styles from './addProgramming.module.css';

//Assets

import { FiEdit, FiCheck } from "react-icons/fi";
import { IoIosAddCircle } from 'react-icons/io';
import { MdDeleteOutline } from "react-icons/md";

//Components

import Jodit from './Jodit Editor';

interface TestCase {
    input: string;
    output: string;
}

interface pvtTestCase {
    input: string;
    output:string;
}

function AddProgramming() {

    const [titleValue, setTitleValue] = useState<string>('Add Your Question Title Here');
    const [isEditable, setIsEditable] = useState(false);
    const [languages, setLanguages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('')
    const [isEditLanguage, setIsEditLanguage] = useState(false);
    const [marks, setMarks] = useState<string>('Add Marks Here');
    const [isEditMarks, setIsEditMarks] = useState(false);
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [pvtTestCase, setPvtTestCase] = useState<pvtTestCase[]>([]);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };

    const handleConfirmTitleClick = () => {
        setIsEditable(!isEditable);
        console.log(titleValue);
    };

    const handleLanguageClick = () => {
        setIsEditLanguage(!isEditLanguage);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.includes(',')) {
            const lang = value.split(',');
            const langTrimmed = lang.map((l) => l.trim());
            setLanguages(langTrimmed);
        }
    };

    const handleTickClick = () => {
        setIsEditLanguage(false);
        const languagesJson = JSON.stringify({ languages });
        console.log(languagesJson);
    };

    const handleEditMarksClick = () => {
        setIsEditMarks(!isEditMarks);
    };

    const handleMarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarks(event.target.value);
    };

    const handleConfirmMarksClick = () => {
        setIsEditMarks(!isEditMarks);
        console.log(marks);
    };

    const addTestCase = () => {
        if (testCases.length < 5) {
            setTestCases([...testCases, { input: '', output: '' }]);
        } else {
            alert('You can only add up to 5 test cases.');
        }
    };
    
    const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };
    
    const deleteTestCase = (index: number) => {
        const newTestCases = [...testCases];
        newTestCases.splice(index, 1);
        setTestCases(newTestCases);
    };

    const saveTestCases = () => {
        const json = testCases.reduce<{ [key: number]: { Input: string; Output: string } }>((acc, testCase, index) => {
          acc[index] = {
            Input: testCase.input,
            Output: testCase.output,
          };
          return acc;
        }, {});
        console.log(json);
    };

    const addPvtTestCase = () => {
        setPvtTestCase([...pvtTestCase, { input: '', output: '' }]);
    };
    
    const updatePvtTestCase = (index: number, field: keyof TestCase, value: string) => {
        const newTestCases = [...pvtTestCase];
        newTestCases[index][field] = value;
        setPvtTestCase(newTestCases);
    };
    
    const deletePvtTestCase = (index: number) => {
        const newTestCases = [...pvtTestCase];
        newTestCases.splice(index, 1);
        setPvtTestCase(newTestCases);
    };

    const savePvtTestCases = () => {
        const json = pvtTestCase.reduce<{ [key: number]: { Input: string; Output: string } }>((acc, pvtTestCase, index) => {
          acc[index] = {
            Input: pvtTestCase.input,
            Output: pvtTestCase.output,
          };
          return acc;
        }, {});
        console.log(json);
    };

    return (
        <div className={styles.addProgramming_whole_container}>
            <div className={styles.addProgramming_header}>
                <div className={styles.addProgramming_header_top}>
                    <div className={styles.input_container}>
                        <input type="text" id="input" value={titleValue} onChange={handleTitleChange} disabled={!isEditable} />
                        <div className={styles.underline}></div>
                    </div>

                    {isEditable ? (
                            <FiCheck onClick={handleConfirmTitleClick} id={styles.editIcon} />
                        ) : (
                            <FiEdit onClick={handleEditClick} id={styles.editIcon} />
                    )}
                </div>
                <div className={styles.addProgramming_header_bottom}>
                    <div className={styles.addProgramming_header_bottom_left}>
                        <h1>Allowed Languages:</h1>
                        <div className={styles.duration_container}>
                            <input 
                                type="text" 
                                id="input" 
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={!isEditLanguage} 
                            />
                            <div className={styles.underline}></div>
                        </div>

                        {isEditLanguage ? (
                            <FiCheck onClick={handleTickClick} id={styles.editIcon} />
                        ) : (
                            <FiEdit onClick={handleLanguageClick} id={styles.editIcon} />
                        )}
                    </div>
                    <div className={styles.addProgramming_header_bottom_right}>
                        <h1>Mark:</h1>
                        <div className={styles.marks_container}>
                            <input type="text" id="input" value={marks} onChange={handleMarksChange} disabled={!isEditMarks} />
                            <div className={styles.underline}></div>
                        </div>

                        {isEditMarks ? (
                            <FiCheck onClick={handleConfirmMarksClick} id={styles.editIcon} />
                        ) : (
                            <FiEdit onClick={handleEditMarksClick} id={styles.editIcon} />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.addProgramming_body}>
                <div className={styles.addProgramming_body_left}>
                    <div className={styles.addProgramming_body_left_header}>
                        <h1>Public Testcases</h1>
                        <IoIosAddCircle id={styles.addIcon} onClick={addTestCase} />
                    </div>
                    <div className={styles.addProgramming_body_left_content}>
                        {testCases.map((testCase, index) => (
                            <div className={styles.addProgramming_body_left_content_element} key={index}>
                                <div className={styles.addProgramming_body_left_content_element_left}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '40ch', marginLeft: '2vw'},
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField label="Input" variant="outlined" value={testCase.input} onChange={(e) => updateTestCase(index, 'input', e.target.value)} />
                                        <TextField label="Output" variant='outlined' value={testCase.output} onChange={(e) => updateTestCase(index, 'output', e.target.value)} />
                                    </Box>
                                </div>
                                <div className={styles.addProgramming_body_left_content_element_right}>
                                    <MdDeleteOutline id={styles.binIcon} onClick={() => deleteTestCase(index)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.addProgramming_body_left_footer}>
                        <button onClick={saveTestCases}>Save Testcases</button>
                    </div>
                </div>
                <div className={styles.addProgramming_body_middle}>
                    <Jodit />
                </div>
                <div className={styles.addProgramming_body_right}>
                    <div className={styles.addProgramming_body_right_header}>
                        <h1>Private Testcases</h1>
                        <IoIosAddCircle id={styles.addIcon} onClick={addPvtTestCase} />
                    </div>
                    <div className={styles.addProgramming_body_right_content}>
                        {pvtTestCase.map((ptestCase, index) => (
                                <div className={styles.addProgramming_body_left_content_element} key={index}>
                                    <div className={styles.addProgramming_body_left_content_element_left}>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '40ch', marginLeft: '2vw'},
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField label="Input" variant="outlined" value={ptestCase.input} onChange={(e) => updatePvtTestCase(index, 'input', e.target.value)} />
                                            <TextField label="Output" variant='outlined' value={ptestCase.output} onChange={(e) => updatePvtTestCase(index, 'output', e.target.value)} />
                                        </Box>
                                    </div>
                                    <div className={styles.addProgramming_body_left_content_element_right}>
                                        <MdDeleteOutline id={styles.binIcon} onClick={() => deletePvtTestCase(index)} />
                                    </div>
                                </div>
                        ))}
                    </div>
                    <div className={styles.addProgramming_body_right_footer}>
                        <button onClick={savePvtTestCases}>Save Testcases</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProgramming;