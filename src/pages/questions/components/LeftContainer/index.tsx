import { useState } from 'react';

import Description from './components/Description';
import QuestionsPane from './components/Questions';
import Submissions from './components/Submissions';
import Solution from './components/Solution';

import styles from './left.module.css';

const LeftContainer = () => {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className={styles.top_container}>
                <div>
                    <button
                        className={ activeTab === 0 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(0)}
                    >Questions</button>
                </div>
                <div>
                    <button
                        className={ activeTab === 1 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(1)}
                    >Description</button>
                </div>
                <div>
                    <button
                        className={ activeTab === 2 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(2)}
                    >Solution</button>
                </div>
                <div>
                    <button
                        className={ activeTab === 3 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(3)}
                    >Submissions</button>
                </div>
            </div>

            <div className={styles.middle_container}>
                <div>
                    { activeTab === 0 && <QuestionsPane /> }
                    { activeTab === 1 && <Description /> }
                    { activeTab === 2 && <Solution /> }
                    { activeTab === 3 && <Submissions /> }
                </div>
            </div>

            <div className={styles.bottom_container}>
                Copyright ©️ 2023 HexaVert
            </div>
        </>
    );
}

export default LeftContainer;