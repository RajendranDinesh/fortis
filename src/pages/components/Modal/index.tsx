import { MouseEventHandler } from 'react';
import styles from './modal.module.css';
import { IoIosCloseCircle } from "react-icons/io";

interface ModalType {
    isOpen: boolean
    onClose: MouseEventHandler
    children: JSX.Element
    title: string
}

function Modal({isOpen, onClose, children, title}: ModalType) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.top_container}>
            <div className={styles.children_container}>
                <div className={styles.title_container}>
                    <h1>{title}</h1>
                    <IoIosCloseCircle onClick={onClose} style={{fontSize: "2em", cursor: "pointer"}} />
                </div>
                <div className={styles.modal_body}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;