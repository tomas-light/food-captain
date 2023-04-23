import clsx from 'clsx';
import {
  ComponentProps,
  FC,
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
  hideToolbar?: boolean;
};

const RichTextField = (props: Props, ref: ForwardedRef<RichTextFieldRef>) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    disabled,
    hideToolbar = false,
  } = props;

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useImperativeHandle(ref, () => ({ editor }), [editor]);

  return (
    <div className={className}>
      <Slate
        editor={editor}
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
          placeholder={placeholder}
          disabled={disabled}
        />
      </Slate>
    </div>
  );
};

const componentWithRef = forwardRef(RichTextField);

export { componentWithRef as RichTextField };
export type { Props as RichTextFieldProps, RichTextFieldRef };
