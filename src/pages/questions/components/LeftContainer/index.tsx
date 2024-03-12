import { useState } from 'react';

import Description from './components/Description';
import QuestionsPane from './components/Questions';
import Submissions from './components/Submissions';

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
                <div>
                    {tabContent.map((tab) => activeTab === tab.id && tab.content)}
                </div>
            </div>

            <div className={styles.bottom_container}>
                Copyright ©️ 2023 HexaVert
            </div>
        </>
    );
}

export default LeftContainer;