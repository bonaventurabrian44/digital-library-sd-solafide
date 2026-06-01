import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";
import CategoryCard from "../../components/CategoryCard";
import HorizontalSlider from "../../components/HorizontalSlider";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "E-Book | Digital Library SD Solafide",
};

export default function EbookPage() {
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

            {/* EBOOK SECTION */}

            <section className="bg-white border border-[#F3F3F3] mb-8">

            <div className="flex justify-between items-center px-6 py-4">

                <h2 className="text-[28px] font-bold">
                E-BOOK
                </h2>

                <button className="text-[#2B87DA] text-sm">
                LIHAT SEMUA &gt;&gt;
                </button>

            </div>

            <div className="border-t border-[#F3F3F3]">

                <HorizontalSlider>

                    <BookCard
                    title="Dongeng Pangeran Katak"
                    image="/ebooks/dongeng-pangeran-katak.png"
                    />

                    <BookCard
                    title="Kisah Sebuah Pohon"
                    image="/ebooks/kisah-sebuah-pohon.png"
                    />

                    <BookCard
                    title="Kisah Rumah Pohon"
                    image="/ebooks/kisah-rumah-pohon.png"
                    />

                    <BookCard
                    title="300 Kisah Binatang"
                    image="/ebooks/300-kisah-binatang.png"
                    />

                    <BookCard
                    title="Perjalanan Angsa Putih"
                    image="/ebooks/perjalanan-angsa-putih.png"
                    />

                    <BookCard
                    title="Perjalanan Angsa Putih"
                    image="/ebooks/perjalanan-angsa-putih.png"
                    />

                    <BookCard
                    title="Perjalanan Angsa Putih"
                    image="/ebooks/perjalanan-angsa-putih.png"
                    />

                </HorizontalSlider>
            </div>
            
            </section>

            {/* KATEGORI SECTION */}

            <section className="bg-white border border-[#F3F3F3]">

            <div className="flex justify-between items-center px-6 py-4">

                <h2 className="text-[28px] font-bold">
                KATEGORI
                </h2>

                <button className="text-[#2B87DA] text-sm">
                LIHAT SEMUA &gt;&gt;
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
                    image="/kategori/matematika.png"
                    />

                    <CategoryCard
                    title="Novel"
                    image="/kategori/novel.png"
                    />

                    <CategoryCard
                    title="Sejarah"
                    image="/kategori/sejarah.jpg"
                    />

                    <CategoryCard
                    title="Sejarah"
                    image="/kategori/sejarah.jpg"
                    />

                    <CategoryCard
                    title="Sejarah"
                    image="/kategori/sejarah.jpg"
                    />

                </HorizontalSlider>
            </div>

            </section>

        </div>
        </div>
    );
}