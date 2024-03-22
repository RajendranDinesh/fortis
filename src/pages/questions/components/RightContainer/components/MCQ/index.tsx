import { useContext, useEffect, useState } from "react";

import { AnswerData, AnswerDataContext } from "../../../../answerContext";
import { McqQuestion, McqOption, QuestionPaneDataContext } from "../../../../questionContext";

import styles from './mcq.module.css';

export default function MCQ() {

    const { answerData, addAnswer, editAnswer } = useContext(AnswerDataContext);
    const { questionData, questionPaneData } = useContext(QuestionPaneDataContext);

    const [options, setOptions] = useState<McqOption[] | 0>();
    const [chosenOption, setChosen] = useState<AnswerData>();
    const [chosenOptions, setChosenOptions] = useState<AnswerData>();

    const [multiCorrect, setMultiCorrect] = useState(false);

    const currentQuestionId = questionPaneData?.currentQuestionId;

    const handleEditAnswer = (optionId: number) => {
        const answer = answerData.find((data) => data.question_id === currentQuestionId);
        const questions = questionPaneData?.questions;

        if (!questions) return;

        questions.find((question) => question.id === currentQuestionId)!.status = "attempted";

        if (answer || answer !== undefined) {
            if (multiCorrect) {
                const answerOptions = answer.answer.split(',');
                const index = answerOptions.indexOf(optionId.toString());

                if (index > -1) {
                    answerOptions.splice(index, 1);
                } else {
                    answerOptions.push(optionId.toString());
                }

                if (answerOptions.length > 0) editAnswer(answerOptions.join(','), currentQuestionId || 0);
                else editAnswer("", currentQuestionId || 0);

                setChosenOptions({ answer: answerOptions.join(','), question_id: currentQuestionId || 0 });
            } else {
                editAnswer(optionId.toString(), currentQuestionId || 0);
                setChosen({ answer: optionId.toString(), question_id: currentQuestionId || 0 })
            }
        } else {
            addAnswer(optionId.toString(), currentQuestionId || 0);
            setChosen({ answer: optionId.toString(), question_id: currentQuestionId || 0 });
            setChosenOptions({ answer: optionId.toString(), question_id: currentQuestionId || 0 })
        }
    }

    useEffect(() => {
        if (questionData && currentQuestionId) {
            const temp = (questionData[currentQuestionId] as McqQuestion)?.options;
            setOptions(temp);

            const answer = answerData?.find((data) => data.question_id === currentQuestionId);
            setChosen(answer);
            setChosenOptions(answer);

            (questionData[currentQuestionId] as McqQuestion)?.multiple_correct === 1 ? setMultiCorrect(true) : setMultiCorrect(false);
        }
    }, [questionData, currentQuestionId]);

    return (
        <div className={styles.top_container}>
            <h3>Choose an option number</h3>
            <span>{multiCorrect === true && `This is a multi correct question, you can choose multiple options`}</span>
            <div className={styles.option_container}>
                {options !== undefined && options !== 0 && options.length > 0 && options.map((option, index) =>
                    <button
                        className={styles.option}
                        onClick={() => handleEditAnswer(option.mcq_option_id)}
                        key={index}
                    >{index + 1}</button>
                )}
            </div>

            <div className={styles.chosen_option_container}>
                {!multiCorrect ? chosenOption && <div>
                    <span>You have chosen option no. <h3>{options && options.findIndex((option) => option.mcq_option_id === Number(chosenOption?.answer)) + 1}. {options && options.find((option) => option.mcq_option_id === Number(chosenOption?.answer))?.option_text}</h3></span>
                </div> : <>
                    {chosenOptions && chosenOptions?.answer?.length > 0 &&
                        <>
                            <span>You have chosen the following options</span>
                            <div>
                                {chosenOptions.answer.split(',').map((optionId, index) =>
                                    options && (options.findIndex((option) => option.mcq_option_id === Number(optionId))) !== -1 && <h3 key={index}>{options && (options.findIndex((option) => option.mcq_option_id === Number(optionId))) + 1}. {options && options.find((option) => option.mcq_option_id === Number(optionId))?.option_text}</h3>
                                )}
                            </div>
                        </>
                    }
                </>}
            </div>
        </div>
    );
}