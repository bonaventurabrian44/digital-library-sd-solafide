"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { LogAktivitas } from "@/data/logsuperadmin";
import { bookServiceLocal } from "@/services/bookServiceLocal";

const inter = Inter({
    subsets: ["latin"],
});

const ITEMS_PER_PAGE = 10;

export default function RiwayatAktivitasPage() {
    const [logs, setLogs] = useState<LogAktivitas[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLogs(bookServiceLocal.getAllSuperadminLogs());
    }, []);

    const filteredLogs = logs
    .filter((log) =>
        log.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.modul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.aksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.aktivitas.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(
        (a, b) =>
            new Date(b.tanggal).getTime() -
            new Date(a.tanggal).getTime()
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

    const currentLogs = filteredLogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div
            className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}
        >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Riwayat Aktivitas
                </h1>
            </div>

            {/* SEARCH */}
            <div className="flex justify-end mb-6">
                <input
                    type="text"
                    placeholder="Cari Aktivitas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-[350px] border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#2B87DA]"
                />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="pr-6 text-left py-3">No</th>
                            <th className="pr-6 text-left py-3">Tanggal</th>
                            <th className="pr-6 text-left py-3">Pengguna</th>
                            <th className="pr-6 text-left py-3">Modul</th>
                            <th className="pr-6 text-left py-3">Aksi</th>
                            <th className="text-left py-3">Aktivitas</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentLogs.length > 0 ? (
                            currentLogs.map((log, index) => (
                                <tr
                                    key={log.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3 pr-6">
                                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                    </td>
                                    <td className="py-3 pr-6">
                                        {log.tanggal}
                                    </td>
                                    <td className="py-3 pr-6">{log.nama}</td>
                                    <td className="py-3 pr-6">{log.modul}</td>
                                    <td className="py-3 pr-6">{log.aksi}</td>
                                    <td className="py-3">
                                        {log.aktivitas}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-8 text-gray-500"
                                >
                                    Belum ada riwayat aktivitas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 0 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            currentPage === 1
                                ? "bg-gray-200 cursor-not-allowed"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                                currentPage === page
                                    ? "bg-[#2B87DA] text-white border-[#2B87DA]"
                                    : "bg-white hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border ${
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