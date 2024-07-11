import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Trans } from 'react-i18next';
import styles from './MultipleSelect.module.scss';
import { Checkbox } from '../Checkbox';
import { useQuiz } from '../../../contexts/QuizContext';
import { QuizArray} from '../../../types/quiz';

interface MultipleSelectProps {
  questionId: number;
  onClick: (f: QuizArray[]) => void;
  options: QuizArray[];
  type: string;
}

function MultipleSelect({
  questionId, onClick, options, type,
}:MultipleSelectProps) {
  const { answers, currentQuestionIndex } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<QuizArray[]>([]);

  const classes = classNames(styles.multipleSelect, {
    [styles.multiple]: type === 'multiple-select',
    [styles.bubble]: type === 'bubble',
  });

  const toggleOption = useCallback((option: QuizArray) => {
    if (selectedOptions.some((selectedOption) => selectedOption.id === option.id)) {
      const updated:QuizArray[] = selectedOptions.filter((selectedOption) => selectedOption.id !== option.id);
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
