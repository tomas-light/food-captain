import { FC } from 'react';
import { Tooltip, TooltipProps } from '../../../atoms';

type Props = Partial<TooltipProps> & {
  className?: string;
  disabled?: boolean;
};

const ButtonWrapper: FC<Props> = (props) => {
  const { className, title, disabled, children } = props;

  if (title && disabled) {
    return (
      <Tooltip title={title}>
        <span className={className}>{children}</span>
      </Tooltip>
    );
  }

  return <div className={className}>{children}</div>;
};

export { ButtonWrapper };
export type { Props as ButtonWrapperProps };
