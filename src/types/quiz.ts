export interface QuizArray {
  id: number,
  img?: string,
  text: string
}

export interface Question {
  id: number;
  title: string;
  subTitle?: string;
  type: string;
  options: QuizArray[];
}

export interface Answer {
  id: number;
  title: string;
  type: string;
  item: QuizArray[];
}
