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