import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabList, TabContext } from "@mui/lab";
import Modal from "../../../components/Modal";
import { useState } from "react";
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import styles from "../Classroom.module.css";
import { addStudents } from "../Controllers";
import { useParams } from "react-router-dom";

interface studentModalProps {
    isOpen: boolean
    onClose: () => void
    setModalOpen: (value: boolean) => void
}

export default function AddStudentModal({
    isOpen,
    onClose,
    setModalOpen,
}: studentModalProps) {
    const { id } = useParams();

    const [tabValue, setTabValue] = useState("Mail");
    const [students, setDetails] = useState<{ user_name: string, roll_number: string, email: string }[]>([]);
    const [fileName, setFileName] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [rollNumberInput, setRollNumberInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const downloadCSVTemplate = () => {
        const template = [
            ['email', 'roll_no', 'user_name'], // headers
            ['example@bitsathy.ac.in', '<12345>ex123', 'Example'] // example row
        ];
        const csvString = template.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'template.csv');
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault();
            const user_name = nameInput.trim();
            const roll_number = rollNumberInput.trim();
            const email = emailInput.trim();
            const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/; // Regex for email validation
            if (user_name && roll_number && (email && emailRegex.test(email))) {
                if (students.some(student => student.email === email)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mail ID already exists!",
                    });
                } else {
                    setDetails([...students, { user_name, roll_number, email }]);
                    setNameInput('');
                    setRollNumberInput('');
                    setEmailInput('');
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Enter mail ID that ends with @bitsathy.ac.in",
                });;
            }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target?.result as string;
                const result = Papa.parse(contents, { header: true });
                const data = result.data.map((row: any) => ({
                    email: row['email'], // use the exact column header from your CSV file
                    roll_number: row['roll_no'], // use the exact column header from your CSV file
                    user_name: row['user_name'] // use the exact column header from your CSV file
                }));
                setDetails(data);
            };
            reader.readAsText(file);
        }
    };

    const handleStudentEmailClick = (email: string) => {
        setDetails(students.filter(student => student.email !== email));
    };

    const handleAddClick = async () => {
        try {
            const classRoomId = Number(id);
            const data = await addStudents(classRoomId, students);

            if (data.details.failedToAdd.length === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Students added successfully",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Somethings off",
                    text: `${data.details.failedToAdd.map((reason: any) => JSON.stringify(reason))}`
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        setModalOpen(!isOpen);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Students">
            <div className={styles.Student_modal_content}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="By Mail" value="Mail" style={{ fontSize: "1.2em" }} />
                                <Tab label="By CSV" value="CSV" style={{ fontSize: "1.2em" }} />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                {tabValue === "Mail" &&
                    <div className={styles.Student_modal_reciever_container}>
                        <div className={styles.Student_modal_input_fields}>
                            <div className={styles.input_wrapper}>
                                <input
                                    className={styles.input_box}
                                    type="text"
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type name..."
                                />
                                <span className={styles.underline}></span>
                            </div>
                            <div className={styles.input_wrapper}>
                                <input
                                    className={styles.input_box}
                                    type="text"
                                    value={rollNumberInput}
                                    onChange={e => setRollNumberInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type roll number..."
                                />
                                <span className={styles.underline}></span>
                            </div>
                            <div className={styles.input_wrapper}>
                                <input
                                    className={styles.input_box}
                                    type="text"
                                    value={emailInput}
                                    onChange={e => setEmailInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type email and press comma..."
                                />
                                <span className={styles.underline}></span>
                            </div>
                        </div>
                        <div className={styles.Student_modal_mail_list}>
                            {students.map(student => (
                                <div className={styles.Student_mail_display} key={student.email} onClick={() => handleStudentEmailClick(student.email)}>
                                    {student.user_name} ({student.roll_number}, {student.email})
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {tabValue === "CSV" &&
                    <div className={styles.Student_modal_reciever_container}>
                        <div className={styles.Student_download_container}>
                            <button className={styles.Btn} onClick={downloadCSVTemplate}>
                                <svg className={styles.svgIcon} viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                                <span className={styles.icon2}></span>
                                <span className={styles.tooltip}>CSV Template</span>
                            </button>
                        </div>
                        <label className={styles.custum_file_upload} htmlFor="file">
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                            </div>
                            <div className={styles.text}>
                                <span>
                                    {fileName ? fileName : "Click to upload CSV"}
                                </span>
                            </div>
                            <input type="file" id="file" accept=".csv" onChange={handleFileUpload} />
                        </label>
                    </div>
                }
                <div className={styles.Student_modal_button_container}>
                    <div className={styles.Student_add_button} onClick={handleAddClick}>Add</div>
                    <div className={styles.Student_cancel_button} onClick={onClose}>Cancel</div>
                </div>
            </div>
        </Modal>
    );
}
