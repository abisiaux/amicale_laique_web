import type {HTMLAttributes} from "react";

type WaveCardProps = {
    title: string,
    subtitle?: string,
    number?: number,
    imageUrl?: string,
    imageAlt?: string,
    hasPointer?: boolean
} & HTMLAttributes<HTMLDivElement>

export default function WaveCard({title, subtitle, number, imageUrl, imageAlt, hasPointer = false, ...rest}: WaveCardProps) {
    return (
        <div {...rest}
             className={"card flex-1/2 max-w-xs rounded-xl overflow-hidden shadow-md text-center" + (hasPointer ? " cursor-pointer" : "") + " group"}>
            <div className="relative">
                {imageUrl && <img src={imageUrl} className="w-full h-48 md:64 object-cover" alt={imageAlt}/>}
                {number && <div className="flex bg-primary text-white w-full h-48 object-cover text-6xl font-bold items-center justify-center">{number}</div>}
                <div className="absolute -bottom-1 left-0 w-full">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
                        <path
                            d="M0.00,49.98 C149.99,150.00 349.45,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                            className="transition-transform duration-500 group-hover:translate-y-2"
                            fill="#EB5B00"
                            stroke="none"
                        ></path>
                    </svg>
                </div>
            </div>
            <div className="-mt-4 h-full bg-[#EB5B00] px-4 pb-6 pt-4 rounded-b-xl text-white">
                <p className="text-lg font-bold whitespace-prewrap">{title}</p>
                {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
            </div>
        </div>
    )
}

