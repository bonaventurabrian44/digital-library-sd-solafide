"use client";

import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
});

// HALAMAN INI DITAMPILKAN SETELAH USER KLIK TAUTAN VERIFIKASI EMAIL
export default function VerificationSuccessPage() {
    return (
        <div
            className={`
                ${openSans.className}
                min-h-screen
                flex
                items-center
                justify-center
                bg-gradient-to-b
                from-[#2B87DA]
                to-[#0DD0B9]
            `}
        >
            <div
                className="
                    bg-white/50
                    backdrop-blur-md
                    w-full
                    max-w-[450px]
                    rounded-2xl
                    shadow-md
                    p-6
                    md:p-8
                    mx-4
                "
            >

                {/* LOGO */}
                <div className="flex justify-center mb-6">

                    <img
                        src="/logo.png"
                        alt="Logo Solafide"
                        className="
                            w-[80px]
                            md:w-[100px]
                            h-auto
                        "
                    />

                </div>

                {/* TITLE */}
                <h1
                    className="text-2xl md:text-3xl font-bold text-center mb-4"
                >
                    Verifikasi Berhasil
                </h1>

                {/* MESSAGE */}
                <div
                    className="bg-green-100 text-green-700 rounded-xl p-4 text-center mb-6"
                >
                    Email Anda berhasil diverifikasi.
                    <br />
                    Akun Digital Library SD Solafide
                    telah aktif dan siap digunakan.
                </div>

                <p
                    className="text-center text-sm md:text-base text-gray-600 mb-8"
                >
                    Silakan masuk menggunakan akun
                    yang telah didaftarkan.
                </p>

                {/* BUTTON LOGIN */}
                <Link
                    href="/login"
                    className="
                        w-full
                        h-[50px]
                        md:h-[56px]
                        bg-[#2B87DA]
                        text-white
                        text-base
                        md:text-lg
                        rounded-xl
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
                    Login Sekarang
                </Link>

            </div>
        </div>
    );
}