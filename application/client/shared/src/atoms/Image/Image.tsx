import clsx from 'clsx';
import { FC, useState } from 'react';
import { Image as ChakraImage, ImageProps } from '@chakra-ui/react';
import { Icon } from '../icons';
import classes from './Image.module.scss';

type Props = Pick<ImageProps, 'src' | 'className' | 'onClick'> & {};

const Image: FC<Props> = (props) => {
  const { className, src, ...rest } = props;

  const [errorOnLoad, setErrorOnLoad] = useState(false);

  const hasNoImage = !src || errorOnLoad;

  return (
    <div className={className}>
      <div className={classes.positionContainer}>
        <ChakraImage
          className={clsx(classes.image, {
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
        {hasNoImage && <Icon className={classes.icon} variant={'noImage'} />}
      </div>
    </div>
  );
};

export { Image };
export type { Props as ImageProps };
