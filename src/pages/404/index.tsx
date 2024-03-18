import styles from './notfound.module.css';

export default function NotFoundPage() {
    return (
        <section className={styles.page_404}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col_sm_12}>
                        <div className={`${styles.col_sm_10} ${styles.col_sm_offset_1}  ${styles.text_center}`}>
                            <div className={styles.four_zero_four_bg}>
                                <h1 className={styles.text_center}>404</h1>
                            </div>

                            <div className={styles.contant_box_404}>
                                <h3 className={styles.h2}>
                                    Look like you're lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <a href="/" className={styles.link_404}>Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}