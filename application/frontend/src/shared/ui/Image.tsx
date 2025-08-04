import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';
import { useBoolean } from '../state';
import classes from './Image.module.scss';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export function Image(props: Props) {
  const { src, className, onError, ...imgAttributes } = props;

  const { value: hasError, setTrue: fail } = useBoolean(false);

  if (hasError) {
    return (
      <div className={clsx(classes.error, className)}>
        <img
          src={IMAGE_PLACEHOLDER}
          data-original-url={src}
          alt="Error loading image"
          {...imgAttributes}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      className={className}
      onError={(event) => {
        fail();
        onError?.(event);
      }}
      {...imgAttributes}
    />
  );
}

const IMAGE_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
