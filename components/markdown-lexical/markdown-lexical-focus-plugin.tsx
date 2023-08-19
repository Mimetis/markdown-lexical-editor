'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { BLUR_COMMAND, FOCUS_COMMAND } from 'lexical';
import { useEffect, useLayoutEffect, useState } from 'react';

const isServer = typeof window === 'undefined';
const LowPriority = 1;

/**
 * Handle focus
 */
export function FocusPlugin({ focus, onFocus, onBlur }: { focus?: boolean; onFocus?: () => void; onBlur?: () => void }) {
  const [editor] = useLexicalComposerContext();
  const [hasFocus, setHasFocus] = useState(focus ?? false);

  useLayoutEffect(() => {
    setHasFocus(editor.getRootElement() === document.activeElement);
    return mergeRegister(
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setHasFocus(true);
          if (onFocus) onFocus();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setHasFocus(false);
          if (onBlur) onBlur();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, onBlur, onFocus]);

  useEffect(() => {
    if (focus && !hasFocus) editor.focus();
  }, [editor, focus, hasFocus]);

  return null;
}
