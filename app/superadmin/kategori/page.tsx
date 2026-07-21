"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { Kategori } from "@/data/buku";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function KategoriPage() {
    const [categories, setCategories] = useState<Kategori[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default");

    // PAGINATION
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // EDIT KATEGORI
    const [showEdit, setShowEdit] = useState(false);
    const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(null);
    const [editedKategori, setEditedKategori] = useState<Kategori | null>(null);

    // TAMBAH KATEGORI
    const [showTambah, setShowTambah] = useState(false);
    const [newKategori, setNewKategori] = useState("");
    const [uploading, setUploading] = useState(false);

    // HAPUS KATEGORI
    const [showDelete, setShowDelete] = useState(false);

    // LOAD DATA
    const loadData = () => {
        setLoading(true);
        try {
            const data = bookServiceLocal.getAllKategori();
            setCategories(data);
        } catch (err) {
            console.error("Error loading categories:", err);
            toast.error("Gagal memuat data. Silakan refresh halaman.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter categories berdasarkan search
    const filteredCategories = [...categories]
    .filter((kategori) =>
        kategori.nama_kategori
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        switch (sortType) {
            case "az":
                return a.nama_kategori.localeCompare(b.nama_kategori);

            case "za":
                return b.nama_kategori.localeCompare(a.nama_kategori);

            case "jumlah_desc":
                return (
                    bookServiceLocal.getJumlahBukuByKategori(b.id_kategori) -
                    bookServiceLocal.getJumlahBukuByKategori(a.id_kategori)
                );

            case "jumlah_asc":
                return (
                    bookServiceLocal.getJumlahBukuByKategori(a.id_kategori) -
                    bookServiceLocal.getJumlahBukuByKategori(b.id_kategori)
                );

            default:
                return a.id_kategori - b.id_kategori;
        }
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredCategories.length / ITEMS_PER_PAGE
    );

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const currentCategories = filteredCategories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getPagination = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }

        return pages;
    };

    useEffect(() => {setCurrentPage(1);}, [searchTerm, sortType]);

    // HANDLE TAMBAH KATEGORI
    const handleAddKategori = () => {
        if (!newKategori.trim()) {
            toast.error("Nama kategori tidak boleh kosong!");
            return;
        }

        setUploading(true);
        try {
            // Cek duplikat
            const exists = categories.some(
                (k) => k.nama_kategori.toLowerCase() === newKategori.toLowerCase()
            );
            if (exists) {
                toast.error("Kategori dengan nama tersebut sudah ada!");
                setUploading(false);
                return;
            }

            bookServiceLocal.createKategori(newKategori.trim());
            bookServiceLocal.addSuperadminLog("Superadmin","Kategori","Tambah", `Menambahkan kategori: ${newKategori.trim()}`);
            loadData();
            setShowTambah(false);
            setNewKategori("");
            toast.success("Kategori berhasil ditambahkan!");
        } catch (err) {
            console.error("Error adding category:", err);
            toast.error("Gagal menambahkan kategori. Silakan coba lagi.");
        } finally {
            setUploading(false);
        }
    };

    // HANDLE EDIT KATEGORI
    const handleEditKategori = () => {
        if (!editedKategori) return;
        if (!editedKategori.nama_kategori.trim()) {
            toast.error("Nama kategori tidak boleh kosong!");
            return;
        }

        setUploading(true);
        try {
            // Cek duplikat (kecuali dirinya sendiri)
            const exists = categories.some(
                (k) =>
                    k.id_kategori !== editedKategori.id_kategori &&
                    k.nama_kategori.toLowerCase() === editedKategori.nama_kategori.toLowerCase()
            );
            if (exists) {
                toast.error("Kategori dengan nama tersebut sudah ada!");
                setUploading(false);
                return;
            }

            bookServiceLocal.updateKategori(
                editedKategori.id_kategori,
                editedKategori.nama_kategori.trim()
            );

            bookServiceLocal.addSuperadminLog("Superadmin","Kategori","Edit",`Mengubah kategori: ${editedKategori.nama_kategori.trim()}`);
            loadData();
            setShowEdit(false);
            setSelectedKategori(null);
            setEditedKategori(null);
            toast.success("Kategori berhasil diperbarui!");
        } catch (err) {
            console.error("Error updating category:", err);
            toast.error("Gagal memperbarui kategori. Silakan coba lagi.");
        } finally {
            setUploading(false);
        }
    };

    // HANDLE HAPUS KATEGORI
    const handleDeleteKategori = () => {
        
        if (!selectedKategori) return;

        const namaKategori = selectedKategori.nama_kategori;
        
        try {
            // Cek apakah kategori masih memiliki buku
            const jumlahBuku = bookServiceLocal.getJumlahBukuByKategori(selectedKategori.id_kategori);
            if (jumlahBuku > 0) {
                toast.error("Kategori tidak bisa dihapus karena masih memiliki buku!");
                setShowDelete(false);
                return;
            }

            bookServiceLocal.deleteKategori(selectedKategori.id_kategori);
            bookServiceLocal.addSuperadminLog("Superadmin","Kategori","Hapus",`Menghapus kategori: ${namaKategori}`);
            loadData();
            setShowDelete(false);
            setSelectedKategori(null);
            toast.success("Kategori berhasil dihapus!");
        } catch (err) {
            console.error("Error deleting category:", err);
            toast.error("Gagal menghapus kategori. Silakan coba lagi.");
        }
    };

    // Get jumlah buku untuk setiap kategori
    const getJumlahBuku = (idKategori: number) => {
        return bookServiceLocal.getJumlahBukuByKategori(idKategori);
    };

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                    Daftar Kategori
                </h1>

                <button
                    onClick={() => {
                        setNewKategori("");
                        setShowTambah(true);
                    }}
                    className="w-full sm:w-auto bg-[#2B87DA] text-white px-5 py-2 rounded-lg hover:bg-[#236fb4] cursor-pointer"
                >
                    + Tambah Kategori
                </button>
            </div>

            {/* SEARCH */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                <div className="flex items-center gap-2">
                    <label className="font-medium whitespace-nowrap">
                        Urutkan:
                    </label>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#2B87DA]"
                    >
                        <option value="default">Default</option>
                        <option value="az">A - Z</option>
                        <option value="za">Z - A</option>
                        <option value="jumlah_desc">Jumlah Buku Terbanyak</option>
                        <option value="jumlah_asc">Jumlah Buku Tersedikit</option>
                    </select>
                </div>

                <input
                    type="text"
                    placeholder="Cari Kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-[350px] border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#2B87DA]"
                />

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="pr-6 text-left py-3">No</th>
                                <th className="pr-6 text-left py-3">Nama Kategori</th>
                                <th className="pr-6 text-left py-3">Jumlah Buku</th>
                                <th className="pr-6 text-center py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-500">
                                        {searchTerm ? "Kategori tidak ditemukan" : "Belum ada kategori"}
                                    </td>
                                </tr>
                            ) : (
                                currentCategories.map((kategori, index) => {
                                    const jumlahBuku = getJumlahBuku(kategori.id_kategori);
                                    return (
                                        <tr key={kategori.id_kategori} className="border-b">
                                            <td className="py-4">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                            <td>{kategori.nama_kategori}</td>
                                            <td>{jumlahBuku}</td>
                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedKategori(kategori);
                                                            setEditedKategori({
                                                                ...kategori,
                                                            });
                                                            setShowEdit(true);
                                                        }}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        disabled={jumlahBuku > 0}
                                                        onClick={() => {
                                                            setSelectedKategori(kategori);
                                                            setShowDelete(true);
                                                        }}
                                                        className={`px-3 py-1 rounded text-sm ${
                                                            jumlahBuku > 0
                                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                                        }`}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* POP UP EDIT KATEGORI */}
            {showEdit && selectedKategori && editedKategori && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-4 md:p-6 w-[95%] max-w-[500px] shadow-xl">
                        <h2 className="text-2xl font-bold mb-6">Edit Kategori</h2>

                        <div>
                            <label className="block mb-2 font-medium">Nama Kategori</label>
                            <input
                                type="text"
                                value={editedKategori.nama_kategori}
                                onChange={(e) =>
                                    setEditedKategori({
                                        ...editedKategori,
                                        nama_kategori: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#2B87DA]"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleEditKategori}
                                disabled={uploading}
                                className={`bg-green-500 text-white px-5 py-2 rounded-lg ${
                                    uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 cursor-pointer"
                                }`}
                            >
                                {uploading ? "Menyimpan..." : "Simpan"}
                            </button>

                            <button
                                onClick={() => {
                                    setShowEdit(false);
                                    setSelectedKategori(null);
                                    setEditedKategori(null);
                                }}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* POP UP TAMBAH KATEGORI */}
            {showTambah && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-[95%] max-w-[500px] shadow-xl">
                        <h2 className="text-2xl font-bold mb-6">Tambah Kategori</h2>

                        <div>
                            <label className="block mb-2 font-medium">Nama Kategori</label>
                            <input
                                type="text"
                                value={newKategori}
                                onChange={(e) => setNewKategori(e.target.value)}
                                placeholder="Masukkan nama kategori"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#2B87DA]"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleAddKategori}
                                disabled={uploading}
                                className={`bg-green-500 text-white px-5 py-2 rounded-lg ${
                                    uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 cursor-pointer"
                                }`}
                            >
                                {uploading ? "Menyimpan..." : "Tambah"}
                            </button>

                            <button
                                onClick={() => {
                                    setNewKategori("");
                                    setShowTambah(false);
                                }}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* POP UP HAPUS KATEGORI */}
            {showDelete && selectedKategori && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-[95%] max-w-[450px] shadow-xl text-center">
                        <p className="text-xl font-medium text-center mb-8">
                            Hapus kategori{" "}
                            <span className="font-semibold">
                                "{selectedKategori.nama_kategori}"
                            </span>
                            ?
                        </p>

                        <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
                            <button
                                onClick={handleDeleteKategori}
                                className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                            >
                                Ya
                            </button>

                            <button
                                onClick={() => {
                                    setShowDelete(false);
                                    setSelectedKategori(null);
                                }}
                                className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                            >
                                Tidak
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition ${
                        currentPage === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "hover:bg-gray-100"
                    }`}
                >
                    <ChevronLeft size={18} />
                </button>

                {getPagination().map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="px-3 py-2 text-gray-500"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page as number)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${
                                currentPage === page
                                    ? "bg-[#2B87DA] text-white border-[#2B87DA]"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                        )
                    }
                    disabled={currentPage === totalPages}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition ${
                        currentPage === totalPages
                            ? "bg-gray-200 cursor-not-allowed"
                            : "hover:bg-gray-100"
                    }`}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        )}
        </div>
    );
}