import { useNavigate } from 'react-router-dom';


// Assests import
import styles from './supervisorDashboard.module.css'
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";

import { useState, useEffect } from 'react';
import { Request } from '../../../networking';
// import { format } from 'date-fns';


interface Test {
    scheduled_at: string;
    test_id: number;
    title: string;
    total_students: number;
}

const SupervisorDashboard = () => {

    const navigate = useNavigate();

    const handleCardClick = (testId: number) => {
        navigate(`/supervisor/StudentDetailsPage/${testId}`);
    }

    const [tests, setTests] = useState([
        {
            scheduled_at: '01.02.2024',
            title: 'Python Programming Test...',
            test_id : 1,
            total_students: 0
        },{
            scheduled_at: '03.06.2024',
            title: 'C Programming',
            test_id : 2,
            total_students: 2
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Request("GET",`/supervisor/dashboard-data`);
                if (response.status === 200) {
                    const testData = response.data.tests.map((test: Test) => ({
                        ...test,
                        scheduled_at: new Date(test.scheduled_at).toLocaleDateString(), // Format date
                    }));
                    setTests(testData);
                } else {
                    console.error('Failed to fetch test data');
                }
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.main_container}>
            <div className={styles.header_container}>
                <FaSpotify className={styles.header_image} />
                <h1 className={styles.header_title}>Spotify</h1>
            </div>
            <div className={styles.body_container} >

            {tests.map((test, index) => (
                <div className={styles.card_container} key={test.test_id ?? 0} onClick={() => handleCardClick(test.test_id ?? 0)}>
                    <div className={styles.card_pattern}></div>
                    <div className={styles.text_container}>
                        <div>
                        <div className={styles.card_nameContainer}>
                            <h1 className={styles.card_name}>{test.title}</h1>
                        </div>
                        <div className={styles.card_dateContainer}>
                            <FaCalendarCheck />
                            <p className={styles.card_date}>{test.scheduled_at}</p>
                        </div>
                        </div>
                        <div className={styles.card_NumberContainer}>
                            <MdOutlineSupervisorAccount className={styles.count_image} />
                            <h1 className={styles.card_number}>{test.total_students}</h1>
                        </div>
                    </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default SupervisorDashboard;