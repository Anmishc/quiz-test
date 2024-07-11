import {
  ButtonHTMLAttributes, MouseEventHandler, ReactNode, useCallback,
} from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ onClick, children, ...props }: ButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (typeof onClick === 'function') onClick(e);
  }, [onClick]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
