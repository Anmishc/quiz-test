import classNames from 'classnames';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import { useCallback, useMemo } from 'react';

import styles from './QuestionItem.module.scss';
import { SelectItem } from '../../core/SelectItem';
import MultipleSelect from '../../core/MultipleSelect';
import { languageMap } from '../../../constants';
import { Answer, Quiz, Question } from '../../../types/quiz';

interface QuestingProps {
  answer: Answer;
  question: Question;
  onAnswerSelect: (q:Question, a:Quiz | Quiz[]) => void;
}

function QuestionItem({ answer, question, onAnswerSelect }: QuestingProps) {
  const { id, title, subTitle, type, options} = question;
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleAnswerClick = useCallback((questionItem: Question, answerItem: Quiz[]) => {
    onAnswerSelect(questionItem, answerItem);
  }, [onAnswerSelect]);

  const handleAnswerSingleClick= useCallback((questionItem: Question, answerItem: Quiz) => {
    if(questionItem.id === 1 && !Array.isArray(answerItem)) {
      const languageKey = answerItem?.text as keyof typeof languageMap;
      changeLanguage(languageMap[languageKey]);
    }
    onAnswerSelect(questionItem, answerItem);
  }, [onAnswerSelect]);

  const renderSelect = useMemo(() => {
    if (['multiple-select', 'bubble'].includes(type)) {
      return (
        <MultipleSelect
          questionId={id}
          onClick={(e: Quiz[]) => handleAnswerClick(question, e)}
          type={type}
          options={options}
        />
      );
    }
    return (
      options.map((option: Quiz) => (
        <SelectItem
          className={classNames(
            { [styles.active]: answer && answer?.item?.some((i:Quiz) => i.id === option.id) },
          )}
          key={option.id}
          onClick={() => handleAnswerSingleClick(question, option)}
          type={type}
        >
          {option?.img && <span>{option?.img}</span>}
          <Trans i18nKey={`questions.question${id}.options.option${option.id}.text`}>{option?.text}</Trans>
        </SelectItem>
      ))
    );
  }, [type, options, id, handleAnswerClick, question, answer, handleAnswerSingleClick]);

  return (
    <div className={styles.question}>
      <h2>
        <Trans i18nKey={`questions.question${id}.title`}>{title}</Trans>
      </h2>
      {subTitle && (
      <p className={styles.subTitle}>
        <Trans i18nKey={`questions.question${id}.subTitle`}>
          {subTitle}
        </Trans>
      </p>
      )}
      <div className={classNames(
        styles.col,
        { [styles.row]: type === 'single-select-image' },
      )}
      >
        {renderSelect}
      </div>
    </div>
  );
}

export default QuestionItem;
