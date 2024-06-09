import { useEffect, useState } from 'react';
import styles from '../Classroom.module.css';
import { getClassroomTeachers } from '../Controllers';
import { useParams } from 'react-router-dom';

interface Teacher {
    user_id: Number;
    user_name: String;
    roll_no: String;
    email: String;
}

export default function TeacherList() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([{user_id: 0, user_name: '', roll_no: '', email: ''}]);

    const getSetData = async (id: Number) => {
        setIsLoading(true);
        try {
            const data = await getClassroomTeachers(id);
            setTeachers(data);
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
            <div className={styles.Teacher_header_grid}>
                <div className={styles.Teacher_grid_title}>Sl.no</div>
                <div className={styles.Teacher_grid_title}>Name</div>
                <div className={styles.Teacher_grid_title}>Faculty Id</div>
                <div className={styles.Teacher_grid_title}>Email</div>
            </div>
            {teachers.map((teacher: Teacher, index) => {
            return (<div className={styles.Teacher_header_grid} key={index}>
                <div className={styles.Teacher_grid_title}>{index+1}</div>
                <div className={styles.Teacher_grid_title}>{teacher.user_name}</div>
                <div className={styles.Teacher_grid_title}>{teacher.roll_no}</div>
                <div className={styles.Teacher_grid_title}>{teacher.email}</div>
            </div>)})}
        </>
    );
}