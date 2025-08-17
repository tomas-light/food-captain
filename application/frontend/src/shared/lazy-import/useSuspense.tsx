import {
  Suspense,
  useCallback,
  useEffect,
  type ComponentProps,
  type PropsWithChildren,
} from 'react';
import { useBoolean } from '~/shared/state';

export function useSuspense() {
  const {
    value: isSuspending,
    setFalse: resume,
    setTrue: suspend,
  } = useBoolean(false);

  return {
    Suspense: useCallback(
      (props: ComponentProps<typeof Suspense>) => {
        const { fallback, ...suspenseProps } = props;
        return (
          <Suspense
            fallback={
              <SuspenseNotifier resume={resume} suspend={suspend}>
                {fallback}
              </SuspenseNotifier>
            }
            {...suspenseProps}
          />
        );
      },
      [resume, suspend]
    ),
    isSuspending,
  };
}

type Props = PropsWithChildren<{
  suspend: VoidFunction;
  resume: VoidFunction;
}>;

function SuspenseNotifier(props: Props) {
  const { resume, suspend, children } = props;

  useEffect(() => {
    suspend();

    return () => {
      resume();
    };
  }, [resume, suspend]);

  return children;
}
