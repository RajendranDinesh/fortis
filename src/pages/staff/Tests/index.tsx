import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList, TabContext } from '@mui/lab';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

//Styles

import styles from './Tests.module.css';

//Assets

import { IoIosAddCircle } from 'react-icons/io';

//Components

import AddMCQ from './addMCQ';

function Test() {

    const navigate = useNavigate();

    const [isMCQModalOpen, setMCQModalOpen] = useState(false);
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleMCQModalClick = () => {
        setMCQModalOpen(false);
    }

    const handleAddQuestion = () => {
        Swal.fire({
            title: 'Select Question Type',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `MCQ`,
            denyButtonText: `Programming`,
            cancelButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                setMCQModalOpen(!isMCQModalOpen);
            } else if (result.isDenied) {
                navigate('/staff/test/programming');
            }
        })
    };
      
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
            data: [300, 50], // replace these numbers with your actual data
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
          }
        ]
    };

    return (
        <div className={styles.Test_whole_container}>
            <div className={styles.Test_header_container}>
                <div className={styles.Test_header_title_container}>
                    <h1>Test Title Goes Here</h1>
                </div>
                <div className={styles.Test_header_description_container}>
                    <p>Test Description Goes Here</p>
                </div>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs">
                            <Tab label="Questions" value="1" style={{color: "white", fontSize: "1.2em"}} />
                            <Tab label="Stats" value="2" style={{color: "white", fontSize: "1.2em"}} />
                        </TabList>
                    </Box>
                </TabContext>
            </Box>
            {value === '1' &&
                <>
                <div className={styles.Test_button_container}>
                    <IoIosAddCircle className={styles.Test_add_question_button} onClick={handleAddQuestion} />
                </div>
                <div className={styles.Test_question_container}>
                    <div className={styles.Test_question_table_title_grid}>
                        <h1>Sl.No</h1>
                        <h1>Question Title</h1>
                        <h1>Question Type</h1>
                        <h1>Duration (in min)</h1>
                    </div>

                    {/* Map through the questions and display them here */}

                    <div className={styles.Test_question_grid}>
                        <h1>01</h1>
                        <h1>Question Title Goes Here</h1>
                        <h1>Question Type Goes Here</h1>
                        <h1>Duration Goes Here</h1>
                    </div>
                </div>
                </>
            }
            { value === '2' &&
                <>
                    <div className={styles.stats_container}>
                        <div className={styles.stats_staff_sup_container}>
                            <div className={styles.stats_staff_sup_container_left}>
                                <h1>Faculty: </h1>
                                <p>Staff name 1, Staff name 2</p>
                            </div>
                            <div className={styles.stats_staff_sup_container_right}>
                                <h1>Supervisor: </h1>
                                <p>Supervisor name 1, Supervisor name 2</p>
                            </div>
                        </div>
                        <div className={styles.stats_stu_inf_container}>
                            <div className={styles.stats_stu_list_container}>
                                <div className={styles.stats_stu_list_container_header}>
                                    <h1>Average Mark: 90</h1>
                                </div>
                                <div className={styles.stats_stu_list_content}>
                                    <div className={styles.stats_stu_list_content_element}>
                                        <h1>1.</h1>
                                        <h1>Adesh</h1>
                                        <h1>90</h1>
                                    </div>
                                    <div className={styles.stats_stu_list_content_element}>
                                        <h1>2.</h1>
                                        <h1>Dinesh</h1>
                                        <h1>90</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stats_stu_count_container}>
                                <Doughnut data={data} options={options} />
                            </div>
                        </div>
                    </div>
                </>
            }

            <AddMCQ modalOpen={isMCQModalOpen} handleModalClick={handleMCQModalClick} />
        </div>
    )
}

export default Test;