import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getClassrooms } from '../controllers';

import styles from '../dashboard.module.css';

interface studentClass {
    classroom_id: number;
    name: string;
    description: string;
}

export default function ClassBody() {
    const navigate = useNavigate();
    const [studentClasses, setStudentClasses] = useState<studentClass[]>([]);

    const getStudentClassrooms = async () => {
        try {
            const response = await getClassrooms();
            const classrooms = response.data.classrooms;
            setStudentClasses(classrooms);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching your classes.", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        }
    };

    const handleClassNavigate = (classroomId: number) => {
        navigate(`/student/class/${classroomId}`);
    };

    useEffect(() => {
        fetchclassrooms();
    }, []);

    const fetchclassrooms = async () => {
        try {
            const response = await getClassrooms();
            setStudentClasses(response.data.classrooms.map((classroom: any) => classroom));
        } catch (error) {
            console.log(error);
        }
    };

    if (studentClasses.length === 0) {
        return (
            <div className={styles.no_content_container}>
            <h1 className={styles.classHeading}>Your classes</h1>
            <p className={styles.no_content_message}>You are not currently enrolled in any Classes.</p>
            </div>
        );
    }

    return (
        <div className={styles.classCardContainer}>
            <h1 className={styles.classHeading}>Your Classes</h1>
            <div className={styles.dashboard_classes}>
                {studentClasses.map((studentClass, index) => (
                    <div className={styles.Classes_container} key={index}>
                        <div
                            className={styles.Classroom_display}
                            onClick={() => handleClassNavigate(studentClass.classroom_id)}
                        >
                            <div className={styles.Classroom_display_header}>
                                <h1>{studentClass.name}</h1>
                            </div>
                            <div className={styles.Classroom_display_footer}>
                                <p>{studentClass.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}