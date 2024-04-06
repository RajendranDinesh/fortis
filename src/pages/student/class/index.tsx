import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from './class.module.css'

import ClassDetails from '../class/classDetails'

export default function Class() {


    return(
        <div>
            <div className = {styles.class_main_container}>
                <div className = {styles.class_Top_container}>
                <ClassDetails />
                </div>
            </div>
        </div>
    )
}