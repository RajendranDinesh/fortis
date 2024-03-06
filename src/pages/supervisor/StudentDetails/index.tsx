import React, { useEffect, useState } from 'react';
import { toast, Bounce, ToastContainer } from "react-toastify";
import styles from './studentsdetails.module.css';
import AttendenceModal from '../AttendenceModal';

import { Request } from '../../../networking';
import { useParams } from 'react-router-dom';

interface Student {
    id: number;
    name: string;
    tabCount: number;
    blocked: boolean;
    status: string;
    blockReason?: string;
    blockedAt?: string;
}

interface TestTitle {
    title: string;
    total_students: number;
}



const StudentDetailsPage = () => {
    const [active, setActive] = useState(true);
    const [blocked, setBlocked] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isBlockInputEnabled, setIsBlockInputEnabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [blockedAt, setBlockedAt] = useState('');
    const [blockedBy, setBlockedBy] = useState('');
    const [blockReason, setBlockReason] = useState('');
    const [hideBlockButton, setHideBlockButton] = useState(false);

    const [testTitle, setTestTitle] = useState<TestTitle>({ title: 'test title', total_students: 0 });

    const { id } = useParams();


    useEffect(() => {
        const firstActiveStudent = Object.values(students).find((student: any) => student.status === 'Active');
        setSelectedStudent(firstActiveStudent || null);
    }, [students]);

    useEffect(() => {
        fetchtitle();
        fetchData();
    }, []);

    const fetchtitle = async () => {
        try {
            const response = await Request("GET",`/supervisor/header/${id}`);
            if (response.status === 200) {
                const TestTitle = response.data.test[0]; //subscripting the array to get the first element
                setTestTitle(TestTitle);
            } else {
                console.error('Failed to fetch test data');
            }
        } catch (error) {
            console.error('Error fetching test data:', error);
        }
    }

    const fetchData = async () => {
        try {
            setStudents([]);
            const response = await Request("GET",`/supervisor/active-blocked-students/${id}`);
            if (response.status === 200) {

                console.log("-actuive & blocked students-",response.data.students);
                const transformedData = response.data.students.map((student: any) => ({
                    id: student.user_id,
                    name: student.user_name,
                    tabCount: 0, // Set default value or fetch from backend if available
                    blocked: student.is_active !== 1, // Convert is_active to blocked status
                    status: student.is_active === 1 ? 'Active' : 'Blocked',
                    blockReason: student.blockReason,
                    blockedAt: student.blockedAt
                }));
                setStudents(transformedData);

            } else {
                console.error('Failed to fetch test data');
            }
        } catch (error) {
            console.error('Error fetching test data:', error);
        }
    };

    const block_Student = async (studentId : any , blockReason : string) => {
        try {
            console.log(studentId)
            console.log(blockReason);

            const response = await Request("POST",`/supervisor/block-student/${id}`,{student_id: studentId, block_reason: blockReason});
            if (response.status === 200) {
                console.log("Blocked student successfully");
            } else {
                console.error('Failed to block student');
            }
        } catch (error) {
            console.error('Error blocking student:', error);
        }
    }

    const blocked_details = async (studentId: any) => {
        try {
            const response = await Request("GET", `/supervisor/blocked-details/${id}`, { student_id: studentId });
            if (response.status === 200) {
                console.log("Blocked details fetched successfully");
                console.log(response.data);
                return response.data; // Return the response data\
            } else {
                console.error('Failed to fetch blocked details');
                return null; // Return null in case of failure
            }
        } catch (error) {
            console.error('Error fetching blocked details:', error);
            throw error; // Throw the error for handling in the caller
        }
    }
    
    

    const handleActivestudents = () => {
        setActive(true);
        setBlocked(false);
    };

    const handleBlockedStudents = () => {
        setActive(false);
    setBlocked(true); 
    };

    const handleReasonSubmit = (id: number) => {

        setIsBlockInputEnabled(true);
        setHideBlockButton(true);
                      toast.promise(
                        new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    }),
                    {
                        pending: 'Blocking...',
                    }
                );

    };
    
    const unblockStudent = (id: number) => {
        // const updatedStudents = students.map((student: Student) => {
        //     if (student.id === id) {
        //         return { ...student, blocked: false, status: 'Active' };
        //     }
        //     return student;
        // });
    
        // // setStudents(updatedStudents);
    
        // const clickedStudent = updatedStudents.find(student => student.id === id);
        // if (!clickedStudent?.blocked) {
        //     toast.success('Student Unblocked!', {
        //         position: "top-right",
        //         autoClose: 1000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         transition: Bounce,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
    };



    const submitReason = async () => {
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
    
        try {
            
            await block_Student(selectedStudent.id, inputValue);
    
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
    
            // Clear the input value and disable block input
            setInputValue('');
            setIsBlockInputEnabled(false);
            console.log("---- blocked reason ----",inputValue);
            console.log("Student ID",selectedStudent.id);


        } catch (error) {

            console.error('Error blocking student:', error);
            toast.error('Failed to block student', {
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
    

    const handleStudentClick = async (id: number) => {
        const clickedStudent = students.find(student => student.id === id);
        setSelectedStudent(clickedStudent || null);
        setHideBlockButton(false);
        setIsBlockInputEnabled(false); // Reset block input container state
    
        // If the clicked student is in the blocked list
        if (clickedStudent && clickedStudent.status === 'Blocked') {
            try {
                // Call the blocked_details function to fetch blocked details for the selected student
                const response = await blocked_details(clickedStudent.id);
                if (response && response.blocked_details && response.blocked_details.length > 0) {
                    // If blocked details are available, update the state variables
                    const { blockedAt, blockedBy, blockReason } = response.blocked_details[0]; // Assuming response.data contains the blocked details
                    setBlockedAt(blockedAt || '');
                    setBlockedBy(blockedBy || '');
                    setBlockReason(blockReason || '');
                } else {
                    // If no blocked details are available, reset the state variables
                    setBlockedAt('');
                    setBlockedBy('');
                    setBlockReason('');
                    console.log("No blocked details available for the selected student");
                }
            } catch (error) {
                // Handle error if the fetch request fails
                console.error('Error fetching blocked details:', error);
            }
        } else {
            // Reset the blocked details if the clicked student is not blocked
            setBlockedAt('');
            setBlockedBy('');
            setBlockReason('');
        }
    };
    

    const handleModalClick = () => {
        setModalOpen(!modalOpen);
    };

    const handleCancel = () => {
        setIsBlockInputEnabled(false);
        setInputValue('');
        setHideBlockButton(false);
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.header}>
                <h1 className={styles.test_name}>{testTitle.title}</h1>
                <div className={styles.header_right}>
                    <h2 className={styles.status}> Total Students : {testTitle.total_students}</h2>
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
                    {active && students
                                .filter(student => student.status === 'Active')
                                .map(student => (
                                    <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                                        <h1 className={styles.student_name}>{student.name}</h1>
                                        <h1 className={styles.tab_count}>{student.tabCount}</h1>
                                    </div>
                                ))
                            }
                    {blocked && students
                        .filter(student => student.status === 'Blocked')
                        .map(student => (
                            <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                                <h1 className={styles.student_name}>{student.name}</h1>
                                <h1 className={styles.tab_count}>{student.tabCount}</h1>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.middle_container}>
                    {selectedStudent && (
                        <div className={styles.content_container}>
                            <hr className={styles.hr_line} />
                            <div className={styles.content_student}>
                                <h1 className={styles.content_details}>Student Name :</h1>
                                <h1 className={styles.content_details}>{selectedStudent.name}</h1>
                            </div>

                            {selectedStudent.status === 'Active' && (
                                <>
                                {
                                    hideBlockButton ? null :
                                    <div className={styles.content_student}>
                                        <h1 className={styles.content_details}>Block:</h1>
                                        <button className={styles.main_button} onClick={() => handleReasonSubmit(selectedStudent.id)}>Block</button>
                                    </div>
                                }
                                </>
                            )}
                          
                            {selectedStudent.status === 'Blocked' && (
                                <>
                                <div className={styles.content_student}>
                                    <h1 className={styles.content_details}>Unblock:</h1>
                                    <button className={styles.main_button} onClick={() => unblockStudent(selectedStudent.id)}>Unblock</button>
                                </div>
                                </>
                                
                            )}

                            {isBlockInputEnabled && (
                                <div className={styles.block_input_container}>
                                    <h1 className={styles.content_details}>Reason:</h1>
                                    <input
                                        type="text"
                                        className={styles.block_input}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        title="Enter the reason"
                                        placeholder="Enter the reason"
                                    />
                                    <button className={styles.main_button} onClick={submitReason}>Submit</button>
                                    <button className={styles.main_button} onClick={handleCancel}>cancel</button>
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
