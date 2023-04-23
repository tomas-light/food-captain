import { FC } from 'react';
import { RtfElement } from './types';
import classes from './RenderedRtfElement.module.scss';

type Props = {
  element: RtfElement;
  children: string;
};

export const RenderedRtfElement: FC<Props> = (props) => {
  const { children, element } = props;

  switch (element.type) {
    case 'bullet':
      return <ul className={classes.ul}>{children}</ul>;

    case 'number':
      return <ol className={classes.ol}>{children}</ol>;

    case 'list-item':
      return <li>{children}</li>;

    case 'paragraph':
    default:
      return <p>{children}</p>;
  }
};
