import clsx from 'clsx';
import { Skeleton } from '../Skeleton';
import classes from './TextField.module.scss';

type Props = {
  className?: string;
};

export function TextFieldSkeleton(props: Props) {
  const { className } = props;

  return (
    <div className={clsx(classes.root, className)}>
      {/* label */}
      <Skeleton height={22} width={100} />
      {/* input */}
      <Skeleton height={22} />
    </div>
  );
}
