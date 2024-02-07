//Dependencies

import React, { useState, KeyboardEvent } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';
import TextField from '@mui/material/TextField';
import Modal from "../../components/Modal";
import Papa from 'papaparse';
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';

//Styles

import styles from "./Classroom.module.css";

//Components

//Assets

import { IoIosAddCircle } from 'react-icons/io'

function Classroom() {

    const [value, setValue] = useState('1');
    const [studentModelOpen, setStudentModelOpen] = useState(false);
    const [studentTabValue, setStudentTabValue] = useState("Mail");
    const [studentNameInput, setStudentNameInput] = useState('');
    const [studentRollNumberInput, setStudentRollNumberInput] = useState('');
    const [studentEmailInput, setStudentEmailInput] = useState('');
    const [studentDetails, setStudentDetails] = useState<{name: string, rollNumber: string, email: string}[]>([]);
    const [fileName, setFileName] = useState('');
    const [data, setData] = useState<{email: string, rollNumber: string, name: string}[]>([]);
    const [teacherModalOpen, setTeacherModalOpen] = useState(false);
    const [teacherTabValue, setTeacherTabValue] = useState("Mail");
    const [teacherNameInput, setTeacherNameInput] = useState('');
    const [teacherFacultyIdInput, setTeacherFacultyIdInput] = useState('');
    const [teacherEmailInput, setTeacherEmailInput] = useState('');
    const [teacherDetails, setTeacherDetails] = useState<{name: string, facultyId: string, email: string}[]>([]);
    const [testsModalOpen, setTestsModalOpen] = useState(false);
    const [testTitle, setTestTitle] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [testDuration, setTestDuration] = useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    const handleStudentModalClick = () => {
        setStudentModelOpen(!studentModelOpen);
    }

    const handleStudentTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setStudentTabValue(newValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault();
            const name = studentNameInput.trim();
            const rollNumber = studentRollNumberInput.trim();
            const email = studentEmailInput.trim();
            const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/; // Regex for email validation
            if (name && rollNumber && (email && emailRegex.test(email))) {
                if (studentDetails.some(student => student.email === email)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mail ID already exists!",
                    });
                } else {
                    setStudentDetails([...studentDetails, {name, rollNumber, email}]);
                    setStudentNameInput('');
                    setStudentRollNumberInput('');
                    setStudentEmailInput('');
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Enter mail ID that ends with @bitsathy.ac.in",
                });;
            }
        }
    };

    const handleStudentEmailClick = (email: string) => {
        setStudentDetails(studentDetails.filter(student => student.email !== email));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target?.result as string;
                const result = Papa.parse(contents, { header: true });
                const data = result.data.map((row: any) => ({
                    email: row['email'], // use the exact column header from your CSV file
                    rollNumber: row['roll_no'], // use the exact column header from your CSV file
                    name: row['user_name'] // use the exact column header from your CSV file
                }));
                setData(data);
            };
            reader.readAsText(file);
        }
    };

    const downloadCSVTemplate = () => {
        const template = [
            ['email', 'roll_no', 'user_name'], // headers
            ['example@bitsathy.ac.in', '<12345>ex123', 'Example'] // example row
        ];
        const csvString = template.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'template.csv');
    };

    const handleStudentAddClick = () => {
        if (studentTabValue === "Mail") {
            console.log(studentDetails);
        } else {
            console.log(data);
        }
        setStudentModelOpen(!studentModelOpen);
    };

    const handleTeacherModalClick = () => {
        setTeacherModalOpen(!teacherModalOpen);
    };

    const handleTeacherKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault();
            const name = teacherNameInput.trim();
            const facultyId = teacherFacultyIdInput.trim();
            const email = teacherEmailInput.trim();
            const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/; // Regex for email validation
            if (name && facultyId && (email && emailRegex.test(email))) {
                if (teacherDetails.some(teacher => teacher.email === email)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mail ID already exists!",
                    });
                } else {
                    setTeacherDetails([...teacherDetails, {name, facultyId, email}]);
                    setTeacherNameInput('');
                    setTeacherFacultyIdInput('');
                    setTeacherEmailInput('');
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Enter mail ID that ends with @bitsathy.ac.in",
                });;
            }
        }
    };

    const handleTeacherEmailClick = (email: string) => {
        setTeacherDetails(teacherDetails.filter(teacher => teacher.email !== email));
    };

    const handleTeacherAddClick = () => {
        console.log(teacherDetails);
        setTeacherModalOpen(!teacherModalOpen);
    };

    const handleTestsModalClick = () => {
        setTestsModalOpen(!testsModalOpen);
    };

    const handleTestAddClick = () => {
        console.log([testTitle, testDescription, testDuration]);
        setTestsModalOpen(!testsModalOpen);
    };

    return(
        <div className={styles.Classroom_container}>
            <div className={styles.Classroom_header}>
                <div className={styles.Classroom_title_box}>
                    <div className={styles.Classroom_title_container}>
                        <h1>Classroom Title</h1>
                    </div>
                    <div className={styles.Classroom_description_container}>
                        <p>Classroom Description</p>
                    </div>
                </div>
            </div>
            <div className={styles.Classroom_body}>
                <div className={styles.Classroom_tabs_container}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Students" value="1" style={{color: "white", fontSize: "1.2em"}} />
                                <Tab label="Teachers" value="2" style={{color: "white", fontSize: "1.2em"}} />
                                <Tab label="Tests" value="3" style={{color: "white", fontSize: "1.2em"}} />
                            </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </div>
                <div className={styles.Classroom_List_Container}>
                    {value === "1" && 
                        <>
                        <div className={styles.Classroom_students}>
                            <div className={styles.Add_students_container}>
                                <div className={styles.Add_students} onClick={handleStudentModalClick}>
                                    <IoIosAddCircle />
                                </div> 
                            </div>
                            <div className={styles.Students_list_container}>
                                <div className={styles.Student_header_grid}>
                                    <div className={styles.Student_grid_title}>Sl.no</div>
                                    <div className={styles.Student_grid_title}>Name</div>
                                    <div className={styles.Student_grid_title}>Roll.No</div>
                                    <div className={styles.Student_grid_title}>Email</div>
                                </div>

                                {/* Map this shit */}

                                <div className={styles.Student_list_grid}>
                                    <div className={styles.Student_grid_title}>01</div>
                                    <div className={styles.Student_grid_title}>Saran S M</div>
                                    <div className={styles.Student_grid_title}>7376222AL194</div>
                                    <div className={styles.Student_grid_title}>saran.al22@bitsathy.ac.in</div>
                                </div>
                            </div>
                        </div>

                        <Modal isOpen = {studentModelOpen} onClose={handleStudentModalClick} title="Add Students">
                            <div className={styles.Student_modal_content}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={studentTabValue}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleStudentTabChange} aria-label="lab API tabs example">
                                            <Tab label="By Mail" value="Mail" style={{fontSize: "1.2em"}} />
                                            <Tab label="By CSV" value="CSV" style={{fontSize: "1.2em"}} />
                                        </TabList>
                                        </Box>
                                    </TabContext>
                                </Box>
                                {studentTabValue === "Mail" &&
                                    <div className={styles.Student_modal_reciever_container}>
                                        <div className={styles.Student_modal_input_fields}>
                                            <div className={styles.input_wrapper}>
                                                <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={studentNameInput}
                                                    onChange={e => setStudentNameInput(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Type name..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                            <div className={styles.input_wrapper}>
                                                <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={studentRollNumberInput}
                                                    onChange={e => setStudentRollNumberInput(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Type roll number..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                            <div className={styles.input_wrapper}>
                                            <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={studentEmailInput}
                                                    onChange={e => setStudentEmailInput(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Type email and press comma..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                        </div>
                                        <div className={styles.Student_modal_mail_list}>
                                            {studentDetails.map(student => (
                                                <div className={styles.Student_mail_display} key={student.email} onClick={() => handleStudentEmailClick(student.email)}>
                                                    {student.name} ({student.rollNumber}, {student.email})
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }

                                {studentTabValue === "CSV" &&
                                    <div className={styles.Student_modal_reciever_container}>
                                        <div className={styles.Student_download_container}>
                                            <button className={styles.Btn} onClick={downloadCSVTemplate}>
                                                <svg className={styles.svgIcon} viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                                                <span className={styles.icon2}></span>
                                                <span className={styles.tooltip}>CSV Template</span>
                                            </button>
                                        </div>
                                        <label className={styles.custum_file_upload} htmlFor="file">
                                            <div className={styles.icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                                            </div>
                                            <div className={styles.text}>
                                                <span>
                                                    {fileName ? fileName : "Click to upload CSV"}
                                                </span>
                                            </div>
                                            <input type="file" id="file" accept=".csv" onChange={handleFileUpload} />
                                        </label> 
                                    </div>                                   
                                }
                                <div className={styles.Student_modal_button_container}>
                                    <div className={styles.Student_add_button} onClick={handleStudentAddClick}>Add</div>
                                    <div className={styles.Student_cancel_button} onClick={handleStudentModalClick}>Cancel</div>
                                </div>
                            </div>
                        </Modal>
                        </>
                    }
                    {value === "2" && 
                        <>
                        <div className={styles.Classroom_teachers}>
                            <div className={styles.Add_teachers_container}>
                                <div className={styles.Add_teachers} onClick={handleTeacherModalClick}>
                                    <IoIosAddCircle />
                                </div> 
                            </div>
                            <div className={styles.Teachers_list_container}>
                                <div className={styles.Teacher_header_grid}>
                                    <div className={styles.Teacher_grid_title}>Sl.no</div>
                                    <div className={styles.Teacher_grid_title}>Name</div>
                                    <div className={styles.Teacher_grid_title}>Faculty ID</div>
                                    <div className={styles.Teacher_grid_title}>Email</div>
                                </div>

                                {/* Map below this shit */}
                                
                                <div className={styles.Teacher_list_grid}>
                                    <div className={styles.Teacher_grid_title}>01</div>
                                    <div className={styles.Teacher_grid_title}>Saran S M</div>
                                    <div className={styles.Teacher_grid_title}>Al1234</div>
                                    <div className={styles.Teacher_grid_title}>saran.al22@bitsathy.ac.in</div>
                                </div>
                            </div>
                        </div>

                        <Modal isOpen = {teacherModalOpen} onClose={handleTeacherModalClick} title="Add Teachers">
                            <div className={styles.Teacher_modal_content}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={teacherTabValue}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList aria-label="lab API tabs example">
                                            <Tab label="By Mail" value="Mail" style={{fontSize: "1.2em"}} />
                                        </TabList>
                                        </Box>
                                    </TabContext>
                                </Box>
                                <div className={styles.Teacher_modal_reciever_container}>
                                    <div className={styles.Teacher_modal_input_fields}>
                                            <div className={styles.input_wrapper}>
                                                <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={teacherNameInput}
                                                    onChange={e => setTeacherNameInput(e.target.value)}
                                                    onKeyDown={handleTeacherKeyDown}
                                                    placeholder="Type name..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                            <div className={styles.input_wrapper}>
                                                <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={teacherFacultyIdInput}
                                                    onChange={e => setTeacherFacultyIdInput(e.target.value)}
                                                    onKeyDown={handleTeacherKeyDown}
                                                    placeholder="Type roll number..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                            <div className={styles.input_wrapper}>
                                            <input 
                                                    className={styles.input_box} 
                                                    type="text"
                                                    value={teacherEmailInput}
                                                    onChange={e => setTeacherEmailInput(e.target.value)}
                                                    onKeyDown={handleTeacherKeyDown}
                                                    placeholder="Type email and press comma..."
                                                />
                                                <span className={styles.underline}></span>
                                            </div>
                                        </div>
                                        <div className={styles.Teacher_modal_mail_list}>
                                            {teacherDetails.map(teacher => (
                                                <div className={styles.Teacher_mail_display} key={teacher.email} onClick={() => handleTeacherEmailClick(teacher.email)}>
                                                    {teacher.name} ({teacher.facultyId}, {teacher.email})
                                                </div>
                                            ))}
                                        </div>
                                </div>
                                <div className={styles.Teacher_modal_button_container}>
                                    <div className={styles.Teacher_add_button} onClick={handleTeacherAddClick}>Add</div>
                                    <div className={styles.Teacher_cancel_button} onClick={handleTeacherModalClick}>Cancel</div>
                                </div>
                            </div>
                        </Modal>
                        </>
                    }
                    {value === "3" && 
                        <>
                            <div className={styles.Classroom_tests}>
                                <div className={styles.Add_tests_container}>
                                    <div className={styles.Add_tests} onClick={handleTestsModalClick}>
                                        <IoIosAddCircle />
                                    </div>
                                </div>
                                <div className={styles.Tests_list_container}>
                                    <div className={styles.Test_header_grid}>
                                        <div className={styles.Test_grid_title}>Sl.no</div>
                                        <div className={styles.Test_grid_title}>Test Title</div>
                                        <div className={styles.Test_grid_title}>Duration (in minutes)</div>
                                    </div>

                                    {/* Map below this shit */}
                                    
                                    <div className={styles.Test_list_grid}>
                                        <div className={styles.Test_grid_title}>01</div>
                                        <div className={styles.Test_grid_title}>Python Basics</div>
                                        <div className={styles.Test_grid_title}>60</div>
                                    </div>
                                </div>
                            </div>

                            <Modal isOpen={testsModalOpen} onClose={handleTestsModalClick} title="Add Tests">
                                <div className={styles.Test_modal_content}>
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={teacherTabValue}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList aria-label="lab API tabs example">
                                                <Tab label="Tests" value="Mail" style={{fontSize: "1.2em"}} />
                                            </TabList>
                                            </Box>
                                        </TabContext>
                                    </Box>
                                    <div className={styles.Test_modal_reciever_container}>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '25ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                            style={{display: "flex", flexDirection: "column"}}
                                        >
                                            <TextField 
                                                id="title_test" 
                                                label="Title" 
                                                variant="standard" required
                                                style={{width: "20vw", fontSize: "1.2em"}}
                                                value={testTitle}
                                                onChange={e => setTestTitle(e.target.value)}
                                            />   
                                            <TextField 
                                                id="test_des" 
                                                label="Description (optional)" 
                                                variant="standard"
                                                style={{width: "20vw", fontSize: "1.2em"}} 
                                                value={testDescription}
                                                onChange={e => setTestDescription(e.target.value)}
                                            />
                                            <TextField 
                                                id="test_duration" 
                                                label="Duration (in minutes)" 
                                                variant="standard" 
                                                required
                                                style={{width: "20vw", fontSize: "1.2em"}}
                                                value={testDuration}
                                                onChange={e => setTestDuration(e.target.value)}
                                            />
                                        </Box>
                                        <div className={styles.Test_modal_button_container}>
                                            <div className={styles.Test_add_button} onClick={handleTestAddClick}>Add</div>
                                            <div className={styles.Test_cancel_button} onClick={handleTestsModalClick}>Cancel</div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Classroom;