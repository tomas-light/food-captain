import clsx from 'clsx';
import { FC, useState } from 'react';
import { Image as ChakraImage, ImageProps } from '@chakra-ui/react';
import classes from './Image.module.scss';

type Props = Pick<
  ImageProps,
  'src' | 'className' | 'onClick' | 'onDoubleClick'
>;

const Image: FC<Props> = (props) => {
  const { className, src, ...rest } = props;

  const [errorOnLoad, setErrorOnLoad] = useState(false);

  const hasNoImage = !src || errorOnLoad;

  return (
    <ChakraImage
      className={clsx(classes.image, className, {
        [classes.withoutImage]: hasNoImage,
      })}
      src={src}
      borderRadius={8}
      border={'1px'}
      onError={(event) => {
        setErrorOnLoad(true);
      }}
      {...rest}
    />
  );
};

export { Image };
export type { Props as ImageProps };
