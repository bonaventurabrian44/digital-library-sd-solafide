import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function StatistikPage() {
    return (
        <div
            className={`
                ${inter.className}
                bg-white
                rounded-xl
                p-4
                md:p-6
                lg:p-8
                shadow-sm
                min-h-[500px]
                lg:min-h-[700px]
            `}
        >
            <h1
                className="
                    text-2xl
                    md:text-3xl
                    font-bold
                "
            >
                Statistik
            </h1>

            <div
                className="
                    flex
                    items-center
                    justify-center
                    h-[400px]
                    text-gray-400
                "
            >
                Statistik akan tersedia di sini
            </div>
        </div>
    );
}