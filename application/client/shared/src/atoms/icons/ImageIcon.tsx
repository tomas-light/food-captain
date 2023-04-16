import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

// black

const ImageIcon = (props: Props) => {
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
        d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as ImageIconProps };
export { ImageIcon };
