import clsx from 'clsx';
import { FC } from 'react';
import { BaseEditor, Editor, Element as SlateElement, NodeMatch } from 'slate';
import { useSlate } from 'slate-react';
import { Icon, IconVariant } from '../../../atoms';
import { IconButton } from '../../../molecules';
import { RtfChildElement, RtfElement } from './types';
import classes from './ApplyFormatIconButton.module.scss';

type Props = {
  format: keyof Pick<RtfChildElement, 'bold' | 'italic' | 'underline'>;
  icon: IconVariant;
  editor?: BaseEditor | null;
};

export const ApplyFormatIconButton: FC<Props> = (props) => {
  const { format, icon } = props;

  let editor: BaseEditor;
  if ('editor' in props) {
    editor = props.editor!;
  } else {
    editor = useSlate();
  }

  if (!editor) {
    return null;
  }

  function isFormatApplied() {
    const { selection } = editor;
    if (!selection) {
      return false;
    } else {
      const [match] = Array.from(
        editor.nodes<RtfElement>({
          at: Editor.unhangRange(editor, selection),
          match: ((node: RtfElement | RtfChildElement) => {
            if (Editor.isEditor(node)) {
              return false;
            }
            if (SlateElement.isElement(node)) {
              return false;
            }
            return node[format] === true;
          }) as unknown as NodeMatch<RtfElement>,
        })
      );

      return Boolean(match);
    }
  }

  const toggleMark = () => {
    if (isFormatApplied()) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  };

  return (
    <IconButton
      className={clsx({
        [classes.active]: isFormatApplied(),
        [classes.nonActive]: !isFormatApplied(),
      })}
      onClick={toggleMark}
    >
      <Icon variant={icon} />
    </IconButton>
  );
};
