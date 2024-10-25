import { useEffect, useState } from 'react';
import styles from '../Classroom.module.css';
import { getClassroomCompletedTests } from '../Controllers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TestStatsModal from '../Modals/showStats';

interface Test {
    id: number;
    test_id: number;
    test_title: string;
    test_duration: number;
    scheduled_time: string;
}

export default function TestList() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState<Test[]>();
    const [statsmodal, setStatsModal] = useState(false);

    const getSetData = async (id: Number) => {
        try {
            setIsLoading(true);
            const data = await getClassroomCompletedTests(id);
            setTests(data);
        } catch (error) {
            toast.error("Error fetching tests");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestClick = () => {
        setStatsModal(!statsmodal);
    }

    useEffect(() => {
        const classRoomId = Number(id);
        getSetData(classRoomId);
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.Test_header_grid}>
                <div className={styles.Test_grid_title}>Sl.no</div>
                <div className={styles.Test_grid_title}>Test Title</div>
                <div className={styles.Test_grid_title}>Duration (in mins)</div>
                <div className={styles.Test_grid_title}>Date & Time</div>
            </div>
            {tests && tests.length > 0 ? tests.map((test: Test, index) => {
                return (
                    <>
                    <div className={styles.Test_list_grid} key={index} onClick={handleTestClick}>
                        <div className={styles.Test_grid_title}>{index + 1}</div>
                        <div className={styles.Test_grid_title}>{test.test_title}</div>
                        <div className={styles.Test_grid_title}>{test. test_duration}</div>
                        <div className={styles.Test_grid_title}>{new Date(test.scheduled_time).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</div>
                    </div>
                    <TestStatsModal isOpen={statsmodal} onClose={handleTestClick} setModalOpen = {setStatsModal} />
                    </>
                )
            }) : <>No tests schedules for this class</>}
        </>
    );
}