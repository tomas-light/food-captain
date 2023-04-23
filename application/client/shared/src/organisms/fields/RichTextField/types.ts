export type RtfListType = 'number' | 'bullet';
export type ElementType = 'paragraph' | 'list-item';

export type RtfElement = {
  type: ElementType | RtfListType;
  children: RtfChildElement[];
};

export type RtfChildElement = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  text: string;
};
