import clsx from 'clsx';
import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
} from 'react';
import classes from './Typography.module.scss';

type HtmlComponent = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'label' | 'em';

type Props<THtmlComponent extends HtmlComponent> = PropsWithChildren<
  {
    /** @default 'span' */
    component?: THtmlComponent;

    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl';

    /** @default 'normal' */
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';

    color?: string;
  } & (THtmlComponent extends 'label'
    ? LabelHTMLAttributes<HTMLLabelElement>
    : HTMLAttributes<HTMLSpanElement>)
>;

export function Typography<THtmlComponent extends HtmlComponent>(
  props: Props<THtmlComponent>
) {
  const {
    children,
    component: Component = 'span',
    size = 'medium',
    weight = 'normal',
    className,
    color,
    ...attributes
  } = props;

  return (
    <Component
      className={clsx(classes.root, className)}
      data-size={size}
      data-weight={weight}
      {...(color != null
        ? {
            style: {
              '--color': color,
            },
          }
        : {})}
      {...(attributes as HTMLAttributes<HTMLSpanElement>)}
    >
      {children}
    </Component>
  );
}
