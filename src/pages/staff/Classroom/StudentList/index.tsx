import { useEffect, useState } from 'react';
import styles from '../Classroom.module.css';
import { getClassroomStudents } from '../Controllers';
import { useParams } from 'react-router-dom';

interface Student {
    user_id: Number;
    user_name: String;
    roll_no: String;
    email: String;
}

export default function StudentList() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState<Student[]>([{user_id: 0, user_name: '', roll_no: '', email: ''}]);

    const getSetData = async (id: Number) => {
        setIsLoading(true);
        try {
            const data = await getClassroomStudents(id);
            setStudents(data);
        } catch (error) {
            
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
            <div className={styles.Student_header_grid}>
                <div className={styles.Student_grid_title}>Sl.no</div>
                <div className={styles.Student_grid_title}>Name</div>
                <div className={styles.Student_grid_title}>Roll.No</div>
                <div className={styles.Student_grid_title}>Email</div>
            </div>
            {students.map((student: Student, index) => {
            return (<div className={styles.Student_list_grid} key={index}>
                <div className={styles.Student_grid_title}>{index}</div>
                <div className={styles.Student_grid_title}>{student.user_name}</div>
                <div className={styles.Student_grid_title}>{student.roll_no}</div>
                <div className={styles.Student_grid_title}>{student.email}</div>
            </div>)})}
        </>
    );
}