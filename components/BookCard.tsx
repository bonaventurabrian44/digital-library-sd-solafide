interface BookCardProps {
    title: string;
    image: string;
}

export default function BookCard({
    title,
    image,
}: BookCardProps) {
    return (
        <div className="min-w-[220px] border-r border-[#F3F3F3] bg-white flex flex-col items-center py-6">

            <img
                src={image}
                alt={title}
                className="w-[120px] h-[170px] object-cover"
            />

            <p className="mt-4 text-center text-sm font-medium px-2">
                {title}
            </p>

        </div>
    );
}