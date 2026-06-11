"use client";

import Navbar from "../../../components/Navbar";
import { useRouter, useParams } from "next/navigation";
import Footer from "../../../components/Footer";
import books from "../../../data/buku.json";
import categories from "../../../data/kategori.json";

export default function BookDetailPage() {
    const router = useRouter();
    const params = useParams();

    const book = books.find(
        (item) => item.id_buku === Number(params.id)
    );

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

    const category =
    categories.find(
        (c) =>
            c.id_kategori ===
            book.id_kategori
    );

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <Navbar />

            <div className="w-[86%] mx-auto py-8">

                {/* BUTTON KEMBALI */}
                <button
                    onClick={() => router.back()}
                    className="
                        mb-6
                        px-5
                        py-2
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

                {/* DETAIL BUKU */}
                <div
                    className="
                        bg-white
                        rounded-xl
                        shadow-sm
                        p-8
                    "
                >

                    <div className="flex gap-12">

                        {/* COVER */}
                        <div className="flex-shrink-0">

                            <img
                                src="/buku/ayahku-pahlawanku.png"
                                alt={book.judul}
                                className="
                                    w-[260px]
                                    h-[370px]
                                    object-cover
                                    rounded-lg
                                    border
                                    border-gray-200
                                "
                            />

                        </div>

                        {/* INFORMASI */}
                        <div className="flex-1">

                            <h1 className="text-[36px] font-bold mb-8">
                                {book.judul}
                            </h1>

                            <div className="space-y-6">

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Penulis
                                    </p>

                                    <p className="text-lg font-medium">
                                        {book.penulis}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Penerbit
                                    </p>

                                    <p className="text-lg font-medium">
                                        {book.penerbit}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Tahun Terbit
                                    </p>

                                    <p className="text-lg font-medium">
                                        {book.tahun_terbit}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Kategori
                                    </p>

                                    <p className="text-lg font-medium">
                                        {category?.nama_kategori ??
                                            "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Tipe
                                    </p>

                                    <p className="text-lg font-medium capitalize">
                                        {book.tipe}
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
                                            text-sm
                                            font-medium
                                            ${
                                                book.status_ketersediaan === "tersedia"
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

            <Footer />

        </div>
    );
}