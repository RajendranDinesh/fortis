import { Request } from "../../../../../../networking"

export const getQuestionsMetadata = async (testId: string | number) => {
    return await Request("GET", `/question/${testId}/meta`);
}

export const getCurrentQuestion = async (testId: string | number, currentQuestionId: string | number) => {
    return await Request("GET", `/question/${testId}/${currentQuestionId}`);
}