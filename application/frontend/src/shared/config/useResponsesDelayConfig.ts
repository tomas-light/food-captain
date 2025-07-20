import { createStore } from '../store/index';

const useResponsesDelayConfig = createStore(
  {
    delay: undefined as number | undefined,
  },
  {
    name: 'responses-delay-config',
  }
);

export function useResponsesDelay() {
  return useResponsesDelayConfig((state) => state.delay);
}

export function getResponsesDelay() {
  return useResponsesDelayConfig.getState().delay;
}

export function setResponsesDelay(delay: number | undefined) {
  useResponsesDelayConfig.setState({ delay });
}
