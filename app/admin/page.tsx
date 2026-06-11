"use client";

import { useState } from "react";
import Link from "next/link";
import AdminNavbar from "../../components/AdminNavbar";
import students from "../../data/siswa.json";
import books from "../../data/buku.json";
import peminjamanData from "../../data/peminjaman.json";

type Student = {
    id_siswa: number;
    nis: string;
    nama_siswa: string;
    kelas: string;
    email_ortu: string;
    no_telp_ortu: string;
    status: string;
};

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

type Peminjaman = {
    id_pinjam: number;
    id_siswa: number;
    tanggal_pinjam: string;
    tanggal_jatuh_tempo: string;
    status: string;
    detail: DetailPeminjaman[];
};

type DetailPeminjaman = {
    id_detail: number;
    id_buku: number;
    jumlah: number;
    tanggal_kembali: string | null;
    status: string;
};

export default function AdminPage() {
    const studentList = students as Student[];
    const bookList = books as Book[];

    const [activeMenu, setActiveMenu] = useState("siswa");
    const [showDetail, setShowDetail] = useState(false);

    const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

    const [selectedStudentId, setSelectedStudentId] =
    useState("");

    const selectedStudentData =
    studentList.find(
        (student) =>
            student.id_siswa ===
            Number(selectedStudentId)
    );

    const [showAddLoan, setShowAddLoan] =
    useState(false);

    const [borrowedBooks, setBorrowedBooks] =
    useState([
        {
            id: Date.now(),
            bookId: "",
            quantity: 1,
        },
    ]);

    const [peminjamanList, setPeminjamanList] =
    useState(peminjamanData);

    const [tanggalPinjam, setTanggalPinjam] =
        useState("");

    const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState("");

    const [selectedPeminjaman, setSelectedPeminjaman] =
    useState<Peminjaman | null>(null);

    const selectedStudentDataDetail =
    studentList.find(
        (student) =>
            student.id_siswa ===
            selectedPeminjaman?.id_siswa
    );

    const handleTambahPeminjaman = () => {
        const newPeminjaman = {
            id_pinjam: Date.now(),

            id_siswa: Number(selectedStudentId),

            tanggal_pinjam:
                tanggalPinjam,

            tanggal_jatuh_tempo:
                tanggalJatuhTempo,

            status: "dipinjam",

            detail: borrowedBooks.map(
                (item, index) => ({
                    id_detail:
                        Date.now() + index,

                    id_buku:
                        Number(item.bookId),

                    jumlah:
                        item.quantity,

                    tanggal_kembali:
                        null,

                    status:
                        "dipinjam",
                })
            ),
        };

        setPeminjamanList([
            ...peminjamanList,
            newPeminjaman,
        ]);

        // reset form
        setSelectedStudentId("");
        setTanggalPinjam("");
        setTanggalJatuhTempo("");

        setBorrowedBooks([
            {
                id: Date.now(),
                bookId: "",
                quantity: 1,
            },
        ]);

        setShowAddLoan(false);
    };

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <AdminNavbar />

            <div className="flex">

                {/* SIDEBAR */}
                <aside
                    className="
                        w-[260px]
                        bg-white
                        border-r
                        border-gray-200
                        min-h-[calc(100vh-80px)]
                        flex
                        flex-col
                    "
                >

                    <div className="p-6">

                        <button
                            onClick={() => setActiveMenu("siswa")}
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                px-2
                                py-3
                                gap-3
                                rounded-lg
                                font-semibold
                                transition-all
                                cursor-pointer
                                mb-3
                                ${
                                    activeMenu === "siswa"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/client.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Data Siswa
                        </button>

                        <button
                            onClick={() => setActiveMenu("peminjaman")}
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                px-2
                                py-3
                                gap-3
                                rounded-lg
                                font-semibold
                                transition-all
                                cursor-pointer
                                mb-3
                                ${
                                    activeMenu === "peminjaman"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/wirte.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Catatan Peminjaman Buku
                        </button>

                        <button
                            onClick={() => setActiveMenu("laporan")}
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                px-2
                                py-3
                                gap-3
                                rounded-lg
                                font-semibold
                                transition-all
                                cursor-pointer
                                mb-3
                                ${
                                    activeMenu === "laporan"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/training.png"
                                alt="Edit"
                                className="w-5 h-5 object-contain"
                            />
                            Laporan Peminjaman
                        </button>

                    </div>

                    {/* LOGOUT */}
                    <div className="mt-auto p-6">

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

                    {activeMenu === "siswa" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-6">

                                <h1 className="text-3xl font-bold">
                                    Data Siswa
                                </h1>

                                <input
                                    type="text"
                                    placeholder="Cari siswa..."
                                    className="
                                        w-[320px]
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

                                            <th className="py-3 text-left">
                                                No
                                            </th>

                                            <th className="py-3 text-left">
                                                NIS
                                            </th>

                                            <th className="py-3 text-left">
                                                Nama Siswa
                                            </th>

                                            <th className="py-3 text-left">
                                                Kelas
                                            </th>

                                            <th className="py-3 text-left">
                                                Status
                                            </th>

                                            <th className="py-3 text-center">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {studentList.map((siswa, index) => (
                                            <tr
                                                key={siswa.id_siswa}
                                                className="
                                                    border-b
                                                    hover:bg-gray-50
                                                "
                                            >

                                                <td className="py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="py-4">
                                                    {siswa.nis}
                                                </td>

                                                <td className="py-4">
                                                    {siswa.nama_siswa}
                                                </td>

                                                <td className="py-4">
                                                    {siswa.kelas}
                                                </td>

                                                <td className="py-4">

                                                    <select
                                                        defaultValue={siswa.status}
                                                        className={`
                                                            px-3
                                                            py-2
                                                            rounded-lg
                                                            border
                                                            cursor-pointer
                                                            ${
                                                                siswa.status === "aktif"
                                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                                    : "bg-red-50 text-red-700 border-red-200"
                                                            }
                                                        `}
                                                    >
                                                        <option value="aktif">
                                                            Aktif
                                                        </option>

                                                        <option value="tidak aktif">
                                                            Tidak Aktif
                                                        </option>
                                                    </select>

                                                </td>

                                                <td className="py-4">

                                                    <div className="flex justify-center">

                                                        <button
                                                            onClick={() =>
                                                                setSelectedStudent(siswa)
                                                            }
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
                                                            Detail
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

                    {activeMenu === "peminjaman" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-8">

                                <h1 className="text-[32px] font-bold">
                                    Catatan Peminjaman Buku
                                </h1>

                                <button
                                onClick={() =>
                                    setShowAddLoan(true)
                                }
                                    className="
                                        bg-[#2B87DA]
                                        hover:bg-[#236fb4]
                                        text-white
                                        px-5
                                        py-2
                                        rounded-full
                                        font-medium
                                        transition-all
                                        cursor-pointer
                                    "
                                >
                                    Tambah Peminjaman
                                </button>

                            </div>

                            {/* SEARCH */}
                            <div className="flex justify-end mb-6">

                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="
                                        w-[260px]
                                        border-b
                                        border-gray-400
                                        outline-none
                                        px-2
                                        py-1
                                    "
                                />

                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead>

                                        <tr className="border-b border-yellow-400">

                                            <th className="text-left py-3">No</th>

                                            <th className="text-left py-3">
                                                ID Siswa
                                            </th>

                                            <th className="text-left py-3">
                                                Nama Siswa
                                            </th>

                                            <th className="text-left py-3">
                                                Tanggal Pinjam
                                            </th>

                                            <th className="text-left py-3">
                                                Tanggal Jatuh Tempo
                                            </th>

                                            <th className="text-left py-3">
                                                Status
                                            </th>

                                            <th className="text-center py-3">
                                                Detail
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {peminjamanList.map(
                                            (item, index) => {

                                                const siswa =
                                                    studentList.find(
                                                        (s) =>
                                                            s.id_siswa ===
                                                            item.id_siswa
                                                    );

                                                return (

                                                    <tr
                                                        key={item.id_pinjam}
                                                        className="hover:bg-gray-50"
                                                    >

                                                        <td className="py-4">
                                                            {index + 1}
                                                        </td>

                                                        <td>
                                                            {item.id_siswa}
                                                        </td>

                                                        <td>
                                                            {siswa?.nama_siswa}
                                                        </td>

                                                        <td>
                                                            {item.tanggal_pinjam}
                                                        </td>

                                                        <td>
                                                            {item.tanggal_jatuh_tempo}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`
                                                                    px-3
                                                                    py-1
                                                                    rounded-full
                                                                    text-sm
                                                                    ${
                                                                        item.status ===
                                                                        "dipinjam"
                                                                            ? "bg-yellow-100 text-yellow-700"
                                                                            : item.status ===
                                                                            "kembali"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : "bg-red-100 text-red-700"
                                                                    }
                                                                `}
                                                            >
                                                                {item.status}
                                                            </span>
                                                        </td>

                                                        <td className="text-center">

                                                            <button
                                                                onClick={() => {
                                                                    setSelectedPeminjaman(item);
                                                                    setShowDetail(true);
                                                                }}
                                                                className="
                                                                    bg-[#3AC7B1]
                                                                    hover:bg-[#2FB09C]
                                                                    text-white
                                                                    px-4
                                                                    py-1
                                                                    rounded-md
                                                                    text-sm
                                                                    transition-all
                                                                    cursor-pointer
                                                                "
                                                            >
                                                                Detail
                                                            </button>

                                                        </td>

                                                    </tr>

                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* PAGINATION */}
                            <div className="flex justify-end mt-10 gap-4">

                                <button>{"<"}</button>

                                <button className="font-bold text-[#2B87DA]">
                                    1
                                </button>

                                <button>2</button>

                                <span>...</span>

                                <button>8</button>

                                <button>{">"}</button>

                            </div>

                        </div>
                    )}

                    {activeMenu === "laporan" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h1 className="text-3xl font-bold mb-4">
                                Laporan Peminjaman
                            </h1>

                            <p>
                                Isi laporan peminjaman di sini.
                            </p>
                        </div>
                    )}

                </main>

                {showDetail && (
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
                                w-[900px]
                                max-h-[85vh]
                                overflow-y-auto
                                p-6
                                shadow-xl
                            "
                        >
                            {/* HEADER */}
                            <div className="flex justify-between items-start mb-6">

                                <div className="flex gap-20">

                                    <div>
                                        <p className="font-semibold">
                                            {selectedStudentDataDetail?.nama_siswa}
                                        </p>

                                        <p className="text-gray-600">
                                            {selectedStudentDataDetail?.nis}
                                        </p>
                                    </div>

                                    <div>
                                        <p>
                                            <span className="font-semibold">
                                                Tanggal Pinjam :
                                            </span>{" "}
                                            {selectedPeminjaman?.tanggal_pinjam}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Tanggal Jatuh Tempo :
                                            </span>{" "}
                                            {selectedPeminjaman?.tanggal_jatuh_tempo}
                                        </p>
                                    </div>

                                    <div>
                                        <p>
                                            <span className="font-semibold">
                                                Jumlah Buku :
                                            </span>{" "}
                                            {selectedPeminjaman?.detail?.length || 0}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => setShowDetail(false)}
                                    className="
                                        text-xl
                                        font-bold
                                        hover:text-red-500
                                    "
                                >
                                    ×
                                </button>

                            </div>

                            <hr className="mb-6" />

                            {/* TABLE */}
                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">
                                            No
                                        </th>

                                        <th className="text-left py-3">
                                            Judul Buku
                                        </th>

                                        <th className="text-left py-3">
                                            Penulis Buku
                                        </th>

                                        <th className="text-left py-3">
                                            Penerbit Buku
                                        </th>

                                        <th className="text-left py-3">
                                            Tahun Terbit
                                        </th>

                                        <th className="text-left py-3">
                                            Tanggal Kembali
                                        </th>

                                        <th className="text-left py-3">
                                            Status Pengembalian
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {selectedPeminjaman?.detail?.map(
                                        (detail, index) => {
                                            const buku =
                                                bookList.find(
                                                    (b) =>
                                                        b.id_buku ===
                                                        detail.id_buku
                                                );

                                            return (
                                                <tr
                                                    key={detail.id_detail}
                                                    className="border-b"
                                                >
                                                    <td className="py-3">
                                                        {index + 1}
                                                    </td>

                                                    <td>
                                                        {buku?.judul}
                                                    </td>

                                                    <td>
                                                        {buku?.penulis}
                                                    </td>

                                                    <td>
                                                        {buku?.penerbit}
                                                    </td>

                                                    <td>
                                                        {buku?.tahun_terbit}
                                                    </td>

                                                    <td>
                                                        {detail.tanggal_kembali ??
                                                            "-"}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-white
                                                                text-xs
                                                                ${
                                                                    detail.status ===
                                                                    "dipinjam"
                                                                        ? "bg-yellow-500"
                                                                        : detail.status ===
                                                                        "kembali"
                                                                        ? "bg-green-500"
                                                                        : "bg-red-500"
                                                                }
                                                            `}
                                                        >
                                                            {detail.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>

                            </table>

                        </div>
                    </div>
                )}

                {/* POPUP DETAIL SISWA */}
                {selectedStudent && (
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
                                w-[550px]
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-8
                                "
                            >
                                {selectedStudent.nama_siswa}
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        NIS
                                    </p>

                                    <p className="font-semibold text-lg">
                                        {selectedStudent.nis}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Kelas
                                    </p>

                                    <p className="font-semibold text-lg">
                                        {selectedStudent.kelas}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Email Orang Tua
                                    </p>

                                    <p className="font-semibold text-lg">
                                        {selectedStudent.email_ortu}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Nomor Telepon Orang Tua
                                    </p>

                                    <p className="font-semibold text-lg">
                                        {selectedStudent.no_telp_ortu}
                                    </p>
                                </div>

                            </div>

                            <div
                                className="
                                    flex
                                    justify-end
                                    mt-8
                                "
                            >

                                <button
                                    onClick={() =>
                                        setSelectedStudent(null)
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
                )}

                {/*POP UP TAMBAH PEMINJAMAN */}
                {showAddLoan && (
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
                                w-[850px]
                                max-h-[90vh]
                                overflow-y-auto
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-8
                                "
                            >
                                Tambah Peminjaman
                            </h2>

                            {/* SISWA */}
                            <div className="grid grid-cols-[17fr_1fr] gap-4">
                                <div className="mb-6">

                                    <label className="font-medium">
                                        Nama Siswa
                                    </label>

                                    <select
                                        value={selectedStudentId}
                                        onChange={(e) =>
                                            setSelectedStudentId(
                                                e.target.value
                                            )
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

                                        {studentList.map((student) => (
                                            <option
                                                key={student.id_siswa}
                                                value={student.id_siswa}
                                            >
                                                {student.nama_siswa}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* KELAS */}
                                <div className="mb-6">
                                    <label className="font-medium">
                                        Kelas
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            selectedStudentData?.kelas || ""
                                        }
                                        readOnly
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
                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    gap-6
                                    mb-8
                                "
                            >

                                <div>

                                    <label className="font-medium">
                                        Tanggal Dipinjam
                                    </label>

                                    <input
                                        type="date"
                                        value={tanggalPinjam}
                                        onChange={(e) =>
                                            setTanggalPinjam(
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            mt-2
                                            border
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
                                        value={tanggalJatuhTempo}
                                        onChange={(e) =>
                                            setTanggalJatuhTempo(
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            mt-2
                                            border
                                            rounded-lg
                                            px-4
                                            py-2
                                        "
                                    />

                                </div>

                            </div>

                            {/* TOMBOL TAMBAH BUKU */}
                            <div className="flex justify-end mb-4">

                                <button
                                    onClick={() =>
                                        setBorrowedBooks([
                                            ...borrowedBooks,
                                            {
                                                id: Date.now() + Math.random(),
                                                bookId: "",
                                                quantity: 1,
                                            },
                                        ])
                                    }
                                    className="
                                        px-4
                                        py-2
                                        bg-green-500
                                        text-white
                                        rounded-lg
                                        hover:bg-green-600
                                        cursor-pointer
                                    "
                                >
                                    + Tambah Buku
                                </button>

                            </div>

                            <hr className="mb-6" />

                            {/* DAFTAR BUKU */}
                            <div className="space-y-4">

                                {borrowedBooks.map(
                                    (item, index) => (
                                        <div
                                            key={item.id}
                                            className="
                                                flex
                                                gap-4
                                                items-end
                                            "
                                        >

                                            {/* JUDUL */}
                                            <div className="flex-1">

                                                <label className="font-medium">
                                                    Judul Buku
                                                </label>

                                                <select
                                                    value={item.bookId}
                                                    onChange={(e) => {
                                                        const updatedBooks =
                                                            [...borrowedBooks];

                                                        updatedBooks[index].bookId =
                                                            e.target.value;

                                                        setBorrowedBooks(
                                                            updatedBooks
                                                        );
                                                    }}
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
                                                        Pilih Buku
                                                    </option>

                                                    {bookList.map((book) => (
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

                                                <label className="font-medium">
                                                    Jumlah
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    defaultValue={
                                                        item.quantity
                                                    }
                                                    onChange={(e) => {
                                                        const updatedBooks = [
                                                            ...borrowedBooks,
                                                        ];

                                                        updatedBooks[index].quantity =
                                                            Number(e.target.value);

                                                        setBorrowedBooks(
                                                            updatedBooks
                                                        );
                                                    }}
                                                    className="
                                                        w-full
                                                        mt-2
                                                        border
                                                        rounded-lg
                                                        px-4
                                                        py-2
                                                    "
                                                />

                                            </div>

                                            {/* HAPUS */}
                                            {borrowedBooks.length >
                                                1 && (
                                                <button
                                                    onClick={() => {
                                                        setBorrowedBooks(
                                                            borrowedBooks.filter(
                                                                (book) =>
                                                                    book.id !== item.id
                                                            )
                                                        );
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
                                                    -
                                                </button>
                                            )}

                                        </div>
                                    )
                                )}

                            </div>

                            {/* BUTTON */}
                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-3
                                    mt-8
                                "
                            >

                                <button
                                    onClick={handleTambahPeminjaman}
                                    className="
                                        px-5
                                        py-2
                                        bg-[#2B87DA]
                                        text-white
                                        rounded-lg
                                        hover:bg-[#236fb4]
                                        cursor-pointer
                                    "
                                >
                                    Tambah
                                </button>

                                <button
                                    onClick={() => {
                                        setShowAddLoan(
                                            false
                                        );

                                        setBorrowedBooks([
                                            {
                                                id: Date.now() + Math.random(),
                                                bookId: "",
                                                quantity: 1,
                                            },
                                        ]);
                                    }}
                                    className="
                                        px-5
                                        py-2
                                        bg-gray-300
                                        rounded-lg
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

        </div>
    );
}