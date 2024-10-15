import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './finished.module.css';
import Modal from "../../../components/Modal"

import { AnswerDataContext } from '../../answerContext';
import { QuestionPaneDataContext, questionDataPayload, questionStatus } from '../../questionContext';
import { Request } from '../../../../networking';

export default function CompletedModal({
    isFinished,
    setIsFinished
}: { isFinished: boolean, setIsFinished: (arg: boolean) => void }) {

    const { classroomTestId } = useParams();

    const { questionData, questionPaneData } = useContext(QuestionPaneDataContext) as questionDataPayload;
    const { answerData } = useContext(AnswerDataContext);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);

    const [summary, setSummary] = useState({
        totalQuestions: 0,
        questionsAttempted: 0,
        questionsNotViewed: 0
    });

    const getElapsedTime = () => {
        if (!questionPaneData) {
            return 0;
        }
        const endTime = questionPaneData?.endTime;

        if (!endTime) {
            return 0;
        }

        const elapsedTime = endTime.getTime() - new Date().getTime();

        if (elapsedTime === undefined) return 0;

        setElapsedTime(elapsedTime);
    }

    const goBack = () => {
        setIsFinished(false);
    }

    const getMCQAnswers = () => {
        const mcqQuestionId = questionPaneData?.questions?.filter((question) => question.type_name === 'mcq');

        let mcqAnswerData = [];

        if (mcqQuestionId)
        for (let i=0; i<mcqQuestionId?.length; i++) {
            const temp = answerData.find((answer) => answer.question_id === mcqQuestionId[i].id);
            mcqAnswerData.push(temp)
        }

        return mcqAnswerData;
    }

    const handleSubmit = async () => {

        try {
            const mcqAnswers = getMCQAnswers();
            const response = await Request("POST", '/submission/submit/'+classroomTestId, {mcqAnswers});

            if (response.status === 200) {
                window.location.href = '/student'
            }
        } catch (error) {
            toast.error("Some error occurred");
            console.log(error)
        }

        setIsSubmitted(true);
    }

    useEffect(() => {
        if (!questionPaneData) {
            return;
        }

        const totalQuestions = questionPaneData?.questions?.length;
        const questionsAttempted = questionPaneData?.questions?.filter(q => q.status === questionStatus.attempted).length;
        const questionsNotViewed = (totalQuestions || 0) - (questionsAttempted || 0);

        if (totalQuestions === undefined || questionsAttempted === undefined || questionsNotViewed === undefined) {
            return;
        }

        setSummary({
            totalQuestions,
            questionsAttempted,
            questionsNotViewed
        });

        getElapsedTime();
    
    }, [questionData, questionPaneData]);

    return (
        <Modal isOpen={isFinished} onClose={() => { }} >
            <div className={styles.modal_top_div}>
                <div className={styles.modal_header}>
                    {isSubmitted && <>
                        <h1>Assessment has been submitted</h1>
                        <h4>Thank you for attending the assessment 🫶</h4>
                    </>}
                </div>

                <h3 style={{ alignSelf: 'flex-start' }}>Here are your stats</h3>
                <div className={styles.stats}>
                    <div>
                        <h5>Total questions</h5>
                        <p>{summary.totalQuestions}</p>
                    </div>
                    <div>
                        <h5>Questions successfully attempted</h5>
                        <p>{summary.questionsAttempted}</p>
                    </div>
                    <div>
                        <h5>Questions not attempted</h5>
                        <p>{summary.questionsNotViewed}</p>
                    </div>
                </div>

                <div>
                    {!isSubmitted && <div className={styles.sub_btn_container}>
                        { elapsedTime > 0 && 
                        <button onClick={goBack}>Go back</button>}
                        <button onClick={handleSubmit}>Submit</button>
                    </div>}
                </div>
            </div>
        </Modal>
    )
}