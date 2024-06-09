import { createContext, useState } from "react";
import { toast } from "react-toastify";

import { getQuestionsMetadata, getCurrentQuestion } from "../components/LeftContainer/components/controllers";

export type McqOption = {
    mcq_option_id: number;
    option_text: string;
};

export type McqQuestion = {
    question: string;
    question_title: null | string;
    marks: number;
    multiple_correct: number;
    options: McqOption[];
};

export type CodeQuestion = {
    question: string;
    question_title: string;
    marks: number;
    allowed_languages: string[];
    public_test_case: {
        name: string;
        input: string;
        output: string;
    }[];
};

type CollectionOfQuestions = {
    [key: number]: McqQuestion | CodeQuestion;
};

export interface questionPaneData {
    currentQuestionId: number;
    startTime?: Date | undefined;
    endTime?: Date | undefined;
    questions?: {
        id: number;
        status: string;
        type_name: string;
    }[];
}

export interface questionDataPayload {
    questionPaneData?: questionPaneData | null
    getSetQuestionPaneData: (testId: string) => void
    setCurrentQuestionId: (questionId: number) => void
    questionData: CollectionOfQuestions | null
}

export const QuestionPaneDataContext = createContext<questionDataPayload>({
    questionPaneData: null,
    getSetQuestionPaneData: () => { },
    setCurrentQuestionId: () => { },
    questionData: null
});

export const QuestionPaneDataProvider = ({ children }: React.PropsWithChildren) => {

    const [testId, setTestId] = useState<string | number>("");

    const [questionPaneData, setQuestionPaneData] = useState<questionPaneData | null>(null);

    const [questionData, setQuestionData] = useState<CollectionOfQuestions | null>(null);

    const getSetQuestionData = async (testId: string | number, questionId: string | number) => {
        try {
            const response = await getCurrentQuestion(testId, questionId);

            if (response.status === 200) {
                let data = response.data;

                if (data.type_name === "mcq") {
                    data = data as McqQuestion;
                } else if (data.type_name === "code") {
                    data = data as CodeQuestion;
                }

                setQuestionData((prevData) => {
                    return {
                        ...prevData,
                        [questionId]: data
                    }
                });

            } else {
                throw new Error("Failed to fetch question data");
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch question data", {
                position: "top-right",
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    const getSetQuestionPaneData = async (testId: string) => {
        try {
            setTestId(testId);
            const id = testId;
            const response = await getQuestionsMetadata(id);

            if (response.status === 200) {
                let data = response.data;

                data.startTime = new Date(data.startTime);
                data.endTime = new Date(data.endTime);

                data.questions[0].status = "not_attempted";

                for (let i = 1; i < data.questions.length; i++) {
                    data.questions[i].status = "not_viewed";
                }

                data.currentQuestionId = data.questions[0].id;

                setQuestionPaneData(data);

                getSetQuestionData(id, data.currentQuestionId);

            } else {
                throw new Error("Failed to fetch questions metadata");
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch questions metadata", {
                position: "top-right",
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    const setCurrentQuestionId = (questionId: number) => {

        if (questionPaneData && questionId === questionPaneData.currentQuestionId) {
            return;
        }

        if (!questionData || !questionData[questionId]) {
            getSetQuestionData(testId, questionId);
        }

        setQuestionPaneData({
            ...questionPaneData,
            currentQuestionId: questionId
        });
    }

    return (
        <QuestionPaneDataContext.Provider value={{
            questionPaneData,
            getSetQuestionPaneData,
            setCurrentQuestionId,
            questionData
        }}>
            {children}
        </QuestionPaneDataContext.Provider>
    )
}