import styles from './dashboard.module.css';
import ClassBody from "./classBody";
import UpcomingTestBody from "./upcomingTestBody";

const StudentDashboard = () => {

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.dashboard_body}>
                <h1>Welcome to the Student Dashboard</h1>
                <div className={styles.dashboard_body_content}>
                    <p id ={styles.paraid}>Here you can view your courses, grades, and other such information.</p>
                    <p>Good luck!</p>
                </div>
                <div className={styles.dashboard_body_container}>
                <ClassBody />
                <UpcomingTestBody/>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;