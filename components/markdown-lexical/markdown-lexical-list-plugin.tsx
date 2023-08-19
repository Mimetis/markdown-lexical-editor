'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $isRangeSelection,
} from 'lexical';
import { ListIcon, ListOrderedIcon } from 'lucide-react';
import { MouseEvent,  useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { UPDATE_STATE_COMMAND } from './markdown-lexical-command';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';

const LowPriority = 1;

/**
 * Create a toolbar button for bold 
 */
export function MarkdownLexicalListPlugin() {
  const [isListOrdered, setIsListOrdered] = useState(false);
  const [isListBullet, setIsListBullet] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');

  // register all listeners to update the toolbar
  useEffect(() => {
    return editor.registerCommand(
      UPDATE_STATE_COMMAND,
      ({ blockType, selection }, _newEditor) => {
        setBlockType(blockType);
        if ($isRangeSelection(selection)) {
          setIsListBullet(blockType == 'ul');
          setIsListOrdered(blockType == 'ol');
        }
        return false;
      },
      LowPriority
    )
  }, [editor]);



  // format text to bullet list
  const formatBulletList = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  // format text to numbered list
  const formatNumberedList = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };


  return (
    <>
      <Button variant={'outline'} type='button'  aria-label="Format Numbered List" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={formatNumberedList}>
        <ListOrderedIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isListOrdered ? '3px' : '2px'} />
      </Button>
      <Button variant={'outline'} type='button'  aria-label="Format Bullet List" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={formatBulletList}>
        <ListIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isListBullet ? '3px' : '2px'} />
      </Button>

    </>
  );
}
