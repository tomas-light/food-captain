import {
  TypedUseSelectorHook,
  useSelector as useSelectorRedux,
} from 'react-redux';
import { State } from './configureRedux';

export const useSelector = useSelectorRedux as TypedUseSelectorHook<State>;
