import clsx from 'clsx';
import { FC } from 'react';
import { BaseEditor, Editor, Element as SlateElement, NodeMatch } from 'slate';
import { useSlate } from 'slate-react';
import { Icon, IconVariant } from '../../../atoms';
import { IconButton } from '../../../molecules';
import { RtfChildElement, RtfElement, RtfListType } from './types';
import classes from './ApplyListIconButton.module.scss';

type Props = {
  list: RtfListType;
  icon: IconVariant;
  editor?: BaseEditor | null;
};

export const ApplyListIconButton: FC<Props> = (props) => {
  const { list, icon } = props;

  let editor: BaseEditor;
  if ('editor' in props) {
    editor = props.editor!;
  } else {
    editor = useSlate();
  }

  if (!editor) {
    return null;
  }

  function isList() {
    const { selection } = editor;
    if (!selection) {
      return false;
    } else {
      const [match] = Array.from(
        editor.nodes<RtfElement>({
          at: Editor.unhangRange(editor, selection),
          match: isNodeMatchedToList(list) as unknown as NodeMatch<RtfElement>,
        })
      );

      return Boolean(match);
    }
  }

  const toggleBlock = () => {
    const isActive = isList();

    editor.unwrapNodes({
      split: true,
      match: isNodeMatchedToList(list) as unknown as NodeMatch<RtfElement>,
    });

    if (isActive) {
      editor.setNodes<RtfElement>({
        type: 'paragraph',
      });
    } else {
      editor.setNodes<RtfElement>({
        type: 'list-item',
      });

      const block = { type: list, children: [] };
      editor.wrapNodes(block);
    }
  };

  return (
    <IconButton
      className={clsx({
        [classes.active]: isList(),
        [classes.nonActive]: !isList(),
      })}
      onClick={toggleBlock}
    >
      <Icon variant={icon} />
    </IconButton>
  );
};

function isNodeMatchedToList(list: RtfListType) {
  return (node: RtfElement | RtfChildElement) => {
    if (Editor.isEditor(node)) {
      return false;
    }
    if (!SlateElement.isElement(node)) {
      return false;
    }
    return node.type === list;
  };
}
