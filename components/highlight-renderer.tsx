"use client";

import { Highlight, themes } from "prism-react-renderer";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useTheme } from 'next-themes';

export interface HighlightProps extends ComponentPropsWithoutRef<'input'> {
    codeBlock: string;
}

const HighlightRender = forwardRef<HTMLInputElement, HighlightProps>(({ className, children, codeBlock, ...props }, ref) => {
    const { theme } = useTheme();

    return (
        <Highlight
            {...props}
            theme={theme === "light" ? themes.vsLight : themes.vsDark}
            code={codeBlock}
            language="tsx">
            {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={style} className={className}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
});
HighlightRender.displayName = 'HighlightRender';

export { HighlightRender };
