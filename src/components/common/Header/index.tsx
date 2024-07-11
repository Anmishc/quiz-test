import ProgressBar from '../ProgressBar';
import styles from './Header.module.scss';
import { Arrow } from '../../icons';

interface HeaderProps {
  currentQuestion: number,
  totalQuestions: number,
  onPrevious: () => void;
}

function Header({ currentQuestion, totalQuestions, onPrevious }:HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.count}>
        {currentQuestion > 1
          && (
          <div
            role="presentation"
            className={styles.backArrow}
            onClick={onPrevious}
          >
            <Arrow />
          </div>
          )}
        <span className={styles.currentCount}>
          {currentQuestion}
        </span>
        /
        <span className={styles.totalCount}>
          {totalQuestions}
        </span>
      </div>
      <ProgressBar current={currentQuestion} total={totalQuestions + 1} />
    </div>
  );
}

export default Header;
