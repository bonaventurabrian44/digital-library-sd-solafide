"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter, useParams } from "next/navigation";
import books from "../../../data/buku.json";
import categories from "../../../data/kategori.json";

export default function EbookDetailPage() {
    const router = useRouter();
    const params = useParams();

    const ebook = books.find(
        (item) => item.id_buku === Number(params.id)
    );

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

    const category =
    categories.find(
        (c) =>
            c.id_kategori ===
            ebook.id_kategori
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

                {/* DETAIL */}
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
                        <div className="flex-shrink-0 flex flex-col">

                            <img
                                src="/ebooks/dongeng-pangeran-katak.png"
                                alt={ebook.judul}
                                className="
                                    w-[260px]
                                    h-[370px]
                                    object-cover
                                    rounded-lg
                                    border
                                    border-gray-200
                                "
                            />

                            <a
                                href={`/pdf/${ebook.id_buku}.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-4
                                    w-full
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

                            <h1 className="text-[36px] font-bold mb-8">
                                {ebook.judul}
                            </h1>

                            <div className="space-y-6">

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Penulis
                                    </p>

                                    <p className="text-lg font-medium">
                                        {ebook.penulis}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Penerbit
                                    </p>

                                    <p className="text-lg font-medium">
                                        {ebook.penerbit}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Tahun Terbit
                                    </p>

                                    <p className="text-lg font-medium">
                                        {ebook.tahun_terbit}
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
                                            text-sm
                                            font-medium
                                            ${
                                                ebook.status_ketersediaan === "tersedia"
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

            <Footer />

        </div>
    );
}