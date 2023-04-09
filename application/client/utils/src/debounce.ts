export function debounce<Callback extends (...args: any[]) => void>(params: {
  callback: Callback;
  throttlingInMilliseconds: number;
}) {
  const { callback, throttlingInMilliseconds } = params;

  let timer: ReturnType<typeof setTimeout> | null = null;

  return {
    debouncedCallback: (...args: Parameters<Callback>) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, throttlingInMilliseconds);
    },
    clearTimer: () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
  };
}
