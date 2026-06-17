"use client";

import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["600"],
});

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
    const pathname = usePathname();

    const menus = [
        {
            name: "Profil Saya",
            href: "/profile/profil-saya",
            icon: "/icons/resume.png"
        },
        {
            name: "Riwayat Peminjaman",
            href: "/profile/riwayat-peminjaman",
            icon: "/icons/lists.png"
        },
    ];

    return (
        <aside
            className={`${inter.className}
                w-full
                lg:w-[250px]

                bg-white

                border-b
                lg:border-b-0
                lg:border-r

                border-gray-200

                flex
                flex-col
                lg:min-h-[calc(100vh-90px)]
            `}
        >
            {/* MENU */}
            <nav className="flex-1 lg:pt-8">
                <ul
                    className="
                        flex
                        overflow-x-auto

                        lg:block
                        lg:space-y-2
                    "
                >

                    {menus.map((menu) => (
                        <li key={menu.href}>

                            <Link
                                href={menu.href}
                                className={`
                                    flex
                                    items-center
                                    gap-3

                                    whitespace-nowrap

                                    px-4
                                    md:px-6
                                    py-3

                                    transition-all

                                    ${
                                        pathname === menu.href
                                            ? `
                                                bg-[#E8F3FF]
                                                text-[#2B87DA]
                                                font-semibold

                                                border-b-4
                                                lg:border-b-0
                                                lg:border-r-4

                                                border-[#2B87DA]
                                            `
                                            : "hover:bg-gray-100"
                                    }
                                `}
                            >
                                <Image
                                    src={menu.icon}
                                    alt={menu.name}
                                    width={20}
                                    height={20}
                                />

                                <span>{menu.name}</span>
                            </Link>

                        </li>
                    ))}

                </ul>
            </nav>

            {/* BUTTON KELUAR */}
            <div className="p-4 hidden lg:block">
                <Link
                    href="/login"
                    className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        font-semibold
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <img
                        src="/icons/logout.png"
                        alt="Edit"
                        className="w-5 h-5 object-contain invert"
                    />
                    Keluar
                </Link>
            </div>

        </aside>
    );
}