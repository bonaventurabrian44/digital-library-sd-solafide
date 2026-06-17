"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import dendaList from "../../../data/denda.json";

const inter = Inter({
    subsets: ["latin"],
});

export default function DendaPage() {

    // KEYWORD PENCARIAN DATA DENDA
    const [search, setSearch] = useState("");

    // PENCARIAN DATA DENDA BERDASARKAN NAMA SISWA/ JUDUL BUKU
    const filteredDenda = dendaList.filter(
        (item) =>
            item.nama_siswa
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.judul_buku
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (

        <div
            className={`
                ${inter.className}
                bg-white
                rounded-xl
                p-4
                md:p-6
                lg:p-8
                shadow-sm
            `}
        >

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Data Denda
                </h1>

                {/* SEARCHBAR */}
                <input
                    type="text"
                    placeholder="Cari Nama Siswa atau Judul Buku..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        lg:w-[350px]
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

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">

                <table className="min-w-[1200px] w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="pr-6 py-4 text-left">
                                No
                            </th>

                            <th className="pr-6 text-left">
                                NIS
                            </th>

                            <th className="pr-6 text-left">
                                Nama Siswa
                            </th>

                            <th className="pr-6 text-left">
                                Judul Buku
                            </th>

                            <th className="pr-6 text-left">
                                Tanggal Pinjam
                            </th>

                            <th className="pr-6 text-left">
                                Tanggal Jatuh Tempo
                            </th>

                            <th className="pr-6 text-left">
                                Tanggal Dikembalikan
                            </th>

                            <th className="pr-6 text-left">
                                Denda
                            </th>

                            <th className="pr-6  text-center">
                                Action
                            </th>

                            <th className="text-center">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredDenda.length >
                        0 ? (

                            filteredDenda.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {index + 1}
                                        </td>

                                        <td>
                                            {item.nis}
                                        </td>

                                        <td>
                                            {item.nama_siswa}
                                        </td>

                                        <td>
                                            {item.judul_buku}
                                        </td>

                                        <td>
                                            {item.tanggal_pinjam}
                                        </td>

                                        <td>
                                            {item.tanggal_jatuh_tempo}
                                        </td>

                                        <td>
                                            {item.tanggal_dikembalikan}
                                        </td>

                                        {/* NILAI DENDA */}
                                        <td>
                                            Rp
                                            {item.denda.toLocaleString(
                                                "id-ID"
                                            )}
                                        </td>

                                        <td>
                                            
                                            {/* BAYAR BUTTON */}
                                            <div className="flex justify-center">

                                                <button
                                                    disabled={
                                                        item.status ===
                                                        "Lunas"
                                                    }
                                                    className={
                                                        item.status ===
                                                        "Lunas"
                                                            ? `
                                                            bg-gray-400
                                                            text-white
                                                            px-3
                                                            py-1
                                                            rounded
                                                            text-sm
                                                            cursor-not-allowed
                                                        `
                                                            : `
                                                            bg-red-500
                                                            hover:bg-red-600
                                                            text-white
                                                            px-3
                                                            py-1
                                                            rounded
                                                            text-sm
                                                            cursor-pointer
                                                        `
                                                    }
                                                >
                                                    Bayar
                                                </button>

                                            </div>

                                        </td>

                                        <td>
                                            
                                            {/* STATUS DENDA */}
                                            <div className="flex justify-center">

                                                <span
                                                    className={
                                                        item.status ===
                                                        "Lunas"
                                                            ? `
                                                            bg-green-100
                                                            text-green-700
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-sm
                                                        `
                                                            : `
                                                            bg-red-100
                                                            text-red-700
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-sm
                                                        `
                                                    }
                                                >
                                                    {item.status}
                                                </span>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan={10}
                                    className="py-12 text-center text-gray-500"
                                >
                                    Belum ada data denda
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}