'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { MouseEvent,  useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { UPDATE_STATE_COMMAND } from './markdown-lexical-command';
import { $createQuoteNode } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { QuoteIcon } from 'lucide-react';

const LowPriority = 1;

/**
 * Create a toolbar button for bold 
 */
export function MarkdownLexicalQuotePlugin() {
  const [isQuote, setIsQuote] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');

  // register all listeners to update the toolbar
  useEffect(() => {
    return editor.registerCommand(
      UPDATE_STATE_COMMAND,
      ({ blockType, selection }, _newEditor) => {
        setBlockType(blockType);
        if ($isRangeSelection(selection)) {
          setIsQuote(blockType == 'quote');
        }
        return false;
      },
      LowPriority
    )
  }, [editor]);

  // format text to quote text
  const formatQuote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  return (
    <>
      <Button variant={'outline'} type='button' aria-label="Format Quote" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={formatQuote}>
        <QuoteIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isQuote ? '3px' : '2px'} />
      </Button>

    </>
  );
}
