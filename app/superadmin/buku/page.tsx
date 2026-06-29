"use client";

import { useState } from "react";
import books from "../../../data/buku.json";
import kategoriList from "../../../data/kategori.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

// MENAMBAH ATRIBUT FILE PADA DATA DUMMY -----------------------------------------------------------------
type Book = {
    id_buku: number;
    judul: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: number;
    status_ketersediaan: string;
    tipe: string;
    id_kategori: number[];
    jumlah: number;
    file: string;
};

type Kategori = {
    id_kategori: number;
    nama_kategori: string;
};

export default function DaftarBukuPage() {

    const bookList = books as Book[];
    const categoriesList = kategoriList as Kategori[];

    const getKategoriName = (
    idKategori: number[]
    ) => {
        return idKategori
            .map(
                (id) =>
                    categoriesList.find(
                        (kategori) =>
                            kategori.id_kategori === id
                    )?.nama_kategori
            )
            .filter(Boolean)
            .join(", ");
    };

    // FILTER BUTTON

    const [filterType, setFilterType] =
    useState("all");

    const filteredBooks =
    bookList.filter((book) => {

        if (filterType === "all") {
            return true;
        }

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

    // DETIL BUKU

    const [showDetail, setShowDetail] =
    useState(false);

    const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);

    const [selectedBookTitle, setSelectedBookTitle] =
    useState("");

    // EDIT BUKU

    const [isEditing, setIsEditing] =
    useState(false);

    const [editedBook, setEditedBook] =
    useState<Book | null>(null);

    // HAPUS BUKU

    const [showDeleteModal, setShowDeleteModal] =
    useState(false);

    // TAMBAH BUKU

    const [showTambah, setShowTambah] =
    useState(false);

    // MENAMBAH ATRIBUT FILE PADA DATA BARU
    const defaultBook = {
        judul: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: new Date().getFullYear(),
        status_ketersediaan:
            "tersedia",
        tipe: "fisik",
        id_kategori: [] as number[],
        jumlah: 1,
        file: ""
    };

    const [newBook, setNewBook] =
    useState(defaultBook);

    // FILE PDF E-BOOK ------------------------------------------------------------------------------
    const [pdfFile, setPdfFile] =
    useState<File | null>(null);

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                    Daftar Buku
                </h1>

                <button onClick={() => setShowTambah(true)}
                    className="w-full sm:w-auto bg-[#2B87DA] text-white px-5 py-2 rounded-lg hover:bg-[#236fb4] cursor-pointer"
                >
                    + Tambah Buku
                </button>

            </div>

            {/* FILTER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2">

                    <button onClick={() => setFilterType("all")}
                        className={`px-6 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "all" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        Semua Daftar
                    </button>

                    <button onClick={() => setFilterType("fisik")}
                        className={`px-5 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "fisik" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        Buku Fisik
                    </button>

                    <button onClick={() => setFilterType("ebook")}
                        className={`px-5 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "ebook" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        E-Book
                    </button>

                </div>

                <input type="text" placeholder="Cari Judul Buku..." className="w-full lg:w-[320px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"/>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="pr-6 text-left py-3">
                                No
                            </th>

                            <th className="pr-6 text-left py-3">
                                Cover
                            </th>

                            <th className="pr-6 text-left py-3">
                                Judul Buku
                            </th>

                            <th className="pr-6 text-left py-3">
                                Jumlah
                            </th>

                            <th className="pr-6 text-left py-3">
                                Tipe
                            </th>

                            <th className="pr-6 text-left py-3">
                                Kategori
                            </th>

                            <th className="pr-6 text-center py-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredBooks.map((book, index) => {

                            return (
                                <tr key={book.id_buku} className="border-b">
                                    <td className="pr-6">
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className="w-16 h-20 bg-gray-200 rounded"/>
                                    </td>

                                    <td>
                                        {book.judul}
                                    </td>

                                    <td>
                                        {book.jumlah}
                                    </td>

                                    <td className="capitalize">
                                        {book.tipe}
                                    </td>

                                    <td>
                                        {book.id_kategori
                                            .map((id) => categoriesList.find((k) => k.id_kategori === id)?.nama_kategori).join(", ")
                                        }
                                    </td>

                                    <td>

                                        <div className="flex flex-col sm:flex-row justify-center gap-2">

                                            <button onClick={() => {
                                                    setSelectedBook(book);
                                                    setEditedBook(book);
                                                    setIsEditing(false);
                                                    setShowDetail(true);
                                                }}
                                                className="bg-[#2B87DA] text-white px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                Detail
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedBookTitle(book.judul);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all cursor-pointer"
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
                
                {/* POP UP DETAIL & EDIT BUKU */}
                {showDetail && selectedBook && editedBook &&(

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
                                w-[95%]
                                max-w-[900px]

                                max-h-[90vh]
                                overflow-y-auto

                                rounded-xl
                                p-4
                                md:p-6
                            "
                        >

                            {/* HEADER */}
                            <div className="mb-6">

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                    "
                                >
                                    Detail Buku
                                </h2>

                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col md:flex-row gap-6">

                                {/* COVER */}
                                <div className="flex flex-col items-center">

                                    <div
                                        className="
                                            w-full
                                            md:w-[220px]
                                            h-[320px]
                                            bg-gray-200
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            shrink-0
                                        "
                                    >
                                        Cover
                                    </div>

                                    {isEditing && (

                                        <button
                                            className="
                                                w-full
                                                mt-4
                                                bg-[#2B87DA]
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                                hover:bg-[#236fb4]
                                            "
                                        >
                                            Ubah Cover
                                        </button>

                                    )}

                                </div>

                                {/* DETAIL */}
                                <div className="flex-1">

                                    <div className="space-y-4">

                                        {/* JUDUL BUKU */}
                                        <div>
                                            <p className="text-gray-500">
                                                Judul Buku
                                            </p>

                                            {isEditing ? (

                                                <input
                                                    type="text"
                                                    value={editedBook.judul}
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            judul: e.target.value,
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
                                                    {selectedBook.judul}
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
                                                    type="text"
                                                    value={editedBook.penulis}
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            penulis: e.target.value,
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
                                                    {selectedBook.penulis}
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
                                                    type="text"
                                                    value={editedBook.penerbit}
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            penerbit: e.target.value,
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
                                                    {selectedBook.penerbit}
                                                </p>

                                            )}
                                        </div>

                                        {/* TAHUN TERBIT */}
                                        <div>
                                            <p className="text-gray-500">
                                                Tahun Terbit
                                            </p>

                                            {isEditing ? (

                                                <input
                                                    type="text"
                                                    value={editedBook.tahun_terbit}
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            tahun_terbit: Number(e.target.value)
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
                                                    {selectedBook.tahun_terbit}
                                                </p>

                                            )}
                                        </div>

                                        {/* STATUS KETERSEDIAAN */}
                                        <div>
                                            <p className="text-gray-500">
                                                Status Ketersediaan
                                            </p>

                                            {isEditing ? (
                                                <select
                                                    value={
                                                        editedBook.status_ketersediaan
                                                    }
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            status_ketersediaan:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        rounded-lg
                                                        px-3
                                                        py-2
                                                        max-w-full
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
                                                        editedBook.status_ketersediaan
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
                                                        editedBook.tipe
                                                    }
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
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
                                                    {editedBook.tipe}
                                                </p>
                                            )}
                                        </div>

{/*-------------------------------------------------------------------------------- */}
                                        {/* FILE PDF */}
                                        {(editedBook.tipe === "ebook" ||
                                            editedBook.tipe === "keduanya") && (

                                            <div>
                                                <p className="text-gray-500">
                                                    File PDF E-Book
                                                </p>

                                                <p className="font-semibold">
                                                    {editedBook.file ?? "-"}
                                                </p>

                                                {isEditing && (
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        className="w-full border rounded-lg px-3 py-2 mt-2"
                                                    />
                                                )}
                                            </div>
                                        )}
{/*-------------------------------------------------------------------------------- */}                                        
                                        
                                        {/* KATEGORI */}
                                        <div>
                                            <p className="text-gray-500">
                                                Kategori
                                            </p>

                                            {isEditing ? (
                                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">

                                                    {categoriesList.map((kategori) => (

                                                        <label
                                                            key={kategori.id_kategori}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                value={kategori.id_kategori}
                                                                checked={editedBook.id_kategori.includes(
                                                                    kategori.id_kategori
                                                                )}
                                                                onChange={(e) => {

                                                                    const id =
                                                                        Number(e.target.value);

                                                                    if (e.target.checked) {

                                                                        setEditedBook({
                                                                            ...editedBook,
                                                                            id_kategori: [
                                                                                ...editedBook.id_kategori,
                                                                                id,
                                                                            ],
                                                                        });

                                                                    } else {

                                                                        setEditedBook({
                                                                            ...editedBook,
                                                                            id_kategori:
                                                                                editedBook.id_kategori.filter(
                                                                                    (item: number) =>
                                                                                        item !== id
                                                                                ),
                                                                        });

                                                                    }
                                                                }}
                                                            />

                                                            {kategori.nama_kategori}
                                                        </label>

                                                    ))}

                                                </div>
                                            ) : (
                                                <p className="font-semibold">
                                                    {getKategoriName(
                                                        editedBook.id_kategori
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        {/* JUMLAH BUKU */}
                                        <div>
                                            <p className="text-gray-500">
                                                Jumlah Buku
                                            </p>

                                            {isEditing ? (

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={editedBook.jumlah}
                                                    onChange={(e) =>
                                                        setEditedBook({
                                                            ...editedBook,
                                                            jumlah: Number (e.target.value)
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
                                                    {selectedBook.jumlah}
                                                </p>

                                            )}
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-4
                                    mt-8
                                "
                            >

                                {isEditing ? (
                                    <>
                                        <button
                                            className="
                                                bg-green-600
                                                text-white
                                                px-6
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Simpan
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditedBook(
                                                    selectedBook
                                                );

                                                setIsEditing(false);
                                            }}
                                            className="
                                                bg-gray-500
                                                text-white
                                                px-6
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Batal
                                        </button>

                                        <button
                                            onClick={() =>{
                                                setShowDetail(false);
                                                setIsEditing(false);
                                            }}
                                            className="
                                                bg-red-500
                                                text-white
                                                px-6
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Tutup
                                        </button>
                                    </>

                                ) : (

                                    <>
                                        <button
                                            onClick={() =>
                                                setIsEditing(true)
                                            }
                                            className="
                                                bg-[#2B87DA]
                                                text-white
                                                px-6
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                setShowDetail(false)
                                            }
                                            className="
                                                bg-red-500
                                                text-white
                                                px-6
                                                py-2
                                                rounded-lg
                                                cursor-pointer
                                            "
                                        >
                                            Tutup
                                        </button>
                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                )}

                {/* POP UP TAMBAH BUKU */}
                {showTambah && (

                    <div
                        className="
                            fixed
                            inset-0
                            bg-black/40
                            flex
                            items-center
                            justify-center
                            z-50
                            overflow-x-auto
                        "
                    >

                        <div
                            className="
                                bg-white
                                w-[95%]
                                max-w-[900px]

                                max-h-[90vh]
                                overflow-y-auto

                                rounded-xl
                                p-4
                                md:p-6
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-6
                                "
                            >
                                Tambah Buku
                            </h2>

                            <div className="flex flex-col xl:flex-row gap-6">

                                {/* COVER */}
                                <div className="flex flex-col items-center">

                                    <div
                                        className="
                                            w-[220px]
                                            h-[320px]
                                            bg-gray-200
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        Cover
                                    </div>

                                    <button
                                        className="
                                            w-full
                                            mt-4
                                            bg-[#2B87DA]
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                            hover:bg-[#236fb4]
                                            cursor-pointer
                                        "
                                    >
                                        Pilih Cover
                                    </button>

                                </div>

                                {/* FORM */}
                                <div className="flex-1">

                                    <div className="space-y-4">

                                        <div>

                                            <label className="font-medium">
                                                Judul Buku
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    newBook.judul
                                                }
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
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

                                        </div>

                                        <div>

                                            <label className="font-medium">
                                                Penulis
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    newBook.penulis
                                                }
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
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

                                        </div>

                                        <div>

                                            <label className="font-medium">
                                                Penerbit
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    newBook.penerbit
                                                }
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
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

                                        </div>

                                        <div>

                                            <label className="font-medium">
                                                Tahun Terbit
                                            </label>

                                            <input
                                                type="number"
                                                value={
                                                    newBook.tahun_terbit
                                                }
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
                                                        tahun_terbit: Number(e.target.value)
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

                                            <label className="font-medium">
                                                Status Ketersediaan
                                            </label>

                                            <select
                                                value={
                                                    newBook.status_ketersediaan
                                                }
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
                                                        status_ketersediaan:
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
                                                <option value="tersedia">
                                                    Tersedia
                                                </option>

                                                <option value="tidak tersedia">
                                                    Tidak Tersedia
                                                </option>
                                            </select>

                                        </div>

                                        <div>

                                            <label className="font-medium">
                                                Tipe
                                            </label>

                                            <select
                                                value={newBook.tipe}
                                                onChange={(e) => {
                                                    const tipe = e.target.value;
// -------------------------------------------------------------------------------------------------------
                                                    setNewBook({
                                                        ...newBook,
                                                        tipe,
                                                    });

                                                    if (tipe === "fisik") {
                                                        setPdfFile(null);
                                                    }
                                                }}
// ------------------------------------------------------------------------------------------------------
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

{/*-------------------------------------------------------------------------------- */}
                                        {/* PDF E-BOOK */}
                                        {(newBook.tipe === "ebook" ||
                                            newBook.tipe === "keduanya") && (

                                            <div>

                                                <label className="block mb-2 font-medium">
                                                    File PDF E-Book
                                                </label>

                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) =>
                                                        setPdfFile(
                                                            e.target.files?.[0] ?? null
                                                        )
                                                    }
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />

                                                {pdfFile && (
                                                    <p className="mt-2 text-sm text-green-600">
                                                        {pdfFile.name}
                                                    </p>
                                                )}

                                            </div>

                                        )}
{/*-------------------------------------------------------------------------------- */}

                                        <div>

                                            <label className="font-medium">
                                                Kategori
                                            </label>

                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">

                                                {categoriesList.map((kategori) => (

                                                    <label
                                                        key={kategori.id_kategori}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={kategori.id_kategori}
                                                            checked={newBook.id_kategori.includes(
                                                                kategori.id_kategori
                                                            )}
                                                            onChange={(e) => {

                                                                const id =
                                                                    Number(e.target.value);

                                                                if (e.target.checked) {

                                                                    setNewBook({
                                                                        ...newBook,
                                                                        id_kategori: [
                                                                            ...newBook.id_kategori,
                                                                            id,
                                                                        ],
                                                                    });

                                                                } else {

                                                                    setNewBook({
                                                                        ...newBook,
                                                                        id_kategori:
                                                                            newBook.id_kategori.filter(
                                                                                (item) => item !== id
                                                                            ),
                                                                    });

                                                                }
                                                            }}
                                                        />

                                                        {kategori.nama_kategori}
                                                    </label>

                                                ))}

                                            </div>

                                        </div>

                                        <div className="mb-5">

                                            <label className="block mb-2 font-medium">
                                                Jumlah Buku
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                value={newBook.jumlah}
                                                onChange={(e) =>
                                                    setNewBook({
                                                        ...newBook,
                                                        jumlah: Number(
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
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* FOOTER */}
                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-4
                                    mt-8
                                "
                            >

                                <button
                                onClick={() => {

                                    // WAJIB UNGGAH PDF UNTUK E-BOOK / KEDUANYA ------------------------------------
                                    if (
                                        (newBook.tipe === "ebook" ||
                                            newBook.tipe === "keduanya") &&
                                        !pdfFile
                                    ) {
                                        alert("Silakan unggah file PDF.");
                                        return;
                                    }

                                    setShowTambah(false);

                                }}
                                    className="
                                        bg-green-500
                                        text-white
                                        px-6
                                        py-2
                                        rounded-lg
                                        cursor-pointer
                                    "
                                >
                                    Tambah
                                </button>

                                <button
                                    onClick={() => {
                                        setShowTambah(false);
                                        setNewBook(defaultBook);
                                        setPdfFile(null); {/*----------------------------------------------------------- */}
                                    }}
                                    className="
                                        bg-red-500
                                        text-white
                                        px-6
                                        py-2
                                        rounded-lg
                                        cursor-pointer
                                    "
                                >
                                    Batal
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {/* POP UP HAPUS BUKU */}
                {showDeleteModal && (
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
                                w-[90%]
                                max-w-[400px]
                                rounded-xl
                                p-6
                                shadow-xl
                            "
                        >
                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    mb-4
                                "
                            >
                                Konfirmasi Hapus
                            </h2>

                            <p
                                className="
                                    text-gray-700
                                    mb-6
                                "
                            >
                                Hapus <b>{selectedBookTitle}</b>?
                            </p>

                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-3
                                "
                            >
                                <button
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                    className="
                                        bg-gray-300
                                        text-gray-800
                                        px-5
                                        py-2
                                        rounded-lg
                                        hover:bg-gray-400
                                        cursor-pointer
                                    "
                                >
                                    Tidak
                                </button>

                                <button
                                    onClick={() => {
                                        // proses hapus buku

                                        setShowDeleteModal(false);
                                    }}
                                    className="
                                        bg-red-500
                                        text-white
                                        px-5
                                        py-2
                                        rounded-lg
                                        hover:bg-red-600
                                        cursor-pointer
                                    "
                                >
                                    Ya
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}