// External modules
import { useRef, useState } from "react";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { toast } from "react-toastify";

// Internal modules
import Manual from "../manual";
import { validateStudent } from "../utils";
import { addStudents } from "../../controllers";
import ProgressBar from "../../../../components/CircularProgress";
import { studentDetails } from "..";

// Assets
import { CiSaveDown2 } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import styles from '../addStudent.module.css';

interface Props {
    handleModalClick: () => void
};

export default function AddModule({ handleModalClick }: Props) {

    const [students, setStudents] = useState<studentDetails[]>([]);
    const csvFile = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(1);

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
            reader.onload = function (e) {
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

    const handleAdd = async () => {
        if (students.length === 0) {
            toast.error('No students to add');
            return;
        }

        setLoading(true);

        let hasErred = false;
        let errCount = 0;

        for (let i = 0; i < students.length; i++) {
            const student = {
                userName: students[i].user_name,
                roll_no: students[i].roll_number,
                email: students[i].email,
                password: students[i].email.split('@')[0],
                role: 'student'
            }

            await addStudents(student)
                .then(() => {
                    const calculatedProgress = ((i + 1) / students.length) * 100;
                    const roundedProgress = Math.round(calculatedProgress);
                    const progressValue = Math.min(100, Math.max(1, roundedProgress));
                    setProgress(progressValue);
                })
                .catch(error => {
                    const calculatedProgress = ((i + 1) / students.length) * 100;
                    const roundedProgress = Math.round(calculatedProgress);
                    const progressValue = Math.min(100, Math.max(1, roundedProgress));
                    setProgress(progressValue);
                    toast.error(error.response.data.message);

                    errCount++;
                    hasErred = true;
                });
        }

        if (hasErred) {
            toast.info(`Out of ${students.length} Students only ${students.length - errCount} were inserted, Contact System Admin to resolve the issue.`);
        } else {
            toast.success(`Added ${students.length} student(s).`);
        }

        setTimeout(() => {
            setLoading(false);
            setStudents([]);
        }, 1000);
    }

    return (
        <div>
            <div className={styles.children_container}>
                <Manual students={students} setStudents={setStudents} />
            </div>

            <div className={styles.button_container}>
                <div className={styles.functional_btn}>
                    <button onClick={handleAdd} className={styles.add_btn}>Add</button>
                    <button onClick={handleModalClick} className={styles.cancel_btn}>Cancel</button>
                    <button onClick={() => setStudents([])} className={styles.clear_btn}>Clear</button>
                </div>
                <div className={styles.csv_btn}>
                    <button onClick={downloadCSVTemplate} className={styles.download_btn} title="Download CSV template"><CiSaveDown2 /></button>
                    <button onClick={handleUploadBtnClick} className={styles.upload_btn} title="Upload filled CSV file"><CiSaveUp2 /></button>
                </div>
            </div>
            <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={csvFile}
                onChange={handleCSVChange}
            />
            {loading && <div className={styles.loading} onClick={() => setLoading(false)}>
                <ProgressBar progress={progress} label={""} indicatorColor={"#1db954"} />
            </div>}
        </div>
    )

};
