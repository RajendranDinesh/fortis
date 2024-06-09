import { useState } from "react";

import styles from '../addStaffModal.module.css'

type staffDetails = {
    email: string
    userName: string
    facultyId: string
}

export default function ViewModule() {
    const [staff, setStaff] = useState<staffDetails[]>([]);

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
                            <td>{staff.userName}</td>
                            <td>{staff.email}</td>
                            <td>{staff.facultyId}</td>
                        </tr>
                    ))}
                </tbody>
            </table> : <>No staffs to show</>}
        </div>
    );
}