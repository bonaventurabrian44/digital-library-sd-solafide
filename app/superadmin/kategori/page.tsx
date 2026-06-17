"use client";

import { useState } from "react";
import books from "../../../data/buku.json";
import kategoriList from "../../../data/kategori.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function KategoriPage() {

    const categories = kategoriList;

    // EDIT KATEGORI

    const [showEdit, setShowEdit] =
    useState(false);

    const [selectedKategori, setSelectedKategori] =
        useState<{
            id_kategori: number;
            nama_kategori: string;
        } | null>(null);

    const [editedKategori, setEditedKategori] =
        useState<{
            id_kategori: number;
            nama_kategori: string;
        } | null>(null);

    // TAMBAH KATEGORI

    const defaultKategori = {
        nama_kategori: "",
    };

    const [showTambah, setShowTambah] =
        useState(false);

    const [newKategori, setNewKategori] =
        useState(defaultKategori);

    // HAPUS KATEGORI

    const [showDelete, setShowDelete] =
    useState(false);

    return (
        <div
            className={`
                ${inter.className}
                bg-white
                rounded-xl
                p-8
                shadow-sm
            `}
        >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                <h1
                    className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        mb-6
                        text-center
                        lg:text-left
                    "
                >
                    Daftar Kategori
                </h1>

                <button
                onClick={() => {
                    setNewKategori(defaultKategori);
                    setShowTambah(true);
                }}
                    className="
                        w-full
                        sm:w-auto
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
            <div className="flex justify-end mb-10">

                <input
                    type="text"
                    placeholder="Cari Kategori..."
                    className="
                        w-full
                        sm:w-[350px]
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

                        <tr
                            className="
                                border-b
                                border-gray-400
                            "
                        >
                            <th className="pr-6 text-left py-3">
                                No
                            </th>

                            <th className="pr-6 text-left py-3">
                                Nama Kategori
                            </th>

                            <th className="pr-6 text-left py-3">
                                Jumlah Buku
                            </th>

                            <th className="pr-6 text-center py-3">
                                Action
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {categories.map(
                            (kategori, index) => {

                                const jumlahBuku =
                                    books.filter(
                                    (book) =>
                                        book.id_kategori.includes(
                                            kategori.id_kategori
                                        )
                                ).length

                                return (
                                    <tr
                                        key={kategori.id_kategori}
                                        className="border-b"
                                    >
                                        <td className="py-4">
                                            {index + 1}
                                        </td>

                                        <td>
                                            {kategori.nama_kategori}
                                        </td>

                                        <td>
                                            {jumlahBuku}
                                        </td>

                                        <td>

                                            <div
                                                className="
                                                    flex
                                                    justify-center
                                                    gap-2
                                                "
                                            >
                                                <button
                                                onClick={() => {
                                                    setSelectedKategori(kategori);
                                                    setEditedKategori({
                                                        ...kategori,
                                                    });
                                                    setShowEdit(true);
                                                }}
                                                    className="
                                                        bg-blue-500
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        text-sm
                                                        hover:bg-blue-600
                                                        cursor-pointer
                                                    "
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    disabled={jumlahBuku > 0}
                                                    onClick={() => {
                                                        setSelectedKategori(kategori);
                                                        setShowDelete(true);
                                                    }}
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded
                                                        text-sm
                                                        ${
                                                            jumlahBuku > 0
                                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                                        }
                                                    `}
                                                >
                                                    Hapus
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                );
                            }
                        )}

                    </tbody>

                </table>
            </div>

            {/* POP UP EDIT KATEGORI */}
            {showEdit && selectedKategori && editedKategori && (

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
                            rounded-2xl
                            p-8
                            w-[95%]
                            max-w-[500px]
                            shadow-xl
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

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
                                    font-medium
                                "
                            >
                                Nama Kategori
                            </label>

                            <input
                                type="text"
                                value={
                                    editedKategori.nama_kategori
                                }
                                onChange={(e) =>
                                    setEditedKategori({
                                        ...editedKategori,
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
                                    py-2
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
                                mt-8
                            "
                        >

                            <button
                                className="
                                    bg-green-500
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    hover:bg-green-600
                                    cursor-pointer
                                "
                            >
                                Simpan
                            </button>

                            <button
                                onClick={() => {
                                    setShowEdit(false);
                                    setSelectedKategori(null);
                                    setEditedKategori(null);
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
                                Batal
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/*POP UP TAMBAH KATEGORI */}
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
                    "
                >

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            p-8
                            w-[95%]
                            max-w-[500px]
                            shadow-xl
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

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
                                    font-medium
                                "
                            >
                                Nama Kategori
                            </label>

                            <input
                                type="text"
                                value={
                                    newKategori.nama_kategori
                                }
                                onChange={(e) =>
                                    setNewKategori({
                                        ...newKategori,
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
                                    py-2
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
                                mt-8
                            "
                        >

                            <button
                                className="
                                    bg-green-500
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    hover:bg-green-600
                                    cursor-pointer
                                "
                            >
                                Tambah
                            </button>

                            <button
                                onClick={() => {
                                    setNewKategori(
                                        defaultKategori
                                    );
                                    setShowTambah(false);
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
                                Batal
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* POP UP HAPUS KATEGORI */}
            {showDelete && selectedKategori && (

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
                            rounded-2xl
                            p-8
                            w-[95%]
                            max-w-[450px]
                            shadow-xl
                            text-center
                        "
                    >

                        <p
                            className="
                                text-xl
                                font-medium
                                text-center
                                mb-8
                            "
                        >
                            Hapus kategori
                            {" "}
                            <span className="font-semibold">
                                "{selectedKategori.nama_kategori}"
                            </span>
                            ?
                        </p>

                        <div
                            className="
                                flex
                                flex-col-reverse
                                sm:flex-row
                                justify-center
                                gap-3
                            "
                        >

                            <button
                                className="
                                    w-full
                                    sm:w-auto
                                    bg-red-500
                                    text-white
                                    px-6
                                    py-2
                                    rounded-lg
                                    hover:bg-red-600
                                    cursor-pointer
                                "
                            >
                                Ya
                            </button>

                            <button
                                onClick={() => {
                                    setShowDelete(false);
                                    setSelectedKategori(null);
                                }}
                                className="
                                    w-full
                                    sm:w-auto
                                    bg-gray-500
                                    text-white
                                    px-6
                                    py-2
                                    rounded-lg
                                    hover:bg-gray-600
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