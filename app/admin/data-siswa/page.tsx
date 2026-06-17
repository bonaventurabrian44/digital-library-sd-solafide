"use client";

import { useState } from "react";
import siswaList from "../../../data/siswa.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function DataSiswaPage() {

    // KEYWORD PENCARIAN SISWA
    const [search, setSearch] =
    useState("");

    // DATA SISWA YANG DITAMPILKAN PADA TABEL
    const [students, setStudents] =
    useState(siswaList);

    // IMPLEMENTASI PENCARIAN BERDASARKAN NAMA
    const filteredSiswa =
    students.filter((siswa) =>
        siswa.nama_siswa
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );

    type Siswa = typeof siswaList[number];

    // MENYIMPAN DATA SISWA YANG DIPILIH UNTUK DITAMPILKAN PADA POPUP DETAIL
    const [selectedSiswa, setSelectedSiswa] =
    useState<Siswa | null>(null);

    // MENAMPILKAN POP DETAIL SISWA
    const [showDetail, setShowDetail] =
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
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

                <h1
                    className="text-2xl md:text-3xl font-bold text-center lg:text-left"
                >
                    Data Siswa
                </h1>
                
                {/* SEARCHBAR */}
                <input
                    type="text"
                    placeholder="Cari Nama Siswa..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
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

                        {filteredSiswa.map(
                            (siswa, index) => (

                                <tr
                                    key={siswa.id_siswa}
                                    className="border-b"
                                >

                                    <td className="py-5">
                                        {index + 1}
                                    </td>

                                    <td className="pr-6">
                                        {siswa.nis}
                                    </td>

                                    <td className="pr-6">
                                        {siswa.nama_siswa}
                                    </td>

                                    <td>
                                        {siswa.kelas}
                                    </td>

                                    <td>

                                        {/* UBAH STATUS SISWA */}
                                        <select
                                            value={siswa.status}
                                            onChange={(e) => {

                                                setStudents(
                                                    students.map((item) =>
                                                        item.id_siswa === siswa.id_siswa
                                                            ? {
                                                                ...item,
                                                                status: e.target.value,
                                                            }
                                                            : item
                                                    )
                                                );

                                            }}
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

                                    <td>
                                        
                                        {/* DETAIL BUTTON */}
                                        <div className="flex justify-center">
                                            
                                            <button
                                            onClick={() => {
                                                    setSelectedSiswa(siswa);
                                                    setShowDetail(true);
                                                }}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                Detail
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>
            
            {/* POP UP DETAIL */}
            {showDetail && selectedSiswa && (

                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                >

                    <div
                        className="bg-white rounded-2xl p-6 md:p-8 w-[95%] max-w-[600px] shadow-xl"
                    >

                        <h2
                            className="text-2xl font-bold mb-6"
                        >
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
                                    {
                                        selectedSiswa.nama_siswa
                                    }
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Kelas
                                </p>

                                <p className="font-semibold">
                                    {
                                        selectedSiswa.kelas
                                    }
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Email Orang Tua
                                </p>

                                <p className="font-semibold">
                                    {
                                        selectedSiswa.email_ortu
                                    }
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    No HP Orang Tua
                                </p>

                                <p className="font-semibold">
                                    {
                                        selectedSiswa.no_telp_ortu
                                    }
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-end mt-8">

                            <button
                                onClick={() => {

                                    setShowDetail(
                                        false
                                    );

                                    setSelectedSiswa(
                                        null
                                    );

                                }}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                            >
                                Tutup
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}