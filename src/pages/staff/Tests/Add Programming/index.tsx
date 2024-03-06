//Dependencies

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';

//Styles

import styles from './addProgramming.module.css';

//Assets

import { FiEdit, FiCheck } from "react-icons/fi";
import { IoMdSave, IoMdAddCircle } from "react-icons/io";

//Components

import Jodit from './Jodit Editor';

function AddProgramming() {

    const [titleValue, setTitleValue] = useState<string>('Add Your Question Title Here');
    const [isEditable, setIsEditable] = useState(false);
    const [languages, setLanguages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('')
    const [isEditLanguage, setIsEditLanguage] = useState(false);
    const [marks, setMarks] = useState<string>('Add Marks Here');
    const [isEditMarks, setIsEditMarks] = useState(false);
    const [tabvalue, setTabValue] = useState('1');
    const [publicTestCases, setPublicTestCases] = useState([{ name: 'Case 1', input: '', output: '' }]);
    const [publicCaseNumber, setPublicCaseNumber] = useState(2);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [publicActiveIndex, setPublicActiveIndex] = useState(0);
    const [privateTestCases, setPrivateTestCases] = useState([{ name: 'Case 1', input: '', output: '' }]);
    const [privateCaseNumber, setPrivateCaseNumber] = useState(2);
    const [pvtHoveredIndex, setPvtHoveredIndex] = useState<number | null>(null);
    const [pvtActiveIndex, setPvtActiveIndex] = useState(0);

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

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const handleAddPublicTestCase = () => {
        if (publicCaseNumber <= 5) {
          setPublicTestCases([...publicTestCases, { name: `Case ${publicCaseNumber}`, input: '', output: '' }]);
          setPublicCaseNumber(publicCaseNumber + 1);
          
          if (publicTestCases.length === 0) {
            setPublicActiveIndex(0);
          } else {
            setPublicActiveIndex(publicTestCases.length);
          }
        }
    };

    const handleDeletePublicTestCase = (index: number) => {
        let newTestCases = [...publicTestCases];
        newTestCases.splice(index, 1);
        newTestCases = newTestCases.map((testCase, i) => ({ ...testCase, name: `Case ${i + 1}` }));
        setPublicTestCases(newTestCases);
        setPublicCaseNumber(newTestCases.length + 1);
        
        if (publicTestCases.length === 0) {
          setPublicActiveIndex(0);
        } else {
          setPublicActiveIndex(publicActiveIndex - 1);
        }
    };

    const handlePublicInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTestCases = [...publicTestCases];
        newTestCases[index].input = event.target.value;
        setPublicTestCases(newTestCases);
    };

    const handlePublicOutputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTestCases = [...publicTestCases];
        newTestCases[index].output = event.target.value;
        setPublicTestCases(newTestCases);
    };

    const handlePublicSave = () => {
        const testCaseDetails = publicTestCases.reduce<{ [key: string]: { input: string, output: string } }>((acc, testCase, index) => {
          acc[`Case ${index + 1}`] = { input: testCase.input, output: testCase.output };
          return acc;
        }, {});
      
        console.log(JSON.stringify(testCaseDetails));
    };

    const handleAddPvtTestCase = () => {
          setPrivateTestCases([...privateTestCases, { name: `Case ${privateCaseNumber}`, input: '', output: '' }]);
          setPrivateCaseNumber(privateCaseNumber + 1);

          if (privateTestCases.length === 0) {
            setPvtActiveIndex(0);
          } else {
            setPvtActiveIndex(privateTestCases.length);
          }
    };

    const handleDeletePvtTestCase = (index: number) => {
        let newTestCases = [...privateTestCases];
        newTestCases.splice(index, 1);
        newTestCases = newTestCases.map((testCase, i) => ({ ...testCase, name: `Case ${i + 1}` }));
        setPrivateTestCases(newTestCases);
        setPrivateCaseNumber(newTestCases.length + 1);

        if (privateTestCases.length === 0) {
            setPvtActiveIndex(0);
        } else {
            setPvtActiveIndex(pvtActiveIndex - 1);
        }
    };

    const handlePvtInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTestCases = [...privateTestCases];
        newTestCases[index].input = event.target.value;
        setPrivateTestCases(newTestCases);
    };

    const handlePvtOutputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTestCases = [...privateTestCases];
        newTestCases[index].output = event.target.value;
        setPrivateTestCases(newTestCases);
    };

    const handlePvtSave = () => {
        const testCaseDetails = privateTestCases.reduce<{ [key: string]: { input: string, output: string } }>((acc, testCase, index) => {
          acc[`Case ${index + 1}`] = { input: testCase.input, output: testCase.output };
          return acc;
        }, {});
      
        console.log(JSON.stringify(testCaseDetails));
    };

    return (
        <div className={styles.addProgramming_whole_container}>
            <div className={styles.addProgramming_first_container}>
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
                    <Jodit />
                </div>
            </div>
            <div className={styles.addProgramming_second_container}>
                <div className={styles.addProgramming_second_container_body}>
                    <div className={styles.addProgramming_second_container_header}>
                        <h1>Add Testcases</h1>
                    </div>
                    <div className={styles.addProgramming_second_tabs_container}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabvalue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs">
                                        <Tab label="Public" value="1" style={{color: "white", fontSize: "1.2em"}} />
                                        <Tab label="Private" value="2" style={{color: "white", fontSize: "1.2em"}} />
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                    </div>
                    <div className={styles.addProgramming_second_body}>
                        {tabvalue === '1' ? 
                            <>
                                <div className={styles.addProgramming_second_public_array}>
                                    {publicTestCases.map((testCase, index) => (
                                        <div key={index} className={styles.addProgramming_second_public_case_name}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => setPublicActiveIndex(index)}>
                                            <h3>{testCase.name}</h3>
                                            {hoveredIndex === index && <span onClick={() => handleDeletePublicTestCase(index)}>x</span>}
                                        </div>
                                    ))}
                                    {publicCaseNumber <= 5 && <button onClick={handleAddPublicTestCase}><IoMdAddCircle /></button>}
                                </div>
                                <div className={styles.addProgramming_second_public_inout}>
                                    {publicTestCases.length > 0 && (
                                    <div className={styles.addProgramming_second_public_inout_field_container}>
                                        <div className={styles.addProgramming_second_public_inout_fields}>
                                            <label htmlFor={`input-${publicActiveIndex}`}>Input:</label>
                                            <textarea id={`input-${publicActiveIndex}`} name="input" rows={10} value={publicTestCases[publicActiveIndex]?.input} onChange={(event) => handlePublicInputChange(publicActiveIndex, event)}></textarea>
                                        </div>
                                        <div className={styles.addProgramming_second_public_inout_fields}>
                                            <label htmlFor={`output-${publicActiveIndex}`}>Output:</label>
                                            <textarea id={`output-${publicActiveIndex}`}  name="output" rows={10} value={publicTestCases[publicActiveIndex]?.output} onChange={(event) => handlePublicOutputChange(publicActiveIndex, event)}></textarea>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                <div className={styles.addProgramming_second_public_save}>
                                    <button onClick={handlePublicSave}><IoMdSave /></button>
                                </div>
                            </> 
                        : 
                            <>
                                <div className={styles.addProgramming_second_pvt_array}>
                                    {privateTestCases.map((testCase, index) => (
                                        <div key={index} className={styles.addProgramming_second_pvt_case_name}
                                        onMouseEnter={() => setPvtHoveredIndex(index)}
                                        onMouseLeave={() => setPvtHoveredIndex(null)}
                                        onClick={() => setPvtActiveIndex(index)}>
                                            <h3>{testCase.name}</h3>
                                            {pvtHoveredIndex === index && <span onClick={() => handleDeletePvtTestCase(index)}>x</span>}
                                        </div>
                                    ))}
                                    <button onClick={handleAddPvtTestCase}><IoMdAddCircle /></button>
                                </div>
                                <div className={styles.addProgramming_second_pvt_inout}>
                                    {privateTestCases.length > 0 && (
                                        <div className={styles.addProgramming_second_pvt_inout_field_container}>
                                            <div className={styles.addProgramming_second_pvt_inout_fields}>
                                                <label htmlFor={`input-${pvtActiveIndex}`}>Input:</label>
                                                <textarea id={`input-${pvtActiveIndex}`} name="input" rows={10} value={privateTestCases[pvtActiveIndex]?.input} onChange={(event) => handlePvtInputChange(pvtActiveIndex, event)}></textarea>
                                            </div>
                                            <div className={styles.addProgramming_second_pvt_inout_fields}>
                                                <label htmlFor={`output-${pvtActiveIndex}`}>Output:</label>
                                                <textarea id={`output-${pvtActiveIndex}`}  name="output" rows={10} value={privateTestCases[pvtActiveIndex]?.output} onChange={(event) => handlePvtOutputChange(pvtActiveIndex, event)}></textarea>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.addProgramming_second_pvt_save}>
                                    <button onClick={handlePvtSave}><IoMdSave /></button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.addProgramming_third_container}>
                <div className={styles.addProgramming_third_container_body}>
                    <div className={styles.addProgramming_third_container_header}>
                        <h1>Add Starter Code</h1>
                    </div>
                    <div className={styles.addProgramming_third_body}></div>
                </div>
            </div>
        </div>
    );
}

export default AddProgramming;