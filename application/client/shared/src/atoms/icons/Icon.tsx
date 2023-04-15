import { ComponentProps, FC, ForwardedRef, forwardRef } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { LogoIcon } from './LogoIcon';
import { MeatBallIcon } from './MeatBallIcon';
import { PlatterIcon } from './PlatterIcon';

const variants = {
  chevronLeft: ChevronLeftIcon,
  logo: LogoIcon,
  meatBall: MeatBallIcon,
  platter: PlatterIcon,
};

type Variants = typeof variants;
type IconVariant = keyof Variants;

type VariantProps<Variant extends IconVariant> = ComponentProps<
  Variants[Variant]
>;

type Props<Variant extends IconVariant> = {
  variant: Variant;
} & VariantProps<Variant>;

function Icon<Variant extends IconVariant>(
  props: Props<Variant>,
  ref: ForwardedRef<SVGSVGElement>
) {
  const { variant, ...componentProps } = props;

  if (!variant) {
    return null;
  }

  const Component = variants[variant] as FC<typeof componentProps> | undefined;

  if (!Component) {
    throw new Error(`variant (${variant}) is not supported`);
  }

  return <Component {...componentProps} />;
}

const componentWithRef = forwardRef(Icon) as typeof Icon;

export type {
  Props as IconProps,
  IconVariant,
  VariantProps as IconVariantProps,
};
export { componentWithRef as Icon };
