// Dependencies

import React, { useState } from "react";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../StaffDashboard.module.css";

// Assets
import { MdDeleteOutline } from "react-icons/md";


interface ClassRoom {
    classroom_id: number
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

interface Props {
    classroomList: ClassRoom[];
    getClassrooms: () => void;
}

interface DeletePayload {
    classroomId: number
}

function Body({ classroomList, getClassrooms }: Props) {

    const handleDelete = async ({ classroomId }: DeletePayload) => {
        try {
            const response = await Request(
                "DELETE",
                `/classroom/${classroomId}`,
            );

            if (response.status === HttpStatusCode.Ok) {
                toast.success(response.data.message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                getClassrooms();
            }

        } catch (error) {
            alert(error);
        }
    }

    useState(() => {
        getClassrooms();
    });

    const navigate = useNavigate();

    const changeClassRoom = () => {
        navigate("/staff/classroom");
    }

    return (
        <React.Fragment>
            {classroomList.map((classroom) => {
            return (
                <div>
                    <div className={styles.Classroom_display}>
                        <div className={styles.Classroom_display_header} onClick={changeClassRoom}>
                            <h1>{classroom.name}</h1>
                        </div>
                        <div className={styles.Classroom_display_footer}>
                            <MdDeleteOutline id={styles.bin} onClick={() => handleDelete({ classroomId: classroom.classroom_id })}/>
                        </div>
                    </div>
                </div>
                )})}
        </React.Fragment>
    );
}

export default Body;