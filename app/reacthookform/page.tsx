import { HighlightRender } from "@/components/highlight-renderer";
import MarkdownLexicalForm from "@/components/reacthookform/markdow-lexical-form";
import { Label } from "@/components/ui/label";

const codeBlock = `const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<Inputs>()

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
        <MarkdownLexical className="w-full max-w-xl"
            id="markdownRequired"
            textAreaClassName={cn(
                errors.markdownRequired ? 'border border-solid rounded-sm border-red-600 bg-red-200 dark:bg-red-200' : ''
            )}
            {...register('markdownRequired', { required: true })}
        >
            <MarkdownLexicalFormatTextPlugin />

        </MarkdownLexical>
        {errors.markdownRequired && <div className="w-full max-w-xl text-red-600">Markdown textarea is required</div>}
        <Button type="submit">Submit</Button>
    </form>
);`

export default function ReactHookForm() {
    return <>
        <Label className='text-2xl'>Markdown WYSIWYG editor using lexical and shadcn/ui</Label>
        <Label className='text-lg self-start'>Add your Markdown WYSIWYG editor with formating options you need</Label>

        <Label className='text-base self-start'># Examples</Label>
        <Label className='text-base self-start'>React Hook Form support:</Label>

        <MarkdownLexicalForm />
        <HighlightRender codeBlock={codeBlock} className='w-full p-2' />

    </>
}