import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import classes from './DialogOverlay.module.scss';

type Props = PropsWithChildren;

export function DialogOverlay(props: Props) {
  const { children } = props;

  return createPortal(
    <div className={classes.root}>{children}</div>,
    document.querySelector('body > main')!
  );
}
