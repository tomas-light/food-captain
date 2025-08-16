import { type ReactNode, useContext } from 'react';
import { DialogContext, type DialogContextType } from './DialogContext';
import classes from './DialogFooter.module.scss';

type Props = {
  children: ReactNode | ((dialogContext: DialogContextType) => ReactNode);
};

export function DialogFooter(props: Props) {
  const { children } = props;

  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogContext is not provided');
  }

  return (
    <footer className={classes.root}>
      {typeof children === 'function' ? children(context) : children}
    </footer>
  );
}
