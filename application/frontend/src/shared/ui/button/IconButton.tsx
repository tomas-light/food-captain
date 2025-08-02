import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import classes from './IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton(props: Props) {
  const { className, children, ...buttonProps } = props;

  return (
    <button className={clsx(classes.root, className)} {...buttonProps}>{children}</button>
  );
}
