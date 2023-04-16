import { CommonIconProps } from './CommonProps';

type Props = CommonIconProps;

// black

const NoImageIcon = (props: Props) => {
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
        d="M21.8999 21.9L13.4099 13.41L3.58994 3.59001L2.09994 2.10001L0.689941 3.51001L2.99994 5.83001V19C2.99994 20.1 3.89994 21 4.99994 21H18.1699L20.4799 23.31L21.8999 21.9ZM4.99994 18L8.49994 13.5L10.9999 16.51L12.1699 15L15.1699 18H4.99994ZM20.9999 18.17L5.82994 3.00001H18.9999C20.0999 3.00001 20.9999 3.90001 20.9999 5.00001V18.17Z"
        fill={color}
      />
    </svg>
  );
};

export type { Props as NoImageIconProps };
export { NoImageIcon };
