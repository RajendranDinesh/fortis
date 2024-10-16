import { useContext, useEffect, useState } from 'react';

import styles from './questions.module.css';
import Circle from '../../../../../components/CircularProgress';

import { QuestionPaneDataContext, questionDataPayload, questionStatus } from '../../../../questionContext';

const QuestionsPane = ({
  isFinished,
  setIsFinished
}: {
  isFinished: boolean,
  setIsFinished: (value: boolean) => void
}) => {

  const { questionPaneData, setCurrentQuestionId } = useContext(QuestionPaneDataContext) as questionDataPayload;

  const [progress, setProgress] = useState(0)
  const [labelProgress, setLabelProgress] = useState<string>()

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

    if (!questionPaneData) {
      return;
    }

    const updateProgress = () => {
      const startTime = questionPaneData.startTime;
      const endTime = questionPaneData.endTime;

      if (!startTime || !endTime) {
        return;
      }

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
      
      setProgress(percentage > 100 ? 100 : percentage);
      setLabelProgress(formatTime(remainingTime));
    };

    const progressInterval = setInterval(updateProgress, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, [questionPaneData, isFinished]);


  const questions = questionPaneData?.questions;

  const handleQuestionChange = (questionId: number) => {
    if (!questions) {
      return;
    }

    const questionStatuse = questions.find((question) => question.id === questionId)?.status;

    if (questionStatuse === questionStatus.not_viewed) {
      questions.find((question) => question.id === questionId)!.status = questionStatus.not_attempted;
    }

    setCurrentQuestionId(questionId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top_row}>

        <div className={styles.question_pane}>
          {questions && questions.map((question, index) =>
            <div
              key={question.id}
              className={`${question.id === questionPaneData.currentQuestionId ? `${styles.selected}` :
                (question.status === questionStatus.error ? `${styles.error}` :
                  (question.status === questionStatus.attempted ? `${styles.success}` :
                    (question.status === questionStatus.not_viewed ? `${styles.info}` :
                      (question.status === questionStatus.not_attempted ? `${styles.warning}` :
                        `${styles.info}`
                      )
                    )
                  )
                )
                } ${styles.question}`}
              onClick={() => handleQuestionChange(question.id)}>
              <span>{index + 1}</span>
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
      <div className={styles.bottom_row}>
        <button onClick={() => setIsFinished(true)} className={styles.finish_btn} title='Submits the answers...'>Finish Test</button>
      </div>
    </div>
  );
}

export default QuestionsPane;