import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

const CompassIcon = (props: Props) => {
  const {
    color = 'currentColor',
    height = 24,
    width = 24,
    viewBox = `0 0 ${height} ${width}`,
    ...rest
  } = props;
  return (
    <svg
      width={height}
      height={height}
      viewBox={viewBox}
      fill="none"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9471 7.0529C17.2149 7.32073 17.3085 7.7169 17.1887 8.07623L15.0687 14.4362C14.9692 14.7348 14.7348 14.9692 14.4362 15.0687L8.07623 17.1887C7.7169 17.3085 7.32073 17.2149 7.0529 16.9471C6.78507 16.6793 6.69154 16.2831 6.81132 15.9238L8.93132 9.56378C9.03086 9.26517 9.26517 9.03086 9.56378 8.93132L15.9238 6.81132C16.2831 6.69154 16.6793 6.78507 16.9471 7.0529ZM10.6706 10.6706L9.34115 14.6589L13.3294 13.3294L14.6589 9.34115L10.6706 10.6706Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as CompassIconProps };
export { CompassIcon };
