"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import peminjamanList from "../../../data/peminjaman.json";
import siswaList from "../../../data/siswa.json";
import books from "../../../data/buku.json";

const inter = Inter({
    subsets: ["latin"],
});

export default function PeminjamanBukuPage() {

    const [search, setSearch] = useState("");

    // AMBIL DATA SISWA BERDASARKAN id_siswa
    const getSiswa = (id_siswa: number) => {
        return siswaList.find(
            (siswa) =>
                siswa.id_siswa === id_siswa
        );
    };

    // PENCARIAN PEMINJAMAN BERDASARKAN NAMA SISWA
    const filteredPeminjaman =
    peminjamanList.filter(
        (pinjam) => {
            const siswa =
                getSiswa(
                    pinjam.id_siswa
                );
            return siswa?.nama_siswa
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );
        }
    );

    // MAPPING WARNA STATUS PEMINJAMAN
    const getStatusClass = (
        status: string
        ) => {

            switch (status) {

                case "dipinjam":
                    return "bg-blue-100 text-blue-700";

                case "kembali":
                    return "bg-green-100 text-green-700";

                case "terlambat":
                    return "bg-red-100 text-red-700";

                case "sebagian":
                    return "bg-yellow-100 text-yellow-700";

                default:
                    return "bg-gray-100 text-gray-700";

            }

        };

    // MENYIMPAN DATA PEMINJAMAN YANG DIPILIH UNTUK POPUP DETAIL
    const [selectedPinjam, setSelectedPinjam] =
    useState<Peminjaman | null>(null);

    interface Peminjaman {
        id_pinjam: number;
        id_siswa: number;
        tanggal_pinjam: string;
        tanggal_jatuh_tempo: string;
        status: string;
        detail: DetailPeminjaman[];
    }

    // POP UP DETAIL
    const [showDetail, setShowDetail] =
    useState(false);

    interface DetailPeminjaman {
        id_detail: number;
        id_buku: number;
        jumlah: number;
        tanggal_kembali: string | null;
        status: string;
        denda: number;
    }

    // EDIT PENGEMBALIAN BUKU
    // MENYIMPAN ID DETAIL YANG DIEDIT
    const [editingDetailId, setEditingDetailId] =
    useState<number | null>(null);

    // STATUS BARU SAAT EDIT PEMINJAMAN
    const [editedStatus, setEditedStatus] =
    useState("");

    // TANGGAL KEMBALI BARU SAAT EDIT PEMINJAMAN
    const [editedTanggalKembali, setEditedTanggalKembali] =
    useState("");

    // TAMBAH PEMINJAM
    // FORM PEMINJAMAN
    const [showTambahPinjam, setShowTambahPinjam] =
    useState(false);
    
    // DATA FORM TAMBAH PEMINJAM
    const [pinjamForm, setPinjamForm] =
        useState({
            id_siswa: "",
            tanggal_pinjam: "",
            tanggal_jatuh_tempo: "",
            books: [
                {
                    id_buku: "",
                    jumlah: 1,
                },
            ],
        });

    // MENAMPILKAN SISWA YANG DIPILIH BERDASARKAN PILIHAN
    const selectedSiswa =
    siswaList.find(
        (s) =>
            s.id_siswa ===
            Number(pinjamForm.id_siswa)
    );

    // TAMBAH BUKU
    // MENAMBAH KOLOM BUKU YG DIPINJAM
    const handleTambahBuku = () => {
        console.log("Klik tambah buku");

        setPinjamForm({
            ...pinjamForm,
            books: [
                ...pinjamForm.books,
                {
                    id_buku: "",
                    jumlah: 1,
                },
            ],
        });
    };

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

            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
            >

                <h1
                    className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left"
                >
                    Catatan Peminjaman Buku
                </h1>
                
                {/* TAMBAH PEMINJAM BUTTON */}
                <button
                onClick={() =>
                    setShowTambahPinjam(true)
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
                    + Tambah Peminjam
                </button>

            </div>
            
            {/* SEARCHBAR */}
            <div className="flex justify-end mb-10">
                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Cari Nama Siswa"
                    className="
                        w-full
                        sm:w-[350px]
                        h-[42px]
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        outline-none
                        focus:border-[#2B87DA]
                    "
                />
            </div>

            <div className="overflow-x-auto rounded-lg">

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-center">

                            <th className="pr-6 text-left py-3">
                                No
                            </th>

                            <th className="pr-6 text-left py-3">
                                NIS
                            </th>

                            <th className="pr-6 text-left py-3">
                                Nama Siswa
                            </th>

                            <th className="pr-6 text-left py-3">
                                Tanggal Pinjam
                            </th>

                            <th className="pr-6 text-left py-3">
                                Tanggal Jatuh Tempo
                            </th>

                            <th className="pr-6 text-left py-3">
                                Status
                            </th>

                            <th className="pr-6 text-center py-3">
                                Detail
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        
                        {/* AMBIL DETAIL PEMINJAMAN BERDASARKAN id_pinjam*/}
                        {filteredPeminjaman.map(
                            (pinjam, index) => {

                                const siswa =
                                    getSiswa(
                                        pinjam.id_siswa
                                    );

                                return (

                                    <tr
                                        key={pinjam.id_pinjam}
                                        className="border-b"
                                    >

                                        <td className="py-5">
                                            {index + 1}
                                        </td>

                                        <td className="pr-6">
                                            {siswa?.nis}
                                        </td>

                                        <td>
                                            {siswa?.nama_siswa}
                                        </td>

                                        <td>
                                            {
                                                pinjam.tanggal_pinjam
                                            }
                                        </td>

                                        <td>
                                            {
                                                pinjam.tanggal_jatuh_tempo
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                    ${getStatusClass(
                                                        pinjam.status
                                                    )}
                                                `}
                                            >
                                                {
                                                    pinjam.status
                                                }
                                            </span>

                                        </td>

                                        <td>
                                            
                                            {/* TOMBOL DETAIL */}
                                            <div className="flex justify-center">

                                                <button
                                                    onClick={() => {

                                                        setSelectedPinjam(
                                                            pinjam
                                                        );

                                                        setShowDetail(
                                                            true
                                                        );

                                                    }}
                                                    className="
                                                        bg-blue-500
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        text-sm
                                                        cursor-pointer
                                                    "
                                                >
                                                    Detail
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

            {/* POP UP DETAIL */}
            {showDetail && selectedPinjam && (

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
                            p-4
                            md:p-8
                            w-[95%]
                            max-w-[1100px]
                            max-h-[90vh]
                            overflow-y-auto
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">
                            Detail Peminjaman
                        </h2>

                        <div className="space-y-4">

                            <div>

                                <p className="text-gray-500">
                                    Nama Siswa
                                </p>

                                <p className="font-semibold">
                                    {
                                        getSiswa(
                                            selectedPinjam.id_siswa
                                        )?.nama_siswa
                                    }
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    NIS
                                </p>

                                <p className="font-semibold">
                                    {
                                        getSiswa(
                                            selectedPinjam.id_siswa
                                        )?.nis
                                    }
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 mb-2">
                                    Buku Dipinjam
                                </p>

                                <div className="mb-6 overflow-x-auto">

                                    <table className="min-w-[700px] lg:min-w-[1000px] w-full">

                                        <thead>

                                            <tr className="border-b">

                                                <th className="pr-6 text-left py-3">
                                                    No
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Judul Buku
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Penulis
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Penerbit
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Tahun Terbit
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Tanggal Kembali
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Status
                                                </th>

                                                <th className="pr-6 text-left py-3">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {selectedPinjam.detail.map(
                                                (
                                                    detail: DetailPeminjaman,
                                                    index: number
                                                ) => {

                                                    const buku =
                                                        books.find(
                                                            (b) =>
                                                                b.id_buku ===
                                                                detail.id_buku
                                                        );

                                                    return (

                                                        <tr
                                                            key={detail.id_detail}
                                                            className="border-b"
                                                        >

                                                            <td className="py-4">
                                                                {index + 1}
                                                            </td>

                                                            <td>
                                                                {buku?.judul}
                                                            </td>

                                                            <td>
                                                                {buku?.penulis}
                                                            </td>

                                                            <td className="pr-4">
                                                                {buku?.penerbit}
                                                            </td>

                                                            <td>
                                                                {buku?.tahun_terbit}
                                                            </td>

                                                            <td className="pr-4">

                                                                {editingDetailId === detail.id_detail ? (

                                                                    <input
                                                                        type="date"
                                                                        value={
                                                                            editedTanggalKembali
                                                                        }
                                                                        onChange={(e) =>
                                                                            setEditedTanggalKembali(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="
                                                                            border
                                                                            rounded
                                                                            px-2
                                                                            py-1
                                                                        "
                                                                    />

                                                                ) : (

                                                                    detail.tanggal_kembali ??
                                                                    "-"

                                                                )}

                                                            </td>

                                                            <td className="pr-4">

                                                                {editingDetailId === detail.id_detail ? (

                                                                    <select
                                                                        value={editedStatus}
                                                                        onChange={(e) =>
                                                                            setEditedStatus(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="
                                                                            border
                                                                            rounded
                                                                            px-2
                                                                            py-1
                                                                        "
                                                                    >
                                                                        <option value="dipinjam">
                                                                            Dipinjam
                                                                        </option>

                                                                        <option value="kembali">
                                                                            Dikembalikan
                                                                        </option>

                                                                        <option value="terlambat">
                                                                            Terlambat
                                                                        </option>

                                                                    </select>

                                                                ) : (

                                                                    <span
                                                                        className="
                                                                            px-3
                                                                            py-1
                                                                            rounded-full
                                                                            text-xs
                                                                            bg-yellow-100
                                                                            text-yellow-700
                                                                        "
                                                                    >
                                                                        {detail.status}
                                                                    </span>

                                                                )}

                                                            </td>

                                                            <td>

                                                                {editingDetailId ===
                                                                detail.id_detail ? (

                                                                    <div className="flex gap-2">

                                                                        {/* SIMPAN BUTTON */}
                                                                        <button
                                                                            onClick={() => {

                                                                                // nanti update data

                                                                                setEditingDetailId(
                                                                                    null
                                                                                );

                                                                            }}
                                                                            className="
                                                                                bg-green-500
                                                                                text-white
                                                                                px-3
                                                                                py-1
                                                                                rounded
                                                                                text-sm
                                                                                cursor-pointer
                                                                            "
                                                                        >
                                                                            Simpan
                                                                        </button>

                                                                        <button
                                                                            onClick={() => {

                                                                                setEditingDetailId(
                                                                                    null
                                                                                );

                                                                            }}
                                                                            className="
                                                                                w-8
                                                                                h-8
                                                                                bg-red-500
                                                                                text-white
                                                                                rounded
                                                                                cursor-pointer
                                                                            "
                                                                        >
                                                                            ✕
                                                                        </button>

                                                                    </div>

                                                                ) : (

                                                                    <button
                                                                        onClick={() => {

                                                                            setEditingDetailId(
                                                                                detail.id_detail
                                                                            );

                                                                            setEditedStatus(
                                                                                detail.status
                                                                            );

                                                                            setEditedTanggalKembali(
                                                                                detail.tanggal_kembali ??
                                                                                ""
                                                                            );

                                                                        }}
                                                                        className="
                                                                            bg-blue-500
                                                                            text-white
                                                                            px-3
                                                                            py-1
                                                                            rounded
                                                                            text-sm
                                                                            cursor-pointer
                                                                        "
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                )}

                                                            </td>

                                                        </tr>

                                                    );

                                                }
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                        <div className="flex justify-end mt-6">

                            <button
                                onClick={() => {

                                    setShowDetail(
                                        false
                                    );

                                    setSelectedPinjam(
                                        null
                                    );

                                }}
                                className="
                                    bg-gray-500
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    cursor-pointer
                                "
                            >
                                Tutup
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* POP UP TAMBAH PEMINJAM */}
            {showTambahPinjam && (
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
                            w-[95%]
                            md:w-[90%]
                            lg:max-w-[850px]
                            max-h-[90vh]
                            p-4
                            md:p-6
                            lg:p-8
                            shadow-lg
                            overflow-y-auto
                        "
                    >
                        <h2 className="text-2xl font-bold mb-10">
                            Tambah Peminjaman
                        </h2>

                        {/* SISWA */}
                        <div className="grid grid-cols-1 lg:grid-cols-[17fr_1fr] gap-4">

                            <div className="mb-6">
                                <label className="font-medium">
                                    Nama Siswa
                                </label>

                                <select
                                    value={pinjamForm.id_siswa}
                                    onChange={(e) =>
                                        setPinjamForm({
                                            ...pinjamForm,
                                            id_siswa:
                                                e.target.value,
                                        })
                                    }
                                    className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        px-4
                                        py-2
                                    "
                                >
                                    <option value="">
                                        Pilih Siswa
                                    </option>

                                    {siswaList.map(
                                        (siswa) => (
                                            <option
                                                key={
                                                    siswa.id_siswa
                                                }
                                                value={
                                                    siswa.id_siswa
                                                }
                                            >
                                                {
                                                    siswa.nama_siswa
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="font-medium">
                                    Kelas
                                </label>

                                <input
                                    readOnly
                                    value={
                                        selectedSiswa?.kelas ||
                                        ""
                                    }
                                    className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        px-4
                                        py-2
                                        bg-gray-100
                                    "
                                />
                            </div>

                        </div>

                        {/* TANGGAL */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                            <div>
                                <label className="font-medium">
                                    Tanggal Dipinjam
                                </label>

                                <input
                                    type="date"
                                    value={
                                        pinjamForm.tanggal_pinjam
                                    }
                                    onChange={(e) =>
                                        setPinjamForm({
                                            ...pinjamForm,
                                            tanggal_pinjam:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    className="
                                        w-full
                                        border
                                        mt-2
                                        rounded-lg
                                        px-4
                                        py-2
                                    "
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                    Tanggal Jatuh Tempo
                                </label>

                                <input
                                    type="date"
                                    value={
                                        pinjamForm.tanggal_jatuh_tempo
                                    }
                                    onChange={(e) =>
                                        setPinjamForm({
                                            ...pinjamForm,
                                            tanggal_jatuh_tempo:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    className="
                                        w-full
                                        border
                                        mt-2
                                        rounded-lg
                                        px-4
                                        py-2
                                    "
                                />
                            </div>

                        </div>

                        {/* BUTTON TAMBAH BUKU */}
                        <div className="flex justify-end mb-6">

                            <button
                                onClick={
                                    handleTambahBuku
                                }
                                className="
                                    bg-green-500
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    font-medium
                                    hover:bg-green-600
                                    cursor-pointer
                                "
                            >
                                + Tambah Buku
                            </button>

                        </div>

                        <hr className="mb-6" />

                        {/* LIST BUKU */}
                        <div
                            className="
                                hidden
                                lg:grid
                                lg:grid-cols-[1fr_120px_40px]
                                gap-4
                                mb-2
                                font-medium
                            "
                        >
                            <div className="flex-1">
                                    Judul Buku
                            </div>

                            <div className="w-[120px]">
                                    Jumlah
                            </div>

                            <div className="w-10"></div>
                        </div>

                        {/* LIST BUKU */}
                        <div className="space-y-4">

                            {pinjamForm.books.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="
                                            grid
                                            grid-cols-1
                                            lg:grid-cols-[1fr_120px_40px]
                                            gap-4
                                            items-center
                                        "
                                    >

                                        {/* JUDUL */}
                                        <div>

                                            <label className="block lg:hidden mb-2 font-medium">
                                                Judul Buku
                                            </label>

                                            <select
                                                value={item.id_buku}
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...pinjamForm.books,
                                                    ];

                                                    updated[index].id_buku =
                                                        e.target.value;

                                                    setPinjamForm({
                                                        ...pinjamForm,
                                                        books: updated,
                                                    });
                                                }}
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-4
                                                    py-2
                                                "
                                            >
                                                <option value="">
                                                    Pilih Buku
                                                </option>

                                                {books.map((book) => (
                                                    <option
                                                        key={book.id_buku}
                                                        value={book.id_buku}
                                                    >
                                                        {book.judul}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>

                                        {/* JUMLAH */}
                                        <div className="w-[120px]">

                                            <label className="block lg:hidden mb-2 font-medium">
                                                Jumlah
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                value={item.jumlah}
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...pinjamForm.books,
                                                    ];

                                                    updated[index].jumlah =
                                                        Number(
                                                            e.target.value
                                                        );

                                                    setPinjamForm({
                                                        ...pinjamForm,
                                                        books: updated,
                                                    });
                                                }}
                                                className="
                                                    w-full
                                                    border
                                                    rounded-lg
                                                    px-4
                                                    py-2
                                                "
                                            />

                                        </div>

                                        {/* HAPUS */}
                                        

                                        {pinjamForm.books.length >
                                            1 && (
                                            <div className="w-10">
                                                <button
                                                    onClick={() => {
                                                        const updated =
                                                            pinjamForm.books.filter(
                                                                (_, i) =>
                                                                    i !==
                                                                    index
                                                            );

                                                        setPinjamForm({
                                                            ...pinjamForm,
                                                            books:
                                                                updated,
                                                        });
                                                    }}
                                                    className="
                                                        w-10
                                                        h-10
                                                        bg-red-500
                                                        text-white
                                                        rounded-lg
                                                        hover:bg-red-600
                                                        cursor-pointer
                                                    "
                                                >
                                                    −
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}

                        </div>

                        {/* BUTTON BAWAH */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                className="
                                    bg-[#2B87DA]
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    font-medium
                                    hover:bg-[#236fb4]
                                    cursor-pointer
                                "
                            >
                                Tambah
                            </button>

                            <button
                                onClick={() =>
                                    setShowTambahPinjam(
                                        false
                                    )
                                }
                                className="
                                    bg-gray-300
                                    px-5
                                    py-2
                                    rounded-lg
                                    font-medium
                                    hover:bg-gray-400
                                    cursor-pointer
                                "
                            >
                                Batal
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}