'use client';

import { cn } from '@/lib/utils';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { TRANSFORMERS, $convertToMarkdownString, $convertFromMarkdownString } from '@lexical/markdown';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState, LexicalEditor } from 'lexical';
import { ComponentPropsWithoutRef, ReactNode, forwardRef, useRef, useState } from 'react';
import { FocusPlugin } from './markdown-lexical-focus-plugin';
import { MarkdownLexicalToolbar } from './markdown-lexical-toolbar';

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

/**
 * Markdown properties: All input properties + custom
 */
export interface MarkdownLexicalProps extends ComponentPropsWithoutRef<'input'> {
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
 * Create a simple (well I thought it should have been pretty simple to implement... at the beginning) Markdown WYSIWYG editor, based on Lexical sdk
 */
const MarkdownLexical = forwardRef<HTMLInputElement, MarkdownLexicalProps>(({ className, children, ...props }, ref) => {
  const editorStateRef = useRef<EditorState>();
  const [hasFocus, setHasFocus] = useState<boolean>(true);
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

  // update focus and blur states
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

export { MarkdownLexical };
