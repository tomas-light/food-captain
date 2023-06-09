import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ComponentProps, FC, ForwardedRef, forwardRef } from 'react';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronUpIcon } from './ChevronUpIcon';
import { CompassIcon } from './CompassIcon';
import { FilterIcon } from './FilterIcon';
import { FireIcon } from './FireIcon';
import { ImageIcon } from './ImageIcon';
import { ImageSearchIcon } from './ImageSearchIcon';
import { ImagesIcon } from './ImagesIcon';
import { LogoIcon } from './LogoIcon';
import { MeatBallIcon } from './MeatBallIcon';
import { MinusIcon } from './MinusIcon';
import { NoImageIcon } from './NoImageIcon';
import { PasteIcon } from './PasteIcon';
import { PlatterIcon } from './PlatterIcon';
import { PlusIcon } from './PlusIcon';
import { RtfBoldIcon } from './RtfBoldIcon';
import { RtfItalicIcon } from './RtfItalicIcon';
import { RtfListBulletIcon } from './RtfListBulletIcon';
import { RtfListNumericIcon } from './RtfListNumericIcon';
import { RtfUnderlineIcon } from './RtfUnderlineIcon';
import { SearchIcon } from './SearchIcon';
import { SortDownIcon } from './SortDownIcon';
import { SortUpIcon } from './SortUpIcon';
import { SteeringWheelIcon } from './SteeringWheelIcon';
import { TimerIcon } from './TimerIcon';
import { TitleIcon } from './TitleIcon';
import { UploadIcon } from './UploadIcon';

const variants = {
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronUp: ChevronUpIcon,
  compass: CompassIcon,
  filter: FilterIcon,
  fire: FireIcon,
  image: ImageIcon,
  imageSearch: ImageSearchIcon,
  images: ImagesIcon,
  logo: LogoIcon,
  meatBall: MeatBallIcon,
  minus: MinusIcon,
  noImage: NoImageIcon,
  paste: PasteIcon,
  platter: PlatterIcon,
  plus: PlusIcon,
  rtfBold: RtfBoldIcon,
  rtfItalic: RtfItalicIcon,
  rtfListBullet: RtfListBulletIcon,
  rtfListNumeric: RtfListNumericIcon,
  rtfUnderline: RtfUnderlineIcon,
  search: SearchIcon,
  sortDown: SortDownIcon,
  sortUp: SortUpIcon,
  steeringWheel: SteeringWheelIcon,
  timer: TimerIcon,
  title: TitleIcon,
  upload: UploadIcon,
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
