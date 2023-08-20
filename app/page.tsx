import { HighlightRender } from '@/components/highlight-renderer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MarkdownLexical, MarkdownLexicalFormatTextPlugin, MarkdownLexicalListPlugin, MarkdownLexicalNoSSR, MarkdownLexicalQuotePlugin, MarkdownLexicalUndoRedoPlugin } from '@/components/ui/markdown-lexical'
import { Separator } from '@/components/ui/separator'
import { BoldIcon, ExternalLink, ItalicIcon, ListIcon, ListOrderedIcon, Redo, Redo2, StrikethroughIcon, UnderlineIcon, Undo } from 'lucide-react'
import Link from 'next/link'
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
      <p className='md:leading-7 self-start'>Add a
        <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexical</code>
        component to your <span className='font-bold'>REACT</span> application, then choose your options.
      </p>
      <div className='hidden sm:block self-start ml-6 mr-1'>
        <div className='list-disc'>
          <div className='list-item'>
            <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalFormatTextPlugin</code> to add
            <Button variant={'outline'} title='bold' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <BoldIcon className="w-3 h-3" strokeWidth='2px' />
            </Button> (bold)
            /
            <Button variant={'outline'} title='italic' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <ItalicIcon className="w-3 h-3" strokeWidth='2px' />
            </Button> (italic)
            /
            <Button variant={'outline'} title='underline' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <UnderlineIcon className="w-3 h-3" strokeWidth='2px' />
            </Button> (underline)
            and
            <Button variant={'outline'} title='strikethrough' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <StrikethroughIcon className="w-3 h-3" strokeWidth='2px' />
            </Button> (Strikethrough)
            options to your editor.
          </div>
          <div className='list-item'>
            <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalUndoRedoPlugin</code> to add
            <Button variant={'outline'} title='undo' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <Undo className="w-3 h-3" strokeWidth='2px' />
            </Button> (undo)
            /
            and
            <Button variant={'outline'} title='redo' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <Redo className="w-3 h-3" strokeWidth='2px' />
            </Button> (redo)
            options to your editor.
          </div>
          <div className='list-item'>
            <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalListPlugin</code> to add
            <Button variant={'outline'} title='list ordered' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <ListOrderedIcon className="w-3 h-3" strokeWidth='2px' />
            </Button>
            and
            <Button variant={'outline'} title='list' disabled type='button' className="!rounded-[4px] m-1 p-0 w-6 h-6 disabled:opacity-100">
              <ListIcon className="w-3 h-3" strokeWidth='2px' />
            </Button> list options to your editor.
          </div>
          <div className='list-item'>
            And even more like <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalQuotePlugin</code>,
            <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalLinkPlugin</code>.
          </div>
          <div className='list-item'>
            Or create your own <Link href={'./customplugin'} className='m-1 underline inline-flex items-center gap-2'>plugin
              <ExternalLink className="w-3 h-3 " strokeWidth='2px' />
            </Link> to add to your <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexical</code> editor component.
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <Label className='text-xl self-start font-extrabold'>Examples</Label>
      <Label className='text-base self-start text-muted-foreground'>Adding options to format text, undo redo, quote and lists:</Label>
      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full'>
          <MarkdownLexicalUndoRedoPlugin />
          <MarkdownLexicalFormatTextPlugin />
          <MarkdownLexicalListPlugin />
          <MarkdownLexicalQuotePlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock1} className='w-full p-4' />
      </div>

      <Label className='text-base self-start text-muted-foreground'>Adding only format text option:</Label>

      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full'>
          <MarkdownLexicalFormatTextPlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock2} className='w-full p-4' />
      </div>

      <Label className='text-base self-start text-muted-foreground'>With a default value:</Label>

      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <MarkdownLexical className='w-full' defaultMarkdownValue={"Hello **all**"}>
          <MarkdownLexicalFormatTextPlugin />
        </MarkdownLexical>

        <HighlightRender codeBlock={codeBlock3} className='w-full p-4' />
      </div>

    </>)
}
