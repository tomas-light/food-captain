import { ForwardedRef, SVGProps } from 'react';

export interface CommonProps<Variant> {
  variant: Variant;
}

export interface CommonIconProps extends SVGProps<SVGSVGElement> {
  // here you can add common stuff
  forwardRef?: ForwardedRef<SVGSVGElement>;
}
