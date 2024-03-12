import { useEffect, useState } from 'react';

import styles from './index.module.css';
import Circle from '../../../../../components/CircularProgress';

const QuestionsPane = () => {

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loadingDuration = 3000 // 3 seconds

  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      if (progress >= 100) return
      setProgress(progress + 1)
    }, loadingDuration / 100)
    if (progress === 100) {
      setLoading(false)
    }
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [progress, loading])

  const questions = [
    { id: 1, status: "error" }, { id: 2, status: "attempted" }, { id: 3, status: "not_viewed" }, { id: 4, status: "not_attempted"}, { id: 5, status: "not_viewed" }, { id: 6, status: "not_attempted" }, { id: 7, status: "not_viewed" }, { id: 8, status: "not_attempted" }, { id: 9, status: "not_viewed" }, { id: 10, status: "not_attempted"}
  ];

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleQuestionChange = (questionId: number) => {
    setCurrentQuestion(questionId);
  }

  const classNameForQuestion = (questionId: number) => {
    if (questionId === currentQuestion) {
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
          {questions.map((question) =>
            <div 
              key={question.id}
              className={classNameForQuestion(question.id)}
              onClick={() => handleQuestionChange(question.id)}>
              <span>{question.id}</span>
            </div>)}
        </div>

        <div className={styles.time_pane}>
          <Circle progress={progress} indicatorColor='#1db954' label="Time left" trackWidth={0.5} indicatorWidth={2} />
        </div>

      </div>

      <div className={styles.bottom_row}>
        <div className={styles.instruction_pane}>

          <div className={styles.instruction}>
            <div className={styles.question} style={{ borderColor: "red" }}>
              <span>1</span>
            </div>
            <span>Question error</span>
          </div>

          <div className={styles.instruction}>
            <div className={styles.question} style={{ borderColor: "green" }}>
              <span>2</span>
            </div>
            <span>Question attempted</span>
          </div>

          <div className={styles.instruction}>
            <div className={styles.question} style={{ borderColor: "blue" }}>
              <span>3</span>
            </div>
            <span>Question not viewed</span>
          </div>

          <div className={styles.instruction}>
            <div className={styles.question} style={{ borderColor: "yellow" }}>
              <span>4</span>
            </div>
            <span>Question not attempted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPane;