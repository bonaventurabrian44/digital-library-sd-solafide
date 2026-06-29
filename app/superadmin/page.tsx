// app/superadmin/page.tsx

"use client";
import books from "../../data/buku.json";
import kategoriList from "../../data/kategori.json";
import students from "../../data/siswa.json";
import peminjamanData from "../../data/peminjaman.json";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import {
  getMostBorrowedBooks,
  getMostActiveStudents,
  getPopularDays,
  getMostBorrowedCategories,
} from "../../utils/statistics.js";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
console.log("File page.tsx loaded");
type Stats = {
  popularBooks: { id: number; judul: string; total: number }[];
  activeStudents: { id: number; nama: string; totalPinjam: number }[];
  popularDays: { hari: string; total: number }[];
  popularCategories: { id: number; nama: string; total: number }[];
};
const inter = Inter({ subsets: ["latin"] });

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        popularBooks: [],
        activeStudents: [],
        popularDays: [],
        popularCategories: [],
        });
     useEffect(() => {
  try {
    const newStats = {
      popularBooks: getMostBorrowedBooks(peminjamanData, books, 5),
      activeStudents: getMostActiveStudents(peminjamanData, students, 5),
      popularDays: getPopularDays(peminjamanData),
      popularCategories: getMostBorrowedCategories(peminjamanData, books, kategoriList, 5),
    };
    console.log('Stats:', newStats);
    setStats(newStats);
  } catch (error) {
    console.error('Error in useEffect:', error);
  }
}, []);
    // TOTAL BUKU YANG TERSEDIA
    const totalBuku = books.length;

    // TOTAL KATEGORI
    const totalKategori = kategoriList.length;

    // TOTAL BUKU FISIK
    const totalBukuFisik =
    books.filter(
        (book) =>
            book.tipe === "fisik" ||
            book.tipe === "keduanya"
    ).length;

    // TOTAL EBOOK
    const totalEbook =
    books.filter(
        (book) =>
            book.tipe === "ebook" ||
            book.tipe === "keduanya"
    ).length;

    // FILTER BUKU TERBARU
    const bukuTerbaru =
    [...books]
        .sort(
            (a, b) =>
                b.id_buku - a.id_buku
        )
        .slice(0, 5);
    
    // KATEGORI TERATAS
    const kategoriDenganJumlah =
    kategoriList
        .map((kategori) => ({
            ...kategori,
            jumlahBuku: books.filter(
                (book) =>
                    book.id_kategori.includes(
                        kategori.id_kategori
                    )
            ).length,
        }))
        .sort(
            (a, b) =>
                b.jumlahBuku -
                a.jumlahBuku
        )
        .slice(0, 5);
    
    return (
        <div className={`${inter.className} space-y-6`}>

            {/* CARD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

                <div className="bg-white rounded-2xl p-6 shadow-sm border-none">
                    <h3 className="font-semibold text-gray-500">
                        Total Buku
                    </h3>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalBuku}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-500">
                        Buku Fisik
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalBukuFisik}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-500">
                        E-Book
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalEbook}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border-none">
                    <h3 className="font-semibold text-gray-500">
                        Total Kategori
                    </h3>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalKategori}
                    </h2>
                </div>

            </div>

            {/* PREVIEW */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">

                <div className="col-span-1 bg-white rounded-2xl border-none shadow-sm p-6 min-h-[320px]">

                    <h2 className="font-bold text-lg mb-4">
                        Daftar Buku Terbaru
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-1">
                                        No
                                    </th>

                                    <th className="text-left py-1">
                                        Judul Buku
                                    </th>

                                    <th className="text-left py-1">
                                        Tipe
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {bukuTerbaru.map(
                                    (book, index) => (

                                        <tr key={book.id_buku} className="border-none">

                                            <td className="py-2">
                                                {index + 1}
                                            </td>

                                            <td>
                                                {book.judul}
                                            </td>

                                            <td className="capitalize">
                                                {book.tipe}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>

                <div className="bg-white rounded-2xl border-none shadow-sm p-6 min-h-[320px]">

                    <h2 className="font-bold text-lg mb-4">
                        Kategori Teratas
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-1">
                                        No
                                    </th>

                                    <th className="text-left py-1">
                                        Nama Kategori
                                    </th>

                                    <th className="text-left py-1">
                                        Jumlah Buku
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {kategoriDenganJumlah.map(
                                    (kategori, index) => (

                                        <tr key={ kategori.id_kategori} className="border-none">

                                            <td className="py-2">
                                                {index + 1}
                                            </td>

                                            <td>
                                                {kategori.nama_kategori}
                                            </td>

                                            <td>
                                                {kategori.jumlahBuku}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {/* STATISTIK */}
            <div className="bg-white rounded-2xl border-none shadow-sm p-6 min-h-[300px]">
                <h2 className="font-bold text-lg mb-4">Statistik Peminjaman Buku</h2>

                {/* Jika belum ada data peminjaman, tampilkan pesan */}
                {stats.popularDays.every(d => d.total === 0) ? (
                    <div className="flex items-center justify-center h-48 text-gray-400">
                    Belum ada data peminjaman.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hari Populer */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2">📅 Hari Peminjaman Terbanyak</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stats.popularDays}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hari" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="total" fill="#2B87DA" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Siswa Aktif */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2">👨‍🎓 Siswa Paling Sering Meminjam</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stats.activeStudents} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="nama" width={70} />
                                <Tooltip />
                                <Bar dataKey="totalPinjam" fill="#3AC7B1" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Buku Populer */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2">📚 Buku Paling Sering Dipinjam</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stats.popularBooks} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="judul" width={70} />
                                <Tooltip />
                                <Bar dataKey="total" fill="#F59E0B" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Kategori Favorit */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2">🏷️ Kategori Buku Favorit</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                data={stats.popularCategories}
                                dataKey="total"
                                nameKey="nama"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                label
                                >
                                {stats.popularCategories.map((entry, index) => (
                                    <Cell
                                    key={`cell-${index}`}
                                    fill={['#2B87DA', '#3AC7B1', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]}
                                    />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}