"use client";

import { useState } from "react";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function ChangePasswordPage() {

    // PASSWORD BARU YANG AKAN DISIMPAN
    const [passwordBaru, setPasswordBaru] =
        useState("");
        
    // KONFIRMASI PASSWORD BARU
    const [konfirmasiPassword, setKonfirmasiPassword] =
        useState("");

    // STATUS BERHASIL UBAH PASSWORD
    const [success, setSuccess] =
        useState(false);

    // HANDLE PENGISIAN PASSWORD BARU
    const handleSubmit = () => {
        if (
            passwordBaru === "" ||
            konfirmasiPassword === ""
        ) {
            alert("Semua field harus diisi");
            return;
        }

        if (
            passwordBaru !==
            konfirmasiPassword
        ) {
            alert(
                "Konfirmasi password tidak sesuai"
            );
            return;
        }

        setSuccess(true);
    };

    return (
        <div
            className=
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
                        className="
                            w-[80px]
                            md:w-[100px]
                            h-auto
                        "
                    />
                </div>

                <h1
                    className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-center
                        mb-6
                    "
                >
                    Ubah Kata Sandi
                </h1>

                {!success ? (
                    <>
                        <div className="mb-4">
                            <label className="font-medium">
                                Kata Sandi Baru
                            </label>

                            <input
                                type="password"
                                value={passwordBaru}
                                onChange={(e) =>
                                    setPasswordBaru(
                                        e.target.value
                                    )
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
                                "
                            />
                        </div>

                        <div className="mb-6">
                            <label className="font-medium">
                                Konfirmasi Kata Sandi
                            </label>

                            <input
                                type="password"
                                value={
                                    konfirmasiPassword
                                }
                                onChange={(e) =>
                                    setKonfirmasiPassword(
                                        e.target.value
                                    )
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
                                "
                            />
                        </div>

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
                            Simpan Password
                        </button>
                    </>
                ) : (
                    <div className="text-center">

                        {/* PESAN BERHASIL UBAH PASSWORD */}
                        <div
                            className="
                                bg-green-100
                                text-green-700
                                p-4
                                rounded-lg
                                mb-4
                            "
                        >
                            Kata sandi berhasil
                            diubah.
                        </div>

                        <Link
                            href="/login"
                            className="text-[#2B87DA] hover:underline text-sm md:text-base"
                        >
                            Kembali ke Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}