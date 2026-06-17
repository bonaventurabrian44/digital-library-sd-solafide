"use client";

import { useState } from "react";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function ForgotPasswordPage() {

    // EMAIL YANG DIGUNAKAN UNTUK RESET PASSWORD
    const [email, setEmail] = useState("");

    // STATUS BERHASIL MENGIRIM LINK RESET PASSWORD
    const [success, setSuccess] = useState(false);

    // MENAMPILKAN PESAN BERHASIL SETELAH EMAIL TERKIRIM
    const handleSubmit = () => {
        setSuccess(true);
    };

    return (
        <div className=
            {`${openSans.className}
                min-h-screen
                flex
                items-center
                justify-center
                bg-gradient-to-b from-[#2B87DA] to-[#0DD0B9]
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
                <div className="flex justify-center mb-6">
                    <img
                        src="/logo.png"
                        alt="Logo Solafide"
                        className="w-[80px] md:w-[100px] h-auto"
                    />
                </div>

                <h1
                    className="text-2xl md:text-3xl font-bold text-center mb-2"
                >
                    Lupa Kata Sandi
                </h1>

                <p
                    className="text-center text-sm md:text-base text-gray-500 mb-8"
                >
                    Masukkan email yang terdaftar untuk
                    mendapatkan instruksi reset kata sandi.
                </p>

                {!success ? (
                    <>
                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                w-full
                                bg-white
                                outline-none
                                border
                                border-[#F80000]/20
                                rounded-xl
                                px-4
                                py-3
                                text-base
                                md:text-lg
                                mt-2
                                mb-6
                            "
                        />

                        <button
                            onClick={handleSubmit}
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
                            Kirim
                        </button>
                    </>
                ) : (
                    <div
                        className="bg-green-100 text-green-700 p-4 rounded-lg text-center"
                    >
                        Instruksi reset kata sandi berhasil
                        dikirim ke email Anda.
                    </div>
                )}

                <div className="text-center mt-6">
                    <span className="text-sm md:text-base">
                        Ingat kata sandi?{" "}
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