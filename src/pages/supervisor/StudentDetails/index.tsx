import { useEffect, useState } from 'react';

import styles from './studentsdetails.module.css';
import { toast , Bounce, ToastContainer } from "react-toastify";

interface Student {
    id: number;
    name: string;
    tabCount: number;
    blocked: boolean;
    status: string;
  };

  const initialStudents: Student[] = [
    { id: 1, name: 'Adesh', tabCount: 4, blocked: false, status: 'Active' },
    { id: 2, name: 'Monkey D Luffy', tabCount: 0, blocked: true, status: 'Blocked' },
    { id: 3, name: 'Roronoa Zoro', tabCount: 1, blocked: false, status: 'Active' },
    { id: 4, name: 'Black Foot Sanji', tabCount: 2, blocked: true, status: 'Blocked' }
  ];

const StudentDetailsPage = () => {

    const [active, setActive]= useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student[] | null>(null);
    const [students, setStudents] = useState<Student[] | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isBlockInputEnabled, setIsBlockInputEnabled] = useState(false);

    const handleActivestudents = () =>{
        setActive(true);
    };

    const handleBlockedStudents = () =>{
        setActive(false);
    };

      useEffect(()=>{
            setStudents(initialStudents);
      } ,[])


      const toggleBlock = (id: number) => {
        if (!students) return;
    
        const updatedStudents = students.map((student: Student) => {
          if (student.id === id) {
            return { ...student, blocked: !student.blocked, status: student.blocked ? 'Active' : 'Blocked' };
          }
          return student;
        });
        setStudents(updatedStudents);

        const clickedStudent = updatedStudents.find(student => student.id === id);
        setIsBlockInputEnabled(clickedStudent?.blocked || false);

        if(!clickedStudent?.blocked){
            toast.success('Student Unblocked!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                transition: Bounce,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
      };
      

      const handleStudentClick = (id: number) => {
        const clickedStudent = students?.find(student => student.id === id);
        setSelectedStudent(clickedStudent ? [clickedStudent] : null);

      };

      const handleSubmitBlock = () => {
        // Perform any action you want when the block reason is submitted
        console.log('Block reason submitted:', inputValue);
      
        // Optionally, you can reset the input field and disable it after submission
        toast.error('Student Blocked!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Bounce,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        setInputValue('');
        setIsBlockInputEnabled(false);
      };
      

    return (
        <div className={styles.main_container}>
            <div className={styles.header}>
                <h1 className={styles.test_name}>Python Prgramming Test</h1>
                <div className={styles.header_right}>
                        <h2 className={styles.status}> Total Students : 128</h2>
                        <button>Attendence</button>
                </div>
            </div>
            <div className={styles.body_container}>
                <div className={styles.right_container}>
                    <div className={styles.heading_container}>
                        {/* <input  className={styles.uicheckbox}type="checkbox" ></input> */}
                        <h1>S.No</h1>
                        <h1>Student Name</h1>
                        <div className = {styles.count_container}>
                            <h1>Tab Count</h1>
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <button className={`${styles.left_buttons} ${active ? styles.active : ''}`} onClick={handleActivestudents}>Active  Students</button>
                        <button className={`${styles.left_buttons} ${!active ? styles.active : ''}`} onClick={handleBlockedStudents}>Blocked Students</button>
                    </div>
                {active && students?.map(student => (
                    !student.blocked && (
                    <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                        <div><h1 className={styles.student_index}>{student.id}.</h1></div>
                        <h1 className={styles.student_name}>{student.name}</h1>
                        <h1 className={styles.tab_count}>{student.tabCount}</h1>
                    </div>
                    )
                    ))}
                {!active && students?.map(student => (
                    student.blocked && (
                        <div key={student.id} className={styles.student_container} onClick={() => handleStudentClick(student.id)}>
                            <div><h1 className={styles.student_index}>{student.id}.</h1></div>
                            <h1 className={styles.student_name}>{student.name}</h1>
                            <h1 className={styles.tab_count}>{student.tabCount}</h1>
                        </div>
                    )
                ))}
                </div>
                <div className={styles.middle_container}>
                    {selectedStudent &&(
                          <div className={styles.content_container}>
                          <div className={styles.content_student}>
                          <h1 className={styles.content_details}>Student Name :</h1>
                          <h1 className={styles.content_details}>{selectedStudent[0].name}</h1>
                          </div>
                          <div className={styles.content_student}>
                          <h1 className={styles.content_details}>Block:</h1>
                          <button onClick={() => toggleBlock(selectedStudent[0].id)}>
                                {selectedStudent[0].blocked ? 'Unblock' : 'Block'}
                            </button>
                          </div>
                          {isBlockInputEnabled && (
                            <div className={styles.block_input_container}>
                                <h1 className={styles.content_details}>Reason:</h1>
                                <input
                                type="text"
                                className={styles.block_input}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button onClick = {handleSubmitBlock}>Submit</button>
                            </div>
                            )}
                          <div className={styles.content_student}>
                          <h1 className={styles.content_details}>Tab Switch Count :</h1>
                          <h1 className={styles.tab_count}>{selectedStudent[0].tabCount}</h1>
                          </div>
                          <div className={styles.content_student}>
                          <h1 className={styles.content_details}>Status :</h1>
                          <h1 className={styles.status}>{selectedStudent[0].status}</h1>
                          </div>
                      </div>
                    )
                    }

                </div>
        </div>
        <ToastContainer/>
        </div>
    );
    }

export default StudentDetailsPage;