import { toast } from 'react-toastify';
import { getClassrooms } from '../controllers';
import styles from '../dashboard.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface studentClass {
    classroom_id: number
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

export default function StudentBody() {

    const navigate = useNavigate();
    const [studentClasses, setStudentClasses] = useState<studentClass[]>();
    const [loading, setLoading] = useState(false);

    const getStudentClassrooms = async () => {
        try {
            setLoading(true);
            const resposne = await getClassrooms();
            setStudentClasses(resposne.data);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching your classes.", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleClassNavigate = (classroomId: number) => {
        navigate(`/student/class/${classroomId}`);
    };

    useEffect(() => {
        getStudentClassrooms();
    }, []);

    return (
        <div className={styles.dashboard_classes}>
            <h2>Your Classes</h2>
            {loading ? <div className={styles.dashboard_classes_content}>
                <p>You are not currently enrolled in any classes.</p>
            </div>
                :
                studentClasses && studentClasses.map((studentClass, index) =>
                    <div className={styles.classes_container} key={index}>
                        <div className={styles.class_card}>
                            <div className={styles.class_card_header}>
                                <h3>{studentClass.name}</h3>
                            </div>
                            <div className={styles.class_card_footer}>
                                <p>{studentClass.description}</p>
                                <button className={styles.view_button} onClick={() => handleClassNavigate(studentClass.classroom_id)}>View details</button>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}