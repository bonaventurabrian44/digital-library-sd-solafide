import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import HorizontalSlider from "../components/HorizontalSlider";
import Footer from "../components/Footer";
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

                            <BookCard
                            title="Kisah Rumah Pohon"
                            image="/buku/kisah-rumah-pohon.png"
                            />

                            <BookCard
                            title="Mudah Bicara Bahasa Inggris"
                            image="/buku/mudah-bicara-bahasa-inggris.jpg"
                            />

                            <BookCard
                            title="Matematika Dasar Jilid 1"
                            image="/buku/matematika-dasar-jilid-1.webp"
                            />

                            <BookCard
                            title="Ayahku Pahlawanku"
                            image="/buku/ayahku-pahlawanku.png"
                            />

                            <BookCard
                            title="Perjalanan Angsa Putih"
                            image="/buku/perjalanan-angsa-putih.png"
                            />

                            <BookCard
                            title="Perjalanan Angsa Putih"
                            image="/buku/perjalanan-angsa-putih.png"
                            />

                            <BookCard
                            title="Perjalanan Angsa Putih"
                            image="/buku/perjalanan-angsa-putih.png"
                            />

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

                            <CategoryCard
                            title="Bahasa Inggris"
                            image="/kategori/inggris.jpg"
                            />

                            <CategoryCard
                            title="Ilmu Pengetahuan Alam"
                            image="/kategori/ipa.png"
                            />

                            <CategoryCard
                            title="Matematika"
                            image="/kategori/matematika-2.png"
                            />

                            <CategoryCard
                            title="Novel"
                            image="/kategori/novel-2.png"
                            />

                            <CategoryCard
                            title="Sejarah"
                            image="/kategori/sejarah-2.jpg"
                            />

                            <CategoryCard
                            title="Sejarah"
                            image="/kategori/sejarah-2.jpg"
                            />

                            <CategoryCard
                            title="Sejarah"
                            image="/kategori/sejarah-2.jpg"
                            />

                        </HorizontalSlider>
                    </div>

                    </section>

                </div>

            </main>

            <Footer />

        </div>  
    );
}