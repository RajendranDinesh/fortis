
import React, { useState } from 'react';
import styles from '../class.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getClassroomTitle, getStaffDetails, getClassroomTests } from '../controllers';

interface ClassDetails {
    name: string;
}
interface StaffDetails {
    id: number;
    name: string;
}
interface TestDetails {
    id: number;
    name: string;
    createdBy: string;
    date: string;
    status: string;
    category: string;
}

export default function ClassDetails() {

    const [classDetails, setClassDetails] = useState<ClassDetails>({
        name: "Mathematics"
    })
    const navigate = useNavigate();
    const [staffDetails, setStaffDetails] = useState<StaffDetails[]>([
        {
            id : 1,
            name : "Monkey D Luffy"
        },
        {
            id : 2,
            name : "Roronoa Zoro"
        },
        {
            id : 4,
            name : "Nico Robin"
        },
    ])

    const [testDetails, setTestDetails] = useState<TestDetails[]>([
        {
            id : 1,
            name : "Periodical Test",
            createdBy : "Monkey D Luffy",
            date : "12/24/24",
            category : "MCQ",
            status : "Active"
        },
        {
            id : 2,
            name : "Periodical Test-2",
            createdBy : "Roronoa Zoro",
            date : "12/24/24",
            category : "Programming",
            status : "Attempted"
        }
    ])

    const handleTestNavigate = (testId: number, testCat: string) => {
        if(testCat === "MCQ") {
            navigate(`/student/mcq/${testId}`);
        } else {
            navigate(`/student/programming/${testId}`);
        }
    };
    useEffect(() => {
        getClassroomTitle(13);
        getStaffDetails(13);
        getClassroomTests(13);
    }
    , [])


    return (
        <div className={styles.main_container}>
        <div className ={styles.class_Top_container}>
            <div className={styles.class_Details_container}>
                <div className={styles.class_Details_headingContainer}>
                <h2>
                    {classDetails.name}
                </h2>
            </div>
            </div>
            <div className={styles.staff_Details_container}>
            <div className={styles.staff_Details_headingContainer}>
                    <h2>Staff Details :</h2>
                </div>
                { staffDetails && staffDetails.map((staffDetail,index)=>
                    <div className={styles.staff_details}>
                    <p>{index+1}.</p>
                    <p>{staffDetail.name}</p>
                    </div>
                )}
            </div>
        </div>
        <div className={styles.test_container}>
            <div className={styles.staff_Testheader}>
                <div className={styles.staff_Testheader_title}>Sl.no</div>
                <div className={styles.staff_Testheader_title}>Test Name</div>
                <div className={styles.staff_Testheader_title}>Created By</div>
                <div className ={styles.staff_Testheader_title}>category</div>
                <div className={styles.staff_Testheader_title}>Date & Time</div>
                <div className={styles.staff_Testheader_title}>Status</div>
            </div>
            <div className ={styles.Test_list_container}>
            {testDetails && testDetails.map((testDetail,index)=>
                 <div className={styles.Test_list} key={index} onClick={()=>{handleTestNavigate(testDetail.id,testDetail.category)}}>
                    <div className ={styles.staff_Testheader_title}>{testDetail.id}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.name}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.createdBy}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.category}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.date}</div>
                    <div className ={styles.Test_list_Activedetails}>{testDetail.status}</div>
                 </div>
            )}
            </div>
             </div>
        </div>
    );
}

