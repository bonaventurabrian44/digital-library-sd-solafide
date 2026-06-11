import Link from "next/link";

interface EbookCardProps {
    id: number;
    title: string;
    image: string;
}

export default function EbookCard({
    id,
    title,
    image,
}: EbookCardProps) {
    return (
        <Link href={`/ebook/${id}`}>

            <div
                className="
                    bg-white
                    rounded-lg
                    border
                    border-gray-200
                    p-4

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:shadow-xl
                "
            >

                <img
                    src={image}
                    alt={title}
                    className="
                        w-full
                        h-[220px]
                        object-cover
                        rounded-md
                    "
                />

                <p className="text-center mt-4 font-medium">
                    {title}
                </p>

            </div>

        </Link>
    );
}