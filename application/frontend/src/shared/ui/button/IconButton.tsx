import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import classes from './IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** @default 'square' */
  shape?: 'circle' | 'square';
};

export function IconButton(props: Props) {
  const { className, children, shape = 'square', ...buttonProps } = props;

  return (
    <button
      className={clsx(classes.root, className, {
        [classes.circle]: shape === 'circle',
      })}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
