import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

//Styles

import styles from './Tests.module.css';

//Assets

import { IoIosAddCircle } from 'react-icons/io';

//Components

import AddMCQ from './addMCQ';
import { Request } from '../../../networking';
import { TestType } from '../dashboard';
import QuestionDetailModal from './viewQuestion';

interface Question {
    question_id: number
    question_title: string
    type_name: string
    created_at: string
    updated_at: string
}

function Test() {

    const navigate = useNavigate();
    const { testId } = useParams();

    const [questions, setQuestions] = useState<Question[]>();
    const [testDetails, setTestDetails] = useState<TestType>();

    const [isMCQModalOpen, setMCQModalOpen] = useState(false);

    const handleMCQModalClick = () => {
        setMCQModalOpen(false);
    }

    const handleAddQuestion = () => {
        Swal.fire({
            title: 'Select Question Type',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `MCQ`,
            denyButtonText: `Programming`,
            cancelButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                setMCQModalOpen(!isMCQModalOpen);
            } else if (result.isDenied) {
                navigate(`/staff/test/${testId}/programming`);
            }
        })
    };

    const getTestDetails = async () => {
        try {
            const response = await Request("GET", `/test/${testId}`);
            if (response.status === 200) {
                setTestDetails(response.data);
            }
        } catch(error) {
            console.log(error);
            toast.error("Failed to fetch test details");
        }
    }

    const getQuestions = async () => {
        try {
            const response = await Request("GET", `/question/${testId}`);
            if (response.status === 200) {
                setQuestions(response.data);
            }
        } catch(error) {
            if ((error as any).response.status === 404) {
                setQuestions([]);
                return;
            }

            console.log(error);
            toast.error("Failed to fetch questions");
        }
    }

    const [questionIdForModal, setQuestionIdForModal] = useState(0);
    const [isQuestionDetailModalOpen, setQuestionDetailModalOpen] = useState(false);

    const openQuestionDetailModal = (questionId: number) => {
        setQuestionIdForModal(questionId);
        setQuestionDetailModalOpen(true);
    }

    const handleQuestionDetailModalClick = () => {
        setQuestionDetailModalOpen(false);
    }

    const renderHTML = (htmlString: any, type: string) => {
        if (htmlString === null) return;
        if (type === "code") return { __html: htmlString };

        const cleanedHtml = htmlString.slice(1, -1).replace(/\\n/g, '').replace(/\\t/g, '');

        return { __html: cleanedHtml };
    };

    useEffect(() => {
        getTestDetails();
        getQuestions();
    }, []);

    return (
        <div className={styles.Test_whole_container}>
            <div className={styles.Test_header_container}>
                <div className={styles.Test_header_title_container}>
                    <h1>{testDetails?.title}</h1>
                </div>
                <div className={styles.Test_header_description_container}>
                    <p>{testDetails?.description}</p>
                </div>
            </div>
            <div className={styles.Test_button_container}>
                <IoIosAddCircle className={styles.Test_add_question_button} onClick={handleAddQuestion} />
            </div>
            <div className={styles.Test_question_container}>
                <div className={styles.Test_question_table_title_grid}>
                    <h1>Sl.No</h1>
                    <h1>Question Title</h1>
                    <h1>Question Type</h1>
                </div>

                {/* Questions are mapped and displayed here... */}
                { (questions && questions.length > 0) ? questions.map((question, index) => 
                <div className={styles.Test_question_grid} key={index} onClick={() => openQuestionDetailModal(question.question_id)}>
                    <h1>{index+1}</h1>
                    <h1 dangerouslySetInnerHTML={renderHTML(question.question_title, question.type_name)} />
                    <h1>{question.type_name}</h1>
                </div>) : <>No questions have been added yet..</>}
            </div>
            <AddMCQ modalOpen={isMCQModalOpen} handleModalClick={handleMCQModalClick} />
            <QuestionDetailModal modalOpen={isQuestionDetailModalOpen} handleModalClick={handleQuestionDetailModalClick} questionId={questionIdForModal} />
        </div>
    )
}

export default Test;