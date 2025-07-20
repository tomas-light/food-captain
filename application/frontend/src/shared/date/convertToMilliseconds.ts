/**
 * It returns desired time in milliseconds
 * @example
 * time(5, 'seconds') // 5 * 1000
 *
 * @example
 * time(5, 'minutes') // 5 * 1000 * 60
 * */
export function convertToMilliseconds(
  number: number,
  unit: 'seconds' | 'minutes' | 'hours'
) {
  const seconds = 1_000 * number;
  if (unit === 'seconds') {
    return seconds;
  }

  const minutes = 60 * seconds;
  if (unit === 'minutes') {
    return minutes;
  }

  const hours = 60 * minutes;
  if (unit === 'hours') {
    return hours;
  }

  return number;
}
