import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { HttpStatusCode } from "axios";

import Modal from "../../../components/Modal";
import { Request } from "../../../../networking";
import Jodit from "../addProgramming/joditEditor";

import styles from './addmcq.module.css';

import useLocalStorage from "../../../../hooks/useLocalStorage";

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

function AddMCQ({ modalOpen, handleModalClick }: Props) {

    const { testId } = useParams();
    const [question, setQuestion] = useLocalStorage("mcQuestion_question", "");
    
    // Do not change the value of questionType unless explicitly required
    // 0 => Single Correct
    // 1 => Multi Correct
    const [questionType, setQuestionType] = useLocalStorage("mcQuestion_questionType", 0);
    const [marks, setMarks] = useLocalStorage("mcQuestion_marks", 0);

    const [options, setOptions] = useLocalStorage("mcQuestion_options", [
        {
            id: 1,
            value: "",
            correct: 0
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

        setOptions(newOptions);
    }

    const handleAddQuestion = async () => {

        if (!question || question.length === 0) {
            toast.error("Question cannot be empty", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (options.length < 2) {
            toast.error("Minimum 2 options are required", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        const correctOptions = options.filter(option => option.correct == 1);

        if (questionType == 0 && correctOptions.length > 1) {
            toast.error("Only one correct option is allowed for single correct question", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (questionType == 1 && correctOptions.length < 2) {
            toast.error("Minimum 2 correct options are required for multi correct question", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (!marks) {
            toast.error("Marks cannot be empty", {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        const requestBody = {
            test_id: testId,
            question_type: questionType,
            question: question,
            options: options,
            marks: marks
        }

        try {
            const response = await Request("POST", "/question/add-mcq", requestBody);

            if (response.status === HttpStatusCode.Created) {
                toast.success("Question added successfully", {
                    autoClose: 2000,
                    theme: "dark",
                });
                
                const itemsToClear = ["mcQuestion_question", "mcQuestion_questionType", "mcQuestion_marks", "mcQuestion_options"];
                itemsToClear.forEach(item => localStorage.removeItem(item));

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
            <Modal
                isOpen={modalOpen}
                onClose={handleModalClick}
                title="Add MCQ Question"
                height="70vh"
                width="70vw"
                >

                <div className={styles.add_mcq_question_container}>

                    <div className={styles.input_container}>
                        <div className={styles.question_input}>
                            <label>Question</label>
                            <Jodit value={question} setValue={setQuestion} />
                        </div>
                    </div>

                    <div className={styles.marks_input}>
                        <label>Marks</label>
                        <input type="number" placeholder="Enter mark here" title="Marks" onChange={(e) => setMarks(parseInt(e.target.value))} />
                    </div>

                    <div>
                        <h4 className={styles.answers_heading_text}>Answers</h4>
                        <div className={styles.select_option_container}>
                            <div className={questionType == 0 && styles.selected_option} onClick={() => setQuestionType(0)}>Single Correct</div>
                            <div className={questionType == 1 && styles.selected_option} onClick={() => setQuestionType(1)}>Multi Correct</div>
                        </div>
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