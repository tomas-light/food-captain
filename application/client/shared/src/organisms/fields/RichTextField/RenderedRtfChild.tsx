import { FC, ReactNode } from 'react';
import { RtfChildElement } from './types';

type Props = {
  children: ReactNode;
  leaf: RtfChildElement;
  attributes?: {
    [attribute: string]: any;
  };
};

export const RenderedRtfChild: FC<Props> = (props) => {
  let { children, leaf, attributes } = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
