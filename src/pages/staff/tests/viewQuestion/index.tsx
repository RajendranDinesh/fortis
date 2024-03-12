import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from './questionDetail.module.css';

import Modal from "../../../components/Modal";

import { getQuestionDetail } from "../controllers";

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
    questionId: number
}

type McqOption = {
    mcq_option_id: number;
    mcq_question_id: number;
    option_text: string;
    is_correct: number;
    created_at: string;
    updated_at: string;
};

type McqQuestion = {
    question_id: number;
    test_id: number;
    question_type: number;
    question: string;
    created_at: string;
    updated_at: string;
    question_title: null | string;
    marks: number;
    type_name: "mcq";
    mcq_question_id: number;
    multiple_correct: number;
    image: null | string;
    options: McqOption[];
};

type CodeQuestion = {
    question_id: number;
    test_id: number;
    question_type: number;
    question: string;
    created_at: string;
    updated_at: string;
    question_title: string;
    marks: number;
    type_name: "code";
    code_question_id: number;
    solution_code: string;
    allowed_languages: string[];
    public_test_case: TestCase[];
    private_test_case: TestCase[];
};

type TestCase = {
    name: string;
    input: string;
    output: string;
};

type Question = McqQuestion | CodeQuestion;

export default function QuestionDetailModal({ modalOpen, handleModalClick, questionId }: Props) {

    const { testId } = useParams();
    const [details, setDetails] = useState<Question>({} as Question);
    const [loading, setLoading] = useState(false);

    const getQuestionDetails = async () => {
        setLoading(true);
        const response = await getQuestionDetail(Number(testId), questionId);
        if (response.status === 200) {
            setDetails(response.data);
        }
        setLoading(false);
    }

    const renderHTML = (htmlString: any) => {
        if (htmlString === null) return;
        const cleanedHtml = htmlString.slice(1, -1).replace(/\\n/g, '').replace(/\\t/g, '<br />');

        return { __html: cleanedHtml };
    };

    useEffect(() => {
        if (modalOpen) {
            getQuestionDetails();
        }
    }, [modalOpen]);

    return (
        <Modal isOpen={modalOpen} onClose={handleModalClick} >
            <div className={styles.question_details_container}>
                {!loading ?
                    <>
                        <h1>{details.question_title}</h1>
                        {details.question && <div>
                            <div dangerouslySetInnerHTML={renderHTML(details.question)} />
                        </div>}
                        <p>Question Type: {details.type_name}</p>
                        <p>Marks: {details.marks}</p>

                        {details.type_name === 'code' && (
                            <>
                                {details.allowed_languages && (
                                    <p>Allowed Languages: {details.allowed_languages.join(', ')}</p>
                                )}
                                {details.private_test_case && (
                                    <>
                                        <h2>Public Test Cases</h2>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Input</th>
                                                    <th>Output</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.public_test_case.map((testCase, index) => (
                                                    <tr key={index}>
                                                        <td>{testCase.name}</td>
                                                        <td>{testCase.input}</td>
                                                        <td>{testCase.output}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}

                                {details.private_test_case && (
                                    <>
                                        <h2>Private Test Cases</h2>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Input</th>
                                                    <th>Output</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.private_test_case.map((testCase, index) => (
                                                    <tr key={index}>
                                                        <td>{testCase.name}</td>
                                                        <td>{testCase.input}</td>
                                                        <td>{testCase.output}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </>
                        )}

                        {details.type_name === 'mcq' && (
                            <>
                                {details.options && (
                                    <>
                                        <h2>MCQ Options</h2>
                                        <ul>
                                            {details.options.map((option, index) => (
                                                <li key={index} className={option.is_correct ? styles.correct_option : ''}>
                                                    {option.option_text}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}
                    </>
                    : <p>Loading...</p>}
            </div>
        </Modal>
    )
}