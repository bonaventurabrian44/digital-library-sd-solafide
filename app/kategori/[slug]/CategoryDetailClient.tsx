"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LibraryBookCard from "../../../components/LibraryBookCard";
import EbookCard from "../../../components/EbookCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Category = {
    id_kategori: number;
    nama_kategori: string;
};

type Book = {
    id_buku: number;
    judul: string;
    cover: string;
    tipe: string;
    id_kategori: number[];
};

type Props = {
    category: Category;
    books: Book[];
};

export default function CategoryDetailClient({
    category,
    books,
}: Props) {
    // SEARCH
    const [search, setSearch] = useState("");

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    // FILTER
    const filteredBooks = books.filter((book) =>
        book.judul
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // PAGINATION
    const totalPages = Math.ceil(
        filteredBooks.length / itemsPerPage
    );

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPagination = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
            <Navbar />

            <main className="flex-1">
                <div className="w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8">

                    {/* HEADER */}
                    <Link
                        href="/kategori"
                        className="inline-flex items-center gap-2 mb-6 px-4 md:px-5 py-2 text-sm md:text-base bg-[#2B87DA] text-white rounded-lg hover:bg-[#236fb4]"
                    >
                        ← Kembali
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                        <h1 className="text-2xl md:text-[28px] font-bold">
                            {category.nama_kategori}
                        </h1>

                        <input
                            type="text"
                            placeholder="Cari Buku..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full sm:w-[280px] h-[42px] bg-white border border-gray-300 px-4 rounded-lg"
                        />

                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">

                        {filteredBooks.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500">
                                    Buku tidak ditemukan.
                                </p>
                            </div>
                        ) : (
                            paginatedBooks.map((book) =>
                                book.tipe === "ebook" ? (
                                    <EbookCard
                                        key={book.id_buku}
                                        id={book.id_buku}
                                        title={book.judul}
                                        image={book.cover}
                                    />
                                ) : (
                                    <LibraryBookCard
                                        key={book.id_buku}
                                        id={book.id_buku}
                                        title={book.judul}
                                        image={book.cover}
                                    />
                                )
                            )
                        )}

                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className={`w-7 h-7 rounded-full flex items-center justify-center border transition ${
                                    currentPage === 1
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {getPagination().map((page, index) => {
                                if (page === "...") {
                                    return (
                                        <span
                                            key={`dots-${index}`}
                                            className="px-3 py-2 text-gray-500"
                                        >
                                            ...
                                        </span>
                                    );
                                }

                                return (
                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(page as number)
                                        }
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${
                                            currentPage === page
                                                ? "bg-[#2B87DA] text-white border-[#2B87DA]"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className={`w-7 h-7 rounded-full flex items-center justify-center border transition ${
                                    currentPage === totalPages
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <ChevronRight size={18} />
                            </button>

                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}