export const colorSchemesMap = new Map<string | undefined, string>([
  ['#EDF2F7', 'gray'],
  ['#BEE3F8', 'blue'],
  ['#B2F5EA', 'teal'],
  ['#C6F6D5', 'green'],
  ['#FED7D7', 'red'],
  ['#E9D8FD', 'purple'],
  ['#FED7E2', 'pink'],
  ['#FEEBCB', 'orange'],
]);

export const tagsColors = Array.from(colorSchemesMap.keys()) as string[];
