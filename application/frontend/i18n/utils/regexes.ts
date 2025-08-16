import { sep } from 'path';

// double backslashes
const escapedSep = sep.replaceAll('\\', '\\\\');

export const srcRegex = new RegExp(`.*${escapedSep}src${escapedSep}`);
export const endingRegex = new RegExp(`${escapedSep}i18n${escapedSep}.*`);
