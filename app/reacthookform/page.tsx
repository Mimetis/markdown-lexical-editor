import { HighlightRender } from "@/components/highlight-renderer";
import MarkdownLexicalForm from "@/components/reacthookform/markdow-lexical-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const codeBlock = `"use client";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MarkdownLexicalForm() {

  const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">

        <MarkdownLexical className="w-full max-w-xl"
            id="markdownRequired"
            textAreaClassName={cn(
                errors.markdownRequired ? 'border border-solid rounded-sm border-red-600 bg-red-200 dark:bg-red-200' : ''
            )}
            {...register('markdownRequired', { required: true })}>
            <MarkdownLexicalFormatTextPlugin />
        </MarkdownLexical>

        {errors.markdownRequired && <div className="w-full max-w-xl text-red-600">Markdown textarea is required</div>}

        <Button type="submit">Submit</Button>
    </form>);
}`;

export default function ReactHookForm() {
    return <>
        <p className='leading-7 self-start'><code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexical</code>
            supports also famous frameworks like {' '}
            <Link href={'https://react-hook-form.com/'} className='underline inline-flex items-center gap-2'>React Hook Form
                <ExternalLink className="w-3 h-3" strokeWidth='2px' />
            </Link>:
        </p>
        <Separator className="my-4" />
        <Label className='text-xl self-start font-extrabold'>Example</Label>
        <Label className='text-base self-start text-muted-foreground'>
            In this example, the <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm">MarkdownLexical</code> value is required to validate the form. Check the error validation by clicking the submit button without any text in the editor and see how it&apos;s handled by default.
        </Label>

        <MarkdownLexicalForm />
        <HighlightRender codeBlock={codeBlock} className='w-full p-2' />

    </>
}