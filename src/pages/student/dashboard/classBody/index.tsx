import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getClassrooms } from '../controllers';

import styles from '../dashboard.module.css';

import { useParams } from 'react-router-dom';


interface studentClass {
    classroom_id: number
    name: string
    description: string
}

export default function ClassBody() {

    const navigate = useNavigate();
    const [studentClasses, setStudentClasses] = useState<studentClass[]>(
        [{
            classroom_id: 1,
            name: "Mathematics",
            description: "SF seminar Hall 1"
        },
        {
            classroom_id: 2,
            name: "Physics",
            description: "SF seminar Hall 2"
        },{
            classroom_id: 3,
            name: "Chemistry",
            description: "SF seminar Hall 3"
        }
        ]
    );
    const [loading, setLoading] = useState(false);

    const getStudentClassrooms = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

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
    }

    return (
        <div>
            <h2 className={styles.classHeading}>Your Classes</h2>
            <div className={styles.dashboard_classes}>
            {loading ? <div className={styles.dashboard_classes_content}>
                <p>You are not currently enrolled in any classes.</p>
            </div>
            :
                studentClasses && studentClasses.map((studentClass , index)=>
                <div className={styles.Classes_container}>
                    <div className={styles.Classroom_display} key={index} onClick={()=> handleClassNavigate(studentClass.classroom_id)}>
                        <div className={styles.Classroom_display_header}>
                        <h1>{studentClass.name}</h1>
                        </div>
                        <div className={styles.Classroom_display_footer}>
                        <p>{studentClass.description}</p>
                        </div>
                    </div>
                </div>
                )}
             {studentClasses.length >= 3 && (
                <button className={styles.view_all_button}>
                View All
                <div className={styles.arrow_wrapper}>
                    <div className={styles.arrow}></div>
                </div>
                </button>
            )}
        </div>
        </div>
    )
}