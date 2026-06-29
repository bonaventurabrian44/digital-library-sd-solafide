"use client";

import { useState } from "react";
import { Open_Sans } from "next/font/google";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function LoginForm() {

    // TUTUP / BUKA SANDI
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className={`
                ${openSans.className}
                w-full
                max-w-[1050px]
                bg-white/50
                backdrop-blur-md
                rounded-[24px]
                xl:rounded-[40px]
                shadow-xl
                flex
                flex-col
                xl:flex-row
                items-center
                justify-center
                gap-10
                xl:gap-20
                px-6
                md:px-10
                xl:px-16
                py-8
                xl:py-10
                mx-4
            `}
        >

            {/* LEFT SIDE */}
            <div className="w-full xl:w-[380px] flex flex-col items-center shrink-0">

                {/* Logo */}
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[180px] md:w-[240px] xl:w-[310px] h-auto object-contain"
                />
                
                {/* Digital Library */}
                <h2 className="
                    mt-[-10px]
                    text-xl
                    md:text-2xl
                    xl:text-[33px]
                    font-light
                    tracking-wide
                    text-black
                    text-center
                ">
                    DIGITAL LIBRARY
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 w-full max-w-[500px]">
                {/* Username */}
                <div className="mb-8">
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Nama User
                    </label>

                <input
                    type="text"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-xl outline-none border border-[#F80000]/20"
                />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-base xl:text-[20px] mb-3 text-black">
                        Kata Sandi
                    </label>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-[50px] xl:h-[46px] rounded-xl bg-white px-4 pr-14 text-xl xl:text-xl outline-none border border-[#F80000]/20"
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

                {/* Forgot Password */}
                <div className="text-right mt-2">
                    <a
                        href="/lupa-password"
                        className="
                            text-[#2B87DA]
                            hover:underline
                            text-sm
                            md:text-base
                            xl:text-[20px]
                        "
                    >
                        Lupa Kata Sandi?
                    </a>
                </div>

                {/* Buttons */}
                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        w-full
                        gap-4
                        xl:gap-8
                        mt-8
                        xl:mt-10
                    "
                >
                    <Link
                        href="/user"
                        className="
                            w-full
                            sm:flex-1
                            h-[50px]
                            lg:h-[60px]
                            rounded-xl
                            bg-[#2B87DA]
                            text-white
                            text-base
                            xl:text-[20px]
                            font-medium
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
                        Masuk
                    </Link>

                    <Link
                        href="/register"
                        className="
                            w-full
                            sm:flex-1
                            h-[50px]
                            lg:h-[60px]
                            rounded-xl
                            bg-[#2B87DA]
                            text-white
                            text-base
                            xl:text-[20px]
                            font-medium
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
                        Daftar
                    </Link>
                </div>
            </div>
        </div>
    );
}