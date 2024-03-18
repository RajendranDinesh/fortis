import { useState } from 'react';

import styles from './compiler.module.css';
import RightContainer from "./components/RightContainer";
import LeftContainer from './components/LeftContainer';

import { QuestionPaneDataProvider } from './questionContext';
import { AnswerDataProvider } from './answerContext';
import InfoModal from './components/InfoModal';

const Questions = () => {
    document.title = 'Questions | CodeX';

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);

    const handleInfoModalClose = () => {
        setIsInfoModalOpen(false);
    }

    return (
        <div className={styles.page_container}>

            <QuestionPaneDataProvider>
                <AnswerDataProvider>
                    {/* Left Container */}
                    <div className={styles.left_container}>
                        <LeftContainer />
                    </div>

                    {/* Right Container */}
                    <div className={styles.right_container}>
                        <RightContainer />
                    </div>

                    <InfoModal isInfoModalOpen={isInfoModalOpen} handleInfoModal={handleInfoModalClose} />
                </AnswerDataProvider>
            </QuestionPaneDataProvider>

        </div >
    );
};

export default Questions;