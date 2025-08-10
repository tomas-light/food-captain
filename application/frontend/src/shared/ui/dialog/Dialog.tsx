import clsx from 'clsx';
import {
  type HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useBoolean } from '../../state';
import { DIALOG_ANIMATION_DURATION } from './DIALOG_ANIMATION_DURATION';
import { DialogContext, type DialogContextType } from './DialogContext';
import { DialogOverlay } from './DialogOverlay';
import classes from './Dialog.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  onClose: VoidFunction;
};

export function Dialog(props: Props) {
  const { children, onClose, className, style, ...divAttributes } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const { value: isOpen, setFalse: close } = useBoolean(true);

  const handleClose = useCallback(() => {
    close();

    timerRef.current = setTimeout(() => {
      onCloseRef.current();
    }, DIALOG_ANIMATION_DURATION);
  }, [close]);

  const dialogContext = useMemo<DialogContextType>(
    () => ({
      onClose: handleClose,
    }),
    [handleClose]
  );

  useEffect(() => {
    window.addEventListener('mousedown', listener);

    return () => {
      window.removeEventListener('mousedown', listener);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    function listener(event: MouseEvent) {
      if (!event.target || !ref.current) {
        return;
      }

      const target = event.target as HTMLElement;
      if (!ref.current.contains(target)) {
        handleClose();
      }
    }
  }, [handleClose]);

  return (
    <DialogContext value={dialogContext}>
      <DialogOverlay>
        <div
          ref={ref}
          className={clsx(classes.root, className)}
          data-show={isOpen}
          style={{
            ...style,
            '--animation-duration': `${DIALOG_ANIMATION_DURATION}ms`,
          }}
          {...divAttributes}
        >
          {children}
        </div>
      </DialogOverlay>
    </DialogContext>
  );
}
