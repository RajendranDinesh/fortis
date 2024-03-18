import React, { MouseEventHandler } from 'react';
import styles from './modal.module.css';
import { IoIosCloseCircle } from "react-icons/io";

interface ModalType {
    isOpen: boolean
    onClose: MouseEventHandler
    children: JSX.Element
    backgroundColor?: string
    title?: string
    bgOpacity?: number
    height?: string
    width?: string
}

function Modal({
    isOpen, onClose,
    children, title,
    bgOpacity = 0.5,
    backgroundColor = "#212121",
    height = "60vh", width = "50vw"
}: ModalType) {
  
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.top_container} style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }} onClick={onClose}>
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