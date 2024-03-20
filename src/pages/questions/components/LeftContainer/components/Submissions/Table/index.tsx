import styles from '../submission.module.css';

export default function SubmissionTable({
    changeViewToSubmission
}: {
    changeViewToSubmission: (id: number) => void
}) {
    return (
        <div className={styles.submissions}>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Language</th>
                        <th>Run Time</th>
                        <th>Memory</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => changeViewToSubmission(1)}>
                        <td>Accepted</td>
                        <td>Python</td>
                        <td>50ms</td>
                        <td>17.2MB</td>
                    </tr>
                    <tr onClick={() => changeViewToSubmission(2)}>
                        <td>Accepted</td>
                        <td>Python</td>
                        <td>69ms</td>
                        <td>16.1MB</td>
                    </tr>
                    <tr onClick={() => changeViewToSubmission(3)}>
                        <td>Accepted</td>
                        <td>Python</td>
                        <td>42ms</td>
                        <td>21MB</td>
                    </tr>
                    <tr onClick={() => changeViewToSubmission(4)}>
                        <td>Accepted</td>
                        <td>Python</td>
                        <td>54ms</td>
                        <td>69MB</td>
                    </tr>
                    <tr onClick={() => changeViewToSubmission(5)}>
                        <td>Accepted</td>
                        <td>Python</td>
                        <td>21ms</td>
                        <td>4.2MB</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}