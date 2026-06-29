"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function LogAktivitasPage() {

    // KEYWORD PENCARIAN LOG AKTIVITAS
    const [search, setSearch] = useState("");

    // DATA LOG AKTIVITAS
    const logAktivitas: {
        nama: string;
        tanggal: string;
        aktivitas: string;
    }[] = [];

    // FILTER PENCARIAN
    const filteredLog =
        logAktivitas.filter(
            (item) =>
                item.nama
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.aktivitas
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Log Aktivitas
                </h1>

                {/* SEARCHBAR */}
                <input type="text" placeholder="Cari Nama atau Aktivitas..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full lg:w-[350px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"
                />
            </div>

            <div className="overflow-x-auto rounded-lg">

                {/* TABEL */}
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className=" py-4 text-left font-semibold">
                                No
                            </th>

                            <th className=" text-left font-semibold">
                                Nama
                            </th>

                            <th className=" text-left font-semibold">
                                Tanggal
                            </th>

                            <th className=" text-left font-semibold">
                                Aktivitas
                            </th>
                        </tr>
                    </thead>
                    
                    {/* ISI AKTIVITAS */}
                    <tbody>
                        {filteredLog.length > 0 ? (
                            filteredLog.map(
                                (item,index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="py-4">
                                            {index + 1}
                                        </td>

                                        <td>
                                            {item.nama}
                                        </td>

                                        <td>
                                            {item.tanggal}
                                        </td>

                                        <td>
                                            {item.aktivitas}
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-500">
                                    Belum ada
                                    aktivitas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}