import Navbar from "../../components/Navbar";
import Link from "next/link";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kategori | Digital Library SD Solafide",
};

export default function CategoryPage() {
    const categories = [
        {
            name: "Bahasa Inggris",
            slug: "bahasa-inggris",
            image: "/kategori/inggris.jpg",
        },
        {
            name: "IPA",
            slug: "ipa",
            image: "/kategori/ipa.png",
        },
        {
            name: "Matematika",
            slug: "matematika",
            image: "/kategori/matematika-2.png",
        },
        {
            name: "Novel",
            slug: "novel",
            image: "/kategori/novel-2.png",
        },
        {
            name: "Sejarah",
            slug: "sejarah",
            image: "/kategori/sejarah-2.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <Navbar />

            <div className="w-[86%] mx-auto py-8">

                <h1 className="text-[36px] font-bold mb-8">
                    KATEGORI
                </h1>

                <div className="grid grid-cols-5 gap-6">

                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/kategori/${category.slug}`}
                        >
                            <div
                                className="
                                    bg-white
                                    rounded-xl
                                    shadow-sm
                                    overflow-hidden
                                    cursor-pointer

                                    transition-all
                                    duration-300

                                    hover:shadow-xl
                                    hover:-translate-y-1
                                "
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="
                                        w-full
                                        h-[180px]
                                        object-cover
                                    "
                                />

                                <div className="p-4">

                                    <h2
                                        className="
                                            text-center
                                            font-semibold
                                            text-lg
                                        "
                                    >
                                        {category.name}
                                    </h2>

                                </div>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>

            <Footer />

        </div>
    );
}