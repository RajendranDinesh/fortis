import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Request } from '../../../../../../networking';

import styles from './result.module.css';



type testCases = {
    id: number;
    name: string;
    input: string;
    output: string;
}[];

type props = {
    testCases: testCases,
    token: string[]
}

type results = {
    status: {
        id: number;
        description: string;
    };
    time: number;
    memory: number;
    stdin: string;
    stdout: string;
    expected_output: string;
};

const Result = ({ token }: props) => {

    const [activeTab, setActiveTab] = useState(0);
    const [results, setResults] = useState<results[]>([
        {
            status: {
                id: 0,
                description: ""
            },
            time: 0,
            memory: 0,
            stdin: "",
            stdout: "",
            expected_output: ""
        }
    ]);

    useEffect(() => {
        const tokenString = token.length === 1 ? token[0] : token.join(",");

        const params = { "tokens": tokenString };
        
        const getResults = async () => {
            try {
                const response = await Request("GET", `/submission`, null, params);
                setResults(response.data.submissions);

                response.data.submissions.forEach((result: results, index: number) => {
                    if (result.status.id === 1 || result.status.id === 2) {
                        setTimeout(() => getResults(), 4000);
                    }
                });

            } catch (error) {
                console.log(error);
            }
        };

        if (token.length !== 0) {
            getResults();
        }
    }, [token])

    return (
        <div className={styles.result_container}>
            <SkeletonTheme baseColor="#272727" highlightColor="#3f3f3f">
                {token.length === 0 ? 
                <div className={styles.main_container}>You must run your code first</div> :
                <div className={styles.main_container}>
                    <div className={styles.verdict_container}>
                        <div style={ results[activeTab].status.id === 3 ? { color: "#2cb75c" } : results[activeTab].status.id === 2 || results[activeTab].status.id === 1 ? { color: "#f39b18" } : { color: "#e24441" }}>
                                {results[activeTab].status.description}
                        </div>
                        <div style={{ width: "25%" }}>
                            { results[activeTab].status.id === 3 || results[activeTab].status.id === 4 ?
                                `Runtime: ${results[activeTab].time}ms` :
                                <Skeleton style={{"height": "30px"}} />
                            }
                        </div>
                        <div style={{ width: "40%" }}>
                            { results[activeTab].status.id === 3 || results[activeTab].status.id === 4 ?
                                `Memory consumed: ${results[activeTab].memory} bytes` :
                                <Skeleton style={{"height": "30px"}} />
                            }
                        </div>
                    </div>

                    <div className={styles.tab_container}>
                        { results[activeTab].status.description.length === 0 ?
                        <Skeleton height={"30px"} width={"100px"} /> : results.map((result, index) => (
                            <div key={index}>
                                <button
                                    className={ activeTab === index ? styles.active_tab : ""}
                                    onClick={() => setActiveTab(index)}>
                                        <div style={{ borderRadius: "50%", width: "6px", height: "6px", backgroundColor: result.status.id === 3 ? "#2cb75c" : result.status.id === 2 || result.status.id === 1 ? "#f39b18" : "#e24441" }} />
                                        Case {index+1}
                                </button>
                            </div>))}
                    </div>

                    <div className={styles.inputs}>
                        {/* Inputs */}
                        <div className={styles.input_container}>
                            <label>Input</label>
                            { results[activeTab].status.id === 3 || results[activeTab].status.id === 4 ?
                            <textarea
                                value={atob(results[activeTab].stdin) || "No input"}
                                disabled
                            /> : <Skeleton height={"60px"} />}
                        </div>

                        {/* Output by user's code */}
                        <div className={styles.input_container}>
                            <label>Output</label>
                            { results[activeTab].status.id === 3 || results[activeTab].status.id === 4 ?
                            <textarea
                                value={atob(results[activeTab].stdout) || "No output"}
                                disabled
                            /> : <Skeleton height={"60px"} />}
                        </div>

                        {/* Expected output */}
                        <div className={styles.input_container}>
                            <label>Expected output</label>
                            { results[activeTab].status.id === 3 || results[activeTab].status.id === 4 ?
                            <textarea
                                value={atob(results[activeTab].expected_output) || "No expected output"}
                                disabled
                            /> : <Skeleton height={"60px"} />}
                        </div>
                    </div>
                </div>}
            </SkeletonTheme>
        </div>
    );
}

export default Result;