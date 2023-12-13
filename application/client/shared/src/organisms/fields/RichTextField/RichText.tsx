import { ComponentProps, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { RenderedRtfChild } from './RenderedRtfChild';
import { RenderedRtfElement } from './RenderedRtfElement';
import { RtfElement } from './types';
import classes from './RichTextField.module.scss';

const fallbackRtfElements: RtfElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

type Props = {
  className?: string;
  value: RtfElement[];
};

/** Viewer of Rich text formatted data */
export const RichText = (props: Props) => {
  const { className, value } = props;

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div className={className}>
      <Slate
        editor={editor}
        // @ts-expect-error
        value={value.length ? value : fallbackRtfElements}
      >
        <Editable
          renderElement={
            RenderedRtfElement as unknown as ComponentProps<
              typeof Editable
            >['renderElement']
          }
          renderLeaf={
            RenderedRtfChild as unknown as ComponentProps<
              typeof Editable
            >['renderLeaf']
          }
          readOnly
        />
      </Slate>
    </div>
  );
};

export type { Props as RichTextProps };
