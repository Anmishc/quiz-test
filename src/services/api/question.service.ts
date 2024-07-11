import { localStorageService } from '../common/localStorage.service.ts';
import { StorageKey } from '../../constants';
import { Question } from '../../types/quiz';

export const getQuestions = (): Promise<Question[]> => new Promise((resolve) => {
  resolve(localStorageService.getJSON(StorageKey.QuizQuestions) || []);
});
