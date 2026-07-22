import Image from "next/image";
import Link from "next/link";

interface RecommendationCardProps {
    id: number;
    title: string;
    category: string;
    image: string;
}

export default function RecommendationCard({
    id,
    title,
    category,
    image,
}: RecommendationCardProps) {
    return (
        <Link
            href={`/books/${id}`}
            className="w-[180px] flex flex-col items-center transition-transform duration-200 hover:scale-105"
        >
            <div className="relative w-[180px] h-[220px] rounded-lg overflow-hidden bg-gray-300">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <h3 className="mt-3 text-center font-semibold">
                {title}
            </h3>

            <p className="text-gray-600 text-center">
                {category}
            </p>
        </Link>
    );
}