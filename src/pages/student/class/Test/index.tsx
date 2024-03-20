import React, { useState } from 'react'
import styles from '../class.module.css'

interface TestDetails {
    id: number;
    name: string;
    createdBy: string;
    date: string;
    status: string;
}

export default function Test() {

    const [testDetails, setTestDetails] = useState<TestDetails[]>([
        {
            id : 1,
            name : "Periodical Test",
            createdBy : "Monkey D Luffy",
            date : "12/24/24",
            status : "Active"
        },
        {
            id : 2,
            name : "Periodical Test-2",
            createdBy : "Roronoa Zoro",
            date : "12/24/24",
            status : "Attempted"
        }
    ])


    return(
        <div className={styles.test_container}>
            <div className={styles.staff_Testheader}>
                <div className={styles.staff_Testheader_title}>Sl.no</div>
                <div className={styles.staff_Testheader_title}>Test Name</div>
                <div className={styles.staff_Testheader_title}>Created By</div>
                <div className={styles.staff_Testheader_title}>Date & Time</div>
                <div className={styles.staff_Testheader_title}>Status</div>
            </div>
            <div className ={styles.Test_list_container}>
            {testDetails && testDetails.map((testDetail,index)=>
                 <div className={styles.Test_list} key={index}>
                    <div className ={styles.staff_Testheader_title}>{testDetail.id}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.name}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.createdBy}</div>
                    <div className ={styles.staff_Testheader_title}>{testDetail.date}</div>
                    <div className ={styles.Test_list_Activedetails}>{testDetail.status}</div>
                 </div>
            )}
            </div>
             </div>
    );
}
