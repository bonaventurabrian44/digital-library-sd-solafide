import { UserCircle2 } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full h-[70px] bg-[#2B87DA] flex items-center justify-between px-10 shadow-md">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">

            {/* Logo */}
            <img
            src="/logo.png"
            alt="Logo"
            className="w-[150px] h-[80] object-contain"
            />

            {/* Separator */}
            <span className="text-[33px] text-black font-light">
            |
            </span>

            {/* Text */}
            <h1 className="text-[20px] font-light tracking-wide text-black">
            DIGITAL LIBRARY
            </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-20">

            {/* Beranda */}
            <button className="text-[20px] text-black hover:text-[#2B87DA] transition-all duration-300">
            Beranda
            </button>

            {/* E-Book */}
            <button className="text-[20px] text-black hover:text-[#2B87DA] transition-all duration-300">
            E-Book
            </button>

            {/* Profile Icon */}
            <button className="hover:text-[#2B87DA] transition-all duration-300">
            <UserCircle2 size={42} />
            </button>

        </div>
        </nav>
    );
}