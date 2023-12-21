import { Dispatch, SetStateAction, useState } from 'react';

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

    const handleRemoveTestCase = (id: number) => {
        const newTestCases = testCases.filter((testCase) => testCase.id !== id);
        setTestCases(newTestCases);
        setActiveTab(newTestCases[newTestCases.length - 1].id);
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
                        <button onClick={handleAddTestCase}>+</button>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TestCase;