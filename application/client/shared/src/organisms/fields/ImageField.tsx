import {
  Input,
  InputGroup,
  InputLeftElement,
  useMergeRefs,
} from '@chakra-ui/react';
import clsx from 'clsx';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { guid } from '@food-captain/client-utils';
import { Icon } from '../../atoms/icons';
import classes from './ImageField.module.scss';

type Props = {
  className?: string;
  label?: string;
  onChange: (imageFile: File) => void;
};

const ImageField: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref
) => {
  const { className, label, onChange } = props;

  const [, rerender] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useMemo(() => guid(), []);

  const mergedRef = useMergeRefs(ref, inputRef);

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

      {label && (
        <label
          htmlFor={inputId}
          className={clsx(classes.label, inputRef.current?.className)}
        >
          {label}
        </label>
      )}

      <Input
        id={inputId}
        ref={mergedRef}
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
};

const componentWithRef = forwardRef(ImageField);

export { componentWithRef as ImageField };
export type { Props as ImageFieldProps };
