"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter, useParams } from "next/navigation";
import books from "../../../data/buku.json";
import categories from "../../../data/kategori.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

// HALAMAN DAPAT DIAKSES TANPA LOGIN TAPI TOMBOL 
// BACA E-BOOK HANYA BISA DIAKSES SETELAH LOGIN
export default function EbookDetailPage() {

    const router = useRouter();

    // AMBIL DETAIL E-BOOK BERDASARKAN ID BUKU DARI URL
    const params = useParams();

    // AMBIL DATA E-BOOK DARI DATABASE BERDASARKAN ID BUKU
    const ebook = books.find(
        (item) => item.id_buku === Number(params.id)
    );

    // APABILA E-BOOK TIDAK DITEMUKAN
    if (!ebook) {
        return (
            <div className="min-h-screen bg-[#F3F3F3]">
                <Navbar />

                <div className="w-[86%] mx-auto py-10">
                    <h1 className="text-2xl font-bold">
                        E-Book tidak ditemukan
                    </h1>
                </div>
            </div>
        );
    }

    // AMBIL KATEGORI E-BOOK BERDASARKAN id_kategori
    const category = categories.filter(
        (c) =>
            ebook.id_kategori.includes(c.id_kategori)
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">

            <Navbar />
            <main className="flex-1">

                <div className={`${inter.className} max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8`}>

                    {/* BUTTON KEMBALI */}
                    <button
                        onClick={() => router.back()}
                        className="
                            mb-6
                            px-4
                            md:px-5
                            py-2
                            text-sm
                            md:text-base
                            bg-[#2B87DA]
                            text-white
                            rounded-lg
                            hover:bg-[#236fb4]
                            transition-all
                            cursor-pointer
                        "
                    >
                        ← Kembali
                    </button>

                    {/* DETAIL */}
                    <div
                        className="bg-white rounded-xl shadow-sm p-4 md:p-8"
                    >

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

                            {/* COVER */}
                            <div className="flex flex-col items-center lg:items-start flex-shrink-0">

                                <img
                                    src="/ebooks/dongeng-pangeran-katak.png"
                                    alt={ebook.judul}
                                    className="
                                        w-[180px]
                                        h-[260px]
                                        sm:w-[220px]
                                        sm:h-[320px]
                                        md:w-[260px]
                                        md:h-[370px]
                                        object-cover
                                        rounded-lg
                                        border
                                        border-gray-200
                                    "
                                />

                                {/* BACA E-BOOK BUTTON */}
                                <a
                                    href={`/pdf/${ebook.id_buku}.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        mt-4
                                        w-full
                                        max-w-[260px]
                                        text-center
                                        px-6
                                        py-3
                                        bg-[#2B87DA]
                                        text-white
                                        rounded-lg
                                        font-medium
                                        transition-all
                                        hover:bg-[#236fb4]
                                    "
                                >
                                    Baca E-Book
                                </a>

                            </div>

                            {/* INFORMASI */}
                            <div className="flex-1">

                                <h1 className="text-2xl md:text-3xl lg:text-[36px] font-bold mb-6 md:mb-8">
                                    {ebook.judul}
                                </h1>

                                <div className="space-y-4 md:space-y-6">

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Penulis
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {ebook.penulis}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Penerbit
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {ebook.penerbit}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Tahun Terbit
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {ebook.tahun_terbit}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Kategori
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {category.length > 0
                                                ? category
                                                    .map((c) => c.nama_kategori)
                                                    .join(", ")
                                                : "-"
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Tipe
                                        </p>

                                        <p className="text-base md:text-lg font-medium capitalize">
                                            {ebook.tipe}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Status Ketersediaan
                                        </p>

                                        <span
                                            className={`
                                                inline-block
                                                mt-1
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                md:text-sm
                                                font-medium
                                                ${
                                                    ebook.status_ketersediaan === "Tersedia"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {ebook.status_ketersediaan}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </main>

            <Footer />

        </div>
    );
}