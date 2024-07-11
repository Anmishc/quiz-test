import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Trans } from 'react-i18next';
import styles from './ThankYouPage.module.scss';
import { useQuiz } from '../../contexts/QuizContext.tsx';
import { Button } from '../../components/core/Button';
import { Download, Success } from '../../components/icons';

function ThankYouPage() {
  const navigate = useNavigate();
  const {
    questions,
    answers,
    setCurrentQuestionIndex,
  } = useQuiz();

  const handleRetakeQuiz = () => {
    localStorage.clear();
    setCurrentQuestionIndex(0);
    navigate('/quiz/1');
  };

  const downloadCSV = useCallback(() => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'order,title,type,answer\n';
    const email = localStorage.getItem('quizUserEmail');

    answers.forEach((answer, index) => {
      const question = questions[index];
      const formattedAnswer = answer.item.map((a) => a.text).join(', ');
      const row = `${index + 1},"${question.title}",${question.type},"${formattedAnswer}"\n`;
      csvContent += row;
    });
    const emailRow = `${answers.length + 1},"Email","email","${email}"\n`;
    csvContent += emailRow;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'quiz_answers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [answers, questions]);

  return (
    <div className={styles.thankYouPage}>
      <div className={styles.header}>
        <p className={styles.title}>
          <Trans i18nKey="thankYouPage.title">
            Thank you
          </Trans>
        </p>
        <p className={styles.subTitle}>
          <Trans i18nKey="thankYouPage.subTitle">
            for supporting us and passing quiz
          </Trans>
        </p>
        <div className={styles.circleSuccess}>
          <Success />
        </div>
      </div>
      <div className={styles.footer}>
        <div
          className={styles.download}
          role="presentation"
          onClick={downloadCSV}
        >
          <div className={styles.icon}>
            <Download />
          </div>
          <Trans i18nKey="thankYouPage.download">
            Download my answers
          </Trans>
        </div>
        <Button onClick={handleRetakeQuiz}>
          <Trans i18nKey="global.button.retake">
            Retake Quiz
          </Trans>
        </Button>
      </div>
    </div>
  );
}

export default ThankYouPage;
