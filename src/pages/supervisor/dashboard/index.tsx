import { useNavigate } from 'react-router-dom';


// Assests import
import styles from './supervisorDashboard.module.css'
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";

import { useState, useEffect } from 'react';
import { Request } from '../../../networking';
// import { format } from 'date-fns';


const SupervisorDashboard = () => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/supervisor/StudentDetailsPage');
    }

    const [tests, setTests] = useState([
        {
            scheduled_at: '01.02.2024',
            title: 'Python Programming Test...',
            total_students: 0
        },{
            scheduled_at: '03.06.2024',
            title: 'C Programming',
            total_students: 2
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching test data');
                const response = await Request("GET",`/hello`);
                console.log("resonse is here....");
                console.log(response);
                if (response.status === 200) {
                    const testData = response.data.tests;
                    console.log(testData);
                    setTests(testData);
                } else {
                    console.error('Failed to fetch test data');
                }
            } catch (error) {
                console.log("there is an error in fetching data from api/supervisor/tests")
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
                <div className={styles.card_container} onClick={handleCardClick}>
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