"use client";

import { useState, useEffect } from "react";
import siswaList from "../../../data/siswa.json";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { Inter } from "next/font/google";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Siswa = typeof siswaList[number];

const inter = Inter({
    subsets: ["latin"],
});

export default function DataSiswaPage() {

    // KEYWORD PENCARIAN SISWA
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default");
    const [kelasFilter, setKelasFilter] = useState("semua");
    const [statusFilter, setStatusFilter] = useState("semua");

    // PAGINATION
    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    // DATA SISWA YANG DITAMPILKAN PADA TABEL
    const [students, setStudents] = useState<Siswa[]>([]);

    const loadData = () => {
        setStudents(bookServiceLocal.getAllSiswa());
    };

    useEffect(() => {loadData();}, []);

    // IMPLEMENTASI PENCARIAN BERDASARKAN NAMA
    const filteredSiswa = [...students]
    .filter((siswa) =>{
        const matchSearch =
            siswa.nama_siswa
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            siswa.nis.includes(searchTerm);

        const matchKelas =
            kelasFilter === "semua" ||
            siswa.kelas === Number(kelasFilter);

        const matchStatus =
            statusFilter === "semua" ||
            siswa.status === statusFilter;

        return matchSearch && matchKelas && matchStatus;
    })
    .sort((a, b) => {
        switch (sortType) {

            case "az":
                return a.nama_siswa.localeCompare(b.nama_siswa);

            case "za":
                return b.nama_siswa.localeCompare(a.nama_siswa);

            case "kelas_desc":
                return Number(b.kelas) - Number(a.kelas);

            case "kelas_asc":
                return Number(a.kelas) - Number(b.kelas);

            default:
                return a.id_siswa - b.id_siswa;
        }
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredSiswa.length / ITEMS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;

    const currentStudents =
        filteredSiswa.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
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

    useEffect(() => {
    setCurrentPage(1);
}, [searchTerm, sortType, kelasFilter, statusFilter]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // MENYIMPAN DATA SISWA YANG DIPILIH UNTUK DITAMPILKAN PADA POPUP DETAIL
    const [selectedSiswa, setSelectedSiswa] =useState<Siswa | null>(null);

    // MENAMPILKAN POP DETAIL SISWA
    const [showDetail, setShowDetail] =useState(false);

    return (

        <div className={`${inter.className} bg-white rounded-xl p-8 shadow-sm`}>

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Data Siswa
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-3">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Cari Nama Siswa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-[350px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"
                    />

                </div>

            </div>

            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-3">

                {/* Kelas */}
                <select
                    value={kelasFilter}
                    onChange={(e) => setKelasFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                >
                    <option value="semua">Semua Kelas</option>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                </select>

                {/* Status */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                >
                    <option value="semua">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="tidak aktif">Tidak Aktif</option>
                </select>

                {/* Urutkan */}
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                >
                    <option value="default">Default</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="kelas_desc">Kelas Terbesar</option>
                    <option value="kelas_asc">Kelas Terkecil</option>
                </select>

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
                                NIS
                            </th>

                            <th className="pr-6 text-left py-3">
                                Nama Siswa
                            </th>

                            <th className="pr-6 text-left py-3">
                                Kelas
                            </th>

                            <th className="pr-6 text-left py-3">
                                Status
                            </th>

                            <th className="pr-6 text-center py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentStudents.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-8 text-gray-500"
                                >
                                    {searchTerm
                                        ? "Siswa tidak ditemukan"
                                        : "Belum ada data siswa"}
                                </td>
                            </tr>
                        ) : (currentStudents.map((siswa, index) => (

                                <tr key={siswa.id_siswa} className="border-b">

                                    <td className="py-5">
                                        {startIndex + index + 1}
                                    </td>

                                    <td className="pr-6">
                                        {siswa.nis}
                                    </td>

                                    <td className="pr-6">
                                        {siswa.nama_siswa}
                                    </td>

                                    <td>
                                        <select
                                            value={siswa.kelas}
                                            onChange={(e) => {bookServiceLocal.updateSiswa(siswa.id_siswa,{kelas: Number(e.target.value),});
                                                bookServiceLocal.addAdminLog("Admin","Data Siswa","Edit",
                                                    `Mengubah kelas ${siswa.nama_siswa} dari ${siswa.kelas} menjadi ${e.target.value}`
                                                );
                                                loadData();
                                                toast.success("Kelas siswa berhasil diperbarui.");
                                            }}
                                            className="px-3 py-2 rounded-lg border border-gray-300 cursor-pointer"
                                        >
                                            {[1,2,3,4,5,6].map((kelas) => (
                                                <option key={kelas} value={kelas}>
                                                    {kelas}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td>

                                        {/* UBAH STATUS SISWA */}
                                        <select
                                            value={siswa.status}
                                            onChange={(e) => {bookServiceLocal.updateSiswa(siswa.id_siswa,{status: e.target.value,});
                                                bookServiceLocal.addAdminLog("Admin","Data Siswa","Edit",
                                                    `Mengubah status ${siswa.nama_siswa} dari ${siswa.status} menjadi ${e.target.value}`
                                                );
                                                loadData();
                                                toast.success("Status siswa berhasil diperbarui.");
                                            }}
                                            className={`px-3 py-2 rounded-lg border cursor-pointer
                                                ${siswa.status === "aktif"
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
                                    <td>
                                        
                                        {/* DETAIL BUTTON */}
                                        <div className="flex justify-center">
                                            <button onClick={() => {setSelectedSiswa(siswa);
                                                    setShowDetail(true);
                                                }}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        
                    </tbody>
                </table>
            </div>
            
            {/* POP UP DETAIL */}
            {showDetail && selectedSiswa && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-[95%] max-w-[600px] shadow-xl">
                        <h2 className="text-2xl font-bold mb-6">
                            Detail Siswa
                        </h2>
                        <div className="space-y-5">
                            <div>
                                <p className="text-gray-500">
                                    NIS
                                </p>
                                <p className="font-semibold">
                                    {selectedSiswa.nis}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Nama
                                </p>
                                <p className="font-semibold">
                                    {selectedSiswa.nama_siswa}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Kelas
                                </p>
                                <p className="font-semibold">
                                    {selectedSiswa.kelas}
                                </p>
                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Email Orang Tua
                                </p>

                                <p className="font-semibold">
                                    {selectedSiswa.email_ortu}
                                </p>

                            </div>

                            <div>
                                <p className="text-gray-500">
                                    No HP Orang Tua
                                </p>
                                <p className="font-semibold">
                                    {selectedSiswa.no_telp_ortu}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <button onClick={() => {setShowDetail(false);setSelectedSiswa(null);}}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                            >
                                Tutup
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
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
    );
}