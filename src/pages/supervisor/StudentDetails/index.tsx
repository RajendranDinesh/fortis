import React, { useEffect, useState } from 'react';
import { toast, Bounce, ToastContainer } from "react-toastify";
import styles from './studentsdetails.module.css';
import AttendenceModal from '../AttendenceModal';

interface Student {
    id: number;
    name: string;
    tabCount: number;
    blocked: boolean;
    status: string;
    blockReason?: string;
    blockedAt?: string;
}
const initialStudents: Student[] = [
    { id: 1, name: 'Adesh', tabCount: 4, blocked: false, status: 'Active' },
    { id: 2, name: 'Monkey D Luffy', tabCount: 0, blocked: true, status: 'Blocked' },
    { id: 3, name: 'Roronoa Zoro', tabCount: 1, blocked: false, status: 'Active' },
    { id: 4, name: 'Black Foot Sanji', tabCount: 2, blocked: true, status: 'Blocked' },
    { id: 5, name: 'Nami', tabCount: 3, blocked: false, status: 'Active'},
    { id: 6, name: 'Usopp', tabCount: 4, blocked: false, status: 'Active' },
    { id: 7, name: 'Tony Tony Chopper', tabCount: 0, blocked: true, status: 'Blocked' },
    { id: 8, name: 'Nico Robin', tabCount: 1, blocked: false, status: 'Active' },
    { id: 9, name: 'Franky', tabCount: 2, blocked: true, status: 'Blocked' },
    { id: 10, name: 'Brook', tabCount: 3, blocked: false, status: 'Active'},
    { id: 11, name: 'Jinbe', tabCount: 4, blocked: false, status: 'Active' },
    { id: 12, name: 'Trafalgar D Water Law', tabCount: 0, blocked: true, status: 'Blocked' },
    { id: 13, name: 'Basil Hawkins', tabCount: 1, blocked: false, status: 'Active' },
    { id: 14, name: 'Scratchmen Apoo', tabCount: 2, blocked: true, status: 'Blocked' },
    { id: 15, name: 'Eustass Kid', tabCount: 3, blocked: false, status: 'Active'},
    { id: 16, name: 'Killer', tabCount: 4, blocked: false, status: 'Active' },
    { id: 17, name: 'Capone Bege', tabCount: 0, blocked: true, status: 'Blocked' },
    { id: 18, name: 'Jewelry Bonney', tabCount: 1, blocked: false, status: 'Active' },
    { id: 19, name: 'Bartolomeo', tabCount: 2, blocked: true, status: 'Blocked' },
    { id: 20, name: 'Cavendish', tabCount: 3, blocked: false, status: 'Active'},
    { id: 21, name: 'Edward Weevil', tabCount: 4, blocked: false, status: 'Active' },
    { id: 22, name: 'Boa Hancock', tabCount: 0, blocked: true, status: 'Blocked' },
  ];

const StudentDetailsPage = () => {
    const [active, setActive] = useState(true);
    const [blocked, setBlocked] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isBlockInputEnabled, setIsBlockInputEnabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [blockedAt, setBlockedAt] = useState('');
    const [blockedBy, setBlockedBy] = useState('');
    const [blockReason, setBlockReason] = useState('');
    const [isReasonContainerShown, setIsReasonContainerShown] = useState(false);


    useEffect(() => {
        setStudents(initialStudents);
        const firstActiveStudent = initialStudents.find(student => student.status === 'Active');
        setSelectedStudent(firstActiveStudent || null);
    }, []);

    const handleActivestudents = () => {
        setActive(true);
    };

    const handleBlockedStudents = () => {
        setBlocked(true);
        setActive(false);
    };

    const blockStudent = (id: number) => {
        const updatedStudents = students.map((student: Student) => {
            if (student.id === id) {
                setIsBlockInputEnabled(true);
                setSelectedStudent(student);
                toast.promise(
                    new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    }),
                    {
                        pending: 'Blocking...',
                        success: 'submit Reason',
                    }
                );
                setIsReasonContainerShown(true);
                return { ...student };
                
            }
            return student;
        });
    
        setStudents(updatedStudents);
    };
    
    const unblockStudent = (id: number) => {
        const updatedStudents = students.map((student: Student) => {
            if (student.id === id) {
                return { ...student, blocked: false, status: 'Active' };
            }
            return student;
        });
    
        setStudents(updatedStudents);
    
        const clickedStudent = updatedStudents.find(student => student.id === id);
        if (!clickedStudent?.blocked) {
            toast.success('Student Unblocked!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                transition: Bounce,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    const submitReason = () => {
        if (!selectedStudent || !students) return;

        if (!inputValue) {
            toast.error('Please provide a reason!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                transition: Bounce,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const updatedStudents = students.map((student) => {
            if (student.id === selectedStudent.id) {
                return {
                    ...student,
                    blocked: true,
                    status: 'Blocked',
                    blockReason: inputValue,
                    blockedAt: new Date().toLocaleString(),
                };
            }
            return student;
        });

        setStudents(updatedStudents);
        setIsReasonContainerShown(false);

        toast.success('Student Blocked!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Bounce,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setInputValue('');
        setIsBlockInputEnabled(false);
    };

    const handleStudentClick = (id: number) => {
        const clickedStudent = students.find(student => student.id === id);
        setSelectedStudent(clickedStudent || null);
        if (clickedStudent?.status === 'Active') {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleModalClick = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.header}>
                <h1 className={styles.test_name}>Python Prgramming Test</h1>
                <div className={styles.header_right}>
                    <h2 className={styles.status}> Total Students : 128</h2>
                    <button className={styles.main_button} onClick={handleModalClick}>Attendence</button>
                </div>
            </div>
            <div className={styles.body_container}>
                <div className={styles.left_container}>
                    <div className={styles.heading_container}>
                        <h1>Student Name</h1>
                        <div className={styles.count_container}>
                            <h1>Tab Count</h1>
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <button className={`${styles.left_buttons} ${active ? styles.active : ''}`} onClick={handleActivestudents}>Active  Students</button>
                        <button className={`${styles.left_buttons} ${!active ? styles.active : ''}`} onClick={handleBlockedStudents}>Blocked Students</button>
                    </div>
                    {active && students.map(student => (
                        student.status === 'Active' && (
                            <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                                <h1 className={styles.student_name}>{student.name}</h1>
                                <h1 className={styles.tab_count}>{student.tabCount}</h1>
                            </div>
                        )
                    ))}
                    {blocked && students.map(student => (
                        student.status === 'Blocked' && (
                            <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                                <h1 className={styles.student_name}>{student.name}</h1>
                                <h1 className={styles.tab_count}>{student.tabCount}</h1>
                            </div>
                        )
                    ))}
                </div>
                <div className={styles.middle_container}>
                    {selectedStudent && (
                        <div className={styles.content_container}>
                            <hr className={styles.hr_line} />
                            <div className={styles.content_student}>
                                <h1 className={styles.content_details}>Student Name :</h1>
                                <h1 className={styles.content_details}>{selectedStudent.name}</h1>
                            </div>
                          
                                {showButton ? 
                                    (!isReasonContainerShown && <>
                                      <div className={styles.content_student}>
                                        <h1 className={styles.content_details}>Block:</h1>
                                        <button className={styles.main_button} onClick={() => blockStudent(selectedStudent.id)}>Block</button>
                                        </div>
                                        </>)
                                    :
                                    <button className={styles.main_button} onClick={() => unblockStudent(selectedStudent.id)}>Unblock</button>
                                }
                            {isBlockInputEnabled && (
                                <div className={styles.block_input_container}>
                                    <h1 className={styles.content_details}>Reason:</h1>
                                    <input
                                        type="text"
                                        className={styles.block_input}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <button className={styles.main_button} onClick={submitReason}>Submit</button>
                                </div>
                            )}
                            <div className={styles.content_student}>
                                <h1 className={styles.content_details}>Tab Switch Count :</h1>
                                <h1 className={styles.tab_Count}>{selectedStudent.tabCount}</h1>
                            </div>
                            <div className={styles.content_student}>
                                <h1 className={styles.content_details}>Status :</h1>
                                <h1 className={styles.student_status}>{selectedStudent.status}</h1>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.right_container}>
                    {selectedStudent && selectedStudent.blocked && (
                        <>
                            <div className={styles.test_activity_container}>
                                <h1>Test Activity</h1>
                            </div>
                            <div className={styles.test_details_container}>
                                <h1>Test Details</h1>
                            </div>

                            <div className={styles.test_details}>
                                <h2>Blocked at : {blockedAt}</h2>
                            </div>
                            <div className={styles.test_details}>
                                <h2>Blocked by :{blockedBy}</h2>
                            </div>

                            <div className={styles.test_Blocked_details}>
                                <h2>Blocked Reason :</h2>
                                <h3>{blockReason}</h3>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
            <AttendenceModal modalOpen={modalOpen} handleModalClick={handleModalClick} />
        </div>
    );
}

export default StudentDetailsPage;
