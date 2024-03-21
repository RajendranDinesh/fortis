import { useState } from "react";
import { useParams } from "react-router-dom"
import styles from './class.module.css'

import Test from './Test'
import ClassDetails from '../class/classDetails'
import StaffDetails from '../class/Staff'

export default function Class() {

    const { classId } = useParams();

    const [activeTabId, setActiveTabId] = useState(0);

    const tabContent = [
        {
            id: 0,
            displayString: "Tests",
            content: <>Tests</>
        },
        {
            id: 1,
            displayString: "Staff",
            content: <>Staff</>
        }
    ]
    
    return(
        <div>
            <div className = {styles.class_main_container}>
                <div className = {styles.class_Top_container}>
                <ClassDetails />
                <StaffDetails />
                </div>
                <Test />
            </div>
        </div>
    )
}