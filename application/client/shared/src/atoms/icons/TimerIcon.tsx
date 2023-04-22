import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const TimerIcon = (props: Props) => {
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
      <path
        d="M16.24 7.74999C15.6842 7.19152 15.0235 6.74851 14.2958 6.44645C13.5681 6.14439 12.7879 5.98926 12 5.98999V11.99L7.76 16.23C10.1 18.57 13.9 18.57 16.25 16.23C16.8069 15.6729 17.2485 15.0115 17.5494 14.2836C17.8504 13.5557 18.0048 12.7756 18.0039 11.9879C18.0029 11.2002 17.8467 10.4205 17.544 9.69329C17.2413 8.96608 16.7982 8.30572 16.24 7.74999ZM12 1.98999C6.48 1.98999 2 6.46999 2 11.99C2 17.51 6.48 21.99 12 21.99C17.52 21.99 22 17.51 22 11.99C22 6.46999 17.52 1.98999 12 1.98999ZM12 19.99C7.58 19.99 4 16.41 4 11.99C4 7.56999 7.58 3.98999 12 3.98999C16.42 3.98999 20 7.56999 20 11.99C20 16.41 16.42 19.99 12 19.99Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as TimerIconProps };
export { TimerIcon };
