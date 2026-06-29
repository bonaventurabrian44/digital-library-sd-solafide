import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LibraryBookCard from "../../../components/LibraryBookCard";
import EbookCard from "../../../components/EbookCard";
import Link from "next/link";
import booksData from "../../../data/buku.json";
import categoriesData from "../../../data/kategori.json";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CategoryDetailPage({
    params,
    }: Props) 
{

    const { slug } = await params;

    // AMBIL DETAIL KATEGORI BERDASARKAN SLUG URL
    const category = categoriesData.find(
        (cat) =>
            cat.nama_kategori
                .toLowerCase()
                .replace(/\s+/g, "-") === slug
    );

    // APABILA KATEGORI TIDAK DITEMUKAN
    if (!category) {
        return (
            <div className="min-h-screen bg-[#F3F3F3]">
                <Navbar />

                <div className="w-[86%] mx-auto py-10">
                    <h1 className="text-2xl font-bold">
                        Kategori tidak ditemukan
                    </h1>
                </div>

                <Footer />
            </div>
        );
    }

    // AMBIL DAFTAR BUKU BERDASARKAN KATEGORI YANG DIPILIH
    const books = booksData.filter(
        (book) => book.id_kategori.includes(category.id_kategori)
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">

            <Navbar />
            <main className="flex-1">

                <div className="w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8">

                    {/* HEADER */}
                    <Link
                        href="/kategori"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mb-6
                            px-4
                            md:px-5
                            py-2
                            text-sm
                            md:text-base
                            bg-[#2B87DA]
                            text-white
                            rounded-lg
                            transition-all
                            hover:bg-[#236fb4]
                        "
                    >
                            ← Kembali
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                        <h1 className="text-2xl md:text-[28px] font-bold">
                            {category.nama_kategori}
                        </h1>

                        {/* SEARCHBAR */}
                        <input
                            type="text"
                            placeholder="Cari Buku..."
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

                    {/* GRID BUKU */}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">

                        {/* JIKA BUKU FISIK, ARAHKAN KE HALAMAN DETAIL BUKU FISIK, JIKA E-BOOK / KEDUANYA, KE HALAMAN DETAIL E-BOOK */}
                        {books.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500">
                                    Belum ada buku pada kategori ini.
                                </p>
                            </div>
                        ) : (
                            books.map((book) =>
                                book.tipe === "fisik" ? (
                                    <LibraryBookCard
                                        key={book.id_buku}
                                        id={book.id_buku}
                                        title={book.judul}
                                        image="/buku/ayahku-pahlawanku.png"
                                    />
                                ) : (
                                    <EbookCard
                                        key={book.id_buku}
                                        id={book.id_buku}
                                        title={book.judul}
                                        image="/ebooks/dongeng-pangeran-katak.png"
                                    />
                                )
                            )
                        )}

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