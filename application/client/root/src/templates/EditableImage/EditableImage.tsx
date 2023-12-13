import { use } from 'cheap-di-react';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import {
  Icon,
  IconButton,
  Image,
  ImageField,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useTranslation } from '../../config/i18next/TranslationContext';
import classes from './EditableImage.module.scss';

type Props = {
  className?: string;
  imageId: number | undefined;
  imageTags: string[];
  onImageChanged: (imageId: number) => void;
  onOpenGallery: () => void;
};

const EditableImage: FC<Props> = (props) => {
  const { className, imageId, imageTags, onImageChanged, onOpenGallery } =
    props;

  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageApi = use(ImageApi);

  const uploadImage = async (imageFile: File) => {
    const response = await imageApi.addAsync(imageFile, imageTags);
    if (response.isFailed() || !response.data) {
      console.warn('image was not uploaded');
      return;
    }

    onImageChanged(response.data.imageId);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Image
        className={classes.image}
        src={imageId ? imageApi.makeUrl(imageId) : undefined}
      />

      <div className={classes.buttons}>
        <ImageField
          className={classes.imageField}
          ref={imageInputRef}
          onChange={uploadImage}
        />

        <IconButton
          className={classes.iconButton}
          onClick={() => {
            if (imageInputRef.current) {
              imageInputRef.current.click();
            }
          }}
          icon={<Icon variant={'upload'} />}
          title={t('common.uploadImage') ?? ''}
        />

        <IconButton
          className={classes.iconButton}
          onClick={onOpenGallery}
          icon={<Icon variant={'images'} />}
          title={t('common.chooseFromGallery') ?? ''}
        />

        <IconButton
          className={classes.iconButton}
          onClick={async () => {
            try {
              const permission = await navigator.permissions.query({
                // todo: "clipboard-read" is missing in type declaration
                name: 'clipboard-read' as PermissionName,
              });
              if (permission.state === 'denied') {
                throw new Error('Not allowed to read clipboard.');
              }
              const clipboardContents = await navigator.clipboard.read();

              const lastItemInClipboard = clipboardContents.pop();
              if (!lastItemInClipboard) {
                throw new Error('Clipboard is empty');
              }

              const imageMimeType = lastItemInClipboard.types.find((mimeType) =>
                mimeType.startsWith('image/')
              );
              if (!imageMimeType) {
                throw new Error('Clipboard does not contain image data.');
              }

              const imageBlob =
                await lastItemInClipboard.getType(imageMimeType);

              const [type, extension] = imageMimeType.split('/');
              const imageFile = new File(
                [imageBlob],
                `image from buffer.${extension}`,
                {
                  type: imageMimeType,
                }
              );

              uploadImage(imageFile);
            } catch (error) {
              if (error instanceof Error) {
                console.error(error.message);
              }
            }
          }}
          icon={<Icon variant={'paste'} />}
          title={t('common.pasteFromBuffer') ?? ''}
        />
      </div>
    </div>
  );
};

export { EditableImage };
export type { Props as EditableImageProps };
