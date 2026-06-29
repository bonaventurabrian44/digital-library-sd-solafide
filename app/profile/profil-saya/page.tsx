"use client";

import { useState } from "react";
import { Inter } from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
});

export default function ProfilSayaPage() {
    const [showEditModal, setShowEditModal] =
    useState(false)
    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-8shadow-sm`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                Profil Saya
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                {/* FOTO */}
                <div className="flex flex-col items-center w-[180px] shrink-0">
                    <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] bg-gray-200 border border-gray-300
                            rounded-lg flex items-center justify-center text-gray-500 font-medium">
                        Belum Ada Foto
                    </div>

                    <button onClick={() => setShowEditModal(true)}
                        className="mt-6 w-full bg-[#2B87DA] text-white px-5 py-2 rounded-lg hover:bg-[#236fb4]
                            cursor-pointer flex items-center justify-center gap-2"
                    >
                        <img
                            src="/icons/edit.png"
                            alt="Edit"
                            className="w-4 h-4 invert"
                        />
                        Edit Profil
                    </button>
                </div>

                {/* DATA DIRI */}
                <div className="flex-1 w-full text-center lg:text-left">

                    <div className="mb-6">
                        <p className="text-gray-500">
                            Nama Siswa
                        </p>

                        <p className="text-base md:text-lg font-semibold">
                            Budi Santoso
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-500">
                            Kelas
                        </p>

                        <p className="text-lg font-semibold">
                            5
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-500">
                            Email Orang Tua
                        </p>

                        <p className="text-lg font-semibold">
                            budi.ortu@gmail.com
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Nomor Telepon Orang Tua
                        </p>

                        <p className="text-lg font-semibold">
                            081234567890
                        </p>
                    </div>

                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-[95%] max-w-[500px] rounded-xl p-4 md:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className=" text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                            Edit Profil
                        </h2>

                        {/* FOTO PROFIL */}
                        <div className="mb-8">

                            <label className="block mb-2 font-medium">
                                Foto Profil
                            </label>

                            <label
                                htmlFor="profileImage"
                                className="w-full h-[140px] md:h-[180px] border-2 border-dashed border-gray-300 rounded-xl
                                    flex flex-col items-center justify-center cursor-pointer hover:border-[#2B87DA]
                                    hover:bg-blue-50 transition"
                            >
                                <span className="text-5xl text-gray-400 mb-2">
                                    +
                                </span>

                                <p className="text-sm md:text-base text-gray-600 font-medium text-center">
                                    Klik untuk Upload Foto
                                </p>

                                <p className="text-xs md:text-sm text-gray-400 mt-1 text-center">
                                    PNG, JPG, JPEG
                                </p>
                            </label>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />

                        </div>

                        {/* NAMA */}
                        <div className="mb-4">
                            <label className="font-medium">
                                Nama Siswa
                            </label>

                            <input
                                type="text"
                                defaultValue="Budi Santoso"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2
                                    outline-none focus:border-[#2B87DA]"
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-5">
                            <label className="font-medium">
                                Email Orang Tua
                            </label>

                            <input
                                type="email"
                                defaultValue="budi.ortu@gmail.com"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#2B87DA]"
                            />
                        </div>

                        {/* NO HP */}
                        <div className="mb-8">
                            <label className="font-medium">
                                Nomor Telepon Orang Tua
                            </label>

                            <input
                                type="text"
                                defaultValue="081234567890"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2
                                    outline-none focus:border-[#2B87DA]"
                            />
                        </div>

                        {/* BUTTON */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                            <button className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-600">
                                Simpan
                            </button>

                            <button onClick={() => setShowEditModal(false)}
                                className="w-full sm:w-autobg-red-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-red-600">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}