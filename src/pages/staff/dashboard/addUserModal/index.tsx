// Dependencies

import React from 'react';
import Box from '@mui/material/Box';
import Modal from "../../../components/Modal";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from "react-toastify";
import { HttpStatusCode } from 'axios';
import { Request } from '../../../../networking';

// Styles

import styles from "../StaffDashboard.module.css";

interface Props {
    modelOpen: boolean
    handleModalClick: () => void
    getClassrooms: () => void
}

export default function AddClassroomModal({ modelOpen, handleModalClick, getClassrooms }: Props) {
    const [classroomName, setClassroomName] = React.useState("");
    const [classroomDescription, setClassroomDescription] = React.useState("");

    const handleClassroomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomName(event.target.value);
    };

    const handleClassroomDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomDescription(event.target.value);
    };

    const handleAddClassroom = async () => {
        try {
            const response = await Request(
                "POST",
                "/classroom/create",
                {
                    "name": classroomName,
                    "description": classroomDescription
                });
            
            if (response.status === HttpStatusCode.Created) {
                toast.success(response.data.message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                getClassrooms();
                handleModalClick();
            }
        } catch (error) {
            alert(error);
        }
    }

    return(
        <>
            <Modal isOpen={modelOpen} onClose={handleModalClick} title="Add Classroom">
                <div className={styles.Modal_content}>
                    <Box
                    display={"flex"}
                    flexDirection={"column"}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '40ch' },
                    }}
                    autoComplete="off"
                    >
                        <TextField
                            required
                            id={styles.text_field}
                            label="Classroom Name"
                            variant="standard"
                            onChange={handleClassroomNameChange}
                        />
                        <TextField 
                            id={styles.text_field} 
                            label="Description (optional)" 
                            variant="standard"
                            onChange={handleClassroomDescriptionChange} 
                        />
                    </Box>
                    <div className={styles.Modal_buttons}>
                        <button className={styles.save_button} onClick={handleAddClassroom}>
                            <span>Add</span>
                        </button>
                        <button className={styles.cancel_button} onClick={handleModalClick}>
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </>
    )
}