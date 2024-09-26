import { useEffect, useState } from "react";

import { Avatar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import styles from './dashboard.module.css';
import handWave from '../../../assets/hand_wave.svg';
import StaffModal from "./staffModal";
import StudentModal from "./studentModal";
import { getDashboardData } from "./controllers";
import { FaSpinner } from "react-icons/fa";

interface DashboardData {
    role: string;
    staff_count: number;
}

function AdminDashboard() {

    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

    const [dashboardData, setDashboardData] = useState<DashboardData[]>();

    const toggleStaffModal = () => {
        setIsStaffModalOpen(!isStaffModalOpen)
    };

    const toggleAddStudentModal = () => {
        setIsStudentModalOpen(!isStudentModalOpen)
    };

    const getSetData = async () => {
        try {
            const { dashboard } = await getDashboardData();

            setDashboardData(dashboard);

        } catch (error) {
            toast.error((error as any).response.data.error, {
                autoClose: 2000,
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        getSetData();
    }, []);

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
                                    <img className={styles.icon} src="https://img.icons8.com/ios/50/teacher.png" alt="teacher"/>
                                </div>
                                <h3 className={styles.heading}>Teachers</h3>
                                <h4 className={styles.count}>{dashboardData?.filter((data) => data.role === "staff")[0].staff_count}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Students */}
                    <div className={styles.card} onClick={toggleAddStudentModal}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <div className={styles.ico_container}>
                                    <img className={styles.icon} src="https://img.icons8.com/pulsar-line/48/student-male.png" alt="student-male"/>
                                </div>
                                <h3 className={styles.heading}>Students</h3>
                                <h4 className={styles.count}>{dashboardData?.filter((data) => data.role === "student")[0].staff_count}</h4>
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
