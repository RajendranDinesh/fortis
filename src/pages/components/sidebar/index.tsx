import { CiMenuBurger } from "react-icons/ci";
import styles from './sidebar.module.css';
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    }

    return (
    <div className={styles.sidebar} style={!isOpen ? {"left": "-100%"} : {}}>
        <div className={styles.header}>
            <h1>Logo</h1>
            <CiMenuBurger className={styles.menu} onClick={handleMenuClick}/>
        </div>
    </div>
    );
}

export default Sidebar;