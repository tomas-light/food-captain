import { createStore } from '~/shared/store';

const useStore = createStore({
  expanded: false,
});

export function useIsMobileSidebarExpanded() {
  return useStore((state) => state.expanded);
}

export function toggleMobileSidebarExpanded() {
  useStore.setState((state) => ({
    expanded: !state.expanded,
  }));
}
