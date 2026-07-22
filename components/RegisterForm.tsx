"use client";

import { useState } from "react";
import { Open_Sans } from "next/font/google";
import { Eye, EyeOff, CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function RegisterForm() {

    // TUTUP / BUKA KATA SANDI
    const [showPassword, setShowPassword] = useState(false);

    // TUTUP / BUKA ULANGI KATA SANDI
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // MENYIMPAN INPUT NAMA SISWA
    const [nama, setNama] = useState("");

    // MEMYIMPAN INPUT KELAS
    const [kelas, setKelas] = useState("");

    // MENYIMPAN INPUT NIS
    const [nis, setNis] = useState("");

    // MENYIMPAN INPUT EMAIL ORANG TUA
    const [email, setEmail] = useState("");

    // MENYIMPAN INPUT NOMOR TELEPON ORANG TUA
    const [telepon, setTelepon] = useState("");

    // MENYIMPAN INPUT KATA SANDI
    const [password, setPassword] = useState("");

    // MENYIMPAN INPUT ULANGI KATA SANDI
    const [confirmPassword, setConfirmPassword] = useState("");

    // VALIDASI FORMAT EMAIL
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // VALIDASI PANJANG KATA SANDI
    const passwordValidLength = password.length >= 8;

    // VALIDASI HURUF PADA KATA SANDI
    const passwordHasLetter = /[A-Za-z]/.test(password);

    // VALIDASI ANGKA PADA KATA SANDI
    const passwordHasNumber = /\d/.test(password);

    // VALIDASI KESELURUHAN KATA SANDI
    const passwordValid = passwordValidLength && passwordHasLetter && passwordHasNumber;

    // VALIDASI KECOCOKAN KATA SANDI
    const passwordMatch = password === confirmPassword;

    // VALIDASI KESELURUHAN DATA REGISTRASI
    const canRegister =
        nama.trim() !== "" &&
        kelas !== "" &&
        nis.trim() !== "" &&
        emailValid &&
        telepon.trim() !== "" &&
        passwordValid &&
        passwordMatch;

    // MENANGANI PROSES REGISTRASI
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!canRegister) return;

        // nanti proses simpan ke database

        window.location.href = "/verifikasi-email";
    };

    return (
        <form onSubmit={handleSubmit} className={`${openSans.className} w-full max-w-[1100px] bg-white/50 backdrop-blur-md rounded-[24px] xl:rounded-[40px]
                shadow-xl flex flex-col px-6 md:px-10 xl:px-16 py-8 mx-4`}
        >
            {/* TOP SIDE */}
            <div className="flex flex-col items-center mb-10">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={320}
                    height={320}
                    className="w-[220px] md:w-[260px] lg:w-[320px] h-auto"
                />

                <h2 className="mt-[-8px] text-3xl font-light tracking-wide">
                    DIGITAL LIBRARY
                </h2>
            </div>
            
            {/* BOTTOM SIDE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* LEFT SIDE */}
                <div className="space-y-5"> 

                    {/* Nama Siswa */}
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            Nama Siswa
                        </label>

                        <input
                        required
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />
                    </div>

                    {/* Kelas */}
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            Kelas
                        </label>

                        {/* AMBIL DATA KELAS DARI DATABASE */}
                        <div className="relative">
                            <select
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            required
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
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            NIS
                        </label>

                        <input
                        required
                        type="text"
                        value={nis}
                        onChange={(e) => setNis(e.target.value)}
                        className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />
                    </div>

                    {/* Email Orang Tua */}
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            Email Orang Tua
                        </label>

                        <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />
                        
                        {email !== "" && (
                            <div className="flex items-center gap-2 mt-2">
                                {
                                    emailValid
                                        ? <CircleCheck className="text-green-600" size={20} />
                                        : <CircleX className="text-red-600" size={20} />
                                }

                                <span
                                    className={`text-sm ${
                                        emailValid
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {
                                        emailValid
                                            ? "Email valid"
                                            : "Format email salah"
                                    }
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Nomor Telepon Orang Tua */}
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            Nomor Telepon Orang Tua
                        </label>

                        <input
                        required
                        type="text"
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                        className="w-full h-[46px] rounded-xl bg-white px-4 text-base md:text-lg xl:text-xl outline-none border border-[#F80000]/20"
                        />

                    </div>
                </div>

                {/*RIGHT SIDE */}
                <div className="space-y-5">

                    <div
                        className={`rounded-xl p-4 mb-6 transition ${
                            passwordValid
                                ? "bg-green-100 border border-green-400"
                                : "bg-red-100 border border-red-400"
                        }`}
                    >
                        <h3 className="font-semibold text-lg mb-3">
                            Persyaratan Kata Sandi
                        </h3>

                        <div className="flex items-center gap-2">
                            <span>
                                {
                                    passwordValidLength
                                        ? <CircleCheck className="text-green-600" size={20} />
                                        : <CircleX className="text-red-600" size={20} />
                                }
                            </span>

                            <span>
                                Minimal 8 karakter
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <span>
                                {passwordHasLetter && passwordHasNumber
                                    ? <CircleCheck className="text-green-600" size={20} />
                                    : <CircleX className="text-red-600" size={20} />
                                }
                            </span>

                            <span>
                                Berisi huruf dan angka
                            </span>
                        </div>

                    </div>

                    {/* Kata Sandi */}
                    <div>
                        <label className="block text-base xl:text-[20px] mb-3 text-black">
                            Kata Sandi
                        </label>

                        <div className="relative">
                            <input
                            required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            required
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                        {confirmPassword !== "" && (
                            <div className="flex items-center gap-2 mt-2">
                                {passwordMatch ? (
                                    <CircleCheck className="text-green-600" size={20} />
                                ) : (
                                    <CircleX className="text-red-600" size={20} />
                                )}

                                <span
                                    className={`text-sm ${
                                        passwordMatch ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    Password harus sama
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Tombol Daftar */}
                    <div className="mt-4">
                        {/* Redirect ke halaman verifikasi email */}
                        <button
                            type="submit"
                            disabled={!canRegister}
                            className={`w-full h-[50px] lg:h-[60px] rounded-xl text-white text-base xl:text-[20px] font-medium
                                flex items-center justify-center transition-all duration-300 
                                ${canRegister
                                        ? "bg-[#2B87DA] hover:bg-white hover:text-[#2B87DA] hover:border hover:border-[#2B87DA] cursor-pointer"
                                        : "bg-gray-400 cursor-not-allowed"
                                }
                            `}
                        >
                            Daftar
                        </button>
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
        </form>
    );
}