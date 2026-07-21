"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import LibraryBookCard from "../../components/LibraryBookCard";
import Footer from "../../components/Footer";
import books from "../../data/buku.json";
import { Inter } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({
    subsets: ["latin"],
});

// HALAMAN DAPAT DIAKSES TANPA LOGIN
export default function BooksPage() {
    
    // SEARCH
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    // FILTER BUKU FISIK
    const filteredBooks = books.filter((book) => {
        const isPhysical =
            book.tipe === "fisik" ||
            book.tipe === "keduanya";

        const matchesSearch =
            book.judul
                .toLowerCase()
                .includes(search.toLowerCase());

        return isPhysical && matchesSearch;
    });

    // PAGINATION
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

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
        <div className={`${inter.className} flex flex-col min-h-screen bg-[#F3F3F3]`}>

            <Navbar />
            <main className="flex-1">

                <div className="w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                        <h1 className="text-2xl md:text-[28px] font-bold">
                            KOLEKSI BUKU
                        </h1>

                        {/* SEARCHBAR */}
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
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                    >
                        {paginatedBooks.map((book) => (
                            <LibraryBookCard
                                key={book.id_buku}
                                id={book.id_buku}
                                title={book.judul}
                                image={book.cover}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
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
                                        onClick={() => setCurrentPage(page as number)}
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