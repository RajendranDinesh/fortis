import React, { MouseEventHandler } from 'react';
import styles from './modal.module.css';
import { IoIosCloseCircle } from "react-icons/io";

interface ModalType {
    isOpen: boolean
    onClose: MouseEventHandler
    children: JSX.Element
    backgroundColor?: string
    title?: string
    height?: string
    width?: string
}

function Modal({ isOpen, onClose, children, title, height = "60vh", width = "50vw", backgroundColor = "#212121" }: ModalType) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.top_container} onClick={onClose}>
            <div
                className={styles.children_container}
                style={{
                    "--height": height,
                    "--width": width,
                    backgroundColor: backgroundColor
                } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}
            >
                {title && <div className={styles.title_container}>
                    <h1>{title}</h1>
                    <IoIosCloseCircle onClick={onClose} style={{ fontSize: "2em", cursor: "pointer" }} />
                </div>}
                <div className={styles.modal_body}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;