import type {HTMLAttributes} from "react";

type ButtonProps = HTMLAttributes<HTMLAnchorElement> & { label: string }

export function Button({label, ...props}: ButtonProps) {
    return (<a {...props} href="javascript:void(0)"
               className="relative inline-block px-6 py-2  text-white bg-(--secondary-color) overflow-hidden group rounded border-1">
        <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
        <span className="relative z-10 text-white group-hover:text-(--primary-color) transition-colors duration-500">
{label}  </span>
    </a>)
}
