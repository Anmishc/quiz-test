export interface QuestionArray {
  id: number,
  img?: string,
  text: string
}

export interface Question {
  id: number;
  title: string;
  subTitle?: string;
  type: string;
  options: QuestionArray[]
}

export interface AnswerArray {
  id: number,
  img?: string,
  text: string,
}

export interface Answer {
  id: number;
  title: string;
  type: string;
  item: AnswerArray[];
}

export interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Answer[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleAnswerSelection: (item: Question, selectedAnswer: string | string[]) => Promise<void>;
  getNextQuestionIndex: () => number;
}

export interface ProgressProps {
  progress: number;
}
