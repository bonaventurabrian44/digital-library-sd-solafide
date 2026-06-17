"use client";

import { useState } from "react";

import books from "@/data/buku.json";
import studentList from "@/data/siswa.json";
import peminjamanList from "@/data/peminjaman.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function LaporanPeminjamanPage() {

    // KEYWORD PENCARIAN LAPORAN PEMINJAMAN 
    const [search, setSearch] = useState("");

    // MENGGABUNGKAN DATA PEMINJAMAN, SISWA, DAN BUKU
    const laporanData =
        peminjamanList.flatMap(
            (pinjam) => {
                const siswa =
                    studentList.find(
                        (s) =>
                            s.id_siswa ===
                            pinjam.id_siswa
                    );

                return pinjam.detail.map(
                    (detail) => {
                        const buku =
                            books.find(
                                (b) =>
                                    b.id_buku ===
                                    detail.id_buku
                            );

                        return {
                            nis:
                                siswa?.nis ??
                                "-",
                            nama:
                                siswa?.nama_siswa ??
                                "-",
                            judul:
                                buku?.judul ??
                                "-",
                            tanggalPinjam:
                                pinjam.tanggal_pinjam,
                            tanggalJatuhTempo:
                                pinjam.tanggal_jatuh_tempo,
                            tanggalKembali:
                                detail.tanggal_kembali ??
                                "-",
                        };
                    }
                );
            }
        );
    
    // FILTER PENCARIAN BERDASARKAN NAMA/ JUDUL
    const filteredLaporan =
        laporanData.filter(
            (item) =>
                item.nama
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.judul
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>

            {/* Header + Search */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

                <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                    Laporan Peminjaman
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

            {/* Tabel */}
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-4 text-left pr-6">
                                No
                            </th>

                            <th className="text-left pr-6">
                                NIS
                            </th>

                            <th className="text-left pr-6">
                                Nama Siswa
                            </th>

                            <th className="text-left pr-6">
                                Judul Buku
                            </th>

                            <th className="text-left pr-6">
                                Tanggal Pinjam
                            </th>

                            <th className="text-left pr-6">
                                Tanggal Jatuh Tempo
                            </th>

                            <th className="text-left pr-6">
                                Tanggal Dikembalikan
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredLaporan.map(
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

                                    <td className="pr-6">
                                        {item.nis}
                                    </td>

                                    <td className="pr-6"> 
                                        {item.nama}
                                    </td>

                                    <td className="pr-6">
                                        {item.judul}
                                    </td>

                                    <td className="pr-6">
                                        {
                                            item.tanggalPinjam
                                        }
                                    </td>

                                    <td className="pr-6">
                                        {
                                            item.tanggalJatuhTempo
                                        }
                                    </td>

                                    <td>
                                        {
                                            item.tanggalKembali
                                        }
                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>
            </div>

        </div>
    );
}