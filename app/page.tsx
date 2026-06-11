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

export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <Navbar />

            <div className={`${inter.className} w-[86%] mx-auto py-8`}>

                {/* SEARCH */}

                <div className="flex justify-end mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-[280px] h-[40px] border border-gray-400 px-4 bg-white"
                />
                </div>

                {/* BOOK SECTION */}

                <section className="bg-white border border-[#F3F3F3] mb-8">

                <div className="flex justify-between items-center px-6 py-1">

                    <h2 className="text-[28px] font-bold">
                    KOLEKSI BUKU
                    </h2>

                    <button className="text-[#2B87DA] text-sm">
                    <Link href="/books">LIHAT SEMUA &gt;&gt;</Link>
                    </button>

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

                <section className="bg-white border border-[#F3F3F3]">

                <div className="flex justify-between items-center px-6 py-1">

                    <h2 className="text-[28px] font-bold">
                    KATEGORI
                    </h2>

                    <button className="text-[#2B87DA] text-sm">
                    <Link href="/kategori">LIHAT SEMUA &gt;&gt;</Link>
                    </button>

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

            <Footer />

        </div>  
    );
}