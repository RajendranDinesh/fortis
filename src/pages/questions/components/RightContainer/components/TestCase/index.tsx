import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import styles from './testcase.module.css';



type testCases = {
    id: number;
    name: string;
    input: string;
    output: string;
}[];

type props = {
    testCases: testCases,
    setTestCases: Dispatch<SetStateAction<testCases>>;
}

const TestCase = ({ testCases, setTestCases }: props) => {
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {}, [activeTab]);

    const handleRemoveTestCase = (id: number) => {

        const modifiedTestCases = testCases.filter((testCase) => testCase.id !== id).map((testCase, index) => {
            return {
                ...testCase,
                id: index,
                name: `Case ${index + 1}`
            };
        });

        setActiveTab(Math.min(activeTab, modifiedTestCases.length - 1));

        setTestCases(modifiedTestCases);
    };

    const handleAddTestCase = () => {
        const lastTestCase = testCases[testCases.length - 1];

        const newTestCase = {
            id: lastTestCase.id + 1,
            name: `Case ${lastTestCase.id + 2}`,
            input: "",
            output: ""
        };

        setTestCases([...testCases, newTestCase]);
    }

    const handleModifyTestCase = (id: number, field: string, value: string) => {
        const modifiedTestCases = testCases.map((testCase) => {
            if (testCase.id === id) {
                return {
                    ...testCase,
                    [field]: value
                };
            }
            return testCase;
        });

        setTestCases(modifiedTestCases);
    };

    return (
        <div className={styles.testcase_container}>
            <div className={styles.main_container}>
                <div className={styles.tab_container}>
                    {testCases.map((testCase) => (
                        <div key={testCase.id}>
                            <button
                                className={ activeTab === testCase.id ? styles.active_tab : ""}
                                onClick={() => setActiveTab(testCase.id)}
                            >{testCase.name}</button>
                            <label style={ testCases.length === 1 ? { display: "none" } : {} } onClick={() => handleRemoveTestCase(testCase.id)}>X</label>
                        </div>
                    ))}
                    <div>
                        {testCases.length <= 4 && <button onClick={handleAddTestCase}>+</button> }
                    </div>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.input_container}>
                        <label>Input</label>
                        <textarea
                            value={testCases[activeTab].input}
                            onChange={(e) => handleModifyTestCase(activeTab, 'input', e.target.value)}
                            placeholder="Enter test case input"
                        />
                    </div>
                    <div className={styles.input_container}>
                        <label>Output</label>
                        <textarea
                            value={testCases[activeTab].output}
                            onChange={(e) => handleModifyTestCase(activeTab, 'output', e.target.value)}
                            placeholder="Enter test case output"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TestCase;