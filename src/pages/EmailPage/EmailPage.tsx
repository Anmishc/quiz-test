import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import useDebounce from '../../hooks/useDebounce.tsx';
import { Button } from '../../components/core/Button';
import { Input } from '../../components/core/Input';

import styles from './EmailPage.module.scss';
import { StorageKey } from "../../constants";
import { localStorageService } from "../../services/common/localStorage.service.ts";
import { questionsData } from "../../data/questions.ts";

function EmailPage() {
  const navigate = useNavigate();
  const answers = localStorageService.getJSON(StorageKey.QuizAnswers) || [];
  const allAnswersSubmitted = answers.length === questionsData.length;
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const debouncedEmail = useDebounce({ value: email, delay: 500 });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (mail: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      localStorage.setItem(StorageKey.QuizUserEmail, email);
      navigate('/thank-you');
    }
  };

  useEffect(() => {
    if (debouncedEmail) {
      if (validateEmail(debouncedEmail)) {
        setIsValid(true);
        setError('');
      } else {
        setIsValid(false);
        setError('Please enter a valid email address');
      }
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (!allAnswersSubmitted) {
      navigate('/');
    }
  },[allAnswersSubmitted, navigate])

  return (
    <div className={styles.emailPage}>
      <div className={styles.formBlock}>
        <h2 className={styles.title}>
          <Trans i18nKey="emailPage.title">
            Email
          </Trans>
        </h2>
        <p className={styles.subTitle}>
          <Trans i18nKey="emailPage.subTitle">
            Enter your email to get full access
          </Trans>
        </p>
        <form className={styles.form}>
          <Input
            type="email"
            value={email}
            onChange={handleChange}
            isValid={isValid}
            placeholder={t('emailPage.input.placeholder')}
            error={error}
            required
          />
          <p className={styles.info}>
            <Trans i18nKey="emailPage.info1">
              By continuing I agree with
            </Trans>
            {' '}
            <a href="/policy" rel="noopener noreferrer" target="_blank">
              <Trans i18nKey="emailPage.privacyPolicy">
                Privacy policy
              </Trans>
            </a>
            {' '}
            <Trans i18nKey="emailPage.info2">
              and
            </Trans>
            {' '}
            <a href="/terms-and-use" rel="noopener noreferrer" target="_blank">
              <Trans i18nKey="emailPage.termsOfUse">
                Terms of use
              </Trans>
            </a>
          </p>
        </form>
      </div>
      <div className={styles.footer}>
        <Button
          type="submit"
          disabled={!isValid || email.length === 0}
          onClick={handleSubmit}
        >
          <Trans i18nKey="global.button.next">
            Next
          </Trans>
        </Button>
      </div>
    </div>
  );
}

export default EmailPage;
