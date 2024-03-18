//Dependencies

import React, { createRef, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';
import * as monaco from 'monaco-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpStatusCode } from 'axios';

//Styles

import styles from './addProgramming.module.css';

//Assets

import { FiEdit, FiCheck } from "react-icons/fi";
import { IoMdSave, IoMdAddCircle } from "react-icons/io";

//Components

import Jodit from '../../../components/joditEditor';
import OurEditor from '../../../components/Editor';
import { programmingLanguages } from '../../../components/Editor';

//Hooks

import useLocalStorage from '../../../../hooks/useLocalStorage';
import { runCode } from '../controllers';
import { Request } from '../../../../networking';

interface TestCase {
    name: string
    input: string
    output: string
}

type results = {
    status: {
        id: number;
        description: string;
    };
    time: number;
    memory: number;
    stdin: string;
    stdout: string;
    stderr: string;
    compile_output: string;
    expected_output: string;
};

function AddProgramming() {

    const [titleValue, setTitleValue] = useLocalStorage<string>("codeQuestion_Title", 'Add Your Question Title Here');
    const [isEditable, setIsEditable] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useLocalStorage<string[]>("codeQuestion_AllowedLanguages", []);
    const [marks, setMarks] = useLocalStorage<string>("codeQuestion_Marks", 'Add Marks Here');
    const [isEditMarks, setIsEditMarks] = useState(false);
    const [tabvalue, setTabValue] = useState('1');
    const [question, setQuestion] = useLocalStorage<string>("codeQuestion_question", "");
    const [publicTestCases, setPublicTestCases] = useLocalStorage<TestCase[]>("codeQuestion_PublicTestCases", [{ name: 'Case 1', input: '', output: '' }]);
    const [publicCaseNumber, setPublicCaseNumber] = useState(2);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [publicActiveIndex, setPublicActiveIndex] = useState(0);
    const [privateTestCases, setPrivateTestCases] = useLocalStorage<TestCase[]>("codeQuestion_PrivateTestCases", [{ name: 'Case 1', input: '', output: '' }]);
    const [privateCaseNumber, setPrivateCaseNumber] = useState(2);
    const [pvtHoveredIndex, setPvtHoveredIndex] = useState<number | null>(null);
    const [pvtActiveIndex, setPvtActiveIndex] = useState(0);
    const [lang, setLang] = useState([programmingLanguages[0].value, programmingLanguages[0].id.toString()]);
    const [solutionCode, setSolutionCode] = useLocalStorage("codeQuestion_solutionCode", '');
    const [editorContainerHeight, setEditorContainerHeight] = useState("95%");
    const [editorHeight, setEditorHeight] = useState("95%");
    const topRef = createRef<HTMLDivElement>();
    const testcaseRef = createRef<HTMLDivElement>();
    const starterRef = createRef<HTMLDivElement>();

    const { testId } = useParams();
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };

    const handleConfirmTitleClick = () => {
        setIsEditable(!isEditable);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;

        if (event.target.checked) {
            setSelectedLanguages((prevSelectedLanguages) => [...prevSelectedLanguages, checkboxName]);
        } else {
            setSelectedLanguages((prevSelectedLanguages) => prevSelectedLanguages.filter((lang) => lang !== checkboxName));
        }
    };

    const handleEditMarksClick = () => {
        setIsEditMarks(!isEditMarks);
    };

    const handleMarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarks(event.target.value);
    };

    const handleConfirmMarksClick = () => {
        setIsEditMarks(!isEditMarks);
    };

    const handleTestCaseTabChange = (event: React.SyntheticEvent, newValue: string) => {
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

    const handlePublicOutputChange = async () => {

        let newTestCases = [...publicTestCases];

        try {
            const response = await runCode(
                {
                    sourceCode: solutionCode,
                    testCases: publicTestCases,
                    languageId: lang[1]
                }
            );

            if (response.status === HttpStatusCode.Created) {
                const tokens = response.data.tokens;

                const tokenString = tokens.length === 1 ? tokens[0] : tokens.join(",");

                const params = { "tokens": tokenString };

                const getResults = async () => {
                    try {
                        const response = await Request("GET", `/submission`, null, params);

                        const outputs = response.data.submissions.map((result: results) => result.stdout || result.stderr || result.compile_output);

                        newTestCases = newTestCases.map((testCase, index) => ({ ...testCase, output: atob(outputs[index]) }));

                        response.data.submissions.forEach((result: results) => {
                            if (result.status.id === 1 || result.status.id === 2) {
                                setTimeout(() => getResults(), 4000);
                            }
                        });

                        setPublicTestCases(newTestCases);

                    } catch (error) {
                        console.log(error);
                    }
                };

                getResults();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to get public test case outputs', {
                autoClose: 2000,
                hideProgressBar: true
            });
        }
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

    const handlePvtOutputChange = async () => {
        let newTestCases = [...privateTestCases];

        try {
            const response = await runCode(
                {
                    sourceCode: solutionCode,
                    testCases: privateTestCases,
                    languageId: lang[1]
                }
            );

            if (response.status === HttpStatusCode.Created) {
                const tokens = response.data.tokens;

                const tokenString = tokens.length === 1 ? tokens[0] : tokens.join(",");

                const params = { "tokens": tokenString };

                const getResults = async () => {
                    try {
                        const response = await Request("GET", `/submission`, null, params);

                        const outputs = response.data.submissions.map((result: results) => result.stdout || result.stderr || result.compile_output);

                        newTestCases = newTestCases.map((testCase, index) => ({ ...testCase, output: atob(outputs[index]) }));

                        response.data.submissions.forEach((result: results) => {
                            if (result.status.id === 1 || result.status.id === 2) {
                                setTimeout(() => getResults(), 4000);
                            }
                        });

                        setPrivateTestCases(newTestCases);

                    } catch (error) {
                        console.log(error);
                    }
                };

                getResults();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to get private test case outputs', {
                autoClose: 2000,
                hideProgressBar: true
            });
        }
    };

    const handleLangSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang([e.target.value.split(',')[0], e.target.value.split(',')[1]]);
    }

    const handleCodeChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
        value && setSolutionCode(value);
    }

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const scrollToTestcase = () => {
        testcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const scrollToStarter = () => {
        starterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSaveQuestion = async () => {

        if (titleValue === 'Add Your Question Title Here') {
            toast.error('Please add a title for the question', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (selectedLanguages.length === 0) {
            toast.error('Please select at least one language', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (marks === 'Add Marks Here') {
            toast.error('Please add marks for the question', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (question == "<p><br></p>" || question == '' || question == null) {
            toast.error('Please add a question', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (solutionCode === '') {
            toast.error('Please add a solution code', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (publicTestCases.length === 0) {
            toast.error('Please add at least one public test case', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        if (privateTestCases.length === 0) {
            toast.error('Please add at least one private test case', {
                autoClose: 2000,
                hideProgressBar: true
            });
            return;
        }

        for (let i = 0; i < publicTestCases.length; i++) {
            if (publicTestCases[i].input === '' || publicTestCases[i].output === '') {
                toast.error('Please fill in all the public test cases', {
                    autoClose: 2000,
                    hideProgressBar: true
                });
                return;
            }
        }

        for (let i = 0; i < privateTestCases.length; i++) {
            if (privateTestCases[i].input === '' || privateTestCases[i].output === '') {
                toast.error('Please fill in all the private test cases', {
                    autoClose: 2000,
                    hideProgressBar: true
                });
                return;
            }
        }

        try {
            const questionData = {
                test_id: testId,
                question: question,
                question_title: titleValue,
                solution_code: solutionCode,
                allowed_languages: selectedLanguages,
                public_test_case: publicTestCases,
                private_test_case: privateTestCases,
                marks: marks,
            };

            const response = await Request("POST", "/question/add-code", questionData);

            if (response.status === HttpStatusCode.Created) {
                toast.success('Question added successfully', {
                    autoClose: 2000,
                    hideProgressBar: true
                });

                const itemsToClear = ["codeQuestion_Title", "codeQuestion_AllowedLanguages", "codeQuestion_Marks", "codeQuestion_PublicTestCases", "codeQuestion_PrivateTestCases", "codeQuestion_solutionCode", "codeQuestion_question"];
                itemsToClear.forEach((item) => localStorage.removeItem(item));

                navigate(`/staff/test/${testId}`);
            } else {
                toast.error('Failed to add question', {
                    autoClose: 2000,
                    hideProgressBar: true
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add question', {
                autoClose: 2000,
                hideProgressBar: true
            });
        }
    }

    return (
        <div className={styles.addProgramming_whole_container}>
            <div className={styles.addProgramming_first_container} id='top' ref={topRef}>
                <div className={styles.addProgramming_header}>
                    <div className={styles.addProgramming_header_top}>
                        <div className={styles.input_container}>
                            <input type="text" id="input" placeholder='Add Your Question Here' onChange={handleTitleChange} disabled={!isEditable} />
                            <div className={styles.underline}></div>
                        </div>

                        {isEditable ? (
                            <FiCheck onClick={handleConfirmTitleClick} id={styles.editIcon} />
                        ) : (
                            <FiEdit onClick={handleEditClick} id={styles.editIcon} />
                        )}

                        <div className={styles.save_question_button_container} onClick={handleSaveQuestion}>
                            <button >Save Question</button>
                        </div>
                    </div>
                    <div className={styles.addProgramming_header_bottom}>
                        <div className={styles.addProgramming_header_bottom_left}>
                            <h1>Allowed Languages:</h1>
                            <div className={styles.checkbox_container}>
                                {programmingLanguages.map((lang) => (
                                    <div key={lang.id}>
                                        <input
                                            type="checkbox"
                                            title={lang.name}
                                            name={lang.value}
                                            onChange={handleCheckboxChange}
                                            checked={selectedLanguages.includes(lang.value)}
                                        />
                                        <label htmlFor={lang.value}>{lang.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.addProgramming_header_bottom_right}>
                            <h1>Mark:</h1>
                            <div className={styles.marks_container}>
                                <input type="text" id="input" placeholder='Add test mark here' onChange={handleMarksChange} disabled={!isEditMarks} />
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
                    <Jodit value={question} setValue={setQuestion} placeholder='Start typing the question over here' />
                </div>
                <div className={styles.scrolldown} onClick={scrollToTestcase}>
                    <div className={styles.chevrons}>
                        <div className={styles.chevrondown}></div>
                        <div className={styles.chevrondown}></div>
                    </div>
                </div>
            </div>

            {/* Starter Code */}
            <div className={styles.addProgramming_third_container} id='starter' ref={starterRef}>
                <div className={styles.addProgramming_third_container_body}>
                    <div className={styles.addProgramming_third_container_header}>
                        <h1>Add Solution Code</h1>
                    </div>
                    <div className={styles.addProgramming_third_body}>
                        <div style={{ height: editorContainerHeight }} className={styles.addProgramming_third_lang_container}>
                            <div className={styles.options_container}>
                                <div>
                                    <div className={styles.select_container}>
                                        <select className={styles.lang_select} onChange={handleLangSelect}>
                                            {programmingLanguages.map((lang) => (
                                                <option key={lang.id} value={[lang.value, lang.id.toString()]}>{lang.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.editor_container} style={{ width: '100%', height: editorHeight }}>
                                <OurEditor value={solutionCode} lang={lang[0]} onChange={handleCodeChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className={styles.Btn} onClick={scrollToTop}>
                    <svg height="1.2em" className={styles.arrow} viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
                    <p className={styles.text}>Back to Top</p>
                </button>
            </div>

            {/* Test Cases */}
            <div className={styles.addProgramming_second_container} id='testcase' ref={testcaseRef}>
                <div className={styles.addProgramming_second_container_body}>
                    <div className={styles.addProgramming_second_container_header}>
                        <h1>Add Testcases</h1>
                    </div>
                    <div className={styles.addProgramming_second_tabs_container}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabvalue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTestCaseTabChange} aria-label="lab API tabs">
                                        <Tab label="Public" value="1" style={{ color: "white", fontSize: "1.2em" }} />
                                        <Tab label="Private" value="2" style={{ color: "white", fontSize: "1.2em" }} />
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
                                                {/* <textarea id={`output-${publicActiveIndex}`}  name="output" rows={10} value={publicTestCases[publicActiveIndex]?.output} onChange={(event) => handlePublicOutputChange(publicActiveIndex, event)}></textarea> */}
                                                <textarea disabled id={`output-${publicActiveIndex}`} name="output" rows={10} value={publicTestCases[publicActiveIndex]?.output}></textarea>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={styles.addProgramming_third_save}
                                    onClick={handlePublicOutputChange}
                                >
                                    <button><IoMdSave /></button>
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
                                                {/* <textarea id={`output-${pvtActiveIndex}`}  name="output" rows={10} value={privateTestCases[pvtActiveIndex]?.output} onChange={(event) => handlePvtOutputChange(pvtActiveIndex, event)}></textarea> */}
                                                <textarea id={`output-${pvtActiveIndex}`} name="output" rows={10} value={privateTestCases[pvtActiveIndex]?.output} disabled></textarea>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={styles.addProgramming_third_save}
                                    onClick={handlePvtOutputChange}
                                >
                                    <button><IoMdSave /></button>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className={styles.scrolldown} onClick={scrollToStarter}>
                    <div className={styles.chevrons}>
                        <div className={styles.chevrondown}></div>
                        <div className={styles.chevrondown}></div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default AddProgramming;