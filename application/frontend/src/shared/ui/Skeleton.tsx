import clsx from 'clsx';
import type { CSSProperties } from 'react';
import classes from './Skeleton.module.scss';

type Props = {
  className?: string;

  /** @default '100%' */
  height?: CSSProperties['height'];

  minHeight?: CSSProperties['minHeight'];

  /** @default '100%' */
  width?: CSSProperties['width'];

  /** @default 'var(--radius-md)' */
  borderRadius?: string;
};

export function Skeleton(props: Props) {
  const {
    width = '100%',
    height = '100%',
    minHeight,
    className,
    borderRadius = 'var(--radius-md)',
  } = props;

  return (
    <div
      className={clsx(classes.root, className)}
      style={{
        width,
        height,
        minHeight,
        borderRadius,
      }}
    />
  );
}
