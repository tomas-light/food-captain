import { CommonIconProps } from './CommonProps';

type Props = Omit<CommonIconProps, 'height' | 'width'>;

// #F5D060

const PlatterIcon = (props: Props) => {
  const { color = 'currentColor', ...rest } = props;
  return (
    <svg
      {...rest}
      width="140"
      height="79"
      viewBox="0 0 140 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M138.616 78H1.40168C1.40168 78 0.497901 68.452 1.40168 62.4519C3.74196 46.9152 13.5003 34.0095 25.8272 24.6923C41.5 12.8462 68.2128 12.8462 68.2128 12.8462V8.40385H63.9024V1H76.8336V8.40385H71.8048V12.8462C71.8048 12.8462 101.859 13.1047 116.346 26.1731C127.714 36.4286 136.177 45.5 138.616 62.4519C139.48 68.4582 138.616 78 138.616 78Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M109.5 29.5936C120.395 37.7647 131.5 57.5935 128.5 59.0935C125.5 60.5935 116.627 50.5321 107 40.0936C95.2306 27.3326 89 27.5935 89 27.5935C89 27.5935 97.5 20.5936 109.5 29.5936Z"
        fill="white"
        fillOpacity="0.3"
      />
    </svg>
  );
};

export type { Props as PlatterIconProps };
export { PlatterIcon };
