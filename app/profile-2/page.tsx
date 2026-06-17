"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const [activeMenu, setActiveMenu] = useState("profil");
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const menu = searchParams.get("menu");

        if (menu === "riwayat") {
            setActiveMenu("riwayat");
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#F3F3F3]">
            <Navbar />

            <div className={`${inter.className} flex`}>

                {/* SIDEBAR */}
                <aside className="w-[260px] bg-white border-r border-gray-200 min-h-[calc(100vh-70px)] flex flex-col">

                    <div className="p-6">

                        <button
                            onClick={() => setActiveMenu("profil")}
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                gap-3
                                px-2
                                py-3
                                rounded-md
                                font-semibold
                                transition-all
                                mb-3
                                cursor-pointer
                                ${
                                    activeMenu === "profil"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/resume.png"
                                alt="Profil"
                                className="w-5 h-5 object-contain"
                            />
                            <span>Profil Saya</span>
                        </button>

                        <button
                            onClick={() => setActiveMenu("riwayat")}
                            className={`
                                w-full
                                flex
                                items-center
                                text-left
                                gap-3
                                px-2
                                py-3
                                rounded-md
                                font-semibold
                                transition-all
                                cursor-pointer
                                ${
                                    activeMenu === "riwayat"
                                        ? "bg-[#DCEEFF] text-[#2B87DA]"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            <img
                                src="/icons/lists.png"
                                alt="Profil"
                                className="w-5 h-5 object-contain"
                            />
                            <span>Riwayat Peminjaman</span>
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

                {/* CONTENT */}
                <main className="flex-1 p-8">

                    {/* PROFIL */}
                    {activeMenu === "profil" && (
                        <div className="bg-white rounded-xl shadow-sm p-8 flex gap-10">

                            <div className="flex flex-col items-center gap-4">

                                {/* FOTO */}
                                <img
                                    src="/bahlil.webp"
                                    alt="Foto Profil"
                                    className="
                                        w-[180px]
                                        h-[180px]
                                        rounded-xl
                                        object-cover
                                        border
                                        border-gray-300
                                    "
                                />

                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="
                                        w-full
                                        bg-[#2B87DA]
                                        text-white
                                        py-2.5
                                        rounded-lg
                                        font-medium
                                        transition-all
                                        hover:bg-[#236fb4]
                                        cursor-pointer

                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >
                                    <img
                                        src="/icons/edit.png"
                                        alt="Edit"
                                        className="w-4 h-4 invert"
                                    />

                                    <span>Edit Profil</span>
                                </button>

                            </div>    

                            {/* DATA */}
                            <div className="flex flex-col gap-5">

                                <div>
                                    <p className="text-gray-500">
                                        Nama Siswa
                                    </p>

                                    <p className="font-semibold text-lg">
                                        Mas Bahlil
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Kelas
                                    </p>

                                    <p className="font-semibold text-lg">
                                        5
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Email Orang Tua
                                    </p>

                                    <p className="font-semibold text-lg">
                                        bahlilganteng@email.com
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Nomor Telepon Orang Tua
                                    </p>

                                    <p className="font-semibold text-lg">
                                        081234567890
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* RIWAYAT PEMINJAMAN */}
                    {activeMenu === "riwayat" && (
                        <div className="bg-white rounded-xl shadow-sm p-8">

                            {/* JUDUL */}
                            <h2 className="text-[32px] font-bold mb-3">
                                RIWAYAT PINJAMAN
                            </h2>

                            {/* INFO SISWA */}
                            <div className="border-b border-gray-300 pb-5">

                                <div className="space-y-2 text-[16px]">

                                    <div className="flex">
                                        <span className="w-[180px] font-semibold">
                                            Nama Siswa
                                        </span>
                                        <span>: Mas Bahlil</span>
                                    </div>

                                    <div className="flex">
                                        <span className="w-[180px] font-semibold">
                                            Kelas
                                        </span>
                                        <span>: 5</span>
                                    </div>

                                    <div className="flex">
                                        <span className="w-[180px] font-semibold">
                                            Buku Dipinjam
                                        </span>
                                        <span>: 2 Buku</span>
                                    </div>

                                    <div className="flex">
                                        <span className="w-[180px] font-semibold">
                                            Total Denda
                                        </span>
                                        <span>: Rp3.000</span>
                                    </div>

                                </div>

                            </div>

                            {/* TABEL */}
                            <div className="overflow-x-auto mt-6">

                                <table className="w-full">

                                    <thead>

                                        <tr className="border-b border-gray-300">

                                            <th className="py-4 text-center w-[60px]">
                                                No
                                            </th>

                                            <th className="py-4 text-left">
                                                Nama Buku
                                            </th>

                                            <th className="py-4 text-center">
                                                Tanggal Pinjam
                                            </th>

                                            <th className="py-4 text-center">
                                                Tanggal Jatuh Tempo
                                            </th>

                                            <th className="py-4 text-center">
                                                Tanggal Kembali
                                            </th>

                                            <th className="py-4 text-center">
                                                Status
                                            </th>

                                            <th className="py-4 text-center">
                                                Denda
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        <tr className="border-b border-gray-100">

                                            <td className="text-center py-4">
                                                1
                                            </td>

                                            <td>
                                                Mudah Bicara Bahasa Inggris
                                            </td>

                                            <td className="text-center">
                                                11 November 2025
                                            </td>

                                            <td className="text-center">
                                                14 November 2025
                                            </td>

                                            <td className="text-center">
                                                13 November 2025
                                            </td>

                                            <td className="text-center">
                                                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                                    Kembali
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                Rp0
                                            </td>

                                        </tr>

                                        <tr className="border-b border-gray-100">

                                            <td className="text-center py-4">
                                                2
                                            </td>

                                            <td>
                                                Binatang Laut
                                            </td>

                                            <td className="text-center">
                                                7 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                10 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                10 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                                    Kembali
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                Rp0
                                            </td>

                                        </tr>

                                        <tr className="border-b border-gray-100">

                                            <td className="text-center py-4">
                                                3
                                            </td>

                                            <td>
                                                Sistem Tata Surya
                                            </td>

                                            <td className="text-center">
                                                9 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                12 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                13 Desember 2025
                                            </td>

                                            <td className="text-center">
                                                <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                                                    Terlambat
                                                </span>
                                            </td>

                                            <td className="text-center font-medium text-red-600">
                                                Rp3.000
                                            </td>

                                        </tr>

                                        <tr className="border-b border-gray-100">

                                            <td className="text-center py-4">
                                                4
                                            </td>

                                            <td>
                                                R.A. Kartini
                                            </td>

                                            <td className="text-center">
                                                14 Januari 2026
                                            </td>

                                            <td className="text-center">
                                                17 Januari 2026
                                            </td>

                                            <td className="text-center">
                                                -
                                            </td>

                                            <td className="text-center">
                                                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                                                    Dipinjam
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                Rp0
                                            </td>

                                        </tr>

                                        <tr>

                                            <td className="text-center py-4">
                                                5
                                            </td>

                                            <td>
                                                Ayahku Pahlawanku
                                            </td>

                                            <td className="text-center">
                                                15 Januari 2026
                                            </td>

                                            <td className="text-center">
                                                18 Januari 2026
                                            </td>

                                            <td className="text-center">
                                                -
                                            </td>

                                            <td className="text-center">
                                                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                                                    Dipinjam
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                Rp0
                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )}

                </main>

            </div>

            {showEditModal && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            w-[500px]
                            rounded-xl
                            p-6
                            shadow-xl
                        "
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            Edit Profil
                        </h2>

                        {/* FOTO */}
                        <div className="mb-5">
                            <label className="block mb-2 font-medium">
                                Foto Profil
                            </label>

                            <label
                                className="
                                    w-full
                                    h-[180px]
                                    border-2
                                    border-dashed
                                    border-gray-300
                                    rounded-xl
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:border-[#2B87DA]
                                    hover:bg-blue-50
                                    transition-all
                                "
                            >
                                <img
                                    src="/icons/upload-image.png"
                                    alt="Upload"
                                    className="w-12 h-12 mb-2 opacity-60"
                                />

                                <span className="text-gray-600">
                                    Klik untuk memilih foto
                                </span>

                                <span className="text-sm text-gray-400">
                                    PNG, JPG, JPEG
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* NAMA */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Nama Siswa
                            </label>

                            <input
                                type="text"
                                defaultValue="Mas Bahlil"
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-lg
                                    px-4
                                    py-2
                                "
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Email Orang Tua
                            </label>

                            <input
                                type="email"
                                defaultValue="bahlilganteng@email.com"
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-lg
                                    px-4
                                    py-2
                                "
                            />
                        </div>

                        {/* TELEPON */}
                        <div className="mb-6">
                            <label className="block mb-2 font-medium">
                                Nomor Telepon Orang Tua
                            </label>

                            <input
                                type="text"
                                defaultValue="081234567890"
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-lg
                                    px-4
                                    py-2
                                "
                            />
                        </div>

                        {/* BUTTON */}
                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowEditModal(false)}
                                className="
                                    px-5
                                    py-2
                                    border
                                    rounded-lg
                                    hover:bg-gray-100
                                    cursor-pointer
                                "
                            >
                                Batal
                            </button>

                            <button
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
                                Simpan
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}