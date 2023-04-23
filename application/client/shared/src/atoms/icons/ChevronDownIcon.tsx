import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const ChevronDownIcon = (props: Props) => {
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
        d="M6.35159 8.7516C6.57662 8.52663 6.88179 8.40026 7.19999 8.40026C7.51818 8.40026 7.82335 8.52663 8.04839 8.7516L12 12.7032L15.9516 8.7516C16.0623 8.63699 16.1947 8.54557 16.3411 8.48268C16.4875 8.41979 16.645 8.38668 16.8043 8.3853C16.9636 8.38391 17.1217 8.41428 17.2691 8.47461C17.4166 8.53495 17.5506 8.62405 17.6633 8.73673C17.7759 8.8494 17.865 8.98338 17.9254 9.13085C17.9857 9.27833 18.0161 9.43635 18.0147 9.59568C18.0133 9.75502 17.9802 9.91248 17.9173 10.0589C17.8544 10.2053 17.763 10.3377 17.6484 10.4484L12.8484 15.2484C12.6234 15.4734 12.3182 15.5997 12 15.5997C11.6818 15.5997 11.3766 15.4734 11.1516 15.2484L6.35159 10.4484C6.12662 10.2234 6.00024 9.9182 6.00024 9.6C6.00024 9.2818 6.12662 8.97663 6.35159 8.7516V8.7516Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as ChevronDownIconProps };
export { ChevronDownIcon };
