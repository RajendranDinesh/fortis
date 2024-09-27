// external modules
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// internal modules
import { getBlockedStudents, unBlockStudents } from '../../controllers';

// assets
import styles from '../addStudent.module.css';
import Swal from 'sweetalert2';
import { AxiosError, HttpStatusCode } from 'axios';

type studentDetails = {
    user_name: string
    roll_no: string
    reason: string
    block_id: number
}

export default function UnBlockModule() {
    const [original, setOriginal] = useState<studentDetails[]>([]);
    const [students, setStudents] = useState<studentDetails[]>([]);
    const [studentSearch, setStudentSearch] = useState<string>('');

    const getSetStudent = async () => {
        try {
            const data = await getBlockedStudents();

            setOriginal(data.students);
            setStudents(data.students);
        } catch (error) {
            toast.error((error as any).response.data.error, {
                autoClose: 2000,
                theme: "dark",
            });
        }
    }

    const changeInSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        setStudentSearch(e.target.value);

        if (e.target.value.trim().length == 0) {
            setStudents(original);
        } else {
            setStudents(original.filter(item => {
                if (item.user_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.roll_no.toLowerCase().includes(e.target.value.toLowerCase())) return item
        }))
        }
    }

    const unblock = async (blockId: number) => {

        let erred = false;

        try {
            await unBlockStudents(blockId);
        } catch (error) {
            erred = true;

            if ((error as AxiosError).response?.status === HttpStatusCode.NotFound) {

                Swal.fire(
                    'Failed!',
                    `${(error as any).response.data.error}.`,
                    'error'
                );

                return;
            }

            Swal.fire(
                'Failed!',
                `The Requested Student's account remains intact, contact support if this persists.`,
                'error'
            )
        }

        if (!erred) {
            Swal.fire(
                'Unblocked!',
                `The Requested Student's account has been reinstantiated.`,
                'success'
            )
        }

        await getSetStudent();
    }

    useEffect(() => {
        getSetStudent();
    }, [])

    return (
        <div className={styles.view_container}>
            <div className={styles.title_container}>
                <div>
                    <h1 className={styles.staff_title}>Students</h1>
                    {students.length != 0 && <p>The list of students whose id is in block state.</p>}
                </div>

                <div>
                    <input placeholder="Search" onChange={changeInSearch} value={studentSearch} name="studentName" className={styles.name_input} autoComplete="off" autoCorrect="off" />
                </div>
            </div>

            {students.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Student Id</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, id) =>
                    <tr key={id}>
                        <td>{id+1}</td>
                        <td>{student.user_name}</td>
                        <td>{student.roll_no}</td>
                        <td>{student.reason}</td>
                        <td><button onClick={() => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: `This will unblock student ${student.user_name} with Id ${student.roll_no}`,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: 'green',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, unblock it!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                unblock(student.block_id);
                                            }
                                        })
                                    }}>Unblock</button></td>
                    </tr>)}
                </tbody>
            </table>
            : <>No students to show</>}
        </div>
    );
}
