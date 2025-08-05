import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import classes from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** @default 'default' */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';

  /** @default false */
  loading?: boolean;

  /**
   * Adds elevated effect on hover
   * @default false */
  elevated?: boolean;

  icon?: ReactElement;
};

export function Button(props: Props) {
  const {
    className,
    children,
    variant = 'default',
    size = 'medium',
    loading = false,
    elevated = false,
    icon,
    ...buttonProps
  } = props;

  return (
    <button
      className={clsx(classes.root, className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading}
      data-elevated={elevated}
      {...buttonProps}
    >
      {icon}

      {children}
    </button>
  );
}
