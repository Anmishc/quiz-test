import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Trans } from 'react-i18next';
import styles from './MultipleSelect.module.scss';
import { Checkbox } from '../Checkbox';
import { useQuiz } from '../../../contexts/QuizContext';
import { AnswerArray, QuestionArray } from '../../../types/quiz';

interface MultipleSelectProps {
  questionId: number;
  onClick: (f: QuestionArray[]) => void;
  options: QuestionArray[];
  type: string;
}

function MultipleSelect({
  questionId, onClick, options, type,
}:MultipleSelectProps) {
  const { answers, currentQuestionIndex } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<AnswerArray[]>([]);

  const classes = classNames(styles.multipleSelect, {
    [styles.multiple]: type === 'multiple-select',
    [styles.bubble]: type === 'bubble',
  });

  const toggleOption = useCallback((option: QuestionArray) => {
    if (selectedOptions.some((selectedOption) => selectedOption.id === option.id)) {
      const updated = selectedOptions.filter((selectedOption) => selectedOption.id !== option.id);
      setSelectedOptions(updated);
      onClick(updated);
    } else {
      const updated = [...selectedOptions, option];
      setSelectedOptions(updated);
      onClick(updated);
    }
  }, [onClick, setSelectedOptions, selectedOptions]);

  useEffect(() => {
    if (answers[currentQuestionIndex]) {
      setSelectedOptions(answers[currentQuestionIndex]?.item);
    }
  }, [answers, currentQuestionIndex]);

  return (
    <div className={classes}>
      {options?.map((option) => (
        <div
          role="presentation"
          key={option.id}
          className={`${styles.option} ${selectedOptions.some((selectedOption) => selectedOption.id === option.id) ? styles.selected : ''}`}
          onClick={() => toggleOption(option)}
        >
          {option.img && <div className={styles.img}>{option.img}</div>}
          <Trans i18nKey={`questions.question${questionId}.options.option${option.id}.text`}>{option.text}</Trans>
          { type === 'multiple-select'
          && (
          <Checkbox
            checked={selectedOptions.some((selectedOption) => selectedOption.id === option.id)}
          />
          )}
        </div>
      ))}
    </div>
  );
}

export default MultipleSelect;
