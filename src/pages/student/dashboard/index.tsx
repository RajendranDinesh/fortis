import styles from './dashboard.module.css';
import ClassBody from "./classBody";
import OngoingTestBody from "./ongoingTestBody";
import UpcomingTest from './upcomingTests';

const StudentDashboard = () => {

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.dashboard_body}>
                <h1>Hi 👋</h1>
                <div className={styles.dashboard_body_container}>
                <ClassBody />
                <OngoingTestBody/>
                <UpcomingTest />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;