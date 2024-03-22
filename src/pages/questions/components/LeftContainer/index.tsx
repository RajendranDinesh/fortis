import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuestionPaneDataContext, questionDataPayload } from '../../questionContext';
import { LeftContainerContext } from './context';

import Description from './components/Description';
import QuestionsPane from './components/Questions';
import Submissions from './components/Submissions';
import CompletedModal from '../CompletedModal';

import styles from './left.module.css';

const LeftContainer = () => {

    const [activeTab, setActiveTab] = useState(0);

    const [isFinished, setIsFinished] = useState(false);

    const navigate = useNavigate();

    const tabContent = [
        {
            id: 0,
            name: 'Questions',
            content: <QuestionsPane setIsFinished={setIsFinished} isFinished={isFinished}/>
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

    const { questionPaneData } = useContext(QuestionPaneDataContext) as questionDataPayload;

    const { changeActiveTab, currentActiveTab } = useContext(LeftContainerContext);

    const handleTabChange = (tabId: number) => {
        setActiveTab(tabId);
        const tab = tabContent.find(tab => tab.id === tabId);
        changeActiveTab(tab?.name as "Questions" | "Description" | "Submissions");
    }

    useEffect(() => {
        const updateProgress = () => {
            const endTime = questionPaneData?.endTime;

            if (!endTime) {
                return;
            }

            const now = new Date();
            const remainingTime = endTime.getTime() - now.getTime();

            if (remainingTime <= -100000) {
                navigate('/');
            } else if (remainingTime <= 0) {
                setIsFinished(true);
                return;
            }
        };

        const progressInterval = setInterval(updateProgress, 1000);

        return () => {
            clearInterval(progressInterval);
        };
    }, [questionPaneData]);

    useEffect(() => {
        const tab = tabContent.find((tab) => tab.name === currentActiveTab);
        setActiveTab(tab?.id as number);
        
    }, [currentActiveTab]);

    return (
        <>
            <div className={styles.top_container}>
                {tabContent.map((tab) =>
                    <div key={tab.id}>
                        <button
                            className={activeTab === tab.id ? styles.active_tab : ""}
                            onClick={() => handleTabChange(tab.id)}
                        >{tab.name}</button>
                    </div>)}
            </div>

            <div className={styles.middle_container}>
                {tabContent.map((tab) => activeTab === tab.id && (<div key={tab.id}>{tab.content}</div>))}
            </div>

            <div className={styles.bottom_container}>
                Copyright ©️ 2023-2024 Consus
            </div>

            <CompletedModal isFinished={isFinished} setIsFinished={setIsFinished} />
        </>
    );
}

export default LeftContainer;