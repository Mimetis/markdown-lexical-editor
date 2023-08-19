import { HighlightRender } from '@/components/highlight-renderer'
import { MarkdownLexical } from '@/components/markdown-lexical/markdown-lexical'
import { MarkdownLexicalFormatTextPlugin } from '@/components/markdown-lexical/markdown-lexical-format-text-plugin'
import { MarkdownLexicalListPlugin } from '@/components/markdown-lexical/markdown-lexical-list-plugin'
import { MarkdownLexicalQuotePlugin } from '@/components/markdown-lexical/markdown-lexical-quote-plugin'
import { MarkdownLexicalUndoRedoPlugin } from '@/components/markdown-lexical/markdown-lexical-undo-redo-plugin'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


const codeBlock = `async function addItem(data: any) {
    'use server'
    console.log(data);
}
return (
    <>
        <form action={addItem} className='w-full' >
            <MarkdownLexical name="markdown">
                <MarkdownLexicalFormatTextPlugin />
            </MarkdownLexical>
            <Button type="submit">Submit</Button>
        </form>
    </>
)`

export default function ServerActions() {

    async function addItem(data: any) {
        'use server'
        console.log(data);
    }

    return (
        <>
            <Label className='text-2xl'>Markdown WYSIWYG editor using lexical and shadcn/ui</Label>
            <Label className='text-lg self-start'>Add your Markdown WYSIWYG editor with formating options you need</Label>

            <Label className='text-base self-start'># Examples</Label>
            <Label className='text-base self-start'>SSR & Server Actions support: </Label>

            <form action={addItem} className='w-full flex flex-col items-center gap-2' >
                <MarkdownLexical name="markdown" className='w-full'>
                    <MarkdownLexicalFormatTextPlugin />
                </MarkdownLexical>
                <Button type="submit">Submit</Button>
            </form>
            <HighlightRender codeBlock={codeBlock} className='w-full p-2' />
        </>
    )
}
