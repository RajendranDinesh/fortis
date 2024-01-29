import Sidebar from '../sidebar';
import styles from './layout.module.css';

const Layout = ({ children }: any) => {
    return (
        <div className={styles.home}>
            <Sidebar />
            {children}
        </div>
    );
}

export default Layout;