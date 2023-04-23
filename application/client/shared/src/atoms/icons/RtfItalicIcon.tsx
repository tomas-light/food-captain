import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const RtfItalicIcon = (props: Props) => {
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
        d="M19 7V4H9V7H11.868L9.012 17H5V20H15V17H12.132L14.988 7H19Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as RtfItalicIconProps };
export { RtfItalicIcon };
