import Navbar from "../../components/Navbar";
import type { Metadata } from "next";
import EbookCard from "../../components/EbookCard";
import Footer from "../../components/Footer";
import books from "../../data/buku.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "E-Book | Digital Library SD Solafide",
};

// HALAMAN DAPAT DIAKSES TANPA LOGIN
export default function EbookPage() {

    // FILTER EBOOK
    const ebooks = books.filter(
        (book) =>
            book.tipe === "ebook" ||
            book.tipe === "keduanya"
    );

    return (
        <div className={`${inter.className} flex flex-col min-h-screen bg-[#F3F3F3]`}>

            <Navbar />
            <main className="flex-1">

                <div className="w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                        <h1 className="text-2xl md:text-[28px] font-bold">
                            E-BOOK
                        </h1>

                        {/* SEARCHBAR */}
                        <input
                            type="text"
                            placeholder="Cari E-Book..."
                            className="
                                w-full
                                sm:w-[280px]
                                h-[42px]
                                bg-white
                                border
                                border-gray-300
                                px-4
                                rounded-lg
                            "
                        />

                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">

                        {ebooks.map((ebook) => (
                            <EbookCard
                                key={ebook.id_buku}
                                id={ebook.id_buku}
                                title={ebook.judul}
                                image={`/images/${ebook.cover}`}
                            />
                        ))}

                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-wrap justify-center mt-10 gap-2">

                        <button className="w-10 h-10 bg-white border rounded">
                            {"<"}
                        </button>

                        <button className="w-10 h-10 bg-[#2B87DA] text-white rounded">
                            1
                        </button>

                        <button className="w-10 h-10 bg-white border rounded">
                            2
                        </button>

                        <button className="w-10 h-10 bg-white border rounded">
                            3
                        </button>

                        <button className="w-10 h-10 bg-white border rounded">
                            {">"}
                        </button>

                    </div>

                </div>
            </main>

            <Footer />

        </div>
    );
}