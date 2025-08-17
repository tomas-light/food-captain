import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Typography } from '../Typography/Typography';
import classes from './TextField.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  children?: ReactNode;
};
export { type Props as TextFieldProps };

export function TextField(props: Props) {
  const { label, name, className, style, children, ...htmlAttributes } = props;

  return (
    <div className={clsx(classes.root, className)} style={style}>
      <Typography component="label" htmlFor={name} size="medium">
        {label}
      </Typography>

      <input name={name} {...htmlAttributes} />

      {children}
    </div>
  );
}
