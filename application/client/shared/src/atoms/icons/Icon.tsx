import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ComponentProps, FC, ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from './ImageIcon';
import { ImageSearchIcon } from './ImageSearchIcon';
import { LogoIcon } from './LogoIcon';
import { MeatBallIcon } from './MeatBallIcon';
import { NoImageIcon } from './NoImageIcon';
import { PlatterIcon } from './PlatterIcon';
import { TitleIcon } from './TitleIcon';

const variants = {
  chevronLeft: ChevronLeftIcon,
  image: ImageIcon,
  imageSearch: ImageSearchIcon,
  logo: LogoIcon,
  meatBall: MeatBallIcon,
  noImage: NoImageIcon,
  platter: PlatterIcon,
  title: TitleIcon,
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
