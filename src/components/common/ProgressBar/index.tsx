import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }:ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className={styles.progressBarWrapper}>
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
