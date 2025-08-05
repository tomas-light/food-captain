import { X } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Button } from './button/Button';
import { Typography } from './Typography/Typography';
import classes from './NavigationHeader.module.scss';

type Props = PropsWithChildren<{
  back: {
    onClick?: VoidFunction;
    text: string;
  };
}>;

export function NavigationHeader(props: Props) {
  const { back, children } = props;

  return (
    <header className={classes.root}>
      <Button variant="ghost" size="small" onClick={back.onClick}>
        <X className={classes.backIcon} />
        <Typography weight="medium">{back.text}</Typography>
      </Button>

      {children && <div className={classes.actionButtons}>{children}</div>}
    </header>
  );
}
