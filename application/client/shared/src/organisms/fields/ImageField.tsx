import { FormControl, FormLabel, Input } from '@chakra-ui/react';

type Props = {
  label: string;
  onChange: (imageFile: File) => void;
};

function ImageField(props: Props) {
  const { label, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <Input
        placeholder={label}
        type="file"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          if (!files) {
            console.warn('Image is not choisen');
            return;
          }
          const [imageFile] = files;
          onChange(imageFile);
        }}
      />
    </FormControl>
  );
}

export { ImageField };
export type { Props as ImageFieldProps };
