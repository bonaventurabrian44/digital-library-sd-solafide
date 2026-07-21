"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["600"],
});

export default function AdminSidebar() {

    const pathname = usePathname();

    const menus = [
        {
            name: "Data Siswa",
            href: "/admin/data-siswa",
            icon: "/icons/client.png",
        },
        {
            name: "Peminjaman Buku",
            href: "/admin/peminjaman-buku",
            icon: "/icons/wirte.png",
        },
        {
            name: "Denda",
            href: "/admin/denda",
            icon: "/icons/rupiah.png"
        },
        {
            name: "Laporan Peminjaman",
            href: "/admin/laporan-peminjaman",
            icon: "/icons/training.png"
        },
        {
            name: "Log Aktivitas",
            href: "/admin/riwayat-aktivitas",
            icon: "/icons/restore.png"
        },
    ];

    return (

        <aside
            className={`
                ${inter.className}
                w-full
                lg:w-[250px]
                shrink-0
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
                                                box-border
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
                                {menu.name}
                            </Link>

                        </li>

                    ))}

                </ul>

            </nav>

            <div className="p-4 hidden lg:block">

                <button
                    className="
                        w-full
                        bg-red-500
                        text-white
                        py-3
                        rounded-lg
                        hover:bg-red-600
                        cursor-pointer
                    "
                >
                    Keluar
                </button>

            </div>

        </aside>

    );
}