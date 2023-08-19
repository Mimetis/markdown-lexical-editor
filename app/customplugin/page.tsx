import { HighlightRender } from '@/components/highlight-renderer'
import { MarkdownLexicalVoicePlugin } from '@/components/markdown-lexical-voice-plugin'
import { MarkdownLexical } from '@/components/markdown-lexical/markdown-lexical'
import { MarkdownLexicalFormatTextPlugin } from '@/components/markdown-lexical/markdown-lexical-format-text-plugin'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'


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
    <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={() => setOpen(true)} className="!rounded-[4px] p-0 w-7 h-7">
            <Mic className="w-4 h-4" />
        </Button>
        <DialogContent>
            ....
            <DialogFooter>
                <Button onClick={onSubmit}>Submit</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>);
}

<MarkdownLexical name="markdown" className='w-full'>
    <MarkdownLexicalVoicePlugin />
</MarkdownLexical>`

export default function ServerActions() {

    async function addItem(data: any) {
        'use server'
        console.log(data);
    }

    return (
        <>
            <p className='leading-7 self-start'>
                You can create your own custom plugins easily. For example, let's create a plugin to add voice recognition to your editor.
            </p>
            <Separator className="my-4" />
            <Label className='text-xl self-start font-extrabold'>Example</Label>
            <Label className='text-base self-start text-muted-foreground'>
                In this example, the <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexicalVoicePlugin</code> opens a dialog panel to let the user speaks and then add the speech to text result to the editor.
            </Label>
            <Label className='text-base self-start text-muted-foreground'>
                (This example does not work and you will need to add the text in the input text area before submit and see the result)
            </Label>

            <MarkdownLexical name="markdown" className='w-full'>
                <MarkdownLexicalVoicePlugin />
            </MarkdownLexical>

            <HighlightRender codeBlock={codeBlock} className='w-full p-2' />
        </>
    )
}
