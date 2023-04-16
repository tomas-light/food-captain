import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

// black

const ImageSearchIcon = (props: Props) => {
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
        d="M18 13V20H4V6H9.02C9.07 5.29 9.24 4.62 9.5 4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H18C19.1 22 20 21.1 20 20V15L18 13ZM16.5 18H5.5L8.25 14.47L10.21 16.83L12.96 13.29L16.5 18ZM19.3 8.89C19.74 8.19 20 7.38 20 6.5C20 4.01 17.99 2 15.5 2C13.01 2 11 4.01 11 6.5C11 8.99 13.01 11 15.49 11C16.37 11 17.19 10.74 17.88 10.3L21 13.42L22.42 12L19.3 8.89ZM15.5 9C14.837 9 14.2011 8.73661 13.7322 8.26777C13.2634 7.79893 13 7.16304 13 6.5C13 5.83696 13.2634 5.20107 13.7322 4.73223C14.2011 4.26339 14.837 4 15.5 4C16.163 4 16.7989 4.26339 17.2678 4.73223C17.7366 5.20107 18 5.83696 18 6.5C18 7.16304 17.7366 7.79893 17.2678 8.26777C16.7989 8.73661 16.163 9 15.5 9Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as ImageSearchIconProps };
export { ImageSearchIcon };
