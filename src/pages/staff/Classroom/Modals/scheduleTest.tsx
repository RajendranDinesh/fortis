import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "../../../components/Modal";
import { getAvailableTests, scheduleTest } from "../Controllers";

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

            await scheduleTest(Number(id), test_id, date);

            toast.success("Test scheduled successfully", {
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
        <Modal isOpen={isOpen} onClose={onClose} title="Schedule Test">
            {
                loading ? <div>Loading...</div> :
                    <div>
                        <div>
                            <label htmlFor="test">Select Test</label>
                            <select name="test" onChange={handleTestChange}>
                                <option value="">Select a test</option>
                                {availableTests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date">Select Date and Time</label>
                            <input type="datetime-local" onChange={(e) => setSelectedDateAndTime(new Date(e.target.value))} />
                        </div>
                        <button onClick={handleScheduleClick}>Schedule</button>
                    </div>
            }
        </Modal>
    );
}