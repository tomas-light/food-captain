import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const LogoIcon = (props: Props) => {
  const { height = 88, color = '#6A1B9A', ...rest } = props;

  return (
    <svg
      {...rest}
      width={height}
      height={height}
      viewBox={`0 0 ${height} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="white" />
      <path
        d="M10 7.5H36.25L32.75 42.5H13.5L10 7.5ZM13.85 11L16.65 39H18.4L16.0025 15.095C17.875 14.5 20.3075 14.3075 22.25 16.25C24.98 18.98 29.8275 17.4575 31.875 16.6525L32.4 11H13.85Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as LogoIconProps };
export { LogoIcon };
