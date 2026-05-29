"use client";

import { useState } from "react";
import { Open_Sans } from "next/font/google";
import { Eye, EyeOff } from "lucide-react";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="${openSans.className} w-full max-w-[1221px] h-[468px] bg-white/50 backdrop-blur-md rounded-[40px] shadow-xl flex items-center justify-center gap-20 px-16">

            {/* LEFT SIDE */}
            <div className="w-1/2 flex flex-col items-center self-start mt-[70px]">

                {/* Logo */}
                <div className="flex items-center">
                    <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[310px] h-[128px] object-contain"
                    />
                </div>

                {/* Digital Library */}
                <h2 className="mt-[-10px] text-[33px] font-light tracking-wide text-black">
                    DIGITAL LIBRARY
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2">
                {/* Username */}
                <div className="mb-8">
                    <label className="block text-[20px] mb-3 text-black">
                        Nama User
                    </label>

                <input
                    type="text"
                    className="w-full h-[46px] rounded-xl bg-white px-4 text-xl outline-none border border-[#F80000]/20"
                />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-[20px] mb-3 text-black">
                        Kata Sandi
                    </label>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        suppressHydrationWarning
                        className="w-full h-[50px] lg:h-[46px] rounded-xl bg-white px-4 pr-14 text-lg lg:text-xl outline-none border border-[#F80000]/20"
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
                <div className="text-right mt-4">
                    <button className="text-[20px] text-black hover:underline">
                        Lupa kata sandi?
                    </button>
                </div>

                {/* Buttons */}
                <div className="flex gap-8 mt-10">
                    <button className="w-full h-[60px] rounded-xl bg-[#2B87DA] text-white text-[20px] font-medium transition-all duration-300 hover:bg-white hover:text-[#2B87DA] hover:border hover:border-[#2B87DA]">
                        Masuk
                    </button>

                    <button className="w-full h-[60px] rounded-xl bg-[#2B87DA] text-white text-[20px] font-medium transition-all duration-300 hover:bg-white hover:text-[#2B87DA] hover:border hover:border-[#2B87DA]">
                        Daftar
                    </button>
                </div>
            </div>
        </div>
    );
}