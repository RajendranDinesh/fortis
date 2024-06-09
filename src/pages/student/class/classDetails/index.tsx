
import React, { useState,useEffect } from 'react';
import styles from '../class.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getClassroomTitle, getStaffDetails, getClassroomTests } from '../controllers';

interface ClassDetails {
    name: string;
}
interface StaffDetails {
    id: number;
    user_name: string;
}
interface TestDetails {
    test_id: number;
    title: string;
    created_by: string;
    scheduled_at: string;
    status: string;
    category: string;
}

export default function ClassDetails() {

    const [classDetails, setClassDetails] = useState<ClassDetails>({ name: ""});
    const navigate = useNavigate();
    const [staffDetails, setStaffDetails] = useState<StaffDetails[]>([])
    const [testDetails, setTestDetails] = useState<TestDetails[]>([])

    const handleTestNavigate = (testId: number, testCat: string) => {
        if(testCat === "MCQ") {
            navigate(`/student/mcq/${testId}`);
        } else {
            navigate(`/student/programming/${testId}`);
        }
    };

    const { classId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (classId) {
                const numericId = parseInt(classId, 10);
    
                try {
                    const classResponse = await getClassroomTitle(numericId);
                    setClassDetails({ name: classResponse.data.classroom.name });
    
                    const staffResponse = await getStaffDetails(numericId);
                    setStaffDetails(staffResponse.data.staff)
    
                    const testResponse = await getClassroomTests(numericId);
                    setTestDetails(testResponse.data.tests);

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
    
        fetchData();
    }, [classId]);


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
                    <p>{staffDetail.user_name}</p>
                    </div>
                )}
            </div>
        </div>
        <div className={styles.test_container}>
            <div className={styles.staff_Testheader}>
                <div className={styles.staff_Testheader_title}>Sl.no</div>
                <div className={styles.staff_Testheader_title}>Test Name</div>
                <div className={styles.staff_Testheader_title}>Created By</div>
                <div className={styles.staff_Testheader_title}>Date & Time</div>
                <div className ={styles.staff_Testheader_title}>category</div>
                <div className={styles.staff_Testheader_title}>Status</div>
            </div>
            <div className ={styles.Test_list_container}>
            {testDetails && testDetails.map((testDetail,index)=>
                 <div className={styles.Test_list} key={index} onClick={()=>{handleTestNavigate(testDetail.test_id,testDetail.category)}}>
                    <div className ={styles.staff_Testheader_title}>{testDetail.test_id}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.title}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.created_by}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.scheduled_at}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.category}</div>
                    <div className ={styles.Test_list_Activedetails}>{testDetail.status}</div>
                 </div>
            )}
            </div>
             </div>
        </div>
    );
}

