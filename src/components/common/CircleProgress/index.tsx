import styles from './CircleProgress.module.scss';
import { Trans } from 'react-i18next';

interface CircleProgressProps {
  text: string;
  progress: number;
}

const CircleProgress = ({ text, progress }:CircleProgressProps) => {
  const gradient = `conic-gradient(#E4229C ${progress * 3.6}deg, #ffffff ${progress * 3.6}deg 360deg)`;

  return (
    <div className={styles.circleProgressWrapper}>
      <div
        className={styles.circle}
        style={{ background: gradient }}
      >
        <div className={styles.insideCircle}>
          {progress.toFixed()}
          %
        </div>
      </div>
      <div className={styles.progressText}>
        <Trans i18nKey="loader.text">
          {text}
        </Trans>
      </div>
    </div>
  );
}

export default CircleProgress;
