import Navbar from "../../components/Navbar";
import LibraryBookCard from "../../components/LibraryBookCard";
import Footer from "../../components/Footer";
import type { Metadata } from "next";
import books from "../../data/buku.json";

export const metadata: Metadata = {
    title: "Buku Perpustakaan | Digital Library SD Solafide",
};

export default function BooksPage() {
    const bookList = books;
        {books.map((book) => (
        <LibraryBookCard
            key={book.id_buku}
            id={book.id_buku}
            title={book.judul}
            image="/buku/ayahku-pahlawanku.png"
        />
    ))}

    const physicalBooks = books.filter(
        (book) =>
            book.tipe === "fisik" ||
            book.tipe === "keduanya"
    );

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <Navbar />

            <div className="w-[86%] mx-auto py-8">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-[28px] font-bold">
                        KOLEKSI BUKU
                    </h1>

                    <input
                        type="text"
                        placeholder="Cari Buku..."
                        className="
                            w-[280px]
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
                <div
                    className="
                        grid
                        grid-cols-5
                        gap-6
                    "
                >
                    {physicalBooks.map((book) => (
                        <LibraryBookCard
                            key={book.id_buku}
                            id={book.id_buku}
                            title={book.judul}
                            image="/buku/ayahku-pahlawanku.png"
                        />
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-10 gap-2">

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

            <Footer />

        </div>
    );
}