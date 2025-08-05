import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import classes from './Typography.module.scss';

type Props = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    /** @default 'span' */
    component?: 'span' | 'p' | 'h1' | 'h2' | 'h3';

    /** @default 'md' */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

    /** @default 'normal' */
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';

    color?: string;
  }
>;

export function Typography(props: Props) {
  const {
    children,
    component: Component = 'span',
    size = 'md',
    weight = 'normal',
    className,
    color,
    ...spanAttributes
  } = props;

  return (
    <Component
      className={clsx(classes.root, className, {
        [classes.sm]: size === 'sm',
        [classes.md]: size === 'md',
        [classes.lg]: size === 'lg',
        [classes.xl]: size === 'xl',
        [classes.xxl]: size === 'xxl',
        [classes.xxxl]: size === 'xxxl',
        [classes.bold]: weight === 'bold',
      })}
      {...(color != null
        ? {
            style: {
              '--color': color,
            },
          }
        : {})}
      {...spanAttributes}
    >
      {children}
    </Component>
  );
}
