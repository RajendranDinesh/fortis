// external modules
import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// internal modules
import { blockStaff } from '../../controllers';

// assets
import styles from '../addStaffModal.module.css';
import { AxiosError, HttpStatusCode } from 'axios';

type staffDetails = {
    roll_no: string
    reason: string
}

export default function BlockModule() {
    const [staff, setStaff] = useState<staffDetails>({
        roll_no: '',
        reason: ''
    });

    const block = async () => {

        if (staff.reason.trim().length === 0) {
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
            await toast.promise(
                blockStaff(staff.roll_no, staff.reason),
                {
                    pending: `Blocking Staff (${staff.roll_no}).`,
                    success: "Blocked Staff.",
                    error: "Something went wrong",
                }, {
                    theme: "dark",
                }
            );
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
                `The Requested Staff's account remains intact, contact support if this persists.`,
                'error'
            )
        }

        if (!erred) {
            Swal.fire(
                'Blocked!',
                `The Requested Staff's account has been blocked.`,
                'success'
            )
        }
    }

    return (
        <div className={styles.view_container}>
            <div className={styles.title_container}>
                <div>
                    <h1 className={styles.staff_title}>Enter Staff Detail to Block</h1>
                </div>

                <div>
                    <input placeholder="Faculty Id" onChange={(e) => setStaff({...staff, roll_no: e.target.value})} value={staff?.roll_no} name="rollNumber" className={styles.name_input} autoComplete="off" autoCorrect="off" />
                </div>
            </div>
            <div>
                <div>
                    <textarea onChange={(e) => setStaff({...staff, reason: e.target.value})} placeholder="Reason" name="reason" className={styles.reason} autoComplete='off' />
                </div>
                <button className={styles.blockButton} onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: `This will block staff with Id ${staff.roll_no} for ${staff.reason}`,
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
