import { HighlightRender } from '@/components/highlight-renderer'
import { MarkdownLexical, MarkdownLexicalFormatTextPlugin } from '@/components/ui/markdown-lexical'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'


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
            <p className='leading-7 self-start'><code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexical</code>
                supports <span className='font-bold'>SSR</span>  and can be used in your{' '}
                <Link href={'https://nextjs.org/docs'} className='underline inline-flex items-center gap-2'>NextJs
                    <ExternalLink className="w-3 h-3" strokeWidth='2px' />
                </Link>
                {' '}application with{' '}
                <Link href={'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions'} className='underline inline-flex items-center gap-2'>Server Actions
                    <ExternalLink className="w-3 h-3" strokeWidth='2px' />
                </Link>:
            </p>
            <Separator className="my-4" />
            <Label className='text-xl self-start font-extrabold'>Example</Label>
            <Label className='text-base self-start text-muted-foreground'>Add some text to the editor, then click submit and check the result in your developer console.</Label>

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
