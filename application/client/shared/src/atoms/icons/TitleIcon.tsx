import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

// black

const TitleIcon = (props: Props) => {
  const { color = 'currentColor', height = 24, ...rest } = props;
  return (
    <svg
      {...rest}
      width={height}
      height={height}
      viewBox={`0 0 ${height} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 4V7H10.5V19H13.5V7H19V4H5Z" fill={color} />
    </svg>
  );
};

export type { Props as TitleIconProps };
export { TitleIcon };
