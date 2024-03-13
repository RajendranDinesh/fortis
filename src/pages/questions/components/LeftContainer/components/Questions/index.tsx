import { useEffect, useState } from 'react';

import styles from './questions.module.css';
import Circle from '../../../../../components/CircularProgress';
import Modal from '../../../../../components/Modal';

import useLocalStorage from '../../../../../../hooks/useLocalStorage';

import { questionPaneData } from '../..';

interface Props {
  questionPaneData: questionPaneData;
  setQuestionPaneData: (questionPaneData: questionPaneData) => void;
}

const QuestionsPane = ({
  questionPaneData,
  setQuestionPaneData,
}: Props) => {

  const [progress, setProgress] = useState(0)
  const [labelProgress, setLabelProgress] = useState<string>()
  const startTime = questionPaneData.startTime;
  const endTime = questionPaneData.endTime;

  const [isFinished, setIsFinished] = useState(false);

  const formatTime = (time: number) => {
    const totalSeconds = Math.ceil(time / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const remainingTime = endTime.getTime() - now.getTime();
      const elapsedTime = now.getTime() - startTime.getTime();
      const percentage = (elapsedTime / (endTime.getTime() - startTime.getTime())) * 100;

      if (remainingTime <= 0) {
        setProgress(100);
        setLabelProgress('00:00:00');
        setIsFinished(true);
        return;
      }

      isFinished && setIsFinished(false);
      setProgress(percentage > 100 ? 100 : percentage);
      setLabelProgress(formatTime(remainingTime));
    };

    const progressInterval = setInterval(updateProgress, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, [startTime, endTime]);


  const questions = questionPaneData.questions;

  // this one has the questionId
  const [currentQuestionId, setCurrentQuestionId] = useLocalStorage("assessment_currentQuestion", questions[0].id);

  const handleQuestionChange = (questionId: number) => {
    const questionStatus = questions.find((question) => question.id == questionId)?.status;

    setQuestionPaneData({...questionPaneData, questions: {
      ...questions,
      
    }})
    setCurrentQuestionId(questionId);
  }

  const classNameForQuestion = (questionId: number) => {
    if (questionId === currentQuestionId) {
      return `${styles.selected} ${styles.question}`;
    }

    const question = questions.find((question) => question.id === questionId);

    switch (question?.status) {
      case "error":
        return `${styles.error} ${styles.question}`;
      case "attempted":
        return `${styles.success} ${styles.question}`;
      case "not_viewed":
        return `${styles.info} ${styles.question}`;
      case "not_attempted":
        return `${styles.warning} ${styles.question}`;
      default:
        return `${styles.info} ${styles.question}`;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top_row}>

        <div className={styles.question_pane}>
          {questions.map((question, index) =>
            <div
              key={question.id}
              className={classNameForQuestion(question.id)}
              onClick={() => handleQuestionChange(question.id)}>
              <span>{index+1}</span>
            </div>)}
        </div>

        <div className={styles.time_pane}>
          <Circle
            progress={progress}
            indicatorColor='#1db954'
            label="Time left"
            trackWidth={2}
            indicatorWidth={4}
            labelProgress={labelProgress}
          />
        </div>

      </div>

      <Modal isOpen={isFinished} onClose={() => { }}>
        <div className={styles.modal_top_div}>
          <div className={styles.modal_header}>
            <h1>Assessment has been submitted</h1>
            <h4>Thank you for attending the assessment 🫶</h4>
          </div>

          <h3 style={{ alignSelf: 'flex-start' }}>Here are your stats</h3>
          <div className={styles.stats}>
            <div>
              <h5>Total questions</h5>
              <p>10</p>
            </div>
            <div>
              <h5>Questions attempted</h5>
              <p>5</p>
            </div>
            <div>
              <h5>Questions not attempted</h5>
              <p>5</p>
            </div>
            <div>
              <h5>Questions with errors</h5>
              <p>1</p>
            </div>
            <div>
              <h5>Questions not viewed</h5>
              <p>3</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuestionsPane;