import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "../../../components/Modal";
import { getAvailableTests, scheduleTest } from "../Controllers";
import CustomDropdown from "./component/dropdown";

import styles from "../Classroom.module.css";

interface Props {
    isOpen: boolean
    onClose: () => void
}

interface AvailableTest {
    id: string
    name: string
    duration: number
}

export default function ScheduleTest({ isOpen, onClose }: Props) {

    const { id } = useParams();

    const [selectedDateAndTime, setSelectedDateAndTime] = useState<Date | null>(null);
    const [availableTests, setAvailableTests] = useState<AvailableTest[]>([]);
    const [selectedTest, setSelectedTest] = useState<AvailableTest | null>(null);
    const [supervisorId, setSupervisorId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const test = availableTests.find((test) => Number(test.id) === Number(e.target.value));
        setSelectedTest(test || null);
    }

    const getTests = async () => {
        try {
            setLoading(true);
            const data = await getAvailableTests();

            const formattedData = data.tests.map((test: any) => {
                return {
                    id: test.test_id,
                    name: test.title,
                    duration: test.duration_in_minutes
                }
            });

            setAvailableTests(formattedData);
        } catch (error) {
            console.error(error);
            toast.error("Error fetching tests", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleScheduleClick = async () => {
        try {
            const test_id = selectedTest?.id;
            const date = selectedDateAndTime?.toISOString();

            if (!test_id || !date) {
                toast.error("Please select a test and date", {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                return;
            }

            if (supervisorId) await scheduleTest(Number(id), test_id, date, supervisorId);
            else {
                toast.error("Please select a supervisor", {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
                return;
            }

            toast.success("Test scheduled successfully, please refresh to see changes.", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });

            onClose();

        } catch (error) {
            console.error(error);
            toast.error("Error scheduling test", {
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });
        }
    }

    useEffect(() => {
        getTests();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Schedule Test" backgroundColor="#efefef">
            <div className={styles.Test_modal_content}>
            {
                loading ? <div>Loading...</div> :
                    <>
                    <div className={styles.Test_modal_reciever_container}>
                        <div className={styles.test_select}>
                            <label htmlFor="test">Select Test: </label>
                            <select name="test" onChange={handleTestChange}>
                                <option value="">Select a test</option>
                                {availableTests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.test_date_time}>
                            <label htmlFor="date">Select Date and Time: </label>
                            <input type="datetime-local" onChange={(e) => setSelectedDateAndTime(new Date(e.target.value))} />
                        </div>
                        <div className={styles.test_date_time}>
                            <label>Select Supervisor</label>
                            <CustomDropdown setSupervisorId={setSupervisorId} />
                        </div>
                    </div>
                    <div className={styles.Test_modal_button_container}>
                        <button onClick={handleScheduleClick} className={styles.Test_schedule_button}>Schedule</button>
                        <button onClick={() => onClose()} className={styles.Test_cancel_button}>Cancel</button>
                    </div>
                    </>
            }
            </div>
        </Modal>
    );
}