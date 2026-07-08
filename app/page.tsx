import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import HorizontalSlider from "../components/HorizontalSlider";
import Footer from "../components/Footer";
import books from "../data/buku.json";
import categories from "../data/kategori.json";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Beranda | Digital Library SD Solafide",
};

// HOMEPAGE UNTUK USER YANG BELUM LOGIN
export default function Homepage() {

    // TAMPILKAN 10 BUKU TERBARU
    const latestBooks = [...books]
        .sort((a, b) => b.id_buku - a.id_buku)
        .slice(0, 7);

    // TAMPILKAN 10 KATEGORI
    const categoryList = categories.slice(0, 7);

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F3F3]">

            <Navbar />
            <main className="flex-1">

                <div className={`${inter.className} max-w-7xl mx-auto py-6 md:py-8`}>

                    {/* SEARCH */}

                    <div className="flex justify-center md:justify-end mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full max-w-[280px] h-[40px] border border-gray-400 px-4 bg-white rounded-md"
                    />
                    </div>

                    {/* BOOK SECTION */}

                    <section className="bg-white border border-[#F3F3F3] overflow-hidden mb-8">

                    <div
                        className="flex justify-between items-center px-4 md:px-6 py-3"
                    >
                        <h2
                            className="text-lg sm:text-xl md:text-[28px] font-bold"
                        >
                            KOLEKSI BUKU
                        </h2>

                        <Link
                            href="/books"
                            className="text-[#2B87DA] text-xs sm:text-sm font-medium whitespace-nowrap"
                        >
                            LIHAT SEMUA &gt;&gt;
                        </Link>
                    </div>

                    <div className="border-t border-[#F3F3F3]">

                        <HorizontalSlider>

                            {latestBooks.map((book) => (

                                <BookCard
                                    key={book.id_buku}
                                    id={book.id_buku}
                                    title={book.judul}
                                    image={`/images/${book.cover}`}
                                />

                            ))}

                        </HorizontalSlider>
                    </div>
                    
                    </section>

                    {/* KATEGORI SECTION */}

                    <section className="bg-white border border-[#F3F3F3] overflow-hidden mb-8">

                    <div
                        className="flex justify-between items-center px-4 md:px-6 py-3"
                    >
                        <h2
                            className="text-lg sm:text-xl md:text-[28px] font-bold"
                        >
                            KATEGORI
                        </h2>

                        <Link
                            href="/kategori"
                            className="text-[#2B87DA] text-xs sm:text-sm font-medium whitespace-nowrap"
                        >
                            LIHAT SEMUA &gt;&gt;
                        </Link>
                    </div>

                    <div className="border-t border-[#F3F3F3]">

                        <HorizontalSlider>

                            {categoryList.map((category) => {

                                const firstBook = books
                                    .filter((book) =>
                                        book.id_kategori.includes(category.id_kategori)
                                    )
                                    .sort((a, b) =>
                                        a.id_buku - b.id_buku
                                    )[0];

                                return (

                                    <CategoryCard
                                        key={category.id_kategori}
                                        id={category.id_kategori}
                                        title={category.nama_kategori}
                                        image={
                                            firstBook
                                                ? `/images/${firstBook.cover}`
                                                : "/images/default-book.png"
                                        }
                                    />

                                );

                            })}

                        </HorizontalSlider>
                    </div>

                    </section>

                </div>

            </main>

            <Footer />

        </div>  
    );
}