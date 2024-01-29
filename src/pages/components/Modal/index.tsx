import { MouseEventHandler } from 'react';
import styles from './modal.module.css';

interface ModalType {
    isOpen: boolean
    onClose: MouseEventHandler
    children: JSX.Element
}

function Modal({isOpen, onClose, children}: ModalType) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.top_container}>
            <div className={styles.children_container}>
                <div className={styles.title_container}>
                    <h1>Title</h1>
                    <h1 onClick={onClose}>x</h1>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;