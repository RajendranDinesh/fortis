import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//Styles

import styles from './Tests.module.css';

//Assets

import { IoIosAddCircle } from 'react-icons/io';

//Components

import AddMCQ from './addMCQ';

function Test() {

    const navigate = useNavigate();

    const [isMCQModalOpen, setMCQModalOpen] = useState(false);

    const handleMCQModalClick = () => {
        setMCQModalOpen(false);
    }

    const handleAddQuestion = () => {
        Swal.fire({
            title: 'Select Question Type',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `MCQ`,
            denyButtonText: `Programming`,
            cancelButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                setMCQModalOpen(!isMCQModalOpen);
            } else if (result.isDenied) {
                navigate('/staff/test/programming');
            }
        })
    };

    return (
        <div className={styles.Test_whole_container}>
            <div className={styles.Test_header_container}>
                <div className={styles.Test_header_title_container}>
                    <h1>Test Title Goes Here</h1>
                </div>
                <div className={styles.Test_header_description_container}>
                    <p>Test Description Goes Here</p>
                </div>
            </div>
            <div className={styles.Test_button_container}>
                <IoIosAddCircle className={styles.Test_add_question_button} onClick={handleAddQuestion} />
            </div>
            <div className={styles.Test_question_container}>
                <div className={styles.Test_question_table_title_grid}>
                    <h1>Sl.No</h1>
                    <h1>Question Title</h1>
                    <h1>Question Type</h1>
                    <h1>Duration (in min)</h1>
                </div>

                {/* Map through the questions and display them here */}

                <div className={styles.Test_question_grid}>
                    <h1>01</h1>
                    <h1>Question Title Goes Here</h1>
                    <h1>Question Type Goes Here</h1>
                    <h1>Duration Goes Here</h1>
                </div>
            </div>
            <AddMCQ modalOpen={isMCQModalOpen} handleModalClick={handleMCQModalClick} />
        </div>
    )
}

export default Test;