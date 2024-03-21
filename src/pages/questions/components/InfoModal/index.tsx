import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '../../../components/Modal';
import styles from './info.module.css';

import { QuestionPaneDataContext } from '../../questionContext';

interface Props {
    isInfoModalOpen: boolean;
    handleInfoModal: () => void;
}

export default function InfoModal({
    isInfoModalOpen,
    handleInfoModal
}: Props) {

    const { classroomTestId } = useParams();

    const { getSetQuestionPaneData } = useContext(QuestionPaneDataContext);

    const getQuestionPaneData = async () => {
        if (classroomTestId) getSetQuestionPaneData(classroomTestId);
    }

    const handleCloseInfoModal = () => {
        getQuestionPaneData();
        handleInfoModal();
    }

    return (
        <Modal isOpen={isInfoModalOpen} onClose={() => {}}>
            <div className={styles.container}>
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
                <button onClick={handleCloseInfoModal}>Lets goo!</button>
            </div>
        </Modal>
    );
}