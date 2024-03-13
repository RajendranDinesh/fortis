import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './compiler.module.css';
import RightContainer from "./components/RightContainer";
import LeftContainer from './components/LeftContainer';

import { getQuestionsMetadata } from './components/LeftContainer/components/controllers';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

const Questions = () => {
    document.title = 'Questions | CodeX';

    const { testId } = useParams();

    const [questionPaneData, setQuestionPaneData] = useState({
        startTime: new Date(),
        endTime: new Date(),
        questions: [{
            id: 1,
            status: "not_viewed",
            type_name: "MCQ"
        }]
    });

    const getSetQuestionPaneData = async () => {
        try {
            const id = String(testId);
            const response = await getQuestionsMetadata(id);

            if (response.status === 200) {
                let data = response.data;

                data.startTime = new Date(data.startTime);
                data.endTime = new Date(data.endTime);

                setQuestionPaneData(data);
            } else {
                throw new Error("Failed to fetch questions metadata");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch questions metadata", {
                position: "top-right",
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);

    const handleInfoModal = () => {
        getSetQuestionPaneData();
        setIsInfoModalOpen(false);
    }

    return (
        <div className={styles.page_container}>

            {/* Left Container */}
            <div className={styles.left_container}>
                <LeftContainer questionPaneData={questionPaneData} setQuestionPaneData={setQuestionPaneData} />
            </div>

            {/* Right Container */}
            <div className={styles.right_container}>
                <RightContainer />
            </div>

            <Modal isOpen={isInfoModalOpen} onClose={() => { }}>
                <div>
                    <h1>Instructions</h1>
                    <div className={styles.bottom_row}>
                        <div className={styles.instruction_pane}>

                            <div className={styles.instruction}>
                                <div className={styles.question} style={{ borderColor: "red" }}>
                                    <span>1</span>
                                </div>
                                <span>Question error</span>
                            </div>

                            <div className={styles.instruction}>
                                <div className={styles.question} style={{ borderColor: "green" }}>
                                    <span>2</span>
                                </div>
                                <span>Question attempted</span>
                            </div>

                            <div className={styles.instruction}>
                                <div className={styles.question} style={{ borderColor: "blue" }}>
                                    <span>3</span>
                                </div>
                                <span>Question not viewed</span>
                            </div>

                            <div className={styles.instruction}>
                                <div className={styles.question} style={{ borderColor: "yellow" }}>
                                    <span>4</span>
                                </div>
                                <span>Question not attempted</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleInfoModal}>Less goo!</button>
                </div>
            </Modal>
        </div>
    );
};

export default Questions;