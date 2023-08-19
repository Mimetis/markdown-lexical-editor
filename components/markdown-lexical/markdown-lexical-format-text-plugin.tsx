'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FORMAT_TEXT_COMMAND,
  $isRangeSelection,
  TextFormatType,
} from 'lexical';
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { UPDATE_STATE_COMMAND } from './markdown-lexical-command';

const LowPriority = 1;

/**
 * Create a toolbar button for bold 
 */
export function MarkdownLexicalFormatTextPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);


  // format text to bold / italic / underline / strikethrough
  const formatText = (e: MouseEvent<HTMLButtonElement>, type: TextFormatType) => {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  // register all listeners to update the toolbar
  useEffect(() => {
    return editor.registerCommand(
      UPDATE_STATE_COMMAND,
      ({ blockType, selection }, _newEditor) => {
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
        return false;
      },
      LowPriority
    )
  }, [editor]);

  return (
    <>
      <Button variant={'outline'} type='button' aria-label="Format Bold" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={(e) => formatText(e, 'bold')}>
        <BoldIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isBold ? '3px' : '2px'} />
      </Button>
      <Button variant={'outline'} type='button'  aria-label="Format Italic" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={(e) => formatText(e, 'italic')}>
        <ItalicIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isItalic ? '3px' : '2px'} />
      </Button>
      <Button variant={'outline'} type='button'  aria-label="Format Underline" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={(e) => formatText(e, 'underline')}>
        <UnderlineIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isUnderline ? '3px' : '2px'} />
      </Button>
      <Button variant={'outline'} type='button'  aria-label="Format Strikethrough" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={(e) => formatText(e, 'strikethrough')}>
        <StrikethroughIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isStrikethrough ? '3px' : '2px'} />
      </Button>

    </>
  );
}
