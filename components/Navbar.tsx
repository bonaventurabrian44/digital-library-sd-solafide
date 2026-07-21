"use client";

import { useState } from "react";
import { Menu, X} from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    // JIKA BELUM LOGIN ARAHKAN BERANDA KE "/", JIKA SUDAH KE "/USER"
    const isLoggedIn = true;
    const homeHref = isLoggedIn
        ? "/user"
        : "/";

    // AMBIL DATA PENGGUNA YANG LOGIN
    const userName = "Budi";
    const firstName = userName.split(" ")[0];

    // AMBIL ROLE 
    const role = "user";

    const dashboardHref =
    role === "user"
        ? "/profile"
        : role === "admin"
        ? "/admin"
        : "/superadmin";
    
    return (
        <nav
            className="
                relative w-full min-h-[60px] bg-gradient-to-b
                from-[#2B87DA] to-[#33D0B2] shadow-md px-4 md:px-10
            "
        >
            <div
                className="h-[60px] flex items-center justify-between"
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-2">

                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-[60px] md:w-[120px] h-[60px] object-contain
                        "
                    />

                    {/* Separator */}
                    <span className="hidden xl:block text-[26px] text-black font-light">
                    |
                    </span>

                    {/* Text */}
                    <h1
                        className="hidden xl:block text-[20px] tracking-wide text-black font-semibold"
                    >
                    DIGITAL LIBRARY
                    </h1>
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden xl:flex items-center gap-10 lg:gap-20 ">

                    {/* Beranda */}
                    <Link href={homeHref} className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 font-semibold">
                        Beranda
                    </Link>

                    {/* Koleksi Buku Fisik */}
                    <Link href="/books" className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 font-semibold">
                        Koleksi
                    </Link>

                    {/* E-Book */}
                    <Link href="/ebook" className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 font-semibold">
                        E-Book
                    </Link>

                    {/* Kategori */}
                    <Link href="/kategori" className="text-[20px] text-black hover:text-white transition-all duration-300 font-semibold">
                        Kategori
                    </Link>

                    <div className="relative">

                        {!isLoggedIn ? (

                            <Link
                                href="/login"
                                className="bg-white text-[#2B87DA] px-5 py-2 rounded-lg 
                                font-semibold hover:bg-gray-100 transition-all"
                            >
                                Masuk
                            </Link>

                        ) : (

                            <>
                                <button
                                    onClick={() =>
                                        setProfileOpen(!profileOpen)
                                    }
                                    className="bg-[#5AA9E6] text-white px-5
                                        py-2 rounded-lg font-semibold flex
                                        items-center gap-1.5 hover:bg-[#4A9AD8]
                                        transition-all cursor-pointer"
                                >
                                    {firstName}

                                    <span>
                                        {profileOpen ? (
                                            <ChevronUp size={14} />
                                        ) : (
                                            <ChevronDown size={14} />
                                        )}
                                    </span>
                                </button>

                                {profileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48
                                            bg-white rounded-lg shadow-lg
                                            overflow-hidden z-50"
                                    >
                                        <Link
                                            href={dashboardHref}
                                            className="block px-4 py-3 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/login"
                                            className="block px-4 py-3 text-red-600 hover:bg-red-50"
                                        >
                                            Keluar
                                        </Link>
                                    </div>
                                )}
                            </>

                        )}

                    </div>

                </div>

                <button
                    onClick={() =>
                        setIsOpen(!isOpen)
                    }
                    className="xl:hidden text-black shrink-0 p-1 cursor-pointer"
                >
                    {isOpen ? (
                        <X size={28} />
                    ) : (
                        <Menu size={28} />
                    )}
                </button>
            </div>
            
            {/* HAMBURGER */}
            {isOpen && (
                <div
                    className="xl:hidden absolute top-[60px] left-0 w-full
                        bg-[#33D0B2] shadow-lg z-50"
                >
                    <Link
                        href={homeHref}
                        onClick={() => setIsOpen(false)}
                        className="block px-5 py-3 text-black
                            font-semibold hover:bg-[#2BC5A8]
                            transition-colors"
                    >
                        Beranda
                    </Link>

                    <Link
                        href="/books"
                        onClick={() => setIsOpen(false)}
                        className="block px-5 py-3 text-black
                            font-semibold hover:bg-[#2BC5A8]
                            transition-colors"
                    >
                        Koleksi
                    </Link>

                    <Link
                        href="/ebook"
                        onClick={() => setIsOpen(false)}
                        className="block px-5 py-3 text-black 
                            font-semibold hover:bg-[#2BC5A8]
                            transition-colors"
                    >
                        Ebook
                    </Link>

                    <Link
                        href="/kategori"
                        onClick={() => setIsOpen(false)}
                        className="block px-5 py-3 text-black
                            font-semibold hover:bg-[#2BC5A8]
                            transition-colors"
                    >
                        Kategori
                    </Link>

                    {isLoggedIn ? (
                        <div className="border-t border-white/30 mt-2">

                            <Link
                                href={dashboardHref}
                                onClick={() => setIsOpen(false)}
                                className="block px-5 py-3 text-black
                                    font-semibold hover:bg-[#2BC5A8]
                                    transition-colors"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-5 py-3 text-black
                                    font-semibold hover:bg-[#2BC5A8]
                                    transition-colors"
                            >
                                Keluar
                            </Link>

                        </div>
                    ) : (
                        <div className="border-t border-white/30 mt-2">

                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-5 py-3 text-black
                                    font-semibold hover:bg-[#2BC5A8]
                                    transition-colors"
                            >
                                Masuk
                            </Link>

                        </div>
                    )}
                </div>
            )}

        </nav>
    );
}