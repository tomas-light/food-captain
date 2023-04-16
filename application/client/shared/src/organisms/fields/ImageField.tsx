import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { guid } from '@food-captain/client-utils';
import { Icon } from '../../atoms/icons';
import classes from './ImageField.module.scss';

type Props = {
  className?: string;
  label: string;
  onChange: (imageFile: File) => void;
};

function ImageField(props: Props) {
  const { className, label, onChange } = props;

  const [, rerender] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useMemo(() => guid(), []);

  useEffect(() => {
    if (inputRef.current) {
      rerender({});
    }
  }, [inputRef.current]);

  return (
    <InputGroup className={className}>
      <InputLeftElement pointerEvents="none">
        <Icon variant={'image'} />
      </InputLeftElement>

      <label
        htmlFor={inputId}
        className={clsx(classes.label, inputRef.current?.className)}
      >
        {label}
      </label>

      <Input
        id={inputId}
        ref={inputRef}
        placeholder={label}
        hidden
        type="file"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          if (!files) {
            console.warn('Image is not chosen');
            return;
          }
          const [imageFile] = files;
          onChange(imageFile);
        }}
      />
    </InputGroup>
  );
}

export { ImageField };
export type { Props as ImageFieldProps };
