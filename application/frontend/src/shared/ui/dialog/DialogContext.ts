import { createContext } from 'react';

export type DialogContextType = {
  onClose: VoidFunction;
};

export const DialogContext = createContext<DialogContextType | null>(null);
