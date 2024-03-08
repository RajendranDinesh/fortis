import { useRef, useState } from "react";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import { CiSaveDown2 } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";

import styles from './addStudent.module.css';
import Modal from "../../../components/Modal";
import Manual from "./manual";
import { validateStudent } from "./utils";

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

export interface studentDetails {
    user_name: string;
    roll_number: string;
    email: string;
}

export default function AddStudentModal({ modalOpen, handleModalClick }: Props) {

    const [students, setStudents] = useState<studentDetails[]>([]);
    const csvFile = useRef<HTMLInputElement>(null);

    const downloadCSVTemplate = () => {
        const template = [
            ['email', 'roll_no', 'user_name'],
            ['example@bitsathy.ac.in', 'rollno123', 'Example']
        ];
        const csvString = template.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'student_details_template.csv');
    };

    const handleUploadBtnClick = () => {
        if (csvFile.current !== null) 
            csvFile.current.click();
    };

    const handleCSVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target?.result as string;
                const result = Papa.parse(contents, { header: true });
                const data = result.data.map((row: any) => ({
                    email: row['email'], // use the exact column header from your CSV file
                    roll_number: row['roll_no'], // use the exact column header from your CSV file
                    user_name: row['user_name'] // use the exact column header from your CSV file
                }));

                const validStudent = [];
                for (let i = 0; i < data.length; i++) {
                    const isValid = validateStudent({ userDetails: data[i], students });

                    if (isValid) {
                        validStudent.push(data[i]);
                    }
                }

                setStudents([...students, ...validStudent]);
            };
            reader.readAsText(file);
        }
    };

    const handleAdd = () => {
        console.log(students);
    }

    return(
        <Modal isOpen={modalOpen} onClose={handleModalClick} title="Add Students">
            <div className={styles.top_container}>
                <div className={styles.children_container}>
                    <Manual students={students} setStudents={setStudents} />
                </div>

                <div className={styles.button_container}>
                    <button onClick={handleAdd} className={styles.add_btn}>Add</button>
                    <button onClick={handleModalClick} className={styles.cancel_btn}>Cancel</button>
                    <button onClick={() => setStudents([])} className={styles.clear_btn}>Clear</button>
                    <button onClick={downloadCSVTemplate} className={styles.download_btn} title="Download CSV template"><CiSaveDown2 /></button>
                    <button onClick={handleUploadBtnClick} className={styles.upload_btn} title="Upload filled CSV file"><CiSaveUp2 /></button>
                </div>
                <input 
                    type="file"
                    accept=".csv"
                    style={{ display: 'none' }} 
                    ref={csvFile} 
                    onChange={handleCSVChange}
                />
            </div>
        </Modal>
    );
}