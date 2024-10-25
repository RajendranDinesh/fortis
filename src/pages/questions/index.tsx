import { useEffect, useLayoutEffect, useState } from 'react';

import styles from './compiler.module.css';
import RightContainer from "./components/RightContainer";
import LeftContainer from './components/LeftContainer';

import { QuestionPaneDataProvider } from './questionContext';
import { AnswerDataProvider } from './answerContext';
import { SubmissionProvider } from './submissionContext';
import { LeftContainerProvider } from './components/LeftContainer/context';

import InfoModal from './components/InfoModal';

function Questions() {
    document.title = 'Questions | Consus';

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);

    const handleInfoModalClose = () => {
        setIsInfoModalOpen(false);
    }

    useEffect(() => {
        const handleKeyboardEvent = (event: KeyboardEvent) => {

            if (event.key === "F11") {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "C") || (event.ctrlKey && event.key === "c")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "V") || (event.ctrlKey && event.key === "v")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "X") || (event.ctrlKey && event.key === "x")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.shiftKey && event.key === "i")) {
                event.preventDefault();
                return;
            }
        };

        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyboardEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyboardEvent);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useLayoutEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log('visible');
            } else {
                console.log('hidden');
            }
        };

        const onFullScreenChange = () => {
            document.documentElement.requestFullscreen();
        };

        document.addEventListener('visibilitychange', onVisibilityChange);
        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        };
    });

    return (
        <div className={styles.page_container}>

            <QuestionPaneDataProvider>
                <AnswerDataProvider>
                    <SubmissionProvider>
                        <LeftContainerProvider>
                            {/* Left Container */}
                            <div className={styles.left_container}>
                                <LeftContainer />
                            </div>

                            {/* Right Container */}
                            <div className={styles.right_container}>
                                <RightContainer />
                            </div>

                            <InfoModal isInfoModalOpen={isInfoModalOpen} handleInfoModal={handleInfoModalClose} />
                        </LeftContainerProvider>
                    </SubmissionProvider>
                </AnswerDataProvider>
            </QuestionPaneDataProvider>

        </div >
    );
};

export default Questions;
