export function toIsoString(dateOrString: Date | string): string {
  if (dateOrString instanceof Date) {
    return dateOrString.toISOString();
  }
  return dateOrString;
}
