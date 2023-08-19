'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
} from 'lexical';
import { Redo2, Undo2 } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';

const LowPriority = 1;

/**
 * Create a toolbar button for bold 
 */
export function MarkdownLexicalUndoRedoPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // undo action
  const undoAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  // redo action
  const redoAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  // register all listeners to update the toolbar
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor]);


  return (
    <>
      <Button variant={'outline'} type='button' aria-label="Format Undo" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" disabled={!canUndo} onClick={undoAction}>
        <Undo2 className="w-4 h-4 md:w-5 md:h-5" />
      </Button>
      <Button variant={'outline'} type='button' aria-label="Format Redo" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" disabled={!canRedo} onClick={redoAction}>
        <Redo2 className="w-4 h-4 md:w-5 md:h-5" />
      </Button>
    </>
  );
}
