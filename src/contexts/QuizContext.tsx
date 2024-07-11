import {
  createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { getQuestions } from '../services/api/question.service';
import { getAnswers, setAnswers } from '../services/api/answer.service';
import useLocalStorage from '../hooks/useLocalStorage';
import {Question, Answer, Quiz} from '../types/quiz';
import { StorageKey } from '../constants';

interface QuizContextProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Answer[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleAnswerSelection: (question: Question, selectedAnswer: Quiz[] | Quiz) => Promise<void>;
  getNextQuestionIndex: () => number;
}

export const QuizContext = createContext<QuizContextProps>({
  questions: [],
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => null,
  answers: [],
  loading: false,
  setLoading: () => null,
  handleAnswerSelection: () => Promise.resolve(),
  getNextQuestionIndex: () => 0,
});
export function QuizProvider({ children }: { children: ReactNode}) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersLocal, setAnswersLocal] = useState<Answer[]>([]);
  const [
    currentQuestionIndex, setCurrentQuestionIndex,
  ] = useLocalStorage(StorageKey.QuizCurrentIndex, 0);
  const [loading, setLoading] = useState(false);
  const language = localStorage.getItem(StorageKey.Language) || 'en';

  const generateAnswers = useCallback((type: string, answer: Quiz[] | Quiz) => {
    if (['bubble', 'multiple-select'].includes(type))  {
      if(Array.isArray(answer)) return [...answer];
    }
    return [answer];
  }, []);

  const handleAnswerSelection = async (item:Question, selectedAnswer:Quiz[] | Quiz) => {
    const answers = await getAnswers();
    if (Array.isArray(answers)) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = {
        id: item.id,
        title: item.title,
        type: item.type,
        item: generateAnswers(item.type, selectedAnswer),
      };

      await setAnswers(newAnswers);
      setAnswersLocal(newAnswers);

      if (['single-select', 'single-select-image'].includes(item.type)) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          navigate(`/quiz/${nextQuestionIndex + 1}`);
        }
      }
    }
  };

  const getNextQuestionIndex = () => {
    if (answersLocal[currentQuestionIndex]) {
      return currentQuestionIndex + 1;
    }
    return currentQuestionIndex;
  };

  const getQuestionsData = useCallback(async () => {
    const q = await getQuestions();
    if (Array.isArray(q)) {
      setQuestions(q);
    }
  }, []);

  const getAnswersData = useCallback(async () => {
    const a = await getAnswers();
    if (Array.isArray(a)) {
      setAnswersLocal(a);
    }
  }, []);

  useEffect(() => {
    getAnswersData();
    getQuestionsData();
    i18n.changeLanguage(language);
  }, []);

  const value = useMemo(() => ({
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers: answersLocal,
    loading,
    setLoading,
    handleAnswerSelection,
    getNextQuestionIndex,
  }), [questions, currentQuestionIndex, setCurrentQuestionIndex, answersLocal, loading, setLoading,
    handleAnswerSelection, getNextQuestionIndex]);

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
