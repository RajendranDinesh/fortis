import { Request } from "../../../../../../networking"

export const getQuestionsMetadata = async (classroomTestId: string | number) => {
    return await Request("GET", `/question/${classroomTestId}/meta`);
}

export const getCurrentQuestion = async (classroomTestId: string | number, currentQuestionId: string | number) => {
    return await Request("GET", `/question/${classroomTestId}/${currentQuestionId}`);
}