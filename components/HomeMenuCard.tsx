import Link from "next/link";

interface Props {
    title: string;
    image: string;
    buttonText: string;
    bgColor: string;
    href: string;
}

export default function HomeMenuCard({
    title,
    image,
    buttonText,
    bgColor,
    href,
}: Props) {
    return (
        <div
            className={`
                ${bgColor}
                w-[300px]
                h-[300px]
                flex
                flex-col
                items-center
                justify-center
                border
                border-black-400
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
            `}
        >
            <h2 className="text-white font-bold text-[28px] mb-4 mt-0">
                {title}
            </h2>

            <img
                src={image}
                alt={title}
                className="w-[120px] h-[120px] object-contain"
            />
            <Link
                href={href}
                className="
                    mt-4
                    bg-auto
                    text-white
                    px-6
                    py-3
                    rounded-md
                    font-semibold
                    text-[18px]
                    hover:bg-black/20
                    transition-all
                    duration-300
                    cursor-pointer
                "
            >
                {buttonText}
            </Link>
        </div>
    );
}