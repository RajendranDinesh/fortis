import { useContext } from 'react';

import styles from './description.module.css';

import { QuestionPaneDataContext, questionDataPayload, McqQuestion, McqOption } from '../../../../context';

const Description = () => {

    const { questionData, questionPaneData, setCurrentQuestionId } = useContext(QuestionPaneDataContext) as questionDataPayload;

    const currentQuestionId = questionPaneData.currentQuestionId;
    const currentQuestionType = questionPaneData.questions.filter((question) => question.id === currentQuestionId)[0]?.type_name === 'mcq' ? 'MCQ' : 'Code';

    const renderHTML = (htmlString: any) => {
        if ((htmlString === null) || (htmlString === undefined)) return;
        const cleanedHtml = htmlString.slice(1, -1).replace(/\\n/g, '').replace(/\\t/g, '<br />');

        return { __html: cleanedHtml };
    };

    const getCurrentQuestionIndex = (): number => {
        return questionPaneData.questions.findIndex((question) => question.id === currentQuestionId);
    }

    const handlePrevQuestion = () => {
        console.log(questionData)
        const indexOfPrevQuestion = getCurrentQuestionIndex() - 1;

        if (indexOfPrevQuestion < 0) {
            setCurrentQuestionId(questionPaneData.questions[questionPaneData.questions.length - 1].id);
        } else {
            setCurrentQuestionId(questionPaneData.questions[indexOfPrevQuestion].id);
        }
    }

    const handleNextQuestion = () => {
        const indexOfNextQuestion = getCurrentQuestionIndex() + 1;

        if (indexOfNextQuestion === questionPaneData.questions.length) {
            setCurrentQuestionId(questionPaneData.questions[0].id);
        } else {
            setCurrentQuestionId(questionPaneData.questions[indexOfNextQuestion].id);
        }
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.title_container}>
                <div>
                    <h1>{`${getCurrentQuestionIndex() + 1}${(questionData && questionData[currentQuestionId]?.question_title) === null ? "" : questionData && `.${questionData[currentQuestionId]?.question_title}`}`}</h1>
                </div>

                <div>
                    {questionData && <p><span>Question Type:</span> {currentQuestionType}</p>}
                    {questionData && <p><span>Marks:</span> {questionData[currentQuestionId]?.marks}</p>}
                    <div className={styles.next_prev_container}>
                        <button onClick={handlePrevQuestion} className={styles.next_prev_button}>&lt;</button>
                        <button onClick={handleNextQuestion} className={styles.next_prev_button}>&gt;</button>
                    </div>
                </div>
            </div>
            <div className={styles.description_container}>
                {questionData && <div dangerouslySetInnerHTML={renderHTML(questionData[currentQuestionId]?.question)} />}
                {questionData &&
                    <div className={styles.option_container}>
                        {(questionData[currentQuestionId] as McqQuestion)?.options?.map((option: McqOption, index: number) => (
                            <div className={styles.option} key={index}>
                                {option.option_text}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Description;