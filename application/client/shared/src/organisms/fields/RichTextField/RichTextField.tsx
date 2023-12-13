import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import { BaseEditor, createEditor } from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ApplyFormatIconButton } from './ApplyFormatIconButton';
import { ApplyListIconButton } from './ApplyListIconButton';
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

type RichTextFieldRef = {
  editor: BaseEditor & ReactEditor & HistoryEditor;
};

type Props = {
  className?: string;
  placeholder: string;
  value: RtfElement[];
  onChange: (value: RtfElement[]) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  hideToolbar?: boolean;
};

const RichTextField = (props: Props, ref: ForwardedRef<RichTextFieldRef>) => {
  const { className, value, onChange, hideToolbar = false, ...rest } = props;

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useImperativeHandle(ref, () => ({ editor }), [editor]);

  return (
    <div className={className}>
      <Slate
        editor={editor}
        // @ts-expect-error
        value={value.length ? value : fallbackRtfElements}
        onChange={(newValue) => {
          onChange(newValue as RtfElement[]);
        }}
      >
        {!hideToolbar && (
          <div className={classes.toolbar}>
            <ApplyFormatIconButton format="bold" icon="rtfBold" />
            <ApplyListIconButton list="bullet" icon="rtfListBullet" />
          </div>
        )}

        <Editable
          className={classes.editor}
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
          {...rest}
        />
      </Slate>
    </div>
  );
};

const componentWithRef = forwardRef(RichTextField);

export { componentWithRef as RichTextField };
export type { Props as RichTextFieldProps, RichTextFieldRef };
