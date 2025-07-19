import { type ComponentType, lazy, type ReactNode, Suspense } from 'react';

export function makeSuspendedElement(
  componentImport: () => Promise<ComponentType<{ children?: ReactNode }>>,
  children?: ReactNode
) {
  const LazyComponent = lazy(async () => ({
    default: await componentImport(),
  }));

  return (
    <Suspense>
      <LazyComponent>{children}</LazyComponent>
    </Suspense>
  );
}
