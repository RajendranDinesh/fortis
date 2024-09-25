import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { getOngoingTest } from '../controllers';

interface StudentTest {
    test_id: number;
    test_name: string;
    className: string;
    duration: string;
}

export default function OngoingTestBody() {
    const navigate = useNavigate();
    const [studentTests, setStudentTests] = useState<StudentTest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOngoingTests();
    }, []);

    const fetchOngoingTests = async () => {
        try {
            const response = await getOngoingTest();
            if (response && response.data && Array.isArray(response.data.tests)) {
                setStudentTests(response.data.tests);
            } else {
                console.error('API response is not an array:', response?.data);
                setStudentTests([]);
            }
        } catch (err) {
            console.error('Error fetching ongoing tests:', err);
            setStudentTests([]);
        } finally {
            setLoading(false);
        }
    };

    if (studentTests.length === 0) {
        return (
            <div className={styles.no_content_container}>
            <h1 className={styles.classHeading}>Ongoing Tests</h1>
            <p className={styles.no_content_message}>You are not currently enrolled in any Tests.</p>
            </div>
        );
    }

    return (
        <div className={styles.classCardContainer}>
            <h2 className={styles.classHeading}>Ongoing Tests</h2>
            <div className={styles.dashboard_classes}>
                {studentTests.map((studentTest, index) => (
                    <div className={styles.Classes_container} key={index}>
                        <div className={styles.Classroom_display}>
                            <div className={styles.Classroom_display_header}>
                                <h1>{studentTest.test_name}</h1>
                            </div>
                            <div className={styles.Classroom_display_footer}>
                                <p>{studentTest.className}</p>
                                <p>Duration: {studentTest.duration} mins</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}