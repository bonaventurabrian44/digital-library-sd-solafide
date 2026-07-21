import Navbar from "../../components/Navbar";
import Link from "next/link";
import Footer from "../../components/Footer";
import type { Metadata } from "next";
import categoriesData from "../../data/kategori.json";
import books from "../../data/buku.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kategori | Digital Library SD Solafide",
};

export default function CategoryPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
            <Navbar />
            <main className="flex-1">
                <div className={`${inter.className} w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8`}
                >

                    <h1
                        className="text-2xl md:text-[28px] font-bold mb-8"
                    >
                        KATEGORI
                    </h1>

                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                    >

                        {categoriesData.map((category) => {

                            const slug = category.nama_kategori
                                .toLowerCase()
                                .replace(/\s+/g, "-");

                            // AMBIL BUKU PERTAMA PADA KATEGORI INI
                            const firstBook = books
                                .filter((book) =>
                                    book.id_kategori.includes(category.id_kategori)
                                )
                                .sort((a, b) => a.id_buku - b.id_buku)[0];

                            return (
                                // MENAMPILKAN BUKU BERDASARKAN KATEGORI YANG DIPILIH
                                <Link
                                    key={category.id_kategori}
                                    href={`/kategori/${slug}`}
                                >
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer h-full transition-all
                                            duration-300hover:shadow-xl hover:-translate-y-1"
                                    >

                                        <img
                                            src={
                                                firstBook
                                                    ? `${firstBook.cover}`
                                                    : "/images/default-image.jpg"
                                            }
                                            alt={category.nama_kategori}
                                            className="w-full h-[130px] sm:h-[150px] md:h-[180px] object-cover"
                                        />

                                        <div className="p-4">

                                            <h2
                                                className="
                                                    text-center
                                                    font-semibold
                                                    text-sm
                                                    sm:text-base
                                                    md:text-lg
                                                    line-clamp-2
                                                    min-h-[40px]
                                                "
                                            >
                                                {category.nama_kategori}
                                            </h2>

                                        </div>

                                    </div>
                                </Link>
                            );
                        })}

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
}