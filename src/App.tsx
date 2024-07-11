import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { QuizProvider } from './contexts/QuizContext';
import QuizPage from './pages/QuizPage/QuizPage';
import EmailPage from './pages/EmailPage/EmailPage';
import ThankYouPage from './pages/ThankYouPage/ThankYouPage';
import i18n from './utils/i18n';
import { localStorageService } from './services/common/localStorage.service';
import { questionsData } from './data/questions';
import { StorageKey } from './constants';

function App() {
  localStorageService.setJSON(StorageKey.QuizQuestions, questionsData);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/quiz/1" />} />
            <Route path="/quiz/:questionNumber" element={<QuizPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </QuizProvider>
      </Router>
    </I18nextProvider>
  );
}

export default App;
