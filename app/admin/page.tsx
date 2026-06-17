import { Inter } from "next/font/google";
import siswaList from "../../data/siswa.json";
import peminjamanList from "../../data/peminjaman.json";

const inter = Inter({
    subsets: ["latin"],
});

export default function AdminDashboard() {

    // HITUNG TOTAL SISWA YANG TERDAFTAR
    const totalSiswa =
    siswaList.length;

    // TOTAL BUKU YANG DIPINJAM
    const totalBukuDipinjam =
    peminjamanList.reduce(
        (total, pinjam) =>
            total +
            pinjam.detail.length,
        0
    );

    // TOTAL TRANSAKSI PEMINJAMAN
    const totalBelumDikembalikan =
    peminjamanList.reduce(
        (total, pinjam) =>
            total +
            pinjam.detail.filter(
                (detail) =>
                    detail.status ===
                    "dipinjam"
            ).length,
        0
    );

    // JUMLAH BUKU YANG TERLAMBAT DIKEMBALIKAN
    const totalTerlambat =
    peminjamanList.reduce(
        (total, pinjam) =>
            total +
            pinjam.detail.filter(
                (detail) =>
                    detail.status ===
                    "terlambat"
            ).length,
        0
    );

    return (

        <div className={`${inter.className} space-y-6`}>

            <div
                className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
            >

                <div
                    className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm"
                >
                    <p className="font-semibold text-gray-500">
                        Total Siswa
                    </p>

                    <h2
                        className=" text-3xl md:text-4xl font-bold mt-2"
                    >
                        {totalSiswa}
                    </h2>
                </div>

                <div
                    className=" bg-white rounded-2xl p-6 shadow-sm border-none"
                >
                    <p className="font-semibold text-gray-500">
                        Buku Dipinjam
                    </p>

                    <h2
                        className="text-3xl md:text-4xl font-bold mt-2"
                    >
                        {totalBukuDipinjam}
                    </h2>
                </div>

                <div
                    className="bg-white rounded-2xl p-6 shadow-sm border-none"
                >
                    <p className="font-semibold text-gray-500">
                        Belum Dikembalikan
                    </p>

                    <h2
                        className="text-3xl md:text-4xl font-bold mt-2"
                    >
                        {totalBelumDikembalikan}
                    </h2>
                </div>

                <div
                    className="bg-white rounded-2xl p-6 shadow-sm border-none"
                >
                    <p className="font-semibold text-gray-500">
                        Terlambat
                    </p>

                    <h2
                        className="text-3xl md:text-4xl font-bold mt-2"
                    >
                        {totalTerlambat}
                    </h2>
                </div>

            </div>

            <div
                className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6 min-h-[300px]"
            >

                <h2 className="font-bold text-lg mb-4">
                    Log Aktivitas
                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">
                                    No
                                </th>

                                <th className="text-left py-3">
                                    Nama
                                </th>

                                <th className="text-left py-3">
                                    Tanggal
                                </th>

                                <th className="text-left py-3">
                                    Aktivitas
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td
                                    colSpan={4}
                                    className="py-10 text-center text-gray-500"
                                >
                                    Belum ada aktivitas
                                </td>

                            </tr>

                        </tbody>

                    </table>
                    
                </div>

            </div>

        </div>

    );
}