import { useState } from "react";

import { Avatar } from "@mui/material";
import { ToastContainer } from "react-toastify";

import styles from './dashboard.module.css';
import handWave from '../../../assets/hand_wave.svg';
import StaffModal from "./staffModal";
import StudentModal from "./studentModal";

function AdminDashboard() {

    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);


    const toggleStaffModal = () => {
        setIsStaffModalOpen(!isStaffModalOpen)
    };

    const toggleAddStudentModal = () => {
        setIsStudentModalOpen(!isStudentModalOpen)
    };

    const toggleClassModal = () => {
        setIsClassModalOpen(!isClassModalOpen)
    };

    const toggleTestModal = () => {
        setIsTestModalOpen(!isTestModalOpen)
    };

    return (
        <div className={styles.dashboard}>

            <div className={styles.left_container}>
                <div className={styles.title_container}>
                    <h2>Dashboard</h2>
                </div>
                <div className={styles.cards_container}>
                    {/* Teachers */}
                    <div className={styles.card} onClick={toggleStaffModal}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <div className={styles.ico_container}>
                                    <img width="50" height="50" src="https://img.icons8.com/ios/50/teacher.png" alt="teacher"/>
                                </div>
                                <h3 className={styles.heading}>Teachers</h3>
                                <h4 className={styles.count}>404</h4>
                            </div>
                        </div>
                    </div>

                    {/* Students */}
                    <div className={styles.card} onClick={toggleAddStudentModal}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <div className={styles.ico_container}>
                                    <img width="48" height="48" src="https://img.icons8.com/pulsar-line/48/student-male.png" alt="student-male"/>
                                </div>
                                <h3 className={styles.heading}>Students</h3>
                                <h4 className={styles.count}>3329</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.right_container}>
                <div className={styles.title_container}>
                    <h2>Hi <img alt="hand wave" src={handWave} height={"30rem"} width={"30rem"} /> admin name</h2>
                    <Avatar alt="Admin" sx={{ width: 100, height: 100 }}><h1>A</h1></Avatar>
                </div>
            </div>

        <StaffModal modalOpen={isStaffModalOpen} handleModalClick={toggleStaffModal} />
        <StudentModal modalOpen={isStudentModalOpen} handleModalClick={toggleAddStudentModal} />
        <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
