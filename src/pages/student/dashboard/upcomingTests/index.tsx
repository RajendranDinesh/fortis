import React, { useEffect, useState } from "react";
import styles from "./upcomingTests.module.css";

import { MdGroups } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { FaBookReader } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

import { getUpcomingTests } from "../controllers";

interface UpcomingTest {
    test_id: number;
    test_title: string;
    scheduled_at: string;
    duration_in_minutes: string;
    type: string;
    class_name: string;
}

export default function UpcomingTest() {
    const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>([]);

    useEffect(() => {
        fetchUpcomingTests();
    }, []);

    const fetchUpcomingTests = async () => {
        try {
            const response = await getUpcomingTests();
            if (response && response.data && Array.isArray(response.data.tests)) {
                setUpcomingTests(response.data.tests);
                console.log(response.data.tests);
            } else {
                console.error('API response is not an array:', response?.data);
                setUpcomingTests([]);
            }
        } catch (err) {
            console.error('Error fetching upcoming tests:', err);
            setUpcomingTests([]);
        }
    };

    return (
        <div className={styles.Upcoming_Testcontainer}>
            <h1>Upcoming Tests</h1>
            {upcomingTests.length === 0 ? (
                <p className={styles.no_content_message}>You don't have any upcoming tests</p>
            ) : (
                upcomingTests.map((test) => (
                    <div key={test.test_id} className={styles.upcomingTests}>
                        <div className={styles.upcomingClassHeader}>
                            <MdGroups className={styles.testImages} />
                            <h2 className={styles.upcomingTestTitle}>{test.test_title}</h2>
                        </div>
                        <hr className={styles.testHr} />
                        <div className={styles.upcomingDetailsContainer}>
                            <div className={styles.IndividualTestDetails}>
                                <CiCalendarDate className={styles.IndividualTestImage} />
                                <h2 className={styles.upcomingdetails}>{new Date(test.scheduled_at).toISOString().slice(0, 10)}</h2>
                            </div>
                            <div className={styles.IndividualTestDetails}>
                                <IoIosTimer className={styles.IndividualTestImage} />
                                <h2 className={styles.upcomingdetails}>{test.duration_in_minutes} mins</h2>
                            </div>
                            <div className={styles.IndividualTestDetails}>
                                <FaBookReader className={styles.IndividualTestImage} />
                                <h2 className={styles.upcomingdetails}>{test.class_name}</h2>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}