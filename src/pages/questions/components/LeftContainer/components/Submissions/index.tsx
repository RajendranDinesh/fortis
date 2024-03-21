import { useContext, useState } from 'react';

import Table from './Table';
import Submission from './Submission';

import { SubmissionContext } from '../../../../submissionContext';

const Submissions = () => {

    const { changeSubmissionId, currentActiveSubmissionTab, changeActiveSubmissionTab } = useContext(SubmissionContext);

    const changeViewToSubmission = (id: number) => {
        changeSubmissionId(id);
        changeActiveSubmissionTab('Submission');
    }

    return (
        <>
            {currentActiveSubmissionTab === 'Table' && <Table changeViewToSubmission={changeViewToSubmission}  />}
            {currentActiveSubmissionTab === 'Submission' && <Submission />}
        </>
    );
}

export default Submissions;