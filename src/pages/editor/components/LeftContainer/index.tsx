import { useState } from 'react';

import Description from './components/Description';
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
                    >Description</button>
                </div>
                <div>
                    <button
                        className={ activeTab === 1 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(1)}
                    >Solution</button>
                </div>
                <div>
                    <button
                        className={ activeTab === 2 ? styles.active_tab : "" }
                        onClick={() => setActiveTab(2)}
                    >Submissions</button>
                </div>
            </div>

            <div className={styles.middle_container}>
                <div>
                    { activeTab === 0 && <Description /> }
                    { activeTab === 1 && <Solution /> }
                    { activeTab === 2 && <Submissions /> }
                </div>
            </div>

            <div className={styles.bottom_container}>
                Copyright ©️ 2023 HexaVert
            </div>
        </>
    );
}

export default LeftContainer;