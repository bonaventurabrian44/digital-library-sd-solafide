import { CircleUserRound } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
});

export default function Navbar() {
    return (
        <nav className={`${inter.className} w-full h-[60px] bg-gradient-to-b
        from-[#2B87DA]
        to-[#33D0B2] flex items-center justify-between px-10 shadow-md`}>

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">

            {/* Logo */}
            <img
            src="/logo.png"
            alt="Logo"
            className="w-[120px] h-[60px] object-contain"
            />

            {/* Separator */}
            <span className="text-[26px] text-black font-light">
            |
            </span>

            {/* Text */}
            <h1 className="text-[20px] tracking-wide text-black font-semibold">
            DIGITAL LIBRARY
            </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-20">

            {/* Beranda */}
            <Link href="/user" className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 font-semibold">
                Beranda
            </Link>

            {/* Beranda */}
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

            {/* Profile Icon */}
            {/* <Link href="/profile" className="hover:text-[#FFFFFF] transition-all duration-300 cursor-pointer">
                <CircleUserRound size={42} />
            </Link> */}
            <Link href="/profile">
                <img 
                src="/icons/account.png" 
                alt="Profil" 
                className="
                w-9
                h-9
                transition-all
                duration-300
                hover:brightness-125
                hover:scale-105
            "/>
            </Link>

        </div>
        </nav>
    );
}