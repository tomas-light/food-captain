export interface Option<Value extends string | number = string | number> {
  value: Value;
  label: string;
}
