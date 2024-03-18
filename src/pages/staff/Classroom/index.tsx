//Dependencies

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';
import { toast, ToastContainer } from "react-toastify";
import { getClassroom } from "./Controllers";

//Styles

import styles from "./Classroom.module.css";

//Components

import StudentList from "./ListItems/studentList";

//Assets

import { IoIosAddCircle } from 'react-icons/io';
import TeacherList from "./ListItems/teacherList";
import TestList from "./ListItems/testList";
import AddStudentModal from "./Modals/addStudent";
import AddTeacherModal from "./Modals/addTeacher";
import ScheduleTest from "./Modals/scheduleTest";

function Classroom() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [studentModelOpen, setStudentModelOpen] = useState(false);
    const [teacherModalOpen, setTeacherModalOpen] = useState(false);
    const [testModalOpen, setTestModalOpen] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    const handleStudentModalClick = () => {
        setStudentModelOpen(!studentModelOpen);
    }

    const handleTeacherModalClick = () => {
        setTeacherModalOpen(!teacherModalOpen);
    };

    const handleTestModalClick = () => {
        setTestModalOpen(!testModalOpen);
    };

    interface headerProps {
        title: string
        description?: string
    }

    const[headerItems, setHeaderItems] = useState<headerProps>({title: ""});

    useEffect(() => {
        const getSetClassroomData = async (id: Number) => {
            try {
                const responseData = await getClassroom(id);
                setHeaderItems({title: responseData.name, description: responseData.description});
            } catch (error) {
                if ((error as any).response) {
                    toast.error((error as any).response.data.error, {
                        autoClose: 2000,
                        theme: "dark",
                    });
                } else {
                    toast.error((error as Error).message, {
                        autoClose: 2000,
                        theme: "dark",
                    });
                    navigate("/staff", { replace: false });
                }
            }
        }

        const classRoomId = Number(id);
        getSetClassroomData(classRoomId);
    }, [id, navigate]);

    return(
        <div className={styles.Classroom_container}>
            <div className={styles.Classroom_header}>
                <div className={styles.Classroom_title_box}>
                    <div className={styles.Classroom_title_container}>
                        <h1>{headerItems.title}</h1>
                    </div>
                    <div className={styles.Classroom_description_container}>
                        <p>{headerItems.description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.Classroom_body}>
                <div className={styles.Classroom_tabs_container}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs">
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
                                <StudentList />
                            </div>
                        </div>

                        <AddStudentModal setModalOpen={setStudentModelOpen} isOpen={studentModelOpen} onClose={handleStudentModalClick} />

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
                                <TeacherList />
                            </div>
                        </div>

                        <AddTeacherModal setModalOpen={setTeacherModalOpen} isOpen={teacherModalOpen} onClose={handleTeacherModalClick} />
                        </>
                    }
                    {value === "3" && 
                        <>
                            <div className={styles.Classroom_tests}>
                                <div className={styles.Add_tests_container}>
                                    <div className={styles.Add_tests}>
                                        <IoIosAddCircle onClick={handleTestModalClick} />
                                    </div>
                                </div>
                                <div className={styles.Tests_list_container}>
                                    <TestList />
                                </div>
                            </div>
                            <ScheduleTest isOpen={testModalOpen} onClose={handleTestModalClick} />
                        </>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Classroom;