// external modules
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

// internal modules
import { getBlockedStaffs, unBlockStaff } from '../../controllers';

// assets
import styles from '../addStaffModal.module.css';
import { FaSpinner } from 'react-icons/fa';

type staffDetails = {
    user_name: string
    roll_no: string
    reason: string
    block_id: number
}

export default function UnBlockModule() {
    const [original, setOriginal] = useState<staffDetails[]>([]);
    const [staffs, setStaff] = useState<staffDetails[]>([]);
    const [staffSearch, setStaffSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const getSetStaff = async () => {
        setIsLoading(true);

        try {
            const data = await getBlockedStaffs();

            setOriginal(data.staffs);
            setStaff(data.staffs);
        } catch (error) {
            const response = (error as AxiosError).response;

            if (response)
            {
                toast.error((response.data as {error: string}).error, {
                    autoClose: 2000,
                    theme: "dark",
                });
            } else
            {
                toast.error("Could not establish a connection to the server, Contact developer ASAP.", {
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        }

        setIsLoading(false);
    }

    const changeInSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        setStaffSearch(e.target.value);

        if (e.target.value.trim().length == 0) {
            setStaff(original);
        } else {
            setStaff(original.filter(item => {
                if (item.user_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.roll_no.toLowerCase().includes(e.target.value.toLowerCase())) return item
        }))
        }
    }

    const unblock = async (blockId: number) => {

        let erred = false;

        try {
            await toast.promise(
                unBlockStaff(blockId),
                {
                    pending: `Un blocking Staff.`,
                    success: "Un blocked Staff.",
                    error: "Something went wrong",
                }, {
                    theme: "dark",
                }
            );
        } catch (error) {
            erred = true;

            Swal.fire(
                'Failed!',
                `The Requested Staff's account remains intact, contact support if this persists.`,
                'error'
            )
        }

        if (!erred) {
            Swal.fire(
                'Unblocked!',
                `The Requested Staff's account has been reinstantiated.`,
                'success'
            )
        }

        await getSetStaff();
    }

    useEffect(() => {
        getSetStaff();
    }, [])

    return (
        <div className={styles.view_container}>
            <div className={styles.title_container}>
                <div>
                    <h1 className={styles.staff_title}>Staffs</h1>
                    {staffs.length != 0 && <p>The list of staffs whose id is in block state.</p>}
                </div>

                <div>
                    <input placeholder="Search" onChange={changeInSearch} value={staffSearch} name="staffName" className={styles.name_input} autoComplete="off" autoCorrect="off" />
                </div>
            </div>

            {staffs.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Staff Id</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((staff, id) =>
                    <tr key={id}>
                        <td>{id+1}</td>
                        <td>{staff.user_name}</td>
                        <td>{staff.roll_no}</td>
                        <td>{staff.reason}</td>
                        <td><button onClick={() => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: `This will unblock staff ${staff.user_name} with Id ${staff.roll_no}`,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: 'green',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, unblock it!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                unblock(staff.block_id);
                                            }
                                        })
                                    }}>Unblock</button></td>
                    </tr>)}
                </tbody>
            </table>
            : isLoading ? <FaSpinner className="spinner" /> : <>No staffs to show</>}
        </div>
    );
}
