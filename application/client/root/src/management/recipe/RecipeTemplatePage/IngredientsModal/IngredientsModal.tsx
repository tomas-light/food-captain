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
  useEffect,
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
  onChoose: (ingredientIds: Ingredient['id'][]) => void;
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

  const [searchedIngredientName, setSearchedIngredientName] = useState('');
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<
    Set<Ingredient['id']>
  >(new Set());

  const [notAddedIngredients, setNotAddedIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    const selectedIdsSet = new Set<Ingredient['id']>(
      addedIngredients.map((ingredient) => ingredient.ingredient_id)
    );
    setSelectedIngredientIds(selectedIdsSet);
    setNotAddedIngredients(
      Array.from(ingredientsMap.values()).filter(
        (ingredient) => !selectedIdsSet.has(ingredient.id)
      )
    );
  }, [addedIngredients]);

  const onCloseAndClean = () => {
    onClose();
    setSelectedIngredientIds(new Set());
  };

  const onConfirmChoice = () => {
    if (selectedIngredientIds != null) {
      onChoose(Array.from(selectedIngredientIds.values()));
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
            onIngredientClick={(ingredientId) => {
              setSelectedIngredientIds((selected) => {
                const newSet = new Set(selected);
                if (newSet.has(ingredientId)) {
                  newSet.delete(ingredientId);
                } else {
                  newSet.add(ingredientId);
                }
                return newSet;
              });
            }}
            selectedIngredientIds={selectedIngredientIds}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={selectedIngredientIds == null}
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
