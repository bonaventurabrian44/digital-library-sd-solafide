"use client";

import { Inter } from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
});


export default function RiwayatPeminjamanPage() {
    const totalBukuDipinjam = 0;
    const totalDenda = 0;

    const riwayat: any[] = [];

    return (
        <div
            className={`
                ${inter.className}
                bg-white
                rounded-xl
                p-4
                md:p-8
                shadow-sm
            `}
        >
            {/* HEADER */}
            <h1
                className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    mb-6
                    text-center
                    lg:text-left
                "
            >
                Riwayat Peminjaman
            </h1>

            {/* SUMMARY */}
            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    md:gap-6
                    mb-8
                    md:mb-10
                "
            >
                <div
                    className="
                        bg-blue-50
                        border
                        border-blue-200
                        rounded-xl
                        px-8
                        py-5
                        w-full
                        sm:min-w-[220px]
                    "
                >
                    <p className="text-gray-500">
                        Buku Dipinjam
                    </p>

                    <p
                        className="
                            text-3xl
                            font-bold
                            text-[#2B87DA]
                        "
                    >
                        {totalBukuDipinjam}
                    </p>
                </div>

                <div
                    className="
                        bg-red-50
                        border
                        border-red-200
                        rounded-xl
                        px-8
                        py-5
                        w-full
                        sm:min-w-[220px]
                    "
                >
                    <p className="text-gray-500">
                        Total Denda
                    </p>

                    <p
                        className="
                            text-3xl
                            font-bold
                            text-red-500
                        "
                    >
                        Rp
                        {totalDenda.toLocaleString(
                            "id-ID"
                        )}
                    </p>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-4 px-3">
                                No
                            </th>

                            <th className="text-left py-4 px-3">
                                Judul Buku
                            </th>

                            <th className="text-left py-4 px-3">
                                Tanggal Pinjam
                            </th>

                            <th className="text-left py-4 px-3">
                                Tanggal Jatuh Tempo
                            </th>

                            <th className="text-left py-4 px-3">
                                Tanggal Kembali
                            </th>

                            <th className="text-left py-4 px-3">
                                Status
                            </th>

                            <th className="text-left py-4 px-3">
                                Denda
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {riwayat.length >
                        0 ? (
                            riwayat.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            index
                                        }
                                        className="border-b"
                                    >
                                        <td className="py-4 px-3">
                                            {index +
                                                1}
                                        </td>

                                        <td className="py-4 px-3">
                                            {
                                                item.judul
                                            }
                                        </td>

                                        <td className="py-4 px-3">
                                            {
                                                item.tanggal_pinjam
                                            }
                                        </td>

                                        <td className="py-4 px-3">
                                            {
                                                item.tanggal_jatuh_tempo
                                            }
                                        </td>

                                        <td className="py-4 px-3">
                                            {
                                                item.tanggal_kembali
                                            }
                                        </td>

                                        <td className="py-4 px-3">
                                            {
                                                item.status
                                            }
                                        </td>

                                        <td className="py-4 px-3">
                                            Rp
                                            {item.denda}
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan={
                                        7
                                    }
                                    className="
                                        text-center
                                        py-10
                                        px-4
                                        text-gray-500
                                    "
                                >
                                    Belum ada
                                    riwayat
                                    peminjaman
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}