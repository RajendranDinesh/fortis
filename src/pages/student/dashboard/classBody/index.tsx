import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getClassrooms } from '../controllers';

import styles from '../dashboard.module.css';


interface studentClass {
    classroom_id: number
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

export default function ClassBody() {

    const navigate = useNavigate();
    const [studentClasses, setStudentClasses] = useState<studentClass[]>(
        [{
            classroom_id: 1,
            name: "Mathematics",
            description: "SF seminar Hall 1",
            updated_at: new Date(),
            created_at: new Date()
        },
        {
            classroom_id: 2,
            name: "Physics",
            description: "SF seminar Hall 2",
            updated_at: new Date(),
            created_at: new Date()
        },{
            classroom_id: 3,
            name: "Chemistry",
            description: "SF seminar Hall 3",
            updated_at: new Date(),
            created_at: new Date()
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
        getStudentClassrooms();
    }, []);

    return (
        <div>
            <h2 className={styles.classHeading}>Your Classes</h2>
            {loading ? 
                <div className={styles.dashboard_classes_content}>
                    <p>You are not currently enrolled in any classes.</p>
                </div>
                :
                <div className={styles.dashboard_classes}>
                    {studentClasses && studentClasses.map((studentClass , index)=>
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
    
                </div>
            }
        </div>
    )
}