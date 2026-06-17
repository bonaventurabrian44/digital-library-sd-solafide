"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});


export default function AdminNavbar() {

    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav
            className={`${inter.className}
                min-h-[60px]
                bg-gradient-to-r
                from-[#2B87DA]
                to-[#33D0B2]
                flex
                items-center
                justify-between
                px-4
                md:px-10
            `}
        >
            <div className="flex items-center gap-3">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[80px] md:w-[120px] object-contain"
                />

            </div>

            <div className="relative">

                <button
                    onClick={() =>
                        setProfileOpen(!profileOpen)
                    }
                    className="
                        bg-[#5AA9E6]
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        font-semibold
                        flex
                        items-center
                        gap-1.5
                        hover:bg-[#4A9AD8]
                        transition-all
                        cursor-pointer
                    "
                >
                    Dashboard

                    {profileOpen ? (
                        <ChevronUp size={14} />
                    ) : (
                        <ChevronDown size={14} />
                    )}
                </button>

                {profileOpen && (
                    <div
                        className="
                            absolute
                            right-0
                            mt-2
                            w-48
                            bg-white
                            rounded-lg
                            shadow-lg
                            overflow-hidden
                            z-50
                        "
                    >
                        <Link
                            href="/"
                            className="
                                block
                                px-4
                                py-3
                                hover:bg-gray-100
                            "
                        >
                            Perpustakaan
                        </Link>

                        <Link
                            href="/login"
                            className="
                                block
                                px-4
                                py-3
                                text-red-600
                                hover:bg-red-50
                            "
                        >
                            Keluar
                        </Link>
                    </div>
                )}

            </div>

        </nav>
    );
}