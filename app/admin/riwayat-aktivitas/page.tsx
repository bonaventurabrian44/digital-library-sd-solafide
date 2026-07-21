// app/admin/log-aktivitas/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

interface LogItem {
    id: number;
    tanggal: string;
    nama: string;
    modul: string;
    aksi: string;
    aktivitas: string;
}

export default function LogAktivitasPage() {
    const [logList, setLogList] = useState<LogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // LOAD DATA
    const loadData = () => {
        setLoading(true);
        try {
            const logs = bookServiceLocal.getAllAdminLogs();
            // Urutkan dari yang terbaru
            logs.sort((a, b) => b.id - a.id);
            setLogList(logs);
        } catch (err) {
            toast.error("Error loading logs:");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter log berdasarkan search
    const filteredLog = logList.filter(
        (item) =>
            item.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.modul.toLowerCase().includes(search.toLowerCase()) ||
            item.aksi.toLowerCase().includes(search.toLowerCase()) ||
            item.aktivitas.toLowerCase().includes(search.toLowerCase())
    );

    // PAGINATION
    const totalPages = Math.ceil(filteredLog.length / itemsPerPage);

    const paginatedLog = filteredLog.slice(
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
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Log Aktivitas
                </h1>

                <input
                    type="text"
                    placeholder="Cari Nama atau Aktivitas..."
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
                    className="w-full lg:w-[350px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"
                />
            </div>

            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-4 text-left font-semibold">No</th>
                                <th className="text-left font-semibold">Tanggal</th>
                                <th className="text-left font-semibold">Pengguna</th>
                                <th className="text-left font-semibold">Modul</th>
                                <th className="text-left font-semibold">Aksi</th>
                                <th className="text-left font-semibold">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLog.length > 0 ? (
                                paginatedLog.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                        <td className="py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{item.tanggal}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.modul}</td>
                                        <td>{item.aksi}</td>
                                        <td>{item.aktivitas}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-500">
                                        {search ? "Data tidak ditemukan" : "Belum ada aktivitas"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            
            {/* PAGINATION */}
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
            )}
        </div>
    );
}