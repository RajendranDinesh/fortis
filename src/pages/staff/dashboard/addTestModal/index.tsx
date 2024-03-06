// Dependencies

import React from 'react';
import Box from '@mui/material/Box';
import Modal from "../../../components/Modal";
import TextField from '@mui/material/TextField';

// Styles

import styles from "../StaffDashboard.module.css";

interface Props {
    modelTestsOpen: boolean
    handleTestsModalClick: () => void
}

export default function AddTestsModal({ modelTestsOpen, handleTestsModalClick }: Props) {
    const [testName, setTestName] = React.useState("");
    const [testDescription, setTestDescription] = React.useState("");
    const [testDuration, setTestDuration] = React.useState("");

    const handleTestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestName(event.target.value);
    };

    const handleTestDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestDescription(event.target.value);
    };

    const handleTestDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestDuration(event.target.value);
    };

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
                            label="Classroom Name"
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
                        <button className={styles.save_button}>
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
