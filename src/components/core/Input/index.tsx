import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { Trans } from 'react-i18next';
import styles from './Input.module.scss';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  placeholder: string;
  error?: string;
  required?: boolean;
}

export function Input ({ type, value, onChange, isValid, placeholder, error, required = false }:InputProps) {
  return (
    <div className={styles.inputBlock}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={classNames(styles.input, {
          [styles.invalid]: !isValid,
        })}
        placeholder={placeholder}
        required={required}
      />
      <div className={classNames(styles.error, { [styles.hide]: !error })}>
        <Trans i18nKey="emailPage.input.error">
          {error}
        </Trans>
      </div>
    </div>
  );
}
