import clsx from 'clsx';
import { type HTMLAttributes } from 'react';
import classes from './DialogContent.module.scss';

type Props = HTMLAttributes<HTMLDivElement>;

export function DialogContent(props: Props) {
  const { className, ...divAttributes } = props;

  return (
    <section className={clsx(classes.root, className)} {...divAttributes} />
  );
}
