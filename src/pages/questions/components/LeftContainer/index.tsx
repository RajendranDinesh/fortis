import { useState, useContext, useEffect } from 'react';

import { QuestionPaneDataContext, questionDataPayload } from '../../context';

import Description from './components/Description';
import QuestionsPane from './components/Questions';
import Submissions from './components/Submissions';
import CompletedModal from '../CompletedModal';

import styles from './left.module.css';

const LeftContainer = () => {

    const [activeTab, setActiveTab] = useState(0);

    const tabContent = [
        {
            id: 0,
            name: 'Questions',
            content: <QuestionsPane />
        },
        {
            id: 1,
            name: 'Description',
            content: <Description />
        },
        {
            id: 2,
            name: 'Submissions',
            content: <Submissions />
        }
    ];


    const [isFinished, setIsFinished] = useState(false);

    const { questionPaneData } = useContext(QuestionPaneDataContext) as questionDataPayload;

    useEffect(() => {
        const updateProgress = () => {
            const endTime = questionPaneData.endTime;

            const now = new Date();
            const remainingTime = endTime.getTime() - now.getTime();

            if (remainingTime <= 0) {
                setIsFinished(true);
                return;
            }

            setIsFinished(false);
        };

        const progressInterval = setInterval(updateProgress, 1000);

        return () => {
            clearInterval(progressInterval);
        };
    }, [questionPaneData]);

    return (
        <>
            <div className={styles.top_container}>
                {tabContent.map((tab) =>
                    <div key={tab.id}>
                        <button
                            className={activeTab === tab.id ? styles.active_tab : ""}
                            onClick={() => setActiveTab(tab.id)}
                        >{tab.name}</button>
                    </div>)}
            </div>

            <div className={styles.middle_container}>
                {tabContent.map((tab) => activeTab === tab.id && (<div key={tab.id}>{tab.content}</div>))}
            </div>

            <div className={styles.bottom_container}>
                Copyright ©️ 2023 HexaVert
            </div>

            <CompletedModal isFinished={isFinished} />
        </>
    );
}

export default LeftContainer;