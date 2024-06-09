import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Request } from '../../../../../../../networking';
import { programmingLanguages } from '../../../../../../components/Editor';

import styles from '../submission.module.css';

import { QuestionPaneDataContext } from '../../../../../questionContext';

interface SubmissionDetail {
    submission_id: number;
    created_at: string;
    language: number;
    question_id: number;
}

export default function SubmissionTable({
    changeViewToSubmission
}: {
    changeViewToSubmission: (id: number) => void
}) {

    const { classroomTestId } = useParams();

    const [submissions, setSubmissions] = useState<SubmissionDetail[]>([]);

    const { questionPaneData } = useContext(QuestionPaneDataContext);

    const getIndexOfQuestionFromPaneData = (questionId: number) => {
        if (questionPaneData?.questions) {
            return questionPaneData.questions.findIndex((question) => question.id === questionId);
        }
        return -1;
    }

    const getSumbissions = async () => {
        try {
            const response = await Request("GET", "/submission/get-all/" + classroomTestId);

            if (response.status === 200) {
                const data = await response.data;

                if (data.submissions) {
                    let submissions = data.submissions as SubmissionDetail[];

                    setSubmissions(submissions);
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch submissions");
        }
    }

    useEffect(() => {
        getSumbissions();
    }, []);

    return (
        <div className={styles.submissions}>
            {submissions.length === 0 ? <>Make a submission to view data over here</> :
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Question Number</th>
                            <th>Language</th>
                            <th>Submitted at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={submission.submission_id} onClick={() => changeViewToSubmission(submission.submission_id)}>
                                <td>{index+1}</td>
                                <td>{getIndexOfQuestionFromPaneData(submission.question_id) + 1}</td>
                                <td>{programmingLanguages.find((lan) => lan.id == submission.language)?.name.toString() || ""}</td>
                                <td>{new Date(submission.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}