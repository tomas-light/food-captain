import { lazy } from 'react';
import { useSuspense } from '~/shared/lazy-import';
import { useBoolean } from '~/shared/state';

const LazyCreateRecipeDialog = lazy(async () => ({
  default: (await import('./CreateRecipeDialog')).CreateRecipeDialog,
}));

export function useCreateRecipeDialog() {
  const { value: isOpen, setFalse: close, setTrue: show } = useBoolean(false);

  const { isSuspending, Suspense } = useSuspense();

  return {
    show,
    CreateRecipeDialog: isOpen && (
      <Suspense>
        <LazyCreateRecipeDialog onClose={close} />
      </Suspense>
    ),
    isSuspending,
  };
}
