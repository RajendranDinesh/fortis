import { useState } from 'react';

import Table from './Table';
import Submission from './Submission';

const Submissions = () => {

    const [currentSubmissionId, setCurrentSubmissionId] = useState<number | null>(null);
    const [currentActiveTab, setCurrentActiveTab] = useState<'Table' | 'Submission'>('Table');

    const changeViewToSubmission = (id: number) => {
        setCurrentSubmissionId(id);
        setCurrentActiveTab('Submission');
    }

    return (
        <>
            {currentActiveTab === 'Table' && <Table changeViewToSubmission={changeViewToSubmission}  />}
            {currentActiveTab === 'Submission' && <Submission currentSubmissionId={currentSubmissionId} setCurrentActiveTab={setCurrentActiveTab} />}
        </>
    );
}

export default Submissions;