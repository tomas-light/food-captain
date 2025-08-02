import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import classes from './Typography.module.scss';

type Props = PropsWithChildren<{
  bold?: boolean;
}>;

export function Typography(props: Props) {
  const { children, bold = false } = props;

  return (
    <span
      className={clsx({
        [classes.bold]: bold,
      })}
    >
      {children}
    </span>
  );
}
