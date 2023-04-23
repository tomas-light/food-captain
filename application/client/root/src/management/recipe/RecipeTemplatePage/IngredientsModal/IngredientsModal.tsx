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
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, TextField } from '@food-captain/client-shared';
import { useSelector } from '~/config/redux/useSelector';
import { Ingredient } from '~/models';
import { Ingredients } from './Ingredients';
import classes from './IngredientsModal.module.scss';

type Props<T extends { ingredient_id: Ingredient['id'] }> = {
  addedIngredients: T[];
  onChoose: (ingredientId: number) => void;
};

type IngredientsModalRef = {
  onOpen: () => void;
};

function IngredientsModal<T extends { ingredient_id: Ingredient['id'] }>(
  props: Props<T>,
  ref: ForwardedRef<IngredientsModalRef>
) {
  const { addedIngredients, onChoose } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({ onOpen }), []);

  const { ingredientsMap } = useSelector((state) => state.ingredient);

  const addedIngredientIds = useMemo(
    () =>
      new Set<Ingredient['id']>(
        addedIngredients.map((ingredient) => ingredient.ingredient_id)
      ),
    [addedIngredients]
  );

  const notAddedIngredients = useMemo(
    () =>
      Array.from(ingredientsMap.values()).filter(
        (ingredient) => !addedIngredientIds.has(ingredient.id)
      ),
    [addedIngredientIds, ingredientsMap]
  );

  const [searchedIngredientName, setSearchedIngredientName] = useState('');
  const [selectedIngredientId, setSelectedIngredientId] = useState<
    Ingredient['id'] | undefined
  >(undefined);

  const onCloseAndClean = () => {
    onClose();
    setSelectedIngredientId(undefined);
  };

  const onConfirmChoice = () => {
    if (selectedIngredientId != null) {
      onChoose(selectedIngredientId);
      onCloseAndClean();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseAndClean} size={'5xl'}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader className={classes.galleryTitle}>
          {t('ingredient.many')}
        </ModalHeader>

        <ModalCloseButton size={'lg'} />

        <ModalBody className={classes.gallery}>
          <TextField
            className={classes.search}
            icon={<Icon variant={'search'} />}
            label={t('ingredient.search')}
            value={searchedIngredientName}
            onChange={setSearchedIngredientName}
          />

          <Ingredients
            className={classes.ingredients}
            searchString={searchedIngredientName}
            ingredients={notAddedIngredients}
            onIngredientClick={(ingredientId, isDoubleClick) => {
              setSelectedIngredientId(ingredientId);
              if (isDoubleClick) {
                onConfirmChoice();
              }
            }}
            selectedIngredientId={selectedIngredientId}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={selectedIngredientId == null}
            onClick={onConfirmChoice}
          >
            {t('common.choose')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const componentWithRef = forwardRef(IngredientsModal);

export { componentWithRef as IngredientsModal };
export type { Props as IngredientsModalProps, IngredientsModalRef };
