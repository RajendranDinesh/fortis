import { useState } from 'react';

import Modal from "../../../components/Modal";
import AddModule from './addModule';

import styles from './addStudent.module.css';
import BlockModule from './blockModule';
import UnBlockModule from './unBlockModule';

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

export interface studentDetails {
    user_name: string;
    roll_number: string;
    email: string;
}

export default function AddStudentModal({ modalOpen, handleModalClick }: Props) {

    const [activeTab, setActiveTab] = useState<string>('view');

    return (
        <Modal isOpen={modalOpen} onClose={handleModalClick}>
            <div className={styles.top_container}>
                <div className={styles.tab_container}>
                    <div>
                        <button
                            onClick={() => setActiveTab('view')}
                            className={activeTab === 'view' ? styles.active_tab : ""}
                        >View</button>
                    </div>
                    <div>
                        <button
                            onClick={() => setActiveTab('add')}
                            className={activeTab === 'add' ? styles.active_tab : ""}
                        >Add</button>
                    </div>
                    <div>
                        <button
                            onClick={() => setActiveTab('blockMenu')}
                            className={activeTab === 'blockMenu' ? styles.active_tab : ""}
                        >Block</button>
                    </div>
                    <div>
                        <button
                            onClick={() => setActiveTab('blocked')}
                            className={activeTab === 'blocked' ? styles.active_tab : ""}
                        >Blocked Students</button>
                    </div>
                </div>
                <div>
                    {/* {activeTab === 'view' && <ViewModule />} */}
                    {activeTab === 'add' && <AddModule handleModalClick={handleModalClick} />}
                    {activeTab === 'blockMenu' && <BlockModule />}
                    {activeTab === 'blocked' && <UnBlockModule />}
                </div>
            </div>
        </Modal>
    );
}