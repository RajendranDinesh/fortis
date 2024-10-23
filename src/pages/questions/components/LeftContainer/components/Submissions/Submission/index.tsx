import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { CiCircleChevLeft } from "react-icons/ci";

import { addHours } from '../../../../../../../utils';
import styles from '../submission.module.css';
import OurEditor from "../../../../../../components/Editor";

import { SubmissionContext } from '../../../../../submissionContext';
import { Request } from '../../../../../../../networking';
import { programmingLanguages } from '../../../../../../components/Editor';

interface TestCase {
    time: number;
    memory: number;
    status: { description: string };
}

export default function Submission() {

    const { currentSubmissionId, changeActiveSubmissionTab } = useContext(SubmissionContext);

    const [code, setCode] = useState<string | undefined>();

    const [lang, setLang] = useState<string>('python');

    const [submissions, setSubmissions] = useState<TestCase[] | null>(null);

    const [created, setCreated] = useState<string>('');

    const [status, setStatus] = useState<string>('Loading..');

    const calculateStatus = (submissions: TestCase[]) => {
        let status = 'Accepted';
        for (let i = 0; i < submissions.length; i++) {
            if (submissions[i].status.description !== 'Accepted') {
                status = submissions[i].status.description;
                break;
            }
        }
        setStatus(status);
    }

    useEffect(() => {
        const getSumbission = async () => {
            try {
                if (currentSubmissionId !== null && currentSubmissionId !== undefined) {
                    const response = await Request("GET", "/submission/id/" + currentSubmissionId);
                    if (response.status === 200) {
                        const data = await response.data.submissions;
                        
                        const langId = response.data.language_id;
                        const code = response.data.source_code;
                        const createdAt = response.data.created_at;
    
                        setCreated(addHours(new Date(createdAt), 5.5).toLocaleString());
                        setCode(atob(code));
                        calculateStatus(data);
                        setSubmissions(data);
    
                        setLang(programmingLanguages.find((lan) => lan.id === langId)?.value.toString() || "")
                    }
                }
            } catch (error) {
                toast.error("Failed to fetch submission");
            }
        }

        getSumbission();
    }, [currentSubmissionId]);

    return (
        <div className={styles.submission}>
            <div>
                <div className={styles.header} onClick={() => changeActiveSubmissionTab('Table')}>
                    <button className={styles.back_btn}><CiCircleChevLeft /></button>
                    <span>All Submission</span>
                </div>
                <hr />
            </div>

            <div className={styles.status}>
                <span className={styles.text}>{status}</span>
                <span>submitted at {created}</span>
            </div>

            <div className={styles.output_table}>
                <table>
                    <thead>
                        <tr>
                            <th>Test Case Id</th>
                            <th>Time</th>
                            <th>Memory</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions?.map((submission, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{submission.time}</td>
                                    <td>{submission.memory}</td>
                                    <td>{submission.status.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className={styles.editor_container}>
                <OurEditor value={code} onChange={setCode} lang={lang} readOnly />
            </div>
        </div>
    )
}