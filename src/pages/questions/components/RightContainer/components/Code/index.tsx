// Module imports
import { useContext, useState, ChangeEvent, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as monaco from 'monaco-editor';
import { CiCircleChevUp, CiCircleChevDown, CiMaximize1 } from "react-icons/ci";
import { toast } from "react-toastify";

// Component imports
import OurEditor from "../../../../../components/Editor";
import { Request } from "../../../../../../networking";
import TestCase from "../../components/TestCase";
import Result from "../../components/Result";
import { programmingLanguages } from "../../../../../components/Editor";

// Asset imports
import styles from '../../right.module.css';

import { AnswerDataContext } from "../../../../answerContext";
import { QuestionPaneDataContext, questionStatus } from "../../../../questionContext";
import { SubmissionContext } from "../../../../submissionContext";
import { LeftContainerContext } from "../../../LeftContainer/context";

export default function Code() {
    const [lang, setLang] = useState([programmingLanguages[0].value, programmingLanguages[0].id.toString()]);
    const [code, setCode] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);

    const { classroomTestId } = useParams();

    const { answerData, addAnswer, editAnswer } = useContext(AnswerDataContext);
    const { questionPaneData, questionData, setQuestionStatus } = useContext(QuestionPaneDataContext);
    const { changeActiveSubmissionTab, changeSubmissionId } = useContext(SubmissionContext);
    const { currentActiveTab, changeActiveTab } = useContext(LeftContainerContext);

    const [isTestTabActive, setIsTestTabActive] = useState(true);
    const [isResultTabActive, setIsResultTabActive] = useState(false);

    const [editorContainerHeight, setEditorContainerHeight] = useState("92%");
    const [editorHeight, setEditorHeight] = useState("93%");
    const [consoleHeight, setConsoleHeight] = useState("7%");

    const [testCases, setTestCases] = useState([
        { id: 0, name: "Case 1", input: "", output: "" },
    ]);

    const [token, setToken] = useState<string[]>([]);

    const consoleVisible = Number(consoleHeight.replace("%", "")) > 7 ? true : false;

    const questionId = questionPaneData?.currentQuestionId;

    const handleLangSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setLang([e.target.value.split(',')[0], e.target.value.split(',')[1]]);
    }

    const handleCodeChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {

        value && setCode(value);

        if (questionId === undefined) {
            return;
        }

        const answer = answerData.find((data) => data.question_id === questionId);

        if (answer || answer !== undefined) {
            editAnswer(value || "", questionId);
        } else {
            addAnswer(value || "", questionId);
        }

    }

    const handleFullScreen = () => {
        document.documentElement.requestFullscreen();
    }

    const handleConsoleToggle = () => {
        if (editorContainerHeight === "92%") {
            setEditorContainerHeight("20%");
            setEditorHeight("70%");
            setTimeout(() => setConsoleHeight("79%"), 35)
        } else {
            setTimeout(() => setEditorContainerHeight("92%"), 3);
            setTimeout(() => setEditorHeight("93%"), 2);
            setTimeout(() => setConsoleHeight("7%"), 1);
        }
    }

    const checkCodenTestCases = () => {
        if (!code) {
            toast.error("Please write some code to run", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
            return;
        }

        const invalidTestCases = testCases.filter((testCase) => testCase.output === "");
        if (invalidTestCases.length > 0) {
            toast.warn("Consider removing test cases with unspecified output.", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
            return;
        }

        return true;
    }

    const handleSubmitPublicTestCase = async () => {

        if (!checkCodenTestCases()) {
            return;
        }

        const body = {
            "source_code": code,
            "language_id": lang[1],
            "test_case": testCases,
        }

        setIsTestTabActive(false);
        setIsResultTabActive(true);

        setEditorContainerHeight("20%");
        setEditorHeight("70%");
        setTimeout(() => setConsoleHeight("79%"), 35)

        try {
            setToken(["1"]);
            const response = await Request('POST', '/submission', body);

            if (response.status === 201) {
                setToken(response.data.tokens);
            }

            setQuestionStatus(questionStatus.attempted);

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitPrivateTestCases = async () => {

        if (!checkCodenTestCases()) {
            return;
        }

        const body = {
            "source_code": code,
            "language_id": lang[1],
            "test_case": testCases,
            "question_id": questionId,
            "classroom_test_id": classroomTestId
        }

        try {
            const response = await Request('POST', '/submission', body);

            if (response.status === 201) {
                if (currentActiveTab !== "Submissions") changeActiveTab("Submissions");

                changeSubmissionId(Number(response.data.submissionId));
                setTimeout(() => changeActiveSubmissionTab("Submission"), 1250);

                setQuestionStatus(questionStatus.attempted);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log('visible');
            } else {
                console.log('hidden');
            }
        };

        const onFullScreenChange = () => {
            setIsFullScreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('visibilitychange', onVisibilityChange);
        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        };
    });

    useEffect(() => {
        const handleKeyboardEvent = (event: KeyboardEvent) => {

            if (event.key === "F11") {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "C") || (event.ctrlKey && event.key === "c")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "V") || (event.ctrlKey && event.key === "v")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.key === "X") || (event.ctrlKey && event.key === "x")) {
                event.preventDefault();
                return;
            }

            else if ((event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.shiftKey && event.key === "i")) {
                event.preventDefault();
                return;
            }
        };

        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyboardEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyboardEvent);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        if (questionId === undefined) {
            return;
        }

        const question = questionData?.[questionId];

        if (question !== undefined && 'allowed_languages' in question) {
            setTestCases(question.public_test_case.map((testCase, index) => ({
                id: index,
                name: testCase.name,
                input: testCase.input,
                output: testCase.output
            })));
        }
    }, [questionId, questionData]);
    
    return (
        <>
            <div style={{ height: editorContainerHeight }} className={styles.top_container}>
                <div className={styles.options_container}>
                    <div>
                        <div className={styles.select_container}>
                            <select className={styles.lang_select} onChange={handleLangSelect}>
                                {programmingLanguages.map((lang) => (
                                    <option key={lang.id} value={[lang.value, lang.id.toString()]}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.option_container}>
                        <CiMaximize1 className={styles.option} onClick={handleFullScreen} />
                    </div>
                </div>

                <div className={styles.editor_container} style={{ width: '100%', height: editorHeight }}>
                    <OurEditor value={answerData.find((answer) => answer.question_id === questionId)?.answer} lang={lang[0]} onChange={handleCodeChange} />
                </div>
            </div>

            <div style={{ height: "1%" }} />

            <div style={{ minHeight: consoleHeight }} className={styles.bottom_main_container}>
                {/* Top Container in the Console */}
                <div style={consoleVisible ? { display: "block" } : { display: "none" }} className={styles.top_container}>
                    <div>
                        <div
                            style={{ height: "100%", display: "flex", alignItems: "center", cursor: "pointer" }}
                            className={isTestTabActive ? styles.tab_title : ""}
                            onClick={() => {
                                setIsTestTabActive(true);
                                setIsResultTabActive(false)
                            }}
                            title="Opens public testcase view"
                            >
                            Testcase</div>

                        <div
                            style={{ height: "100%", display: "flex", alignItems: "center", cursor: "pointer" }}
                            className={isResultTabActive ? styles.tab_title : ""}
                            onClick={() => {
                                setIsTestTabActive(false);
                                setIsResultTabActive(true)
                            }}
                            title="Opens the result tab"
                            >
                            Result</div>
                    </div>
                </div>

                {/* Middle Container in the Console */}
                <div style={consoleVisible ? { display: "block" } : { display: "none" }} className={styles.middle_container}>
                    <div style={{ height: "100%" }}>
                        {isTestTabActive && <TestCase testCases={testCases} setTestCases={setTestCases} />}
                        {isResultTabActive && <Result testCases={testCases} token={token} />}
                    </div>
                </div>

                {/* Bottom Container in the Console */}
                <div style={consoleVisible ? { height: "8%" } : { height: "100%" }} className={styles.bottom_container}>
                    <div>
                        <button className={styles.console_button} onClick={handleConsoleToggle} title="Toggles the console">Console {consoleVisible ? <CiCircleChevDown color="#a3a3a3" strokeWidth={'1px'} /> : <CiCircleChevUp color="#a3a3a3" strokeWidth={'1px'} />} </button>
                    </div>
                    <div>
                        <button className={styles.run_button} onClick={handleSubmitPublicTestCase} title="Runs public test cases">Run</button>
                        <button className={styles.submit_button} onClick={handleSubmitPrivateTestCases} title="Runs private test cases">Submit Code</button>
                    </div>
                </div>
            </div>
        </>
    );
}