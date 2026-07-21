"use client";

import Navbar from "../../../../components/Navbar";
import { useParams, useRouter } from "next/navigation";
import books from "../../../../data/buku.json";
import ebooks from "../../../../data/ebook.json";
import categories from "../../../../data/kategori.json";
import { useRef } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function ReadEbookPage() {

    const router = useRouter();
    const params = useParams();

    const viewerRef = useRef<HTMLDivElement>(null);

    // AMBIL DATA BOOK
    const book = books.find(
        (item) => item.id_buku === Number(params.id)
    );

    // AMBIL DATA E-BOOK
    const ebook = ebooks.find(
        (item) => item.id_buku === Number(params.id)
    );

    // JIKA TIDAK DITEMUKAN
    if (!book || !ebook) {
        return (
            <div className="min-h-screen bg-[#F3F3F3]">
                <Navbar />

                <main className="flex items-center justify-center h-[80vh]">

                    <h1 className="text-3xl font-bold">
                        E-Book tidak ditemukan
                    </h1>

                </main>

            </div>
        );
    }

    // AMBIL DATA KATEGORI
    const booksCategories = categories.filter(
        (item) =>
            book.id_kategori.includes(item.id_kategori)
    );

    return (

        <div className={`${inter.className} min-h-screen bg-[#F3F3F3]`}>

            <Navbar />

            <main>

                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

                    {/* HEADER */}
                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-sm
                            p-5
                            mb-6
                            flex
                            flex-col
                            md:flex-row
                            gap-6
                            items-center
                        "
                    >

                        {/* COVER */}
                        <img
                            src={book.cover}
                            alt={book.judul}
                            className="w-32 h-44 object-cover rounded-xl border shadow-md"
                        />

                        {/* INFORMASI */}
                        <div className="flex-1 w-full">

                            {/* BUTTON */}
                            <div className="flex justify-between items-start flex-wrap gap-3">

                                <button onClick={() => router.back()}
                                    className=" text-[#2B87DA] font-semibold hover:underline cursor-pointer"
                                >
                                    ← Kembali
                                </button>

                                <button
                                    onClick={() => {
                                        if (document.fullscreenElement) {
                                            document.exitFullscreen();
                                        } else {
                                            viewerRef.current?.requestFullscreen();
                                        }
                                    }}
                                    className="
                                        px-4
                                        py-2
                                        bg-[#2B87DA]
                                        text-white
                                        rounded-lg
                                        hover:bg-[#236fb4]
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Fullscreen
                                </button>

                            </div>

                            {/* JUDUL */}
                            <h1 className="text-2xl md:text-3xl font-bold mt-4">
                                {book.judul}
                            </h1>

                            {/* DESKRIPSI */}
                            <p className="mt-2 text-gray-600">
                                {book.penulis}
                                &nbsp; • &nbsp;
                                {book.penerbit}
                                &nbsp; • &nbsp;
                                {book.tahun_terbit}
                            </p>

                            {/* BADGE */}
                            <div className="mt-4 flex flex-wrap gap-2">

                                {booksCategories.map(
                                    (item) => (

                                        <span
                                            key={
                                                item.id_kategori
                                            }
                                            className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-[#2B87DA]/10
                                                text-[#2B87DA]
                                                text-sm
                                                font-medium
                                            "
                                        >
                                            {
                                                item.nama_kategori
                                            }
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                    {/* PDF */}
                    <div
                        ref={viewerRef}
                        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
                    >

                        <iframe
                            src={`/pdfjs/web/viewer.html?file=/pdf/${ebook.file_path}`}
                            title={book.judul}
                            allowFullScreen
                            className="w-full h-[90vh] border-0"
                        />

                    </div>

                </div>

            </main>

        </div>

    );

}