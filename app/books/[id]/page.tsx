"use client";

import Navbar from "../../../components/Navbar";
import { useRouter, useParams } from "next/navigation";
import Footer from "../../../components/Footer";
import books from "../../../data/buku.json";
import categories from "../../../data/kategori.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

// HALAMAN DAPAT DIAKSES TANPA LOGIN
export default function BookDetailPage() {

    const router = useRouter();

    // AMBIL DETAIL BUKU BERDASARKAN ID BUKU DARI URL
    const params = useParams();

    // AMBIL DATA BUKU DARI DATABASE BERDASARKAN ID BUKU
    const book = books.find(
        (item) => item.id_buku === Number(params.id)
    );

    // APABILA BUKU TIDAK DITEMUKAN
    if (!book) {
        return (
            <div className="min-h-screen bg-[#F3F3F3]">
                <Navbar />

                <div className="w-[86%] mx-auto py-10">
                    <h1 className="text-2xl font-bold">
                        Buku tidak ditemukan
                    </h1>
                </div>
            </div>
        );
    }

    // AMBIL KATEGORI BUKU BERDASARKAN id_kategori
    const category = categories.filter(
        (c) =>
            book.id_kategori.includes(c.id_kategori)
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">

            <Navbar />
            <main className="flex-1">

                <div className={`${inter.className} max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8`}>

                    {/* BUTTON KEMBALI */}
                    <button
                        onClick={() => router.back()}
                        className="mb-6 px-4 md:px-5 py-2 text-sm md:text-base bg-[#2B87DA] text-white rounded-lg hover:bg-[#236fb4] transition-all cursor-pointer"
                    >
                        ← Kembali
                    </button>

                    {/* DETAIL BUKU */}
                    <div
                        className="bg-white rounded-xl shadow-sm p-4 md:p-8"
                    >

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

                            {/* COVER */}
                            <div className="flex justify-center lg:block flex-shrink-0">

                                <img
                                    src={book.cover}
                                    alt={book.judul}
                                    className="w-[180px] h-[260px] sm:w-[220px] sm:h-[320px] md:w-[260px] md:h-[370px] object-cover rounded-lg border border-gray-200"
                                />

                            </div>

                            {/* INFORMASI */}
                            <div className="flex-1">

                                <h1 className="text-2xl md:text-3xl lg:text-[36px] font-bold mb-6 md:mb-8">
                                    {book.judul}
                                </h1>

                                <div className="space-y-4 md:space-y-6">

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Penulis
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {book.penulis}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Penerbit
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {book.penerbit}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Tahun Terbit
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {book.tahun_terbit}
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
                                            {book.tipe}
                                        </p>
                                    </div>
                                    
                                    {/* TAMPILKAN JUMLAH BUKU TERSEDIA DAN TOTAL KOLEKSI BUKU */}
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Jumlah Buku
                                        </p>

                                        <p className="text-base md:text-lg font-medium">
                                            {book.jumlah} dari {book.jumlah}
                                        </p>
                                    </div>
                                    
                                    {/* TENTUKAN STATUS KETERSEDIAAN BERDASARKAN STOK BUKU YANG TERSEDIA */}
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
                                                text-sm
                                                font-medium
                                                ${
                                                    book.status_ketersediaan === "Tersedia"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {book.status_ketersediaan}
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