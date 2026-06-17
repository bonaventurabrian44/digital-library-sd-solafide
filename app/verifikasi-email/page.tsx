"use client";

import Link from "next/link";
import { useState } from "react";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function EmailVerificationPage() {

    // STATUS BERHASIL KIRIM ULANG EMAIL
    const [resendSuccess, setResendSuccess] = useState(false);

    // KIRIM ULANG EMAIL KE USER
    // MENAMPILKAN PESAN BERHASIL JIKA EMAIL TERKIRIM
    const handleResend = () => {
        setResendSuccess(true);

        setTimeout(() => {
            setResendSuccess(false);
        }, 3000);
    };

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
                    Verifikasi Email
                </h1>

                {/* DESCRIPTION */}
                <p
                    className="text-center text-sm md:text-base text-gray-600 mb-8"
                >
                    Kami telah mengirimkan tautan verifikasi
                    ke email yang Anda daftarkan.
                    <br />
                    <br />
                    Silakan periksa kotak masuk email Anda
                    dan klik tautan verifikasi untuk
                    mengaktifkan akun.
                </p>

                {/* RESEND SUCCESS */}
                {resendSuccess && (
                    <div
                        className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-6"
                    >
                        Email verifikasi berhasil dikirim ulang.
                    </div>
                )}

                {/* BUTTON RESEND EMAIL*/}
                <button
                    onClick={handleResend}
                    className="
                        w-full
                        h-[50px]
                        md:h-[56px]
                        bg-[#2B87DA]
                        text-white
                        text-base
                        md:text-lg
                        rounded-xl
                        transition-all
                        duration-300
                        hover:bg-white
                        hover:text-[#2B87DA]
                        hover:border
                        hover:border-[#2B87DA]
                        cursor-pointer
                    "
                >
                    Kirim Ulang Email
                </button>

                {/* LOGIN LINK */}
                <div className="text-center mt-6">

                    <span
                        className="text-sm md:text-base"
                    >
                        Sudah melakukan verifikasi?{" "}
                    </span>

                    <Link
                        href="/login"
                        className="text-[#2B87DA] hover:underline font-medium text-sm md:text-base"
                    >
                        Masuk
                    </Link>

                </div>

            </div>

        </div>
    );
}