'use client';

import { cn } from '@/lib/utils';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { $isListNode, ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { TRANSFORMERS, $convertToMarkdownString, $convertFromMarkdownString } from '@lexical/markdown';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode, $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection, BLUR_COMMAND, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, EditorState, FOCUS_COMMAND, FORMAT_TEXT_COMMAND, GridSelection, LexicalCommand, LexicalEditor, NodeSelection, REDO_COMMAND, RangeSelection, TextFormatType, UNDO_COMMAND } from 'lexical';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode, forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from './button';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, QuoteIcon, Redo2, StrikethroughIcon, UnderlineIcon, Undo2 } from 'lucide-react';
import { mergeRegister, $getNearestNodeOfType } from '@lexical/utils';
import { $wrapNodes } from '@lexical/selection';


// tailwind theme css for our Lexical markdown textarea
const tailwindTheme = {
  ltr: 'text-left',
  rtl: 'text-right',
  paragraph: 'relative m-0',
  quote: 'm-0 ml-6 pl-6 border-l-slate-300 border-l-4',
  list: {
    nested: {
      listitem: 'list-none ml-2',
    },
    ul: 'list-disc ml-7',
    ol: 'list-decimal ml-7',
    listitem: 'ml-2',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    overflowed: 'editor-text-overflowed',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'line-through underline',
  },
};

const LowPriority = 1;
const UPDATE_STATE_COMMAND: LexicalCommand<{ blockType: string, selection: null | RangeSelection | NodeSelection | GridSelection }> = { type: "UPDATE_STATE_COMMAND" }

/**
 *  helper used to dispatch a LexicalCommand<T> from a button click
 */
function dispatchCommandHandler<T>(e: MouseEvent<HTMLButtonElement>, editor: LexicalEditor, command: LexicalCommand<T>, arg?: T) {
  e.preventDefault();
  editor.dispatchCommand(command, arg as T);
};

/**
 * Markdown properties: All input properties + custom
 */
interface MarkdownLexicalProps extends ComponentPropsWithoutRef<'input'> {
  focus?: boolean
  defaultMarkdownValue?: string;
  placeholder?: string;
  // override onChange
  onChange?: (e: { target: { value?: string | {}; name?: string }; type?: string }) => void;
  onChangeMarkdownValue?: (markdown?: string) => void;
  /** specific text area className if needed */
  textAreaClassName?: string;
  children?: ReactNode
}

/**
 * Placeholder when textarea is empty
 */
const PlaceHolder = ({ text = 'Enter some Text' }: { text?: string }) => {
  return <div className="text-gray-600 dark:text-gray-300  text-sm absolute top-2 left-2 overflow-hidden text-ellipsis select-none inline-block pointer-events-none">{text}</div>;
};

/**
 * Create a simple Markdown WYSIWYG editor, based on Lexical sdk and shadcn/ui components
 */
const MarkdownLexical = forwardRef<HTMLInputElement, MarkdownLexicalProps>(({ className, children, ...props }, ref) => {
  const editorStateRef = useRef<EditorState>();
  const [hasFocus, setHasFocus] = useState<boolean>(props.focus || false);
  const [markdown, setMarkdown] = useState<string>(props.defaultMarkdownValue || '');

  const initialConfig: InitialConfigType = {
    namespace: 'pg_markdown_editor',
    theme: tailwindTheme,
    onError: (e: any) => console.log(e),
    nodes: [ListNode, ListItemNode, QuoteNode, CodeNode, HeadingNode, LinkNode],
    editorState: () => (props.defaultMarkdownValue ? $convertFromMarkdownString(props.defaultMarkdownValue, TRANSFORMERS) : ''),
  };

  // when editor changes, you can get notified via the LexicalOnChangePlugin
  const onChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => {
    editorStateRef.current = editorState;

    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setMarkdown(markdown);
      if (props.onChange) {
        props.onChange({ target: { value: markdown, name: props.name }, type: 'change' })
      };
      if (props.onChangeMarkdownValue) props.onChangeMarkdownValue(markdown);
    });
  };

  const onFocus = () => setHasFocus(true);
  const onBlur = () => setHasFocus(false);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn('grid grid-cols-1 gap-1', className)}>
        {/* Using this input to be able to launch a focus from anywhere on the page, and storing value for any form validation */}
        <input ref={ref} type="text" readOnly name={props.name} id={props.id} onFocus={(e) => onFocus()} className="w-0 h-0" value={markdown} />
        {/* toolbar */}
        <MarkdownLexicalToolbar>
          {children}
        </MarkdownLexicalToolbar>
        <div
          className={cn(
            'relative border border-input bg-accent/30 dark:bg-accent/80 rounded-sm cursor-text min-h-[150px] max-h-[350px] h-auto w-full overflow-y-auto',
            props.textAreaClassName
          )}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable onChange={(e) => console.log('ContentEditable', e)} className={cn('h-full resize-none text-sm caret-zinc-700 relative outline-0 p-2')} />}
            placeholder={<PlaceHolder text={props.placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <FocusPlugin onBlur={onBlur} onFocus={onFocus} focus={hasFocus} />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
});

MarkdownLexical.displayName = 'MarkdownLexical';

/**
 * Create a toolbar with common buttons (bold, italic, underline ....)
 * children components are additional buttons to add on the right of the toolbar
 */
const MarkdownLexicalToolbar = ({ children }: { children?: ReactNode }) => {
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

  return <div className="flex gap-2">{children}</div>
}

/**
 * Format text plugin: Bold, Italic, Underline, Strikethrough
 */
const MarkdownLexicalFormatTextPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

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
      }, LowPriority)
  }, [editor]);

  return <>
    <Button variant={'outline'} type='button' aria-label="Format Bold" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      onClick={(e) => dispatchCommandHandler<TextFormatType>(e, editor, FORMAT_TEXT_COMMAND, 'bold')}>
      <BoldIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isBold ? '3px' : '2px'} />
    </Button>
    <Button variant={'outline'} type='button' aria-label="Format Italic" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      onClick={(e) => dispatchCommandHandler<TextFormatType>(e, editor, FORMAT_TEXT_COMMAND, 'italic')}>
      <ItalicIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isItalic ? '3px' : '2px'} />
    </Button>
    <Button variant={'outline'} type='button' aria-label="Format Underline" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      onClick={(e) => dispatchCommandHandler<TextFormatType>(e, editor, FORMAT_TEXT_COMMAND, 'underline')}>
      <UnderlineIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isUnderline ? '3px' : '2px'} />
    </Button>
    <Button variant={'outline'} type='button' aria-label="Format Strikethrough" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      onClick={(e) => dispatchCommandHandler<TextFormatType>(e, editor, FORMAT_TEXT_COMMAND, 'strikethrough')}>
      <StrikethroughIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isStrikethrough ? '3px' : '2px'} />
    </Button>
  </>
}

/**
 * Undo / Redo plugin 
 */
const MarkdownLexicalUndoRedoPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false; }, LowPriority),
      editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false; }, LowPriority));
  }, [editor]);

  return <>
    <Button variant={'outline'} type='button' aria-label="Format Undo" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      disabled={!canUndo} onClick={(e) => dispatchCommandHandler(e, editor, UNDO_COMMAND)}>
      <Undo2 className="w-4 h-4 md:w-5 md:h-5" />
    </Button>
    <Button variant={'outline'} type='button' aria-label="Format Redo" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
      disabled={!canRedo} onClick={(e) => dispatchCommandHandler(e, editor, REDO_COMMAND)}>
      <Redo2 className="w-4 h-4 md:w-5 md:h-5" />
    </Button>
  </>
}

/**
 * Quote plugin
 */
const MarkdownLexicalQuotePlugin = () => {
  const [isQuote, setIsQuote] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');

  // register all listeners to update the toolbar
  useEffect(() => {
    return editor.registerCommand(UPDATE_STATE_COMMAND, ({ blockType, selection }, _newEditor) => {
      setBlockType(blockType);
      if ($isRangeSelection(selection))
        setIsQuote(blockType == 'quote');
      return false;
    }, LowPriority)
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

  return <Button variant={'outline'} type='button' aria-label="Format Quote" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9" onClick={formatQuote}>
    <QuoteIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isQuote ? '3px' : '2px'} />
  </Button>
}

/**
 * List plugin 
 */
const MarkdownLexicalListPlugin = () => {
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
      }, LowPriority)
  }, [editor]);

  return <>
      <Button variant={'outline'} type='button' aria-label="Format Numbered List" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
        onClick={(e) => dispatchCommandHandler(e, editor, blockType !== 'ol' ? INSERT_ORDERED_LIST_COMMAND : REMOVE_LIST_COMMAND)}>
        <ListOrderedIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isListOrdered ? '3px' : '2px'} />
      </Button>
      <Button variant={'outline'} type='button' aria-label="Format Bullet List" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9"
        onClick={(e) => dispatchCommandHandler(e, editor, blockType !== 'ul' ? INSERT_UNORDERED_LIST_COMMAND : REMOVE_LIST_COMMAND)}>
        <ListIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isListBullet ? '3px' : '2px'} />
      </Button>
    </>
}

/**
 * Focus plugin
 */
const FocusPlugin = ({ focus, onFocus, onBlur }: { focus?: boolean; onFocus?: () => void; onBlur?: () => void }) => {
  const [editor] = useLexicalComposerContext();
  const [hasFocus, setHasFocus] = useState(focus ?? false);

  useLayoutEffect(() => {
    return mergeRegister(
      editor.registerCommand(FOCUS_COMMAND, () => {
        setHasFocus(true);
        if (onFocus) onFocus();
        return false;
      }, LowPriority),
      editor.registerCommand(BLUR_COMMAND, () => {
        setHasFocus(false);
        if (onBlur) onBlur();
        return false;
      }, LowPriority));
  }, [editor, onBlur, onFocus]);

  useEffect(() => {
    if (focus && !hasFocus) editor.focus();
  }, [editor, focus, hasFocus]);
  return null;
}

export {
  MarkdownLexical,
  MarkdownLexicalToolbar,
  MarkdownLexicalFormatTextPlugin,
  MarkdownLexicalUndoRedoPlugin,
  MarkdownLexicalQuotePlugin,
  MarkdownLexicalListPlugin,
  FocusPlugin,
  UPDATE_STATE_COMMAND,
  dispatchCommandHandler
};
export type {
  MarkdownLexicalProps
};