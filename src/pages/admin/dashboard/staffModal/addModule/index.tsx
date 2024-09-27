// Dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from '../addStaffModal.module.css';

// Components
import { addStaff } from '../../controllers';

import { staffDetails } from '..';

interface Props {
    handleModalClick: () => void
}

export default function AddModule({ handleModalClick }: Props) {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<staffDetails>({
        // do not change the field names as they are used in the backend
        email: '',
        userName: '',
        roll_no: '',
        password: '',
        role: 'staff'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitClick = async () => {

        const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/;

        if (!userDetails.email || !userDetails.userName || !userDetails.roll_no || !userDetails.password) {
            toast.error('Please fill all the fields', {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (!emailRegex.test(userDetails.email)) {
            toast.error('Enter only your organization Id', {
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        try {
            // the API call to add a new staff
            await addStaff(userDetails);

            toast.success(`User ${userDetails.userName} registered`, {
                autoClose: 2000,
                theme: "dark",
            });

            handleModalClick();

        } catch (error) {
            if ((error as any).response) {
                toast.error((error as any).response.data.error, {
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                toast.error((error as Error).message, {
                    autoClose: 2000,
                    theme: "dark",
                });
                navigate("/admin/dashboard", { replace: false });
            }
        }
    }
    return (
        <div className={styles.addStaffModal}>
            <h1>Enter Staff Details</h1>
            <div className={styles.details_container}>
                <div className={styles.left_container}>
                    <div className={styles.input_container}>
                        <h4>Name</h4>
                        <input name="userName" onChange={handleInputChange} value={userDetails.userName} autoComplete='off' />
                    </div>

                    <div className={styles.input_container}>
                        <h4>Email</h4>
                        <input name="email" onChange={handleInputChange} value={userDetails.email} autoComplete='off' />
                    </div>
                </div>

                <div className={styles.right_container}>
                    <div className={styles.input_container}>
                        <h4>Roll Number</h4>
                        <input name="roll_no" onChange={handleInputChange} value={userDetails.roll_no} autoComplete='off' />
                    </div>

                    <div className={styles.input_container}>
                        <h4>Password</h4>
                        <input name="password" onChange={handleInputChange} value={userDetails.password} type='password' autoComplete='off' />
                    </div>
                </div>
            </div>

            <div className={styles.add_staff_btn_container}>
                <button onClick={handleSubmitClick}>Add Staff</button>
            </div>
        </div>
    );
}