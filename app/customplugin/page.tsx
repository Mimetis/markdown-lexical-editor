import { HighlightRender } from '@/components/highlight-renderer'
import { MarkdownLexicalVoicePlugin } from '@/components/markdown-lexical-voice-plugin'
import { MarkdownLexical } from '@/components/markdown-lexical/markdown-lexical'
import { MarkdownLexicalFormatTextPlugin } from '@/components/markdown-lexical/markdown-lexical-format-text-plugin'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


const codeBlock = `const MarkdownLexicalVoicePlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);
    const [synopsisText, setSynopsisText] = useState<string>('');

    const onSubmit = ((e: any) => {
        // updating the editor, then close the dialog
        editor.update(() => {
            const root = $getRoot();
            const paragraphNode = $createParagraphNode();
            const textNode = $createTextNode(synopsisText);
            paragraphNode.append(textNode);
            root.append(paragraphNode);
            setOpen(false);
        });
    });

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button onClick={() => setOpen(true)} 
                  className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9">
                    <Mic className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <DialogContent>
                    ....
                    ....
                    ....
                    <DialogFooter>
                        <Button onClick={onSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );


<MarkdownLexical name="markdown" className='w-full'>
    <MarkdownLexicalVoicePlugin />
</MarkdownLexical>

}`

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
            <Label className='text-base self-start'>Creating your own plugin</Label>

            <MarkdownLexical name="markdown" className='w-full'>
                <MarkdownLexicalVoicePlugin />
            </MarkdownLexical>

            <HighlightRender codeBlock={codeBlock} className='w-full p-2' />
        </>
    )
}
