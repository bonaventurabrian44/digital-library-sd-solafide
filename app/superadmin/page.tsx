"use client";

import { useState } from "react";
import Link from "next/link";
import SuperAdminNavbar from "../../components/AdminNavbar";
import books from "../../data/buku.json";
import categories from "../../data/kategori.json";

type Book = {
    id_buku: number;
    judul: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: number;
    status_ketersediaan: string;
    tipe: string;
    id_kategori: number;
};

type Category = {
    id_kategori: number;
    nama_kategori: string;
};

export default function SuperAdminPage() {

    // SET DAFTAR BUKU

    const [activeMenu, setActiveMenu] =
        useState("buku");

    const [filterType, setFilterType] = useState<
    "all" | "fisik" | "ebook"
    >("all");   

    const bookList = books as Book[];

    const filteredBooks = bookList.filter((book) => {
        if (filterType === "fisik") {
            return (
                book.tipe === "fisik" ||
                book.tipe === "keduanya"
            );
        }

        if (filterType === "ebook") {
            return (
                book.tipe === "ebook" ||
                book.tipe === "keduanya"
            );
        }

        return true;
    });

    const [selectedBook, setSelectedBook] =
    useState<Book | null>(null); // untuk detail

    const [deleteBook, setDeleteBook] =
    useState<Book | null>(null); // untuk hapus

    const [isEditing, setIsEditing] =
    useState(false);

    const [editBook, setEditBook] =
    useState<Book | null>(null);

    const [coverFile, setCoverFile] =
    useState<File | null>(null);

    const [showAddBook, setShowAddBook] =
    useState(false);

    const [newBook, setNewBook] =
    useState({
        judul: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: new Date().getFullYear(),
        status_ketersediaan: "tersedia",
        tipe: "fisik",
        id_kategori: 1,
    });

    // SET KATEGORI

    const categoryList = categories as Category[];

    const [showAddCategory, setShowAddCategory] =
    useState(false);

    const [newCategory, setNewCategory] =
    useState("");

    const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

    const [editCategory, setEditCategory] =
    useState<Category | null>(null);

    const [deleteCategory, setDeleteCategory] =
    useState<Category | null>(null);

    const getCategoryName = (
    idKategori: number
    ) => {
        const category =
            categoryList.find(
                (c) =>
                    c.id_kategori ===
                    idKategori
            );

        return (
            category?.nama_kategori ??
            "-"
        );
    };

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <SuperAdminNavbar />

            <div className="flex">

                {/* SIDEBAR */}
                <aside
                    className="
                        w-[260px]
                        bg-white
                        border-r
                        border-gray-200
                        min-h-[calc(100vh-70px)]
                        flex
                        flex-col
                        p-6
                    "
                >

                    <div className="flex flex-col gap-3">

                        <button
                            onClick={() =>
                                setActiveMenu("buku")
                            }
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                gap-3
                                px-2
                                py-3
                                rounded-md
                                font-semibold
                                transition-all
                                mb-3
                                cursor-pointer
                                ${
                                    activeMenu === "buku"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/book.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Daftar Buku
                        </button>

                        <button
                            onClick={() =>
                                setActiveMenu("kategori")
                            }
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                gap-3
                                px-2
                                py-3
                                rounded-md
                                font-semibold
                                transition-all
                                mb-3
                                cursor-pointer
                                ${
                                    activeMenu === "kategori"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/categories (1).png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Kategori
                        </button>

                        <button
                            onClick={() =>
                                setActiveMenu("statistik")
                            }
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                gap-3
                                px-2
                                py-3
                                rounded-md
                                font-semibold
                                transition-all
                                mb-3
                                cursor-pointer
                                ${
                                    activeMenu === "statistik"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/bar-chart.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Statistik
                        </button>

                    </div>

                    <div className="mt-auto">

                        <Link
                            href="/login"
                            className="
                                w-full
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                py-3
                                rounded-lg
                                font-semibold
                                transition-all
                                flex
                                items-center
                                justify-center
                                block
                                gap-2
                            "
                        >
                            <img
                                src="/icons/logout.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain invert"
                            />
                            Keluar
                        </Link>

                    </div>

                </aside>

                {/* CONTENT AREA */}
                <main className="flex-1 p-8">

                    {activeMenu === "buku" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-6 w-full">

                                <h1 className="text-3xl font-bold">
                                    Daftar Buku
                                </h1>

                                <button
                                    onClick={() => setShowAddBook(true)}
                                    className="
                                        bg-[#2B87DA]
                                        text-white
                                        px-5
                                        py-2
                                        rounded-lg
                                        hover:bg-[#236fb4]
                                        cursor-pointer
                                    "
                                >
                                    + Tambah Buku
                                </button>

                            </div>

                            {/* FILTER + SEARCH */}
                            <div className="flex justify-between items-center mb-6">

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => setFilterType("all")}
                                        className={`
                                            px-5
                                            py-2
                                            border
                                            rounded-full
                                            font-medium
                                            transition-all
                                            cursor-pointer
                                            ${
                                                filterType === "all"
                                                    ? "bg-[#2B87DA] text-white"
                                                    : "hover:bg-[#2B87DA] hover:text-white"
                                            }
                                        `}
                                    >
                                        Semua Daftar
                                    </button>

                                    <button
                                        onClick={() => setFilterType("fisik")}
                                        className={`
                                            px-5
                                            py-2
                                            border
                                            rounded-full
                                            font-medium
                                            transition-all
                                            cursor-pointer
                                            ${
                                                filterType === "fisik"
                                                    ? "bg-[#2B87DA] text-white"
                                                    : "hover:bg-[#2B87DA] hover:text-white"
                                            }
                                        `}
                                    >
                                        Buku Fisik
                                    </button>

                                    <button
                                        onClick={() => setFilterType("ebook")}
                                        className={`
                                            px-5
                                            py-2
                                            border
                                            rounded-full
                                            font-medium
                                            transition-all
                                            cursor-pointer  
                                            ${
                                                filterType === "ebook"
                                                    ? "bg-[#2B87DA] text-white"
                                                    : "hover:bg-[#2B87DA] hover:text-white"
                                            }
                                        `}
                                    >
                                        E-Book
                                    </button>

                                </div>

                                <input
                                    type="text"
                                    placeholder="Cari Judul Buku..."
                                    className="
                                        w-[320px]
                                        h-[42px]
                                        px-4
                                        border
                                        border-gray-300
                                        rounded-lg
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#2B87DA]
                                    "
                                />

                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead>
                                        <tr className="border-b">

                                            <th className="py-3 text-left">
                                                No
                                            </th>

                                            <th className="py-3 text-left">
                                                Cover
                                            </th>

                                            <th className="py-3 text-left">
                                                Judul Buku
                                            </th>

                                            <th className="py-3 text-left">
                                                Tipe
                                            </th>

                                            <th className="py-3 text-left">
                                                Kategori
                                            </th>

                                            <th className="py-3 text-center">
                                                Action
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {filteredBooks.map((book, index) => (
                                            <tr
                                                key={book.id_buku}
                                                className="border-b hover:bg-gray-50"
                                            >

                                                <td className="py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="py-4">
                                                    <img
                                                        src="/books/default-book.png"
                                                        alt={book.judul}
                                                        className="
                                                            w-12
                                                            h-16
                                                            object-cover
                                                            rounded
                                                        "
                                                    />
                                                </td>

                                                <td className="py-4">
                                                    {book.judul}
                                                </td>

                                                <td className="py-4 capitalize">
                                                    {book.tipe}
                                                </td>

                                                <td className="py-4">
                                                    {getCategoryName(
                                                        book.id_kategori
                                                    )}
                                                </td>

                                                <td className="py-4">

                                                    <div className="flex justify-center gap-2">

                                                        <button
                                                            onClick={() => {
                                                                setSelectedBook(book);
                                                                setEditBook(book);
                                                                setIsEditing(false);
                                                            }}
                                                            className="
                                                                px-3
                                                                py-1
                                                                bg-blue-500
                                                                text-white
                                                                rounded
                                                                text-sm
                                                                cursor-pointer
                                                            "
                                                        >
                                                            Detail
                                                        </button>

                                                        <button
                                                            onClick={() => setDeleteBook(book)}
                                                            className="
                                                                px-3
                                                                py-1
                                                                bg-red-500
                                                                text-white
                                                                rounded
                                                                text-sm
                                                                cursor-pointer
                                                            "
                                                        >
                                                            Hapus
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )}

                    {activeMenu === "kategori" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-6">

                                <h1 className="text-3xl font-bold">
                                    Daftar Kategori
                                </h1>

                                <button
                                    onClick={() =>
                                        setShowAddCategory(true)
                                    }
                                    className="
                                        bg-[#2B87DA]
                                        text-white
                                        px-5
                                        py-2
                                        rounded-lg
                                        hover:bg-[#236fb4]
                                        cursor-pointer
                                    "
                                >
                                    + Tambah Kategori
                                </button>

                            </div>

                            {/* SEARCH */}
                            <div className="mb-6">

                                <input
                                    type="text"
                                    placeholder="Cari Kategori..."
                                    className="
                                        w-[350px]
                                        border
                                        border-gray-300
                                        rounded-lg
                                        px-4
                                        py-2
                                        outline-none
                                        focus:border-[#2B87DA]
                                    "
                                />

                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead>

                                        <tr className="border-b">

                                            <th className="text-left py-3">
                                                No
                                            </th>

                                            <th className="text-left py-3">
                                                Nama Kategori
                                            </th>

                                            <th className="text-left py-3">
                                                Jumlah Buku
                                            </th>

                                            <th className="text-center py-3">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {categoryList.map((category, index) => {

                                            const totalBooks =
                                                bookList.filter(
                                                    (book) =>
                                                        book.id_kategori ===
                                                        category.id_kategori
                                                ).length;

                                            return (
                                                <tr
                                                    key={category.id_kategori}
                                                    className="
                                                        border-b
                                                        hover:bg-gray-50
                                                    "
                                                >

                                                    <td className="py-4">
                                                        {index + 1}
                                                    </td>

                                                    <td className="py-4">
                                                        {category.nama_kategori}
                                                    </td>

                                                    <td className="py-4">
                                                        {totalBooks}
                                                    </td>

                                                    <td className="py-4">

                                                        <div
                                                            className="
                                                                flex
                                                                justify-center
                                                                gap-2
                                                            "
                                                        >

                                                            <button
                                                                onClick={() => {
                                                                    setSelectedCategory(category);
                                                                    setEditCategory({
                                                                        ...category,
                                                                    });
                                                                }}
                                                                className="
                                                                    px-3
                                                                    py-1
                                                                    bg-blue-500
                                                                    text-white
                                                                    rounded
                                                                    text-sm
                                                                    hover:bg-blue-600
                                                                    cursor-pointer
                                                                "
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    setDeleteCategory(category)
                                                                }
                                                                className="
                                                                    px-3
                                                                    py-1
                                                                    bg-red-500
                                                                    text-white
                                                                    rounded
                                                                    text-sm
                                                                    hover:bg-red-600
                                                                    cursor-pointer
                                                                "
                                                            >
                                                                Hapus
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )}

                    {activeMenu === "statistik" && (
                        <div className="bg-white rounded-xl p-8 shadow-sm">

                            <h1 className="text-3xl font-bold">
                                Statistik
                            </h1>

                        </div>
                    )}

                </main>

            </div>
            
            {/* POPUP HAPUS BUKU */}
            {deleteBook && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            p-8
                            w-[420px]
                            shadow-lg
                        "
                    >
                        <h2
                            className="
                                text-xl
                                font-bold
                                text-center
                                mb-3
                            "
                        >
                            Hapus Buku
                        </h2>

                        <p
                            className="
                                text-center
                                text-gray-600
                                mb-8
                            "
                        >
                            Apakah Anda yakin ingin menghapus
                            <span className="font-semibold">
                                {" "}
                                {deleteBook.judul}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => {
                                    console.log(
                                        "hapus buku",
                                        deleteBook.id_buku
                                    );

                                    setDeleteBook(null);
                                }}
                                className="
                                    px-6
                                    py-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                    hover:bg-red-600
                                    transition
                                    cursor-pointer
                                "
                            >
                                Ya
                            </button>

                            <button
                                onClick={() =>
                                    setDeleteBook(null)
                                }
                                className="
                                    px-6
                                    py-2
                                    bg-gray-300
                                    text-gray-700
                                    rounded-lg
                                    hover:bg-gray-400
                                    transition
                                    cursor-pointer
                                "
                            >
                                Tidak
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* POPUP DETAIL & EDIT BUKU */}
            {selectedBook && editBook && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            p-8
                            w-[900px]
                            shadow-lg
                        "
                    >

                        <div className="flex gap-8">

                            {/* COVER */}
                            <div className="w-[250px]">

                                <img
                                    src="/books/default-book.png"
                                    alt={editBook.judul}
                                    className="
                                        w-full
                                        h-[340px]
                                        object-cover
                                        rounded-lg
                                        border
                                    "
                                />

                                {/* EDIT COVER */}
                                {isEditing && (
                                    <div className="mt-3">

                                        <label
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                justify-center
                                                px-4
                                                py-3
                                                bg-[#2B87DA]
                                                text-white
                                                rounded-lg
                                                cursor-pointer
                                                hover:bg-[#236fb4]
                                            "
                                        >
                                            Pilih Cover

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setCoverFile(
                                                        e.target.files?.[0] || null
                                                    )
                                                }
                                            />
                                        </label>

                                        <p className="text-sm text-gray-500 mt-2 text-center">
                                            {coverFile
                                                ? coverFile.name
                                                : "Belum ada file dipilih"}
                                        </p>

                                    </div>
                                )}

                            </div>

                            {/* DETAIL */}
                            <div className="flex-1">

                                <h2 className="text-2xl font-bold mb-6">

                                    {isEditing
                                        ? "Edit Buku"
                                        : "Detail Buku"}

                                </h2>

                                <div className="space-y-4">

                                    {/* JUDUL */}
                                    <div>
                                        <p className="text-gray-500">
                                            Judul Buku
                                        </p>

                                        {isEditing ? (
                                            <input
                                                value={editBook.judul}
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        judul:
                                                            e.target
                                                                .value,
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            />
                                        ) : (
                                            <p className="font-semibold">
                                                {editBook.judul}
                                            </p>
                                        )}
                                    </div>

                                    {/* PENULIS */}
                                    <div>
                                        <p className="text-gray-500">
                                            Penulis
                                        </p>

                                        {isEditing ? (
                                            <input
                                                value={
                                                    editBook.penulis
                                                }
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        penulis:
                                                            e.target
                                                                .value,
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            />
                                        ) : (
                                            <p className="font-semibold">
                                                {editBook.penulis}
                                            </p>
                                        )}
                                    </div>

                                    {/* PENERBIT */}
                                    <div>
                                        <p className="text-gray-500">
                                            Penerbit
                                        </p>

                                        {isEditing ? (
                                            <input
                                                value={
                                                    editBook.penerbit
                                                }
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        penerbit:
                                                            e.target
                                                                .value,
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            />
                                        ) : (
                                            <p className="font-semibold">
                                                {editBook.penerbit}
                                            </p>
                                        )}
                                    </div>

                                    {/* TAHUN */}
                                    <div>
                                        <p className="text-gray-500">
                                            Tahun Terbit
                                        </p>

                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={
                                                    editBook.tahun_terbit
                                                }
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        tahun_terbit:
                                                            Number(
                                                                e
                                                                    .target
                                                                    .value
                                                            ),
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            />
                                        ) : (
                                            <p className="font-semibold">
                                                {
                                                    editBook.tahun_terbit
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* STATUS */}
                                    <div>
                                        <p className="text-gray-500">
                                            Status Ketersediaan
                                        </p>

                                        {isEditing ? (
                                            <select
                                                value={
                                                    editBook.status_ketersediaan
                                                }
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        status_ketersediaan:
                                                            e.target
                                                                .value,
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            >
                                                <option value="tersedia">
                                                    Tersedia
                                                </option>

                                                <option value="tidak tersedia">
                                                    Tidak Tersedia
                                                </option>
                                            </select>
                                        ) : (
                                            <p className="font-semibold capitalize">
                                                {
                                                    editBook.status_ketersediaan
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* TIPE */}
                                    <div>
                                        <p className="text-gray-500">
                                            Tipe
                                        </p>

                                        {isEditing ? (
                                            <select
                                                value={
                                                    editBook.tipe
                                                }
                                                onChange={(e) =>
                                                    setEditBook({
                                                        ...editBook,
                                                        tipe: e.target
                                                            .value,
                                                    })
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                "
                                            >
                                                <option value="fisik">
                                                    Fisik
                                                </option>

                                                <option value="ebook">
                                                    E-Book
                                                </option>

                                                <option value="keduanya">
                                                    Keduanya
                                                </option>
                                            </select>
                                        ) : (
                                            <p className="font-semibold capitalize">
                                                {editBook.tipe}
                                            </p>
                                        )}
                                    </div>

                                    {/* KATEGORI */}
                                    <div>
                                        <p className="text-gray-500">
                                            Kategori
                                        </p>

                                        {isEditing ? (
                                            <select
                                            value={editBook.id_kategori}
                                            onChange={(e) =>
                                                setEditBook({
                                                    ...editBook,
                                                    id_kategori: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        >
                                            {categoryList.map(
                                                (category) => (
                                                    <option
                                                        key={
                                                            category.id_kategori
                                                        }
                                                        value={
                                                            category.id_kategori
                                                        }
                                                    >
                                                        {
                                                            category.nama_kategori
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        ) : (
                                            <p className="font-semibold">
                                                {getCategoryName(
                                                    editBook.id_kategori
                                                )}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* BUTTON */}
                                <div className="flex gap-3 mt-8">

                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setIsEditing(
                                                        false
                                                    )
                                                }
                                                className="
                                                    px-5
                                                    py-2
                                                    bg-green-600
                                                    text-white
                                                    rounded-lg
                                                    cursor-pointer
                                                "
                                            >
                                                Simpan
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEditBook(
                                                        selectedBook
                                                    );
                                                    setIsEditing(
                                                        false
                                                    );
                                                }}
                                                className="
                                                    px-5
                                                    py-2
                                                    bg-gray-500
                                                    text-white
                                                    rounded-lg
                                                    cursor-pointer
                                                "
                                            >
                                                Batal
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setIsEditing(
                                                    true
                                                )
                                            }
                                            className="
                                                px-5
                                                py-2
                                                bg-[#2B87DA]
                                                text-white
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Edit
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            setSelectedBook(
                                                null
                                            );
                                            setEditBook(
                                                null
                                            );
                                            setIsEditing(
                                                false
                                            );
                                        }}
                                        className="
                                            px-5
                                            py-2
                                            bg-red-500
                                            text-white
                                            rounded-lg
                                            cursor-pointer
                                        "
                                    >
                                        Tutup
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* POPUP TAMBAH BUKU */}
            {showAddBook && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            p-8
                            w-[900px]
                            shadow-lg
                        "
                    >
                        <div className="flex gap-8">

                            {/* COVER */}
                            <div className="w-[250px]">

                                <div
                                    className="
                                        w-full
                                        h-[340px]
                                        border-2
                                        border-dashed
                                        border-gray-300
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-400
                                    "
                                >
                                    Cover Buku
                                </div>

                                <label
                                    className="
                                        mt-3
                                        w-full
                                        flex
                                        items-center
                                        justify-center
                                        px-4
                                        py-3
                                        bg-[#2B87DA]
                                        text-white
                                        rounded-lg
                                        cursor-pointer
                                        hover:bg-[#236fb4]
                                    "
                                >
                                    Pilih Cover

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </label>

                            </div>

                            {/* FORM */}
                            <div className="flex-1">

                                <h2 className="text-2xl font-bold mb-6">
                                    Tambah Buku
                                </h2>

                                <div className="space-y-4">

                                    <div>
                                        <p className="text-gray-500">
                                            Judul Buku
                                        </p>

                                        <input
                                            type="text"
                                            value={newBook.judul}
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    judul:
                                                        e.target.value,
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Penulis
                                        </p>

                                        <input
                                            type="text"
                                            value={newBook.penulis}
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    penulis:
                                                        e.target.value,
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Penerbit
                                        </p>

                                        <input
                                            type="text"
                                            value={newBook.penerbit}
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    penerbit:
                                                        e.target.value,
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Tahun Terbit
                                        </p>

                                        <input
                                            type="number"
                                            value={
                                                newBook.tahun_terbit
                                            }
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    tahun_terbit:
                                                        Number(
                                                            e.target
                                                                .value
                                                        ),
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Status Ketersediaan
                                        </p>

                                        <select
                                            value={
                                                newBook.status_ketersediaan
                                            }
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    status_ketersediaan:
                                                        e.target
                                                            .value,
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        >
                                            <option value="tersedia">
                                                Tersedia
                                            </option>

                                            <option value="tidak tersedia">
                                                Tidak Tersedia
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Tipe
                                        </p>

                                        <select
                                            value={newBook.tipe}
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    tipe:
                                                        e.target.value,
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        >
                                            <option value="fisik">
                                                Fisik
                                            </option>

                                            <option value="ebook">
                                                E-Book
                                            </option>

                                            <option value="keduanya">
                                                Keduanya
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">
                                            Kategori
                                        </p>

                                        <select
                                            value={
                                                newBook.id_kategori
                                            }
                                            onChange={(e) =>
                                                setNewBook({
                                                    ...newBook,
                                                    id_kategori: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        >
                                            {categoryList.map(
                                                (category) => (
                                                    <option
                                                        key={
                                                            category.id_kategori
                                                        }
                                                        value={
                                                            category.id_kategori
                                                        }
                                                    >
                                                        {
                                                            category.nama_kategori
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                </div>

                                {/* BUTTON */}
                                <div className="flex gap-3 mt-8">

                                    <button
                                        onClick={() => {
                                            console.log(
                                                "Tambah Buku",
                                                newBook
                                            );

                                            setShowAddBook(
                                                false
                                            );
                                        }}
                                        className="
                                            px-5
                                            py-2
                                            bg-green-600
                                            text-white
                                            rounded-lg
                                            hover:bg-green-700
                                            cursor-pointer
                                        "
                                    >
                                        Tambah
                                    </button>

                                    <button
                                        onClick={() =>
                                            setShowAddBook(
                                                false
                                            )
                                        }
                                        className="
                                            px-5
                                            py-2
                                            bg-red-500
                                            text-white
                                            rounded-lg
                                            hover:bg-red-600
                                            cursor-pointer
                                        "
                                    >
                                        Tutup
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* POPUP TAMBAH KATEGORI */}
            {showAddCategory && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            shadow-lg
                            p-8
                            w-[500px]
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                mb-6
                            "
                        >
                            Tambah Kategori
                        </h2>

                        <div className="mb-6">

                            <label
                                className="
                                    block
                                    text-gray-600
                                    mb-2
                                "
                            >
                                Nama Kategori
                            </label>

                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) =>
                                    setNewCategory(
                                        e.target.value
                                    )
                                }
                                placeholder="Masukkan nama kategori..."
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-lg
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-[#2B87DA]
                                "
                            />

                        </div>

                        <div
                            className="
                                flex
                                justify-end
                                gap-3
                            "
                        >

                            <button
                                onClick={() => {
                                    console.log(
                                        "Tambah kategori:",
                                        newCategory
                                    );

                                    setNewCategory("");
                                    setShowAddCategory(false);
                                }}
                                className="
                                    px-5
                                    py-2
                                    bg-green-600
                                    text-white
                                    rounded-lg
                                    hover:bg-green-700
                                    cursor-pointer
                                "
                            >
                                Tambah
                            </button>

                            <button
                                onClick={() => {
                                    setShowAddCategory(false);
                                    setNewCategory("");
                                }}
                                className="
                                    px-5
                                    py-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                    hover:bg-red-600
                                    cursor-pointer
                                "
                            >
                                Tutup
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* POPUP EDIT KATEGORI */}
            {selectedCategory && editCategory && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            shadow-lg
                            p-8
                            w-[500px]
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                mb-6
                            "
                        >
                            Edit Kategori
                        </h2>

                        <div className="mb-6">

                            <label
                                className="
                                    block
                                    text-gray-600
                                    mb-2
                                "
                            >
                                Nama Kategori
                            </label>

                            <input
                                type="text"
                                value={editCategory.nama_kategori}
                                onChange={(e) =>
                                    setEditCategory({
                                        ...editCategory,
                                        nama_kategori:
                                            e.target.value,
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-lg
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-[#2B87DA]
                                "
                            />

                        </div>

                        <div
                            className="
                                flex
                                justify-end
                                gap-3
                            "
                        >

                            <button
                                onClick={() => {

                                    console.log(
                                        "update kategori",
                                        editCategory
                                    );

                                    setSelectedCategory(
                                        null
                                    );

                                    setEditCategory(
                                        null
                                    );
                                }}
                                className="
                                    px-5
                                    py-2
                                    bg-green-600
                                    text-white
                                    rounded-lg
                                    hover:bg-green-700
                                    cursor-pointer
                                "
                            >
                                Simpan
                            </button>

                            <button
                                onClick={() => {

                                    setSelectedCategory(
                                        null
                                    );

                                    setEditCategory(
                                        null
                                    );
                                }}
                                className="
                                    px-5
                                    py-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                    hover:bg-red-600
                                    cursor-pointer
                                "
                            >
                                Tutup
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* POPUP HAPUS KATEGORI */}
            {deleteCategory && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-xl
                            p-8
                            w-[400px]
                            shadow-lg
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-center
                                mb-8
                            "
                        >
                            Hapus kategori "{deleteCategory.nama_kategori}"?
                        </h2>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => {

                                    console.log(
                                        "hapus kategori",
                                        deleteCategory.id_kategori
                                    );

                                    setDeleteCategory(
                                        null
                                    );
                                }}
                                className="
                                    px-6
                                    py-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                    hover:bg-red-600
                                    cursor-pointer
                                "
                            >
                                Ya
                            </button>

                            <button
                                onClick={() =>
                                    setDeleteCategory(
                                        null
                                    )
                                }
                                className="
                                    px-6
                                    py-2
                                    bg-gray-300
                                    rounded-lg
                                    hover:bg-gray-400
                                    cursor-pointer
                                "
                            >
                                Tidak
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}