'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Mic } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

/**
 * Create a toolbar button for bold 
 */
export function MarkdownLexicalVoicePlugin() {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);
    const [synopsisText, setSynopsisText] = useState<string>('');

    const onSubmit = ((e: any) => {
        // updating the editor, then close it
        editor.update(() => {
            // get the root node from the EditorState
            const root = $getRoot();
            // create a new paragraph node
            const paragraphNode = $createParagraphNode();
            // create a new text node with synopsis
            const textNode = $createTextNode(synopsisText);
            // append the text node to the paragraph
            paragraphNode.append(textNode);
            // finally, append the paragraph to the root
            root.append(paragraphNode);
            // close the dialog
            setOpen(false);
        });
    });

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button onClick={() => setOpen(true)} aria-label="Format Speech To Text" className="!rounded-[4px] p-0 w-7 h-7 md:w-9 md:h-9">
                    <Mic className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Voice recording</DialogTitle>
                        <DialogDescription>Click on micro icon to start recording your voice</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center">
                        <Button variant={'outline'} className="flex flex-col h-36 w-9/12 !rounded-[8px]">
                            <Mic size={40} className="cursor-pointer" />
                        </Button>
                    </div>
                    <Label className='text-sm text-muted-foreground' >(Ok.. for the demo, just add some text here and hit &apos;Submit&apos; to add it to your editor ...)</Label>
                    <Input className='w-full' value={synopsisText} onChange={(e) => setSynopsisText(e.target.value)} />
                    <DialogFooter>
                        <Button onClick={onSubmit}>
                            Submit
                        </Button>
                        <Button variant={'outline'} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
