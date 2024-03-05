import { useEffect, useState } from 'react';
import Circle from '../../../../../components/CircularProgress';

const QuestionsPane = () => {

    const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loadingDuration = 3000 // 3 seconds

  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      if (progress >= 100) return
      setProgress(progress + 1)
    }, loadingDuration/100)
    if (progress === 100) {
      setLoading(false)
    }
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [progress, loading])
    return (
        <div>
            <Circle progress={progress} trackWidth={0.5} indicatorWidth={2} />
        </div>
    );
}

export default QuestionsPane;