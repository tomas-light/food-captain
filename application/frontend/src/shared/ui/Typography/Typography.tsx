import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

export function Typography(props: Props) {
  const { children } = props;

  return <span>{children}</span>;
}
