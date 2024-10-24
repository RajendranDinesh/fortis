import { useEffect, useState } from 'react';
import styles from '../Classroom.module.css';
import { getClassroomTests, cancelScheduledTest } from '../Controllers';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Test {
    id: number;
    test_id: number;
    title: string;
    duration_in_minutes: number;
    scheduled_at: string;
}

export default function TestList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState<Test[]>();

    const getSetData = async (id: Number) => {
        try {
            setIsLoading(true);
            const data = await getClassroomTests(id);
            setTests(data);
        } catch (error) {
            toast.error("Error fetching tests");
        } finally {
            setIsLoading(false);
        }
    };

    const cancelTest = async (scheduledId: Number) => {
        try {
            setIsLoading(true);

            await cancelScheduledTest(Number(id), scheduledId);

            toast.success("Test deleted successfully", {
                theme: "dark",
                autoClose: 3000,
                hideProgressBar: true,
            });

        } catch (error) {
            toast.error("Error deleting test");
        } finally {
            getSetData(Number(id));
            setIsLoading(false);
        }
    }

    const handleTestNavigate = (id: Number) => {
        navigate(`/staff/test/${id}`);
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
                <div className={styles.Test_grid_title}>Actions</div>
            </div>
            {tests && tests.length > 0 ? tests.map((test: Test, index) => {
                return (
                    <div className={styles.Test_list_grid} key={index} onClick={() => handleTestNavigate(test.test_id)}>
                        <div className={styles.Test_grid_title}>{index + 1}</div>
                        <div className={styles.Test_grid_title}>{test.title}</div>
                        <div className={styles.Test_grid_title}>{test.duration_in_minutes}</div>
                        <div className={styles.Test_grid_title}>{new Date(test.scheduled_at).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</div>
                        <div className={styles.Test_grid_title} onClick={(e) => e.stopPropagation()}>
                            <button
                                className={styles.Test_grid_button}
                                onClick={() => cancelTest(Number(test.id))}
                            >Cancel</button>
                        </div>
                    </div>)
            }) : <>No tests schedules for this class</>}
        </>
    );
}