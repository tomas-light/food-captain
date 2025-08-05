import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import classes from './Typography.module.scss';

type Props = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    /** @default 'span' */
    component?: 'span' | 'p' | 'h1' | 'h2' | 'h3';

    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl';

    /** @default 'normal' */
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';

    color?: string;
  }
>;

export function Typography(props: Props) {
  const {
    children,
    component: Component = 'span',
    size = 'medium',
    weight = 'normal',
    className,
    color,
    ...spanAttributes
  } = props;

  return (
    <Component
      className={clsx(classes.root, className)}
      data-size={size}
      data-weight={weight}
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
