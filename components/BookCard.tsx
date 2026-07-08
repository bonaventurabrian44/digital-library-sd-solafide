interface BookCardProps {
    id: number;
    title: string;
    image: string;
}

export default function BookCard({
    id,
    title,
    image,
}: BookCardProps) {
    return (
        <div 
            className="
                min-w-[160px]
                sm:min-w-[180px]
                md:min-w-[220px]
                border-r
                border-[#F3F3F3]
                bg-white
                flex
                flex-col
                items-center
                py-6
                shrink-0
            "
        >

            <img
                src={image}
                alt={title}
                className="
                    w-[90px]
                    h-[130px]
                    sm:w-[100px]
                    sm:h-[145px]
                    md:w-[120px]
                    md:h-[170px]
                    object-cover
                "
            />

            <p className="mt-4 text-center text-sm font-medium px-2">
                {title}
            </p>

        </div>
    );
}