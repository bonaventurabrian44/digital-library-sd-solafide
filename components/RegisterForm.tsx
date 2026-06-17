"use client";

import { useState } from "react";
import { Open_Sans } from "next/font/google";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function LoginForm() {

    // TUTUP / BUKA KATA SANDI
    const [showPassword, setShowPassword] = useState(false);

    // TUTP / BUKA ULANGI KATA SANDI
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div
            className={`
                ${openSans.className}
                w-full
                max-w-[1050px]
                bg-white/50
                backdrop-blur-md
                rounded-[24px]
                xl:rounded-[40px]
                shadow-xl
                flex
                flex-col
                xl:flex-row
                items-center
                justify-center
                gap-10
                xl:gap-20
                px-6
                md:px-10
                xl:px-16
                py-8
                mx-4
            `}
        >

            {/* LEFT SIDE */}
            <div className="w-full xl:w-[380px] flex flex-col items-center shrink-0">

                {/* Logo */}
                    <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[180px] md:w-[240px] xl:w-[310px] h-auto object-contain"
                />

                {/* Digital Library */}
                <h2
                    className="
                        mt-[-10px]
                        text-xl
                        md:text-2xl
                        xl:text-[33px]
                        font-light
                        tracking-wide
                        text-black
                        text-center
                    "
                >
                    DIGITAL LIBRARY
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 w-full max-w-[500px]">

                {/* Nama Siswa */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Nama Siswa
                    </label>

                    <input
                    type="text"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                    />
                </div>

                {/* Kelas */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Kelas
                    </label>

                    {/* AMBIL DATA KELAS DARI DATABASE */}
                    <div className="relative">
                        <select
                            className="w-full h-[46px] rounded-xl bg-white px-4 appearance-none text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        >
                            <option value="">Pilih Kelas</option>
                            <option value="1">Kelas 1</option>
                            <option value="2">Kelas 2</option>
                            <option value="3">Kelas 3</option>
                            <option value="4">Kelas 4</option>
                            <option value="5">Kelas 5</option>
                            <option value="6">Kelas 6</option>
                        </select>

                        {/* Custom Arrow */}
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                        </div>
                    </div>
                </div>

                {/* NIS */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        NIS
                    </label>

                    <input
                    type="text"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                    />
                </div>

                {/* Email Orang Tua */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Email Orang Tua
                    </label>

                    <input
                    type="email"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                    />
                </div>

                {/* Nomor Telepon Orang Tua */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Nomor Telepon Orang Tua
                    </label>

                    <input
                    type="text"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                    />
                </div>

                {/* Kata Sandi */}
                <div className="mb-5">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Kata Sandi
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full h-[46px] rounded-xl bg-white px-4 pr-14 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? (
                            <Eye size={28} />
                            ) : (
                            <EyeOff size={28} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Ulangi Kata Sandi */}
                <div>
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Ulangi Kata Sandi
                    </label>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full h-[46px] rounded-xl bg-white px-4 pr-14 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? (
                                <Eye size={28} />
                            ) : (
                                <EyeOff size={28} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Tombol Daftar */}
                <div className="mt-4">
                    {/* Redirect ke halaman verifikasi email */}
                    <Link
                        href="/verifikasi-email"
                        className="
                            w-full
                            h-[50px]
                            lg:h-[60px]
                            rounded-xl
                            bg-[#2B87DA]
                            text-white
                            text-base
                            xl:text-[20px]
                            font-medium
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-300
                            hover:bg-white
                            hover:text-[#2B87DA]
                            hover:border
                            hover:border-[#2B87DA]
                        "
                    >
                        Daftar
                    </Link>
                </div>

                {/* Sudah punya akun */}
                <div className="text-center mt-4">
                    <span
                        className="text-sm md:text-base xl:text-[20px] text-black">
                        Sudah punya akun?{" "}
                    </span>

                    <Link
                        href="/login"
                        className="text-sm md:text-base xl:text-[20px] text-[#2B87DA] hover:underline font-medium"
                    >
                        Masuk
                    </Link>
                </div>
            </div>
        </div>
    );
}