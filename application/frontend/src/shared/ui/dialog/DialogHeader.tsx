import { X } from 'lucide-react';
import { type PropsWithChildren, useContext } from 'react';
import { IconButton } from '../button/IconButton';
import { DialogContext } from './DialogContext';
import classes from './DialogHeader.module.scss';

type Props = PropsWithChildren<{}>;

export function DialogHeader(props: Props) {
  const { children } = props;

  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogContext is not provided');
  }

  const { onClose } = context;

  return (
    <header className={classes.root}>
      {children}

      <IconButton
        className={classes.closeButton}
        shape="square"
        onClick={onClose}
        elevated
      >
        <X />
      </IconButton>
    </header>
  );
}
