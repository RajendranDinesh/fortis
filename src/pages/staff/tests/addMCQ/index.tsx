import { useState } from "react";

import Modal from "../../../components/Modal";
import { Request } from "../../../../networking";

import styles from './addmcq.module.css';

import { toast, ToastContainer } from "react-toastify";

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

function AddMCQ({ modalOpen, handleModalClick }: Props) {

    const [question, setQuestion] = useState("");
    
    // Do not change the value of questionType unless explicitly required
    // 0 => Single Correct
    // 1 => Multi Correct
    const [questionType, setQuestionType] = useState(0);

    const [options, setOptions] = useState([
        {
            id: 1,
            value: "",
            correct: 1
        },
        {
            id: 2,
            value: "",
            correct: 0
        }
    ]);

    const addOption = () => {
        setOptions([...options, {
            id: options.length + 1,
            value: "",
            correct: 0
        }]);
    }

    const removeOption = (id: number) => {
        const newOptions = options.filter(option => option.id !== id);
        newOptions.forEach((option, index) => option.id = index + 1);
        setOptions(newOptions);
    }

    const handleOptionChange = (id: number, value: string) => {
        const newOptions = options.map(option => {
            if (option.id === id) {
                return {
                    ...option,
                    correct: parseInt(value)
                }
            }
            return option;
        });

        const correctOptions = newOptions.filter(option => option.correct == 1);
        if (questionType == 0 && correctOptions.length > 1) {
            toast.error("Only one correct option is allowed for single correct question", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        setOptions(newOptions);
    }

    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();

    function handleChange(e: any) {
        setFile(e.target.files[0]);
        setFileURL(URL.createObjectURL(e.target.files[0]));
    }

    const handleChangeQuestion = (e: any) => {
        setQuestion(e.target.value);
    }

    const handleAddQuestion = async () => {
        const formData = new FormData();

        const requestBody = {
            test_id: 1,
            question_type: questionType,
            question: question,
            options: options,
        }

        formData.append("question_data", JSON.stringify(requestBody));

        if (file) formData.append("question_image", file);

        try {
            const response = await Request("POST", "/question/add-mcq", formData);

            if (response.status === 200) {
                toast.success("Question added successfully", {
                    autoClose: 2000,
                    theme: "dark",
                });
                handleModalClick();
            }
        } catch (error) {
            toast.error("Error adding question", {
                autoClose: 2000,
                theme: "dark",
            });
        }
    }

    const handleValueChange = (id: number, value: string) => {
        const newOptions = options.map(option => {
            if (option.id === id) {
                return {
                    ...option,
                    value: value
                }
            }
            return option;
        });
        setOptions(newOptions);
    }

    return (
        <>
            <Modal isOpen={modalOpen} onClose={handleModalClick} title="Add MCQ Question">
                <div className={styles.add_mcq_question_container}>

                    <div className={styles.input_container}>
                        <div className={styles.question_input}>
                            <label>Question</label>
                            <input placeholder="Question goes here..." onChange={handleChangeQuestion} />
                        </div>
                        <input type="file" onChange={handleChange} />
                        {fileURL && <img src={fileURL} width={"20px"} height={"20px"} alt="uploaded image" />}
                    </div>

                    <h4 className={styles.answers_heading_text}>Answers</h4>
                    <div className={styles.select_option_container}>
                        <div className={questionType == 0 && styles.selected_option} onClick={() => setQuestionType(0)}>Single Correct</div>
                        <div className={questionType == 1 && styles.selected_option} onClick={() => setQuestionType(1)}>Multi Correct</div>
                    </div>

                    <div className={styles.option_container}>
                        {options.map((option) => <div className={styles.option} key={option.id}>
                            <span>{option.id}</span>

                            <input
                                value={option.value}
                                onChange={(e) => handleValueChange(option.id, e.target.value)}
                                placeholder={`Enter Option ${option.id}`}
                            />

                            <select defaultValue={option.correct == 1 ? 1 : 0} onChange={(e) => handleOptionChange(option.id, e.target.value)}>
                                <option value="0">Incorrect</option>
                                <option value="1">Correct</option>
                            </select>

                            <button onClick={() => removeOption(option.id)}>X</button>
                        </div>)}

                        <div className={styles.button_container}>

                            <div className={styles.add_option_container}>
                                <button onClick={addOption}>Add Option</button>
                            </div>
                            
                            <div className={styles.add_question_container}>
                                <button onClick={handleAddQuestion}>Add Question</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default AddMCQ;