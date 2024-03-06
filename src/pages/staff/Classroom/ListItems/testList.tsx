import { useEffect, useState } from 'react';
import styles from '../Classroom.module.css';
import { getClassroomTests } from '../Controllers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Test {
    title: string;
    duration_in_minutes: number;
}

export default function TestList() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState<Test[]>([{title: "", duration_in_minutes: 0}]);

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
            </div>
            {tests.length > 0 ? tests.map((test: Test, index) => {
            return (<div className={styles.Test_list_grid} key={index}>
                <div className={styles.Test_grid_title}>{index+1}</div>
                <div className={styles.Test_grid_title}>{test.title}</div>
                <div className={styles.Test_grid_title}>{test.duration_in_minutes}</div>
            </div>)}) : <>No tests schedules for this class</>}
        </>
    );
}