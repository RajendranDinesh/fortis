//Dependencies

import React, { useState, KeyboardEvent } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';
import Modal from "../../components/Modal";
import Papa from 'papaparse';

//Styles

import styles from "./Classroom.module.css";

//Components

//Assets

import { IoIosAddCircle } from 'react-icons/io'

function Classroom() {

    const [value, setValue] = useState('1');
    const [studentModelOpen, setStudentModelOpen] = useState(false);
    const [studentTabValue, setStudentTabValue] = useState("Mail");
    const [studentEmailInput, setStudentEmailInput] = useState('');
    const [studentEmails, setStudentEmails] = useState<string[]>([]);
    const [fileName, setFileName] = useState('');
    const [data, setData] = useState<string[][]>([]);
    const [teacherModalOpen, setTeacherModalOpen] = useState(false);
    const [teacherTabValue, setTeacherTabValue] = useState("Mail");
    const [teacherEmailInput, setTeacherEmailInput] = useState('');
    const [teacherEmails, setTeacherEmails] = useState<string[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    const handleStudentModalClick = () => {
        setStudentModelOpen(!studentModelOpen);
    }

    const handleStudentTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setStudentTabValue(newValue);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ',') {
            event.preventDefault();
            if (studentEmailInput) {
                setStudentEmails([...studentEmails, studentEmailInput]);
                setStudentEmailInput('');
            }
        }
    };

    const handleStudentEmailClick = (email: string) => {
        setStudentEmails(studentEmails.filter(e => e !== email));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target?.result as string;
                const result = Papa.parse(contents, { header: false });
                setData(result.data as string[][]);
                console.log(result.data); // Log the parsed CSV data
            };
            reader.readAsText(file);
        }
    };

    const handleTeacherModalClick = () => {
        setTeacherModalOpen(!teacherModalOpen);
    };

    const handleTeacherKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ',') {
            event.preventDefault();
            if (teacherEmailInput) {
                setTeacherEmails([...teacherEmails, teacherEmailInput]);
                setTeacherEmailInput('');
            }
        }
    };

    const handleTeacherEmailClick = (email: string) => {
        setTeacherEmails(teacherEmails.filter(e => e !== email));
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
                                        {studentEmails.map(email => (
                                            <div className={styles.Student_mail_display} key={email} onClick={() => handleStudentEmailClick(email)}>
                                                {email}
                                            </div>
                                        ))}
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
                                }

                                {studentTabValue === "CSV" &&
                                    <div className={styles.Student_modal_reciever_container}>
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
                                    {teacherEmails.map(email => (
                                        <div className={styles.Teacher_mail_display} key={email} onClick={() => handleTeacherEmailClick(email)}>
                                            {email}
                                        </div>
                                    ))}
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
                            </div>
                        </Modal>
                        </>
                    }
                    {value === "3" && <h1>Tests</h1>}
                </div>
            </div>
        </div>
    );
}

export default Classroom;