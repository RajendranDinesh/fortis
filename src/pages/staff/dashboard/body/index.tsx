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
import { ClassRoom, TestType } from "..";

interface Props {
    classroomList: ClassRoom[];
    testList: TestType[];
    getClassrooms: () => void;
    getTests: () => void;
}

interface DeletePayload {
    classroomId: number
}

function Body({ classroomList, getClassrooms, testList, getTests }: Props) {

    const navigate = useNavigate();

    const handleDeleteClassroom = async ({ classroomId }: DeletePayload) => {
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
            toast.error((error as any).response.data.message, {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        }
    }

    const handleDeleteTest = async (testId: number) => {
        try {
            const response = await Request(
                "DELETE",
                `/test/${testId}`,
            );

            if (response.status === HttpStatusCode.Ok) {
                toast.success(response.data.message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                getTests();
            }

        } catch (error) {
            toast.error((error as any).response.data.message, {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        }
    }

    useState(() => {
        getClassrooms();
        getTests();
    });

    const changeClassRoom = (classRoomId: Number) => {
        navigate(`/staff/classroom/${classRoomId}`);
    }

    const changeTest = (testId: Number) => {
        navigate(`/staff/test/${testId}`);
    }

    return (
        <div>
            <h1>Your Classes</h1>
            <div className={styles.Classes_container}>
                {classroomList.slice().reverse().slice(0,3).map((classroom, index) => {
                return (
                    <div key={index}>
                        <div className={styles.Classroom_display}>
                            <div className={styles.Classroom_display_header} onClick={() => changeClassRoom(classroom.classroom_id)}>
                                <h1>{classroom.name}</h1>
                            </div>
                            <div className={styles.Classroom_display_footer}>
                                <MdDeleteOutline id={styles.bin} onClick={() => handleDeleteClassroom({ classroomId: classroom.classroom_id })}/>
                            </div>
                        </div>
                    </div>
                    )
                })}
                {classroomList.length >= 3 && (
                    <button className={styles.view_all_button}>
                        View All
                        <div className={styles.arrow_wrapper}>
                            <div className={styles.arrow}></div>
                        </div>
                    </button>
                )}
            </div>
            <h1>Your Tests</h1>
            <div className={styles.Tests_container}>
                {testList.map((test, index) => 
                <div key={index}>
                    <div className={styles.Tests_display}>
                        <div className={styles.Tests_display_header} onClick={() => changeTest(test.test_id)}>
                            <h1>{test.title}</h1>
                        </div>
                        <div>
                            <p>Duration: {test.duration_in_minutes}</p>
                            <p>{test.description}</p>
                        </div>
                        <div className={styles.Tests_display_footer}>
                            <MdDeleteOutline id={styles.bin} onClick={() => handleDeleteTest(test.test_id)} />
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Body;