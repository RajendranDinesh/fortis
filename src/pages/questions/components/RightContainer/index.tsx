import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Code from './components/Code';
import MCQ from './components/MCQ';

import { QuestionPaneDataContext } from "../../questionContext";

const RightContainer = () => {

    const { questionData, questionPaneData } = useContext(QuestionPaneDataContext);

    const [questionType, setQuestionType] = useState<string | null>(null);

    useEffect(() => {
        const currentQuestionId = questionPaneData?.currentQuestionId;

        const currentQuestionType = questionPaneData && currentQuestionId ? questionPaneData.questions?.find(q => q.id === currentQuestionId)?.type_name : null;

        if (currentQuestionType) {
            setQuestionType(currentQuestionType);
        }
    })

    return (
        <>
            {questionType === 'mcq' && <MCQ />}
            {questionType === 'code' && <Code />}
            <ToastContainer />
        </>
    )
}

export default RightContainer;

//https://reactjsexample.com/resizable-split-panes-for-react-js/