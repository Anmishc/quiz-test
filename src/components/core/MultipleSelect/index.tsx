import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Trans } from 'react-i18next';
import styles from './MultipleSelect.module.scss';
import { Checkbox } from '../Checkbox';
import { useQuiz } from '../../../contexts/QuizContext';
import { Quiz} from '../../../types/quiz';

interface MultipleSelectProps {
  questionId: number;
  onClick: (f: Quiz[]) => void;
  options: Quiz[];
  type: string;
  maxSelections?: number;
}

function MultipleSelect({
  questionId, onClick, options, type, maxSelections,
}:MultipleSelectProps) {
  const { answers, currentQuestionIndex } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<Quiz[]>([]);

  const classes = classNames(styles.multipleSelect, {
    [styles.multiple]: type === 'multiple-select',
    [styles.bubble]: type === 'bubble',
  });

  const toggleOption = useCallback((option: Quiz) => {
    const maxAllowedSelections = maxSelections ?? Infinity;

    if (selectedOptions.some((selectedOption) => selectedOption.id === option.id)) {
      // Удаление опции из выбранных
      const updated: Quiz[] = selectedOptions.filter((selectedOption) => selectedOption.id !== option.id);
      setSelectedOptions(updated);
      onClick(updated);
    } else {
      // Проверка на максимальное количество выбранных опций
      if (selectedOptions.length < maxAllowedSelections) {
        const updated = [...selectedOptions, option];
        setSelectedOptions(updated);
        onClick(updated);
      }
    }
  }, [onClick, selectedOptions, maxSelections]);

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
