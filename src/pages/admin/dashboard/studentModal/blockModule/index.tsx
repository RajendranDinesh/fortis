// external modules
import { useState } from 'react';
import Swal from 'sweetalert2';
import { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

// internal modules
import { blockStudent } from '../../controllers';

// assets
import styles from '../addStudent.module.css';

type studentDetails = {
    roll_no: string
    reason: string
}

export default function BlockModule() {
    const [student, setStudent] = useState<studentDetails>({
        roll_no: '',
        reason: ''
    });

    const block = async () => {

        if (student.reason.trim().length === 0) {
            toast.error("Reason can not be empty",
                {
                    autoClose: 2000,
                    theme: "dark",
                }
            );
            
            return;
        }

        let erred = false;

        try {
            await blockStudent(student.roll_no, student.reason);
        } catch (error) {
            erred = true;

            const response = (error as AxiosError).response;

            if (response && response.status === HttpStatusCode.NotFound) {
                Swal.fire(
                    'Failed!',
                    `${(response.data as {error: string}).error}.`,
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
                'Blocked!',
                `The Requested Student's account has been blocked.`,
                'success'
            )
        }
    }

    return (
        <div className={styles.view_container}>
            <div className={styles.title_container}>
                <div>
                    <h1 className={styles.staff_title}>Enter Student Detail to Block</h1>
                </div>

                <div>
                    <input placeholder="Roll Number" onChange={(e) => setStudent({...student, roll_no: e.target.value})} value={student?.roll_no} name="rollNumber" className={styles.name_input} autoComplete="off" autoCorrect="off" />
                </div>
            </div>
            <div>
                <div>
                    <textarea onChange={(e) => setStudent({...student, reason: e.target.value})} placeholder="Reason" name="reason" className={styles.reason} autoComplete='off' />
                </div>
                <button className={styles.blockButton} onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: `This will block student with Id ${student.roll_no} for ${student.reason}`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'green',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, block it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            block();
                        }
                    })
                }}>Block</button>
            </div>
        </div>
    );
}
