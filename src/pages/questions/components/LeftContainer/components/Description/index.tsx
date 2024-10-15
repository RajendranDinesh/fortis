import { useContext } from 'react';

import styles from './description.module.css';

import { QuestionPaneDataContext, questionDataPayload, McqQuestion, McqOption, questionStatus } from '../../../../questionContext';
import MCQ from '../../../RightContainer/components/MCQ';

const Description = () => {

    const { questionData, questionPaneData, setCurrentQuestionId } = useContext(QuestionPaneDataContext) as questionDataPayload;

    const currentQuestionId = questionPaneData?.currentQuestionId;
    const questionMetaData = questionPaneData?.questions;
    const currentQuestionType = questionPaneData?.questions?.filter((question) => question.id === currentQuestionId)[0]?.type_name === 'mcq' ? 'MCQ' : 'Code';

    const renderHTML = (htmlString: any) => {
        if ((htmlString === null) || (htmlString === undefined)) return;
        const cleanedHtml = htmlString.slice(1, -1).replace(/\\n/g, '').replace(/\\t/g, '<br />');

        return { __html: cleanedHtml };
    };

    const getCurrentQuestionIndex = (): number => {
        return questionPaneData?.questions?.findIndex((question) => question.id === currentQuestionId) || 0;
    }

    const handleQuestionChange = (questionId: number) => {
        if (!questionMetaData) {
            return;
        }

        const questionStatuse = questionMetaData.find((question) => question.id === questionId)?.status;

        if (questionStatuse === questionStatus.not_viewed) {
            questionMetaData.find((question) => question.id === questionId)!.status = questionStatus.not_attempted;
        }

        setCurrentQuestionId(questionId);
    }

    const handlePrevQuestion = () => {
        const indexOfPrevQuestion = getCurrentQuestionIndex() - 1;

        if (questionPaneData && questionPaneData.questions) {
            if (indexOfPrevQuestion < 0) {
                handleQuestionChange(questionPaneData.questions[questionPaneData.questions.length - 1].id);
            } else {
                handleQuestionChange(questionPaneData.questions[indexOfPrevQuestion].id);
            }
        }
    }

    const handleNextQuestion = () => {
        const indexOfNextQuestion = getCurrentQuestionIndex() + 1;

        if (questionPaneData && questionPaneData.questions) {
            if (indexOfNextQuestion === questionPaneData.questions.length) {
                handleQuestionChange(questionPaneData.questions[0].id);
            } else {
                handleQuestionChange(questionPaneData.questions[indexOfNextQuestion].id);
            }
        }
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.title_container}>
                <div>
                    <h1>{(questionData && currentQuestionId && questionData[currentQuestionId]?.question_title) === null ? `Q.no ${getCurrentQuestionIndex() + 1}` : questionData && currentQuestionId && `${getCurrentQuestionIndex() + 1}.${questionData[currentQuestionId]?.question_title}`}</h1>
                </div>

                <div className={styles.info_container}>
                    {questionData && <p><span>Question Type:</span> {currentQuestionType}</p>}
                    {questionData && <p><span>Marks:</span> {currentQuestionId && questionData[currentQuestionId]?.marks}</p>}
                    <div className={styles.next_prev_container}>
                        <button onClick={handlePrevQuestion} className={styles.next_prev_button} title='Go to previous question'>&lt;</button>
                        <button onClick={handleNextQuestion} className={styles.next_prev_button} title='Go to the next question'>&gt;</button>
                    </div>
                </div>
            </div>
            <div className={styles.description_container}>
                {questionData && <div dangerouslySetInnerHTML={renderHTML(currentQuestionId && questionData[currentQuestionId]?.question)} />}
                {questionData &&
                    <div className={styles.option_container}>
                        {currentQuestionId && (questionData[currentQuestionId] as McqQuestion)?.options?.map((option: McqOption, index: number) => (
                            <div className={styles.option} key={index}>
                                <span>{index + 1}. </span>
                                <span>{option.option_text}</span>
                            </div>
                        ))}
                    </div>
                }
            </div>

            {questionData && currentQuestionId && (questionData[currentQuestionId] as McqQuestion) && 'options' in questionData[currentQuestionId] && <MCQ />}
        </div>
    );
}

export default Description;