import { StorageKey } from '../../constants';

export const localStorageService = {
  setJSON: (key: StorageKey, value: any) => window.localStorage.setItem(key, JSON.stringify(value)),
  getJSON: (key: StorageKey): any | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined; // Обрабатываем возможный null
    } catch (e) {
      return undefined;
    }
  },
};
