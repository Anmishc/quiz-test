import classNames from 'classnames';
import { useEffect, useState } from 'react';

import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  checked: boolean;
}

export function Checkbox({
  checked, ...props
}:CheckboxProps) {
  const [val, setVal] = useState(checked || false);

  const classes = classNames(styles.checkbox, {
    [styles.checked]: checked,
  });

  useEffect(() => {
    if (typeof checked === 'boolean') setVal(checked);
  }, [checked]);

  return (
    <div className={classes}>
      <input
        type="checkbox"
        checked={val}
        {...props}
      />
    </div>
  );
}
