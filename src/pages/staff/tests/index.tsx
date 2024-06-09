import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
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
import { Request } from '../../../networking';
import { TestType } from '../dashboard';
import QuestionDetailModal from './viewQuestion';
import { HttpStatusCode } from 'axios';

interface Question {
    question_id: number
    question_title: string
    type_name: string
    created_at: string
    updated_at: string
}

function Test() {

    const navigate = useNavigate();
    const { testId } = useParams();

    const [questions, setQuestions] = useState<Question[]>();
    const [testDetails, setTestDetails] = useState<TestType>();

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
                navigate(`/staff/test/${testId}/programming`);
            }
        })
    };

    const getTestDetails = async () => {
        try {
            const response = await Request("GET", `/test/${testId}`);
            if (response.status === HttpStatusCode.Ok) {
                setTestDetails(response.data);
            }
        } catch(error) {
            console.log(error);
            if ((error as any).response.status === HttpStatusCode.NotFound)  {
                window.location.href = "/staff/dashboard";
                return;
            }
            toast.error("Failed to fetch test details");
        }
    }

    const getQuestions = async () => {
        try {
            const response = await Request("GET", `/question/${testId}`);
            if (response.status === 200) {
                setQuestions(response.data);
            }
        } catch(error) {
            if ((error as any).response.status === 404) {
                setQuestions([]);
                return;
            }

            console.log(error);
            toast.error("Failed to fetch questions");
        }
    }

    const [questionIdForModal, setQuestionIdForModal] = useState(0);
    const [isQuestionDetailModalOpen, setQuestionDetailModalOpen] = useState(false);

    const openQuestionDetailModal = (questionId: number) => {
        setQuestionIdForModal(questionId);
        setQuestionDetailModalOpen(true);
    }

    const handleQuestionDetailModalClick = () => {
        setQuestionDetailModalOpen(false);
    }

    const renderHTML = (htmlString: any, type: string) => {
        if (htmlString === null) return;
        if (type === "code") return { __html: htmlString };

        const cleanedHtml = htmlString.slice(1, -1).replace(/\\n/g, '').replace(/\\t/g, '');

        return { __html: cleanedHtml };
    };

    useEffect(() => {
        getTestDetails();
        getQuestions();
    }, []);

    
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


    useEffect(() => {
        fetchStaffData();
        fetchSupervisorData();
        fetchPresentAbsentData();
        fetchMarksData();
    }, []);

    const fetchStaffData = async () => {
        try {
            const response = await Request("GET", `/test/${testId}/staff`);
            if (response.status === HttpStatusCode.Ok) {
                setStaffData(response.data.map((staff_name: any) => ({ name: staff_name.staff_name })));
            }
        } catch(error) {
            console.log(error);
            toast.error("Failed to fetch staff data");
        }
    }

    const fetchSupervisorData = async () => {
        try {
            const response = await Request("GET", `/test/${testId}/supervisor`);
            if (response.status === HttpStatusCode.Ok) {
                setSupervisorData(response.data.map((supervisor_name: any) => ({ name: supervisor_name.supervisor_name })));
            }
        } catch(error) {
            console.log(error);
            toast.error("Failed to fetch supervisor data");
        }
    }

    const fetchPresentAbsentData = async () => {
        try {
            const response = await Request("GET", `/test/${testId}/present-absent`);
            if (response.status === HttpStatusCode.Ok) {
                setPresentAbsentData(response.data[0]);
            }
        } catch(error) {
            console.log(error);
            toast.error("Failed to fetch present absent data");
        }
    }

    const fetchMarksData = async () => {
        try {
            const response = await Request("GET", `/test/${testId}/marks`);
            if (response.status === HttpStatusCode.Ok) {
                setMarksData(response.data.marks.map((mark: any) => ({ user_name: mark.user_name, total_marks: mark.total_marks })));
                const average_Marks = Number(response.data.averageMarks[0].overall_average_marks);
                setAverageMarks(Number(average_Marks.toFixed(2)));
            }
        } catch(error) {
            console.log(error);
            toast.error("Failed to fetch marks data");
        }
    }


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
        <div className={styles.Test_whole_container}>
            <div className={styles.Test_header_container}>
                <div className={styles.Test_header_title_container}>
                    <h1>{testDetails?.title}</h1>
                </div>
                <div className={styles.Test_header_description_container}>
                    <p>{testDetails?.description}</p>
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
                    </div>

                    {/* Questions are mapped and displayed here... */}
                    { (questions && questions.length > 0) ? questions.map((question, index) => 
                    <div className={styles.Test_question_grid} key={index} onClick={() => openQuestionDetailModal(question.question_id)}>
                        <h1>{index+1}</h1>
                        <h1 dangerouslySetInnerHTML={renderHTML(question.question_title, question.type_name)} />
                        <h1>{question.type_name}</h1>
                    </div>) : <>No questions have been added yet..</>}
                </div>
                </>
            }
            { value === '2' &&
                <>
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
                </>
            }
            <AddMCQ modalOpen={isMCQModalOpen} handleModalClick={handleMCQModalClick} />
            <QuestionDetailModal modalOpen={isQuestionDetailModalOpen} handleModalClick={handleQuestionDetailModalClick} questionId={questionIdForModal} />
        </div>
    )
}

export default Test;