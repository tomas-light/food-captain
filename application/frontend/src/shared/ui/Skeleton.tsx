import clsx from 'clsx';
import type { CSSProperties } from 'react';
import classes from './Skeleton.module.scss';

type Props = {
  className?: string;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
};

export function Skeleton(props: Props) {
  const { width, height, className } = props;

  return (
    <div
      className={clsx(classes.root, className)}
      style={{
        '--skeleton-width': width ?? '100%',
        '--skeleton-height': height ?? '100%',
      }}
    />
  );
}
