export type State = 'loading' | 'disabled' | 'pristine';
export type ButtonState = Partial<Record<State, boolean>>;
