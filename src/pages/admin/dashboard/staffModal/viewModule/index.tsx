import { useEffect, useState } from "react";

import styles from '../addStaffModal.module.css';

import { getStaffs } from '../../controllers';
import { toast } from "react-toastify";

type staffDetails = {
    email: string
    user_name: string
    roll_no: string
}

export default function ViewModule() {
    const [staff, setStaff] = useState<staffDetails[]>([]);

    const getSetStaff = async () => {
        try {
            const data = await getStaffs();

            setStaff(data.staffs);
        } catch (error) {
            toast.error((error as any).response.data.error, {
                autoClose: 2000,
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        getSetStaff();
    }, [])

    return(
        <div className={styles.view_container}>
            {staff.length > 0 ? 
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Staff Id</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staff, index) => (
                        <tr key={index}>
                            <td>{staff.user_name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.roll_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table> : <>No staffs to show</>}
        </div>
    );
}