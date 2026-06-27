"use client";

import { Inter } from "next/font/google";
import { useState, useEffect, useMemo } from "react";
import books from "../../../data/buku.json";
import kategoriList from "../../../data/kategori.json";
import students from "../../../data/siswa.json";
import peminjamanData from "../../../data/peminjaman.json";
import {
  getMostBorrowedBooks,
  getMostActiveStudents,
  getPopularDays,
  getMostBorrowedCategories,
} from "../../../utils/statistics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const inter = Inter({ subsets: ["latin"] });

type Stats = {
  popularBooks: { id: number; judul: string; total: number }[];
  activeStudents: { id: number; nama: string; totalPinjam: number }[];
  popularDays: { hari: string; total: number }[];
  popularCategories: { id: number; nama: string; total: number }[];
};

// Helper: mendapatkan nomor minggu ISO
function getWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

export default function StatistikPage() {
  const [stats, setStats] = useState<Stats>({
    popularBooks: [],
    activeStudents: [],
    popularDays: [],
    popularCategories: [],
  });

  // Filter state
  const [filterType, setFilterType] = useState<'hari' | 'minggu' | 'bulan' | 'kustom' | 'semua'>('semua');
  const [selectedValue, setSelectedValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Opsi filter berdasarkan tanggal unik dari data
  const filterOptions = useMemo(() => {
    const dates = peminjamanData.map(p => p.tanggal_pinjam);
    const uniqueDates = [...new Set(dates)].sort();

    if (filterType === 'semua') return ['semua'];
    if (filterType === 'kustom') return [];

    if (filterType === 'hari') {
      return uniqueDates;
    }

    if (filterType === 'bulan') {
      const months = uniqueDates.map(d => d.substring(0, 7));
      return [...new Set(months)].sort();
    }

    if (filterType === 'minggu') {
      const weeks = uniqueDates.map(d => {
        const date = new Date(d);
        const week = getWeekNumber(date);
        return `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;
      });
      return [...new Set(weeks)].sort();
    }

    return [];
  }, [filterType]);

  // Set default selected value saat filterType berubah
  useEffect(() => {
    if (filterOptions.length > 0) {
      setSelectedValue(filterOptions[0]);
    } else {
      setSelectedValue('');
    }
  }, [filterType, filterOptions]);

  // Filter data peminjaman berdasarkan pilihan
  const filteredPeminjaman = useMemo(() => {
    if (filterType === 'semua') return peminjamanData;
    
    if (filterType === 'kustom') {
      if (startDate && endDate) {
        return peminjamanData.filter(p => p.tanggal_pinjam >= startDate && p.tanggal_pinjam <= endDate);
      }
      return peminjamanData; // jika belum pilih tanggal, tampilkan semua
    }

    return peminjamanData.filter(p => {
      const date = p.tanggal_pinjam;
      if (filterType === 'hari') {
        return date === selectedValue;
      } else if (filterType === 'bulan') {
        return date.startsWith(selectedValue);
      } else if (filterType === 'minggu') {
        const d = new Date(date);
        const week = getWeekNumber(d);
        const weekStr = `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
        return weekStr === selectedValue;
      }
      return true;
    });
  }, [filterType, selectedValue, startDate, endDate]);

  // Hitung ulang statistik ketika filteredPeminjaman berubah
  useEffect(() => {
    try {
      const newStats = {
        popularBooks: getMostBorrowedBooks(filteredPeminjaman, books, 5),
        activeStudents: getMostActiveStudents(filteredPeminjaman, students, 5),
        popularDays: getPopularDays(filteredPeminjaman),
        popularCategories: getMostBorrowedCategories(filteredPeminjaman, books, kategoriList, 5),
      };
      setStats(newStats);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  }, [filteredPeminjaman]);

  const hasData = filteredPeminjaman && filteredPeminjaman.length > 0;

  return (
    <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm min-h-[500px] lg:min-h-[700px]`}>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Statistik Peminjaman Buku</h1>

      {/* Filter Dropdown */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua</option>
            <option value="hari">Hari</option>
            <option value="minggu">Minggu</option>
            <option value="bulan">Bulan</option>
            <option value="kustom">Kustom (Rentang Tanggal)</option>
          </select>
        </div>

        {filterType !== 'semua' && filterType !== 'kustom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih</label>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        {filterType === 'kustom' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {!hasData ? (
        <div className="flex items-center justify-center h-64 text-gray-400 font-medium">
          Tidak ada data untuk periode yang dipilih.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hari Populer */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">📅 Hari Peminjaman Terbanyak</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.popularDays} margin={{ bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="hari" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#2B87DA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Siswa Aktif */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">👨‍🎓 Siswa Paling Sering Meminjam</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.activeStudents} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="nama" width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="totalPinjam" fill="#3AC7B1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Buku Populer */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">📚 Buku Paling Sering Dipinjam</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.popularBooks} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="judul" width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Kategori Favorit */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">🏷️ Kategori Buku Favorit</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={stats.popularCategories}
                  dataKey="total"
                  nameKey="nama"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  label={({ name }) => name}
                >
                  {stats.popularCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#2B87DA", "#3AC7B1", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5]}
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
  );
}