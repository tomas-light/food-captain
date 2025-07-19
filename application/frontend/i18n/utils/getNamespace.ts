import { sep } from 'path';

export const getNamespace = (relativeFilePath: string) => {
  const [layer, slice] = relativeFilePath.split(sep);

  // app does not contain slices
  if (layer === 'app') {
    return layer;
  }

  return `${layer}/${slice}`;
};
