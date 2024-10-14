import styles from './class.module.css'

import ClassDetails from '../class/classDetails'

export default function Class() {


    return(
        <div>
            <div className = {styles.class_main_container}>
            <ClassDetails />
            </div>
        </div>
    )
}