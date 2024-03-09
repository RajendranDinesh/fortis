import { useState } from "react";

import { CiCircleChevRight } from "react-icons/ci";
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

    const toggleAddStaffModal = () => {
        setIsStaffModalOpen(!isStaffModalOpen)
    };

    const toggleAddStudentModal = () => {
        setIsStudentModalOpen(!isStudentModalOpen)
    };

    const toggleAddClassModal = () => {
        setIsClassModalOpen(!isClassModalOpen)
    };

    const toggleAddTestModal = () => {
        setIsTestModalOpen(!isTestModalOpen)
    };

    return (
        <div className={styles.dashboard}>

            <div className={styles.left_container}>
                <div className={styles.title_container}>
                    <h2>Metrics</h2>
                </div>
                <div className={styles.cards_container}>
                    {/* Teachers */}
                    <div className={styles.card} onClick={toggleAddStaffModal}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Teachers</h3>
                                <p className={styles.count}>Count: 5</p>
                                <CiCircleChevRight className={styles.right_angle_bracket} />
                            </div>
                        </div>
                    </div>

                    {/* Students */}
                    <div className={styles.card} onClick={toggleAddStudentModal}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Students</h3>
                                <p className={styles.count}>Count: 5</p>
                                <CiCircleChevRight className={styles.right_angle_bracket} />
                            </div>
                        </div>
                    </div>

                    {/* Classes */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Classes</h3>
                                <p className={styles.count}>Count: 5</p>
                                <CiCircleChevRight className={styles.right_angle_bracket} />
                            </div>
                        </div>
                    </div>

                    {/* Tests */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Tests</h3>
                                <p className={styles.count}>Count: 5</p>
                                <CiCircleChevRight className={styles.right_angle_bracket} />
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

        <StaffModal modalOpen={isStaffModalOpen} handleModalClick={toggleAddStaffModal} />
        <StudentModal modalOpen={isStudentModalOpen} handleModalClick={toggleAddStudentModal} />
        <ToastContainer />
        </div>
    );
};

export default AdminDashboard;