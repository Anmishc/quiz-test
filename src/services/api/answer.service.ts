import { localStorageService } from '../common/localStorage.service.ts';
import { Answer } from '../../types/quiz.ts';
import { StorageKey } from '../../constants';

export const getAnswers = () => new Promise((resolve) => {
  resolve(localStorageService.getJSON(StorageKey.QuizAnswers) || []);
});

export const setAnswers = async (answers: Answer[]) => new Promise((resolve) => {
  resolve(localStorageService.setJSON(StorageKey.QuizAnswers, answers));
});
