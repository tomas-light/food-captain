import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import { Button, Icon, TextField } from '@food-captain/client-shared';
import { useTranslation } from '../../config/i18next/TranslationContext';
import { Gallery } from '../../Gallery';
import classes from './GalleryModal.module.scss';

type Props = {
  onChoose: (imageId: number) => void;
};

type GalleryModalRef = {
  onOpen: () => void;
};

const GalleryModal: ForwardRefRenderFunction<GalleryModalRef, Props> = (
  props,
  ref
) => {
  const { onChoose } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({ onOpen }), []);

  const [gallerySearch, setGallerySearch] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
    undefined
  );

  const onCloseAndClean = () => {
    onClose();
    setSelectedImageId(undefined);
  };

  const onConfirmChoice = () => {
    if (selectedImageId != null) {
      onChoose(selectedImageId);
      onCloseAndClean();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseAndClean} size={'5xl'}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader className={classes.galleryTitle}>
          {t('common.gallery')}
        </ModalHeader>

        <ModalCloseButton size={'lg'} />

        <ModalBody className={classes.gallery}>
          <TextField
            className={classes.search}
            icon={<Icon variant={'imageSearch'} />}
            label={t('common.imageSearch')}
            value={gallerySearch}
            onChange={setGallerySearch}
          />

          <Gallery
            className={classes.images}
            searchString={gallerySearch}
            onImageClick={(imageId, isDoubleClick) => {
              setSelectedImageId(imageId);
              if (isDoubleClick) {
                onConfirmChoice();
              }
            }}
            selectedImageId={selectedImageId}
          />
        </ModalBody>

        <ModalFooter>
          <Button disabled={selectedImageId == null} onClick={onConfirmChoice}>
            {t('common.choose')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const componentWithRef = forwardRef(GalleryModal);

export { componentWithRef as GalleryModal };
export type { Props as GalleryModalProps, GalleryModalRef };
