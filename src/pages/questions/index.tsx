import styles from './compiler.module.css';
import RightContainer from "./components/RightContainer";
import LeftContainer from './components/LeftContainer';

const Questions = () => {
    document.title = 'Questions | CodeX';

    return (
        <div className={styles.page_container}>

            {/* Left Container */}
            <div className={styles.left_container}>
                <LeftContainer />
            </div>

            {/* Right Container */}
            <div className={styles.right_container}>
                <RightContainer />
            </div>
        </div>
    );
};

export default Questions;