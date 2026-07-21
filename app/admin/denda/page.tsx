"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

interface DendaItem {
    id: number;
    id_detail: number;
    nis: string;
    nama_siswa: string;
    judul_buku: string;
    tanggal_pinjam: string;
    tanggal_jatuh_tempo: string;
    tanggal_dikembalikan: string;
    denda: number;
    status: string;
}

export default function DendaPage() {
    const [dendaList, setDendaList] = useState<DendaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [processing, setProcessing] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedDenda, setSelectedDenda] = useState<DendaItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // LOAD DATA - dengan sinkronisasi otomatis
    const loadData = () => {
        setLoading(true);
        try {
            // SINKRONKAN: generate ulang denda dari peminjaman
            const denda = bookServiceLocal.getAllDenda();
            setDendaList(denda);
        } catch (err) {
            console.error("Error loading denda:", err);
            toast.error("Gagal memuat data denda. Silakan refresh halaman.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 🔴 TAMBAHKAN INI - Filter denda berdasarkan search
    const filteredDenda = dendaList.filter(
        (item) =>
            item.nama_siswa.toLowerCase().includes(search.toLowerCase()) ||
            item.judul_buku.toLowerCase().includes(search.toLowerCase())
    );

    // PAGINATION
    const totalPages = Math.ceil(filteredDenda.length / itemsPerPage);

    const paginatedDenda = filteredDenda.slice(
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

    // HANDLE BAYAR DENDA
    const handleBayarDenda = () => {
        if (!selectedDenda) return;

        setProcessing(selectedDenda.id);

        try {
            const updated = bookServiceLocal.updateDendaStatus(
                selectedDenda.id,
                "Lunas"
            );

            if (updated) {
                loadData();

                toast.success("Pembayaran denda berhasil!");

                bookServiceLocal.addAdminLog(
                    "Admin",
                    "Denda",
                    "Bayar",
                    `Pembayaran denda oleh: ${updated.nama_siswa} sebesar Rp${updated.denda.toLocaleString()}`
                );
            } else {
                toast.error("Gagal memperbarui status denda.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Gagal memproses pembayaran.");
        } finally {
            setProcessing(null);
            setShowConfirm(false);
            setSelectedDenda(null);
        }
    };

    // Format Rupiah
    const formatRupiah = (amount: number) => {
        return amount.toLocaleString("id-ID");
    };

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Data Denda
                </h1>

                <input
                    type="text"
                    placeholder="Cari Nama Siswa atau Judul Buku..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full lg:w-[350px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"
                />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : (
                    <table className="min-w-[1200px] w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="pr-6 py-4 text-left">No</th>
                                <th className="pr-6 text-left">NIS</th>
                                <th className="pr-6 text-left">Nama Siswa</th>
                                <th className="pr-6 text-left">Judul Buku</th>
                                <th className="pr-6 text-left">Tanggal Pinjam</th>
                                <th className="pr-6 text-left">Tanggal Jatuh Tempo</th>
                                <th className="pr-6 text-left">Tanggal Dikembalikan</th>
                                <th className="pr-6 text-left">Denda</th>
                                <th className="pr-6 text-center">Action</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDenda.length > 0 ? (
                                paginatedDenda.map((item, index) => {
                                    return (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.nis || "-"}</td>
                                            <td>{item.nama_siswa || "-"}</td>
                                            <td>{item.judul_buku || "-"}</td>
                                            <td>{item.tanggal_pinjam || "-"}</td>
                                            <td>{item.tanggal_jatuh_tempo || "-"}</td>
                                            <td>{item.tanggal_dikembalikan || "-"}</td>
                                            <td>Rp{formatRupiah(item.denda || 0)}</td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedDenda(item);
                                                            setShowConfirm(true);
                                                        }}
                                                        disabled={
                                                            item.status === "Lunas" ||
                                                            processing === item.id ||
                                                            !item.id
                                                        }
                                                        className={
                                                            item.status === "Lunas"
                                                                ? "bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                                                                : processing === item.id
                                                                ? "bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-wait"
                                                                : "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                                        }
                                                    >
                                                        {processing === item.id
                                                            ? "Memproses..."
                                                            : item.status === "Lunas"
                                                            ? "Lunas"
                                                            : "Bayar"}
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <span
                                                        className={
                                                            item.status === "Lunas"
                                                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                                : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                                        }
                                                    >
                                                        {item.status || "Belum Lunas"}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={10} className="py-12 text-center text-gray-500">
                                        {search ? "Data denda tidak ditemukan" : "Belum ada data denda"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            
            {/*POP UP BAYAR DENDA */}
            {showConfirm && selectedDenda && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            Konfirmasi Pembayaran
                        </h2>

                        <p className="text-gray-600">
                            Apakah Anda yakin ingin menandai denda milik
                            <span className="font-semibold">
                                {" "}
                                {selectedDenda.nama_siswa}
                            </span>
                            {" "}sebesar{" "}
                            <span className="font-semibold">
                                Rp{formatRupiah(selectedDenda.denda)}
                            </span>
                            {" "}sebagai lunas?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setSelectedDenda(null);
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleBayarDenda}
                                disabled={processing !== null}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                            >
                                Ya, Bayar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PAGINATION
            {!loading && totalPages > 1 && (
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
            )} */}
        </div>
    );
}