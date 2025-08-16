import { sep } from 'path';
import { endingRegex, srcRegex } from './regexes';

export const getNamespace = (relativeFilePath: string) => {
  const pathWithoutSrc = relativeFilePath.replace(srcRegex, '');
  const layerSlice = pathWithoutSrc.replace(endingRegex, '');
  const [layer, slice] = layerSlice.split(sep);

  // app does not contain slices
  if (layer === 'app') {
    return layer;
  }

  return `${layer}/${slice}`;
};
