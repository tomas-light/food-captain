import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const ChevronUpIcon = (props: Props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6484 15.2484C17.4234 15.4734 17.1182 15.5998 16.8 15.5998C16.4818 15.5998 16.1766 15.4734 15.9516 15.2484L12 11.2968L8.04839 15.2484C7.82207 15.467 7.51895 15.588 7.20431 15.5852C6.88968 15.5825 6.5887 15.4563 6.36621 15.2338C6.14372 15.0113 6.01752 14.7103 6.01479 14.3957C6.01205 14.0811 6.13301 13.7779 6.35159 13.5516L11.1516 8.75161C11.3766 8.52665 11.6818 8.40027 12 8.40027C12.3182 8.40027 12.6234 8.52665 12.8484 8.75161L17.6484 13.5516C17.8734 13.7766 17.9997 14.0818 17.9997 14.4C17.9997 14.7182 17.8734 15.0234 17.6484 15.2484V15.2484Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as ChevronUpIconProps };
export { ChevronUpIcon };
