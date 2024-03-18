import { createContext, useState } from "react";

interface AnswerData {
    answer: string;
    question_id: number;
}

interface AnswerContext {
    answerData: AnswerData[];
    addAnswer: (answer: string, question_id: number) => void;
    editAnswer: (answer: string, question_id: number) => void;
}

export const AnswerDataContext = createContext<AnswerContext>({
    answerData: [],
    addAnswer: (answer: string, question_id: number) => { },
    editAnswer: (answer: string, question_id: number) => { }
});

export const AnswerDataProvider = ({ children }: React.PropsWithChildren) => {

    const [answerData, setAnswerData] = useState<AnswerData[]>([]);

    const addAnswer = (answer: string, question_id: number) => {
        const newAnswerData = [...answerData, { answer, question_id }];
        setAnswerData(newAnswerData);
    }

    const editAnswer = (answer: string, question_id: number) => {
        const newAnswerData = answerData.map((data) => {
            if (data.question_id === question_id) {
                return { ...data, answer };
            }
            return data;
        });
        setAnswerData(newAnswerData);
    }

    return (
        <AnswerDataContext.Provider value={{
            answerData: answerData,
            addAnswer,
            editAnswer
        }}>
            {children}
        </AnswerDataContext.Provider>
    );
};