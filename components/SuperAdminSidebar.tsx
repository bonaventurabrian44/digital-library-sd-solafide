"use client";

import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["600"],
});

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminSidebar() {
    const pathname = usePathname();

    const menus = [
        {
            name: "Daftar Buku",
            href: "/superadmin/buku",
            icon: "/icons/book.png"
        },
        {
            name: "Kategori",
            href: "/superadmin/kategori",
            icon: "/icons/categories (1).png"
        },
        {
            name: "Statistik",
            href: "/superadmin/statistik",
            icon: "/icons/bar-chart.png"
        },
        {
            name: "Riwayat Aktivitas",
            href: "/superadmin/riwayat-aktivitas",
            icon: "/icons/restore.png"
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
                        <li key={menu.href}
                            className="flex-shrink-0 lg:w-full"
                        >

                            <Link
                                href={menu.href}
                                className={`
                                    whitespace-nowrap
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    lg:px-6
                                    py-3
                                    lg:w-full
                                    transition-all
                                    ${
                                        pathname === menu.href
                                            ? "bg-[#E8F3FF] text-[#2B87DA] font-semibold border-b-4 lg:border-b-0 lg:border-r-4 border-[#2B87DA]"
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
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        py-3
                        rounded-lg
                        font-semibold
                        transition-all
                        flex
                        items-center
                        justify-center
                        block
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