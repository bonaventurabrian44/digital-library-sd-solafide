import Link from "next/link";

export default function LibraryBookCard({
    id,
    title,
    image,
}: {
    id: number;
    title: string;
    image: string;
}) {
    return (
        <Link href={`/books/${id}`}>
            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-lg
                    p-4

                    transition-all
                    duration-300
                    ease-in-out

                    hover:-translate-y-2
                    hover:shadow-xl
                "
            >
                <img
                    src={image}
                    alt={title}
                    className="
                        w-full
                        h-[180px]
                        sm:h-[200px]
                        md:h-[220px]
                        object-cover
                        rounded-md
                    "
                />

                <p className="text-center mt-4 font-medium text-sm md:text-base line-clamp-2 min-h-[40px]">
                    {title}
                </p>
            </div>
        </Link>
    );
}