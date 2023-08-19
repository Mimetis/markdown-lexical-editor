import { HighlightRender } from '@/components/highlight-renderer'
import { MarkdownLexical } from '@/components/markdown-lexical/markdown-lexical'
import { MarkdownLexicalFormatTextPlugin } from '@/components/markdown-lexical/markdown-lexical-format-text-plugin'
import { MarkdownLexicalListPlugin } from '@/components/markdown-lexical/markdown-lexical-list-plugin'
import { MarkdownLexicalQuotePlugin } from '@/components/markdown-lexical/markdown-lexical-quote-plugin'
import { MarkdownLexicalUndoRedoPlugin } from '@/components/markdown-lexical/markdown-lexical-undo-redo-plugin'
import { ModeToggle } from '@/components/toggle-theme'
import { Label } from '@/components/ui/label'
import React from 'react'


const codeBlock1 = `<MarkdownLexical className='w-full'>
  <MarkdownLexicalUndoRedoPlugin />
  <MarkdownLexicalFormatTextPlugin />
  <MarkdownLexicalListPlugin />
  <MarkdownLexicalQuotePlugin />
</MarkdownLexical>`

const codeBlock2 = `<MarkdownLexical className='w-full'>
  <MarkdownLexicalFormatTextPlugin />
</MarkdownLexical>`

const codeBlock3 = `<MarkdownLexical className='w-full' 
  defaultMarkdownValue={"Hello **all**"}>
  <MarkdownLexicalFormatTextPlugin />
</MarkdownLexical>`


export default function Home() {
  return (
    <>
      <Label className='text-2xl'>Markdown WYSIWYG editor using lexical and shadcn/ui</Label>
      <Label className='text-lg self-start'>Add your Markdown WYSIWYG editor with formating options you need</Label>
      
      <Label className='text-base self-start'># Examples</Label>
      <Label className='text-base self-start'>Adding options to format text, undo redo, quote and lists:</Label>
      <div className='flex flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full'>
          <MarkdownLexicalUndoRedoPlugin />
          <MarkdownLexicalFormatTextPlugin />
          <MarkdownLexicalListPlugin />
          <MarkdownLexicalQuotePlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock1} className='w-full p-4' />
      </div>

      <Label className='text-base self-start'>Adding only format text option:</Label>

      <div className='flex flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full'>
          <MarkdownLexicalFormatTextPlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock2} className='w-full p-4' />
      </div>

      <Label className='text-base self-start'>With a default value:</Label>

      <div className='flex flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full' defaultMarkdownValue={"Hello **all**"}>
          <MarkdownLexicalFormatTextPlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock3} className='w-full p-4' />
      </div>

    </>)
}
