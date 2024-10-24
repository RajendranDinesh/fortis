import Modal from "../../../components/Modal";
import { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import styles from "../Classroom.module.css";
import { useParams } from "react-router-dom";

interface TestsModalProps {
    isOpen: boolean
    onClose: () => void
    setModalOpen: (value: boolean) => void
}

export default function ShowStatsModal({
    isOpen,
    onClose,
    setModalOpen,
}: TestsModalProps) {

    const [staffData, setStaffData] = useState<{ name: string }[]>([
        { name: 'Staff Testing name 1'},
        { name: 'Staff Testing name 2'}
    ]);
    const [supervisorData, setSupervisorData] = useState<{ name: string }[]>([
        { name: 'Staff Testing name 1'},
        { name: 'Staff Testing name 2'}
    ]);

    const [presentAbsentData, setPresentAbsentData] = useState<{ absent_count: number, present_count: number }>({ absent_count: 10, present_count: 10 });

    const [marksData, setMarksData] = useState<{ user_name: string, total_marks: number }[]>([
        { user_name: 'Adesh', total_marks: 90 },
        { user_name: 'Dinesh', total_marks: 90 }
    ]);

    const [averageMarks, setAverageMarks] = useState<number>(90);

    const options = {
        plugins: {
          title: {
            display: false
          },
          afterDraw: (chart: Chart<'doughnut', number[], string>) => {
            let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

            ctx.restore();
            let fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            let text = '350', // replace this with your total count
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        },
        cutout: '50%',
        responsive: true,
        maintainAspectRatio: false
      };

      Chart.register(...registerables);

      const data = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [presentAbsentData.present_count, presentAbsentData.absent_count], // replace these numbers with your actual data
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
          }
        ]
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Stats" backgroundColor="#efefef">
            <div>
                <div className={styles.stats_container}>
                    <div className={styles.stats_staff_sup_container}>
                        <div className={styles.stats_staff_sup_container_left}>
                            <h1>Faculty: </h1>
                            {staffData.map((staff, index) => (
                            <p key={index}>{staff.name}</p>
                            ))}
                        </div>
                        <div className={styles.stats_staff_sup_container_right}>
                            <h1>Supervisor: </h1>
                            {supervisorData.map((supervisor, index) => (
                                <p key={index}>{supervisor.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className={styles.stats_stu_inf_container}>
                        <div className={styles.stats_stu_list_container}>
                            <div className={styles.stats_stu_list_container_header}>
                                <h1>Average : {averageMarks}</h1>
                            </div>
                            <div className={styles.stats_stu_list_content}>
                                {marksData.map((student, index) => (
                                    <div key={index} className={styles.stats_stu_list_content_element}>
                                        <h1>{index+1}.</h1>
                                        <h1>{student.user_name}</h1>
                                        <h1>{student.total_marks}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.stats_stu_count_container}>
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
