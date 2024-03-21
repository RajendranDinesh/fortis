import React ,{useState} from 'react';
import styles from '../class.module.css'

interface StaffDetails {
    id: number;
    name: string;
}

export default function StaffDetails() {
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
    return(<div>
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
    </div>);
}
