import { useState, ChangeEvent, useEffect, useLayoutEffect, Dispatch, SetStateAction } from "react";
import * as monaco from 'monaco-editor';
import { CiBookmark } from "react-icons/ci";

import OurEditor from "../Editor";
import { Request } from "../../../../networking";
import TestCase from "./components/TestCase";
import Result from "./components/Result";

import styles from './right.module.css';

const languages = [
    { id: 92, name: 'Python', value: 'python' },
    { id: 50, name: 'C', value: 'c' },
    { id: 54, name: 'C++', value: 'c++' },
    { id: 91, name: 'Java', value: 'java' },
    { id: 93, name: 'JavaScript', value: 'javascript' },
];

const RightContainer = () => {
    const [lang, setLang] = useState([languages[0].value, languages[0].id.toString()]);
    const [code, setCode] = useState('');

    const [isTestTabActive, setIsTestTabActive] = useState(true);
    const [isResultTabActive, setIsResultTabActive] = useState(false);

    const [editorContainerHeight, setEditorContainerHeight] = useState("92%");
    const [editorHeight, setEditorHeight] = useState("93%");
    const [consoleHeight, setConsoleHeight] = useState("7%");

    const [testCases, setTestCases] = useState([
        { id: 0, name: "Case 1", input: "1 2", output: "3" },
        { id: 1, name: "Case 2", input: "2 3", output: "5" },
        { id: 2, name: "Case 3", input: "3 4", output: "7" },
    ]);
    
    const consoleVisible = Number(consoleHeight.replace("%", "")) > 7 ? true : false;

    const handleLangSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setLang([e.target.value.split(',')[0], e.target.value.split(',')[1]]);
    }

    const handleCodeChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
        value && setCode(value);
    }

    const handleFullScreen = () => {
        document.documentElement.requestFullscreen();
    }

    const handleConsoleToggle = () => {
        if (editorContainerHeight === "92%"){
            setEditorContainerHeight("20%");
            setEditorHeight("70%");
            setTimeout(() => setConsoleHeight("79%"), 35)
        } else {
            setTimeout(() => setEditorContainerHeight("92%"), 3);
            setTimeout(() => setEditorHeight("93%"), 2);
            setTimeout(() => setConsoleHeight("7%"), 1);
        }
    }

    const handleSubmitPublicTestCase = async () => {

        const body = {
            "source_code": code,
            "language_id": lang[1],
            "test_case": testCases,
        }

        try {
            const response = await Request('POST', '/submission', body);


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
        }

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    })

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

            // else if (event.ctrlKey && event.shiftKey && event.key === "I" || event.ctrlKey && event.shiftKey && event.key === "i") {
            //     event.preventDefault();
            //     return;
            // }
        };

        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        }

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyboardEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyboardEvent);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <>
        <div style={{ height: editorContainerHeight }} className={styles.top_container}>
            <div className={styles.options_container}>
                <div>
                    <div className={styles.select_container}>
                        <select className={styles.lang_select} onChange={handleLangSelect}>
                            {languages.map((lang) => (
                                <option key={lang.id} value={[lang.value, lang.id.toString()]}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <CiBookmark color="#a3a3a3" strokeWidth={'1px'} onClick={handleFullScreen}/>
                </div>
            </div>

            <div className={styles.editor_container} style={{ width: '100%', height: editorHeight }}>
                <OurEditor lang={lang[0]} onChange={handleCodeChange} />
            </div>
        </div>

        <div style={{ height: "1%" }}/>

        <div style={{ minHeight: consoleHeight }} className={styles.bottom_main_container}>
            {/* Top Container in the Console */}
            <div style={consoleVisible ? { display: "block" } : { display: "none" }} className={styles.top_container}>
                <div>
                    <div
                        style={{ height: "100%", display: "flex", alignItems: "center", cursor: "pointer"}}
                        className={ isTestTabActive ? styles.tab_title : "" }
                        onClick={() => {
                            setIsTestTabActive(true);
                            setIsResultTabActive(false)
                        }}>
                            Testcase</div>

                    <div
                        style={{ height: "100%", display: "flex", alignItems: "center", cursor: "pointer"}}
                        className={ isResultTabActive ? styles.tab_title : "" }
                        onClick={() => {
                            setIsTestTabActive(false);
                            setIsResultTabActive(true)
                        }}>
                            Result</div>
                </div>
            </div>

            {/* Middle Container in the Console */}
            <div style={consoleVisible ? { display: "block" } : { display: "none" }} className={styles.middle_container}>
                <div style={{ height: "100%"}}>
                    { isTestTabActive && <TestCase testCases={testCases} setTestCases={setTestCases}/> }
                    { isResultTabActive && <Result /> }
                </div>
            </div>

            {/* Bottom Container in the Console */}
            <div style={consoleVisible ? { height: "8%" } : { height: "100%" }} className={styles.bottom_container}>
                <div>
                    <button className={styles.console_button} onClick={handleConsoleToggle}>Console</button>
                </div>
                <div>
                    <button className={styles.run_button} onClick={handleSubmitPublicTestCase}>Run</button>
                    <button className={styles.submit_button}>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default RightContainer;