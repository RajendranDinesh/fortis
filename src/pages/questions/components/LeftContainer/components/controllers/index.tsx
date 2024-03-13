import { Request } from "../../../../../../networking"

export const getQuestionsMetadata = async (testId: string) => {
    return await Request("GET", `/question/${testId}/meta`);
}
