import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Loader.module.scss';
import CircleProgress from '../CircleProgress';
import { useQuiz } from '../../../contexts/QuizContext';

export function Loader() {
  const { setLoading } = useQuiz();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let startTime : number | null;
    const duration = 5000;

    const animate:FrameRequestCallback = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progressing = Math.min(1, elapsedTime / duration);
      setProgress(progressing * 100);
      if (progressing < 1) {
        requestAnimationFrame(animate);
      } else {
        setLoading(false);
        navigate('/email');
      }
    };
    requestAnimationFrame(animate);

    return () => {
      startTime = null;
    };
  }, []);

  return (
    <div className={styles.loader}>
      <CircleProgress progress={progress} text="Finding collections for you..." />
    </div>
  );
}
