import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FaSpinner } from "react-icons/fa";
import styles from '../addStudent.module.css';

import { getStudents } from '../../controllers';

type staffDetails = {
    email: string
    user_name: string
    roll_no: string
    created_at: string
    status: number
    class_count: number
    test_assigned: number
    test_created: number
}

export default function ViewModule() {
    const [original, setOriginal] = useState<staffDetails[]>([]);
    const [staff, setStaff] = useState<staffDetails[]>([]);
    const [staffSearch, setStaffSearch] = useState<string>('');

    const [isLoading, setIsLoading] = useState(false);

    const getSetStaff = async () => {
        
        setIsLoading(true);

        try {
            const data = await getStudents();

            setOriginal(data.staffs);
            setStaff(data.staffs);
        } catch (error) {
            toast.error((error as any).response.data.error, {
                autoClose: 2000,
                theme: "dark",
            });
        }

        setIsLoading(false);
    }

    const changeInSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setStaffSearch(e.target.value);

        if (e.target.value.trim().length === 0) {
            setStaff(original);
        } else {
            setStaff(original.filter(item => {
                if (item.user_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.split('@')[0].toLowerCase().includes(e.target.value.toLowerCase()) || item.roll_no.toLowerCase().includes(e.target.value.toLowerCase())) return item
        }))
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        getSetStaff();
    }, [])

    return(
        <div className={styles.view_container}>
            <div className={styles.title_container}>
                <h1 className={styles.staff_title}>Student</h1>
                <div>
                    <input placeholder="Search" onChange={changeInSearch} value={staffSearch} name="staffName" className={styles.name_input} autoComplete="off" autoCorrect="off" />
                </div>
            </div>
            {staff.length > 0 ? 
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Student Id</th>
                        <th>Joined On</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staff, index) => (
                        <tr key={index}>
                            <td>{staff.user_name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.roll_no}</td>
                            <td>{new Date(staff.created_at).toString().split(" ", 5).join(" ")}</td>
                            <td>{staff.status === 1 ? 'Active' : 'In Active'}</td>
                        </tr>
                    ))}
                </tbody>
            </table> : isLoading ? <FaSpinner className="spinner" /> : <>No students to show</>}
        </div>
    );
}