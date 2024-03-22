import React, { useEffect, useState } from 'react';
import styles from '../class.module.css'
import { useParams } from 'react-router-dom';

import { getClassroomTitle, getStaffDetails, getClassroomTests } from '../controllers';

interface ClassDetails {
    name: string;
}
export default function ClassDetails() {

    const [classDetails, setClassDetails] = useState<ClassDetails>({
        name: "Mathematics"
    })

    useEffect(() => {
        getClassroomTitle(13);
        getStaffDetails(13);
        getClassroomTests(13);
    }
    , [])

    return (
        <div>
            <div className={styles.class_Details_container}>
                <div className={styles.class_Details_headingContainer}>
                <h2>
                    {classDetails.name}
                </h2>
            </div>
            </div>
        </div>
    );
    }