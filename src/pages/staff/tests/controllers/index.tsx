import { Request } from "../../../../networking";

interface TestCase {
    name: string
    input: string
    output: string
}

interface Props {
    sourceCode: string;
    testCases: TestCase[];
    languageId: string;
}

export const runCode = async ({ sourceCode, testCases, languageId }: Props) => {
    const body = {
        "source_code": sourceCode,
        "language_id": languageId,
        "test_case": testCases,
    }

    const response = await Request("POST", "/submission", body);

    return response;
}