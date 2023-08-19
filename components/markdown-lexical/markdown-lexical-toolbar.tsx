'use client';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getNearestNodeOfType } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  RangeSelection,
  NodeSelection,
  GridSelection,
} from 'lexical';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { UPDATE_STATE_COMMAND } from './markdown-lexical-command';

/**
 * Create a toolbar with common buttons (bold, italic, underline ....)
 * children components are additional buttons to add on the right of the toolbar
 */
export function MarkdownLexicalToolbar({ children }: { children?: ReactNode }) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');
  const [selection, setSelection] = useState<null | RangeSelection | NodeSelection | GridSelection>(null);

  // update the toolbar
  const updateSelection = useCallback(() => {
    const currentSelection = $getSelection();
    setSelection(currentSelection);
    // if something is selected, we can format
    if ($isRangeSelection(currentSelection)) {
      const anchorNode = currentSelection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      let type: string = 'paragraph';
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    editor.dispatchCommand(UPDATE_STATE_COMMAND, { blockType: blockType, selection: selection });
  }, [blockType, editor, selection])


  // basically on change event 
  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => editorState.read(() => updateSelection()))
  }, [editor, updateSelection]);

  return (
    <div className="flex gap-2">
      {children}
    </div>
  );
}
