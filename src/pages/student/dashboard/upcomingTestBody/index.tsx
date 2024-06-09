import React, { useState } from 'react';

import styles from '../dashboard.module.css';
import { useNavigate } from 'react-router-dom';


interface studentTest {
    test_id: number
    name: string
    description: string
}
export default function UpcomingTestBody() {
    const navigate = useNavigate();
    const [studentTests , setStudentTests] = useState <studentTest[]>([
        {
            test_id: 1,
            name: "Mathematics",
            description: "SF seminar Hall 1"
        },
        {
            test_id: 2,
            name: "Physics",
            description: "SF seminar Hall 2"
        }
    ]);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h2 className={styles.classHeading}>Upcoming Tests</h2>
            <div className={styles.dashboard_classes}>
            {loading ? <div className={styles.dashboard_classes_content}>
                <p>You are not currently enrolled in any Tests.</p>
            </div>:
            
                studentTests && studentTests.map((studentTest , index)=>
                <div className={styles.Classes_container}>
                    <div className={styles.Classroom_display} key={index}>
                        <div className={styles.Classroom_display_header}>
                        <h1>{studentTest.name}</h1>
                        </div>
                        <div className={styles.Classroom_display_footer}>
                        <p>{studentTest.description}</p>
                        </div>
                    </div>
                </div>
                )}
             {studentTests.length >= 3 && (
                <button className={styles.view_all_button}>
                View All
                <div className={styles.arrow_wrapper}>
                    <div className={styles.arrow}></div>
                </div>
                </button>
            )}
        </div>
        </div>
    );
}