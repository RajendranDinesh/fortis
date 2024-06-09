// Dependencies
import { useState } from 'react';

// Styles
import styles from './addStaffModal.module.css';

// Components
import Modal from "../../../components/Modal";
import AddModule from './addModule';
import ViewModule from './viewModule';

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

export interface staffDetails {
    email: string
    userName: string
    roll_no: string
    password: string
    role: string
}

export default function AddStaffModal({ modalOpen, handleModalClick }: Props) {

    const [activeTab, setActiveTab] = useState<string>('view');

    return(
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
                </div>
                <div>
                    {activeTab === 'view' && <ViewModule />}
                    {activeTab === 'add' && <AddModule handleModalClick={handleModalClick} />}
                </div>
            </div>
        </Modal>
    );
}