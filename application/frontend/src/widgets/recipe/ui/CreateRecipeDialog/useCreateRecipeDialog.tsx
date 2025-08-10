import { lazy, Suspense } from 'react';
import { useBoolean } from '~/shared/state';

const LazyCreateRecipeDialog = lazy(async () => ({
  default: (await import('./CreateRecipeDialog')).CreateRecipeDialog,
}));

export function useCreateRecipeDialog() {
  const { value: isOpen, setFalse: close, setTrue: show } = useBoolean(false);

  return {
    show,
    CreateRecipeDialog: isOpen && (
      <Suspense>
        <LazyCreateRecipeDialog onClose={close} />
      </Suspense>
    ),
  };
}
