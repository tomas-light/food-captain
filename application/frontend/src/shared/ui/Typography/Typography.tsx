import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import classes from './Typography.module.scss';

type Props = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    /** @default 'md' */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    /** @default 'normal' */
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  }
>;

export function Typography(props: Props) {
  const {
    children,
    size = 'md',
    weight = 'normal',
    className,
    ...spanAttributes
  } = props;

  return (
    <span
      className={clsx(className, {
        [classes.sm]: size === 'sm',
        [classes.md]: size === 'md',
        [classes.lg]: size === 'lg',
        [classes.xl]: size === 'xl',
        [classes.xxl]: size === 'xxl',
        [classes.xxxl]: size === 'xxxl',
        [classes.bold]: weight === 'bold',
      })}
      {...spanAttributes}
    >
      {children}
    </span>
  );
}
