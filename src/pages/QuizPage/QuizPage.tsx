import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useQuiz } from '../../contexts/QuizContext';
import QuestionItem from '../../components/common/QuestionItem';
import Header from '../../components/common/Header';
import { Button } from '../../components/core/Button';
import { Loader } from '../../components/common/Loader';

import styles from './QuizPage.module.scss';

function QuizPage() {
  const { questionNumber } = useParams(); // Использование типа RouteParams
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    loading,
    setLoading,
    handleAnswerSelection,
    getNextQuestionIndex,
  } = useQuiz();

  const handleNextQuestion = () => {
    const nextQuestionIndex = getNextQuestionIndex();
    if (nextQuestionIndex < questions.length) {
      navigate(`/quiz/${nextQuestionIndex + 1}`);
    } else {
      setLoading(true);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      navigate(`/quiz/${previousQuestionIndex + 1}`);
    }
  };

  useEffect(() => {
    if (typeof questionNumber === 'string') {
      const index = parseInt(questionNumber, 10) - 1;
      if (index >= 0 && index < questions.length) {
        setCurrentQuestionIndex(index);
      }
    }
  }, [questionNumber, questions, setCurrentQuestionIndex]);

  return (
    <div className={styles.quizPage}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions?.length}
            onPrevious={handlePreviousQuestion}
          />
          <div className={styles.questionContainer}>
            {questions[currentQuestionIndex] && (
              <QuestionItem
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                answer={answers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelection}
              />
            )}
          </div>
          {!['single-select', 'single-select-image'].includes(questions[currentQuestionIndex]?.type) && (
            <div className={styles.footer}>
              <Button
                disabled={!answers[currentQuestionIndex]?.item?.length}
                onClick={handleNextQuestion}
              >
                <Trans i18nKey="global.button.next">Next</Trans>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default QuizPage;
