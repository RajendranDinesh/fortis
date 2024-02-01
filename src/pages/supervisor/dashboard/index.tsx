
// Assests import
import styles from './supervisorDashboard.module.css'
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";

const SupervisorDashboard = () => {


    return (
        <div className={styles.main_container}>
            <div className={styles.header_container}>
            <FaSpotify className={styles.header_image} />
                <h1 className={styles.header_title}>Spotify</h1>
            </div>
            <div className={styles.body_container} >
                <div className={styles.card_container}>
                    <div className={styles.card_pattern}></div>
                    <div className={styles.text_container}>
                        <div>
                        <div className={styles.card_nameContainer}>
                            <h1 className={styles.card_name}>Python Programming  Test</h1>
                        </div>
                        <div className={styles.card_dateContainer}>
                            <FaCalendarCheck />
                            <p className ={styles.card_date}>01.02.2024</p>
                        </div>
                        </div>
                        <div className={styles.card_NumberContainer}>
                        <MdOutlineSupervisorAccount className={styles.count_image} />
                        <h1 className={styles.card_number}> 0</h1>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    );
};

export default SupervisorDashboard;