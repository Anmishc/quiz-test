import classNames from 'classnames';
import { useEffect, useState, ChangeEvent } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ checked, onChange, ...props }: CheckboxProps) {
  const [val, setVal] = useState(checked || false);

  const classes = classNames(styles.checkbox, {
    [styles.checked]: checked,
  });

  useEffect(() => {
    if (typeof checked === 'boolean') setVal(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={classes}>
      <input
        type="checkbox"
        checked={val}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
