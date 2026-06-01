import { UserCircle2 } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400"],
});

export default function Navbar() {
    return (
        <nav className={`${inter.className} w-full h-[70px] bg-[#2B87DA] flex items-center justify-between px-10 shadow-md`}>

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">

            {/* Logo */}
            <img
            src="/logo.png"
            alt="Logo"
            className="w-[150px] h-[80px] object-contain"
            />

            {/* Separator */}
            <span className="text-[33px] text-black font-light">
            |
            </span>

            {/* Text */}
            <h1 className="text-[20px] tracking-wide text-black">
            DIGITAL LIBRARY
            </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-20">

            {/* Beranda */}
            <button className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 cursor-pointer">
            <Link href="/user">Beranda</Link>
            </button>

            {/* E-Book */}
            <button className="text-[20px] text-black hover:text-[#FFFFFF] transition-all duration-300 cursor-pointer">
            <Link href="/ebook">E-Book</Link>
            </button>

            {/* Profile Icon */}
            <button className="hover:text-[#FFFFFF] transition-all duration-300 cursor-pointer">
            <Link href="/profile"><UserCircle2 size={42} /></Link>
            </button>

        </div>
        </nav>
    );
}