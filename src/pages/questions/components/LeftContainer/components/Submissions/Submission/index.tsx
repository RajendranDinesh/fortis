import { CiCircleChevLeft } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { CiMicrochip } from "react-icons/ci";

import styles from '../submission.module.css';
import OurEditor from "../../../../../../components/Editor";
import { useState } from "react";

export default function Submission({
    currentSubmissionId,
    setCurrentActiveTab
}: {
    currentSubmissionId: number | null,
    setCurrentActiveTab: (arg0: 'Table' | 'Submission') => void
}) {

    const [code, setCode] = useState<string | undefined>();

    const [lang, setLang] = useState<string>('python');
    return (
        <div className={styles.submission}>
            <div>
                <div className={styles.header} onClick={() => setCurrentActiveTab('Table')}>
                    <button className={styles.back_btn}><CiCircleChevLeft /></button>
                    <span>All Submission</span>
                </div>
                <hr />
            </div>

            <div className={styles.status}>
                <span className={styles.text}>Accepted</span>
                <span>submitted at Mar 19, 2024 20:22</span>
            </div>

            <div className={styles.timeframe_container}>
                <div className={styles.runtime_container}>
                    <h4><CiClock1 />Runtime</h4>
                    <h3><span>365</span> ms</h3>
                </div>

                <div className={styles.memory_container}>
                    <h4><CiMicrochip /> Memory</h4>
                    <h3><span>17.24</span> MB</h3>
                </div>
            </div>

            <div className={styles.editor_container}>
                <OurEditor value={code} onChange={setCode} lang={lang} readOnly />
            </div>
        </div>
    )
}