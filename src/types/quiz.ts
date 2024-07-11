export interface Quiz {
  id: number,
  img?: string,
  text: string
}

export interface Question {
  id: number;
  title: string;
  subTitle?: string;
  type: string;
  options: Quiz[];
}

export interface Answer {
  id: number;
  title: string;
  type: string;
  item: Quiz[];
}
