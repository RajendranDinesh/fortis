// Dependencies

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from "../../../components/Modal";
import TextField from '@mui/material/TextField';

// Styles

import styles from "../StaffDashboard.module.css";
import { Request } from '../../../../networking';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

interface Props {
    modelTestsOpen: boolean
    handleTestsModalClick: () => void
    getTests: () => void
}

export default function AddTestsModal({ modelTestsOpen, handleTestsModalClick, getTests }: Props) {
    const [testName, setTestName] = useState("");
    const [testDescription, setTestDescription] = useState("");
    const [testDuration, setTestDuration] = useState("");

    const handleTestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestName(event.target.value);
    };

    const handleTestDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestDescription(event.target.value);
    };

    const handleTestDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestDuration(event.target.value);
    };

    const handleAddTest = async () => {
        try {
            const response = await Request(
                "POST",
                "/test/create",
                {
                    "title": testName,
                    "description": testDescription,
                    "duration_in_minutes": testDuration
                });
            
            if (response.status === HttpStatusCode.Created) {
                toast.success(response.data.message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                handleTestsModalClick();
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        } finally {
            getTests();
        }
    }

    return(
        <>
            <Modal isOpen={modelTestsOpen} onClose={handleTestsModalClick} title="Add Tests">
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
                            label="Test Name"
                            variant="standard"
                            onChange={handleTestNameChange}
                        />
                        <TextField 
                            id={styles.text_field} 
                            label="Description (optional)" 
                            variant="standard"
                            onChange={handleTestDescriptionChange} 
                        />
                        <TextField
                            required
                            id={styles.text_field}
                            label="Test Duration (in minutes)"
                            variant="standard"
                            onChange={handleTestDurationChange}
                        />
                    </Box>
                    <div className={styles.Modal_buttons}>
                        <button onClick={handleAddTest} className={styles.save_button}>
                            <span>Add</span>
                        </button>
                        <button onClick={handleTestsModalClick} className={styles.cancel_button}>
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
