import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const RtfUnderlineIcon = (props: Props) => {
  const { color = 'currentColor', height = 24, ...rest } = props;
  return (
    <svg
      width={height}
      height={height}
      viewBox={`0 0 ${height} ${height}`}
      {...rest}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 18H19V20H5V18ZM6 4V10C6 13.309 8.691 16 12 16C15.309 16 18 13.309 18 10V4H16V10C16 12.206 14.206 14 12 14C9.794 14 8 12.206 8 10V4H6Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as RtfUnderlineIconProps };
export { RtfUnderlineIcon };
