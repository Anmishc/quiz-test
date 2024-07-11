import { MouseEvent, ReactNode, useCallback } from 'react';
import classNames from 'classnames';

import styles from './SelectItem.module.scss';

interface SelectItemProps {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  type: string;
  className: string;
  children: ReactNode;
}

export function SelectItem({
  onClick, type = 'single-select', className, children, ...props
}:SelectItemProps) {
  const classes = classNames(styles.selectTtem, {
    [styles.singleSelect]: type === 'single-select',
    [styles.singleSelectImage]: type === 'single-select-image',
    [styles.active]: false,
  }, className);

  const handleClick = useCallback((e:MouseEvent<HTMLElement>) => {
    onClick(e);
  }, [onClick]);

  return (
    <div
      role="presentation"
      className={classes}
      onClick={handleClick}
      {...props}
    >
      { children }
    </div>
  );
}
