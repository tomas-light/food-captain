import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import classes from './IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** @default 'square' */
  shape?: 'circle' | 'square';

  /**
   * Adds elevated effect on hover
   * @default false */
  elevated?: boolean;
};

export function IconButton(props: Props) {
  const {
    className,
    children,
    shape = 'square',
    elevated = false,
    ...buttonProps
  } = props;

  return (
    <button
      className={clsx(classes.root, className, {
        [classes.circle]: shape === 'circle',
      })}
      data-elevated={elevated}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
