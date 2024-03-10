import { useState, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import { TabList, TabContext } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Swal from 'sweetalert2'

import Modal from "../../../components/Modal";
import { addStaff } from "../Controllers";

import styles from "../Classroom.module.css";

interface teacherModalProps {
    isOpen: boolean
    onClose: () => void
    setModalOpen: (value: boolean) => void
}

export default function AddTeacherModal({
    isOpen,
    onClose,
    setModalOpen,
}: teacherModalProps) {
    const { id } = useParams();
    const [teacherNameInput, setTeacherNameInput] = useState('');
    const [teacherFacultyIdInput, setTeacherFacultyIdInput] = useState('');
    const [teacherEmailInput, setTeacherEmailInput] = useState('');
    const [teacherDetails, setTeacherDetails] = useState<{ user_name: string, faculty_id: string, email: string }[]>([]);
    const [testsModalOpen, setTestsModalOpen] = useState(false);

    const handleTeacherKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault();
            const user_name = teacherNameInput.trim();
            const faculty_id = teacherFacultyIdInput.trim();
            const email = teacherEmailInput.trim();
            const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/; // Regex for email validation
            if (user_name && faculty_id && (email && emailRegex.test(email))) {
                if (teacherDetails.some(teacher => teacher.email === email)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mail ID already exists!",
                    });
                } else {
                    setTeacherDetails([...teacherDetails, { user_name, faculty_id, email }]);
                    setTeacherNameInput('');
                    setTeacherFacultyIdInput('');
                    setTeacherEmailInput('');
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

    const handleTeacherEmailClick = (email: string) => {
        setTeacherDetails(teacherDetails.filter(teacher => teacher.email !== email));
    };

    const handleModalClick = () => {
        setTestsModalOpen(!testsModalOpen);
    };

    const handleAddClick = async () => {
        try {
            const classRoomId = Number(id);
            const data = await addStaff(classRoomId, teacherDetails);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: data.message,
            });
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
        <Modal isOpen={isOpen} onClose={onClose} title="Add Teachers">
            <div className={styles.Teacher_modal_content}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={"Mail"}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList aria-label="lab API tabs example">
                                <Tab label="By Mail" value="Mail" style={{ fontSize: "1.2em" }} />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                <div className={styles.Teacher_modal_reciever_container}>
                    <div className={styles.Teacher_modal_input_fields}>
                        <div className={styles.input_wrapper}>
                            <input
                                className={styles.input_box}
                                type="text"
                                value={teacherNameInput}
                                onChange={e => setTeacherNameInput(e.target.value)}
                                onKeyDown={handleTeacherKeyDown}
                                placeholder="Type name..."
                            />
                            <span className={styles.underline}></span>
                        </div>
                        <div className={styles.input_wrapper}>
                            <input
                                className={styles.input_box}
                                type="text"
                                value={teacherFacultyIdInput}
                                onChange={e => setTeacherFacultyIdInput(e.target.value)}
                                onKeyDown={handleTeacherKeyDown}
                                placeholder="Type roll number..."
                            />
                            <span className={styles.underline}></span>
                        </div>
                        <div className={styles.input_wrapper}>
                            <input
                                className={styles.input_box}
                                type="text"
                                value={teacherEmailInput}
                                onChange={e => setTeacherEmailInput(e.target.value)}
                                onKeyDown={handleTeacherKeyDown}
                                placeholder="Type email and press comma..."
                            />
                            <span className={styles.underline}></span>
                        </div>
                    </div>
                    <div className={styles.Teacher_modal_mail_list}>
                        {teacherDetails.map(teacher => (
                            <div className={styles.Teacher_mail_display} key={teacher.email} onClick={() => handleTeacherEmailClick(teacher.email)}>
                                {teacher.user_name} ({teacher.faculty_id}, {teacher.email})
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Teacher_modal_button_container}>
                    <div className={styles.Teacher_add_button} onClick={handleAddClick}>Add</div>
                    <div className={styles.Teacher_cancel_button} onClick={handleModalClick}>Cancel</div>
                </div>
            </div>
        </Modal>
    );
}