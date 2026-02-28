import type { DetailedReactHTMLElement, HTMLAttributes, ReactNode } from "react";
import React, { cloneElement, useRef } from "react";
import { filterDOMProps } from "@react-aria/utils";

interface FileTriggerProps {
    acceptedFileTypes?: Array<string>;
    allowsMultiple?: boolean;
    defaultCamera?: "user" | "environment";
    onSelect?: (files: FileList | null) => void;
    children: ReactNode;
    acceptDirectory?: boolean;
}

export const FileTrigger = (props: FileTriggerProps) => {
    const { children, onSelect, acceptedFileTypes, allowsMultiple, defaultCamera, acceptDirectory, ...rest } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const domProps = filterDOMProps(rest);

    const clonableElement = React.Children.only(children);

    const mainElement = cloneElement(clonableElement as DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>, {
        onClick: () => {
            if (inputRef.current?.value) {
                inputRef.current.value = "";
            }
            inputRef.current?.click();
        },
    });

    return (
        <>
            {mainElement}
            <input
                {...domProps}
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept={acceptedFileTypes?.toString()}
                onChange={(e) => onSelect?.(e.target.files)}
                capture={defaultCamera}
                multiple={allowsMultiple}
                // @ts-expect-error
                webkitdirectory={acceptDirectory ? "" : undefined}
            />
        </>
    );
};
