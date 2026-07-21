"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

interface DetailPeminjaman {
    id_detail: number;
    id_buku: number;
    jumlah: number;
    tanggal_kembali: string | null;
    status: string;
    denda: number;
}

interface Peminjaman {
    id_pinjam: number;
    id_siswa: number;
    tanggal_pinjam: string;
    tanggal_jatuh_tempo: string;
    status: string;
    detail: DetailPeminjaman[];
}

interface Siswa {
    id_siswa: number;
    nis: string;
    nama_siswa: string;
    kelas: number;
    email_ortu: string;
    no_telp_ortu: string;
    status: string;
}

interface Buku {
    id_buku: number;
    judul: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: number;
}

export default function PeminjamanBukuPage() {
    const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([]);
    const [siswaList, setSiswaList] = useState<Siswa[]>([]);
    const [bukuList, setBukuList] = useState<Buku[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Detail
    const [showDetail, setShowDetail] = useState(false);
    const [selectedPinjam, setSelectedPinjam] = useState<Peminjaman | null>(null);

    // Edit
    const [editingDetailId, setEditingDetailId] = useState<number | null>(null);
    const [editedStatus, setEditedStatus] = useState("");
    const [editedTanggalKembali, setEditedTanggalKembali] = useState("");
    const [saving, setSaving] = useState(false);

    // Tambah
    const [showTambahPinjam, setShowTambahPinjam] = useState(false);
    const [pinjamForm, setPinjamForm] = useState({
        id_siswa: "",
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        books: [{ id_buku: "", jumlah: 1 }],
    });

    // LOAD DATA
    const loadData = () => {
        setLoading(true);
        try {
            const peminjaman = bookServiceLocal.getAllPeminjaman();
            const siswa = bookServiceLocal.getAllSiswa();
            const buku = bookServiceLocal.getAllBooks();
            setPeminjamanList(peminjaman);
            setSiswaList(siswa);
            setBukuList(buku);
        } catch (err) {
            console.error("Error loading data:", err);
            toast.error("Gagal memuat data. Silakan refresh halaman.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // GET SISWA
    const getSiswa = (id_siswa: number) => {
        return siswaList.find((siswa) => siswa.id_siswa === id_siswa);
    };

    // GET BUKU
    const getBuku = (id_buku: number) => {
        return bukuList.find((buku) => buku.id_buku === id_buku);
    };

    // FILTER PEMINJAMAN
    const filteredPeminjaman = peminjamanList.filter((pinjam) => {
        const siswa = getSiswa(pinjam.id_siswa);
        return siswa?.nama_siswa.toLowerCase().includes(search.toLowerCase());
    });

    // PAGINATION
    const totalPages = Math.ceil(
        filteredPeminjaman.length / itemsPerPage
    );

    const paginatedPeminjaman = filteredPeminjaman.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPagination = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    // STATUS CLASS
    const getStatusClass = (status: string) => {
        switch (status) {
            case "dipinjam":
                return "bg-blue-100 text-blue-700";
            case "kembali":
                return "bg-green-100 text-green-700";
            case "terlambat":
                return "bg-red-100 text-red-700";
            case "sebagian":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // HANDLE EDIT DETAIL
    // app/admin/peminjaman-buku/page.tsx - handleEditDetail

    // HANDLE EDIT DETAIL
    const handleEditDetail = () => {
        if (!selectedPinjam || editingDetailId === null) return;

        setSaving(true);
        try {
            let denda = 0;
            if (editedStatus === "terlambat") {
                const jatuhTempo = new Date(selectedPinjam.tanggal_jatuh_tempo);
                const tanggalKembali = new Date(editedTanggalKembali || new Date());
                const selisihHari = Math.ceil((tanggalKembali.getTime() - jatuhTempo.getTime()) / (1000 * 60 * 60 * 24));
                denda = selisihHari > 0 ? selisihHari * 1000 : 0;
            }

            const updated = bookServiceLocal.updateDetailPeminjaman(
                selectedPinjam.id_pinjam,
                editingDetailId,
                {
                    status: editedStatus,
                    tanggal_kembali: editedTanggalKembali || null,
                    denda: denda,
                }
            );

            if (updated) {
                // Reload data peminjaman
                loadData();
                
                // Refresh selectedPinjam dengan data terbaru
                const refreshed = bookServiceLocal.getPeminjamanById(selectedPinjam.id_pinjam);
                if (refreshed) {
                    setSelectedPinjam(refreshed);
                }
                const siswa = getSiswa(selectedPinjam.id_siswa);
                bookServiceLocal.addAdminLog("Admin", "Pinjam Buku", "Edit", `Mengupdate peminjaman ${siswa?.nama_siswa}: status menjadi ${editedStatus}`);
                toast.success("Data peminjaman berhasil diupdate!");
            }
        } catch (err) {
            console.error("Error updating detail:", err);
            toast.error("Gagal mengupdate data. Silakan coba lagi.");
        } finally {
            setSaving(false);
            setEditingDetailId(null);
        }
    };

    // HANDLE TAMBAH BUKU DI FORM
    const handleTambahBuku = () => {
        setPinjamForm({
            ...pinjamForm,
            books: [...pinjamForm.books, { id_buku: "", jumlah: 1 }],
        });
    };

    // HANDLE TAMBAH PEMINJAMAN
    const handleTambahPeminjaman = () => {
        // Validasi
        if (!pinjamForm.id_siswa) {
            toast.error("Silakan pilih siswa!");
            return;
        }
        if (!pinjamForm.tanggal_pinjam) {
            toast.error("Silakan pilih tanggal pinjam!");
            return;
        }
        if (!pinjamForm.tanggal_jatuh_tempo) {
            toast.error("Silakan pilih tanggal jatuh tempo!");
            return;
        }

        // Cek apakah ada buku yang dipilih
        const validBooks = pinjamForm.books.filter((b) => b.id_buku !== "");
        if (validBooks.length === 0) {
            toast.error("Silakan pilih minimal 1 buku!");
            return;
        }

        try {
            // Buat detail peminjaman
            const details = validBooks.map((b, index) => ({
                id_detail: Date.now() + index,
                id_buku: Number(b.id_buku),
                jumlah: b.jumlah,
                tanggal_kembali: null,
                status: "dipinjam",
                denda: 0,
            }));

            const newPeminjaman = {
                id_siswa: Number(pinjamForm.id_siswa),
                tanggal_pinjam: pinjamForm.tanggal_pinjam,
                tanggal_jatuh_tempo: pinjamForm.tanggal_jatuh_tempo,
                status: "dipinjam",
                detail: details,
            };

            bookServiceLocal.createPeminjaman(newPeminjaman);
            loadData();
            setShowTambahPinjam(false);
            resetForm();

            const siswa = siswaList.find(s => s.id_siswa === Number(pinjamForm.id_siswa));
            bookServiceLocal.addAdminLog("Admin", "Pinjam Buku", "Tambah",`Menambah peminjaman untuk: ${siswa?.nama_siswa}`);
            toast.success("Peminjaman berhasil ditambahkan!");
        } catch (err) {
            console.error("Error adding peminjaman:", err);
            toast.error("Gagal menambahkan peminjaman. Silakan coba lagi.");
        }
    };

    // RESET FORM
    const resetForm = () => {
        setPinjamForm({
            id_siswa: "",
            tanggal_pinjam: "",
            tanggal_jatuh_tempo: "",
            books: [{ id_buku: "", jumlah: 1 }],
        });
    };

    // HAPUS BUKU DARI FORM
    const handleHapusBukuForm = (index: number) => {
        const updated = pinjamForm.books.filter((_, i) => i !== index);
        setPinjamForm({ ...pinjamForm, books: updated });
    };

    return (
        <div className={`${inter.className} bg-white rounded-xl p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                    Catatan Peminjaman Buku
                </h1>

                <button
                    onClick={() => setShowTambahPinjam(true)}
                    className="bg-[#2B87DA] text-white px-5 py-2 rounded-lg hover:bg-[#236fb4] cursor-pointer"
                >
                    + Tambah Peminjam
                </button>
            </div>

            {/* SEARCH */}
            <div className="flex justify-end mb-10">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Cari Nama Siswa"
                    className="w-full sm:w-[350px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"
                />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-center">
                                <th className="pr-6 text-left py-3">No</th>
                                <th className="pr-6 text-left py-3">NIS</th>
                                <th className="pr-6 text-left py-3">Nama Siswa</th>
                                <th className="pr-6 text-left py-3">Tanggal Pinjam</th>
                                <th className="pr-6 text-left py-3">Tanggal Jatuh Tempo</th>
                                <th className="pr-6 text-left py-3">Status</th>
                                <th className="pr-6 text-center py-3">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPeminjaman.map((pinjam, index) => {
                                const siswa = getSiswa(pinjam.id_siswa);
                                return (
                                    <tr key={pinjam.id_pinjam} className="border-b">
                                        <td className="py-5">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="pr-6">{siswa?.nis}</td>
                                        <td>{siswa?.nama_siswa}</td>
                                        <td>{pinjam.tanggal_pinjam}</td>
                                        <td>{pinjam.tanggal_jatuh_tempo}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                                                    pinjam.status
                                                )}`}
                                            >
                                                {pinjam.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedPinjam(pinjam);
                                                        setShowDetail(true);
                                                        setEditingDetailId(null);
                                                    }}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* POPUP DETAIL */}
            {showDetail && selectedPinjam && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-4 md:p-8 w-[95%] max-w-[1100px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Detail Peminjaman</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500">Nama Siswa</p>
                                <p className="font-semibold">
                                    {getSiswa(selectedPinjam.id_siswa)?.nama_siswa}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">NIS</p>
                                <p className="font-semibold">
                                    {getSiswa(selectedPinjam.id_siswa)?.nis}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-2">Buku Dipinjam</p>
                                <div className="mb-6 overflow-x-auto">
                                    <table className="min-w-[700px] lg:min-w-[1000px] w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="pr-6 text-left py-3">No</th>
                                                <th className="pr-6 text-left py-3">Judul Buku</th>
                                                <th className="pr-6 text-left py-3">Penulis</th>
                                                <th className="pr-6 text-left py-3">Penerbit</th>
                                                <th className="pr-6 text-left py-3">Tahun Terbit</th>
                                                <th className="pr-6 text-left py-3">Tanggal Kembali</th>
                                                <th className="pr-6 text-left py-3">Status</th>
                                                <th className="pr-6 text-left py-3">Denda</th>
                                                <th className="pr-6 text-left py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPinjam.detail.map((detail, index) => {
                                                const buku = getBuku(detail.id_buku);
                                                return (
                                                    <tr key={detail.id_detail} className="border-b">
                                                        <td className="py-4">{index + 1}</td>
                                                        <td>{buku?.judul}</td>
                                                        <td>{buku?.penulis}</td>
                                                        <td className="pr-4">{buku?.penerbit}</td>
                                                        <td>{buku?.tahun_terbit}</td>
                                                        <td className="pr-4">
                                                            {editingDetailId === detail.id_detail ? (
                                                                <input
                                                                    type="date"
                                                                    value={editedTanggalKembali}
                                                                    onChange={(e) =>
                                                                        setEditedTanggalKembali(e.target.value)
                                                                    }
                                                                    className="border rounded px-2 py-1"
                                                                />
                                                            ) : (
                                                                detail.tanggal_kembali ?? "-"
                                                            )}
                                                        </td>
                                                        <td className="pr-4">
                                                            {editingDetailId === detail.id_detail ? (
                                                                <select
                                                                    value={editedStatus}
                                                                    onChange={(e) =>
                                                                        setEditedStatus(e.target.value)
                                                                    }
                                                                    className="border rounded px-2 py-1"
                                                                >
                                                                    <option value="dipinjam">Dipinjam</option>
                                                                    <option value="kembali">Dikembalikan</option>
                                                                    <option value="terlambat">Terlambat</option>
                                                                </select>
                                                            ) : (
                                                                <span
                                                                    className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                                                                        detail.status
                                                                    )}`}
                                                                >
                                                                    {detail.status}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="pr-4">
                                                            {detail.denda > 0 ? `Rp ${detail.denda.toLocaleString()}` : "-"}
                                                        </td>
                                                        <td>
                                                            {editingDetailId === detail.id_detail ? (
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={handleEditDetail}
                                                                        disabled={saving}
                                                                        className={`bg-green-500 text-white px-3 py-1 rounded text-sm ${
                                                                            saving
                                                                                ? "opacity-50 cursor-not-allowed"
                                                                                : "cursor-pointer"
                                                                        }`}
                                                                    >
                                                                        {saving ? "..." : "Simpan"}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingDetailId(null);
                                                                        }}
                                                                        className="w-8 h-8 bg-red-500 text-white rounded cursor-pointer"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingDetailId(detail.id_detail);
                                                                        setEditedStatus(detail.status);
                                                                        setEditedTanggalKembali(
                                                                            detail.tanggal_kembali || ""
                                                                        );
                                                                    }}
                                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => {
                                    setShowDetail(false);
                                    setSelectedPinjam(null);
                                    setEditingDetailId(null);
                                }}
                                className="bg-gray-500 text-white px-5 py-2 rounded-lg cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* POPUP TAMBAH PEMINJAM */}
            {showTambahPinjam && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-[95%] md:w-[90%] lg:max-w-[850px] max-h-[90vh] p-4 md:p-6 lg:p-8 shadow-lg overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-10">Tambah Peminjaman</h2>

                        {/* SISWA */}
                        <div className="grid grid-cols-1 lg:grid-cols-[17fr_1fr] gap-4">
                            <div className="mb-6">
                                <label className="font-medium">Nama Siswa</label>
                                <select
                                    value={pinjamForm.id_siswa}
                                    onChange={(e) =>
                                        setPinjamForm({ ...pinjamForm, id_siswa: e.target.value })
                                    }
                                    className="w-full mt-2 border rounded-lg px-4 py-2"
                                >
                                    <option value="">Pilih Siswa</option>
                                    {siswaList.map((siswa) => (
                                        <option key={siswa.id_siswa} value={siswa.id_siswa}>
                                            {siswa.nama_siswa}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="font-medium">Kelas</label>
                                <input
                                    readOnly
                                    value={siswaList.find((s) => s.id_siswa === Number(pinjamForm.id_siswa))?.kelas || ""}
                                    className="w-full mt-2 border rounded-lg px-4 py-2 bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* TANGGAL */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="font-medium">Tanggal Dipinjam</label>
                                <input
                                    type="date"
                                    value={pinjamForm.tanggal_pinjam}
                                    onChange={(e) =>
                                        setPinjamForm({ ...pinjamForm, tanggal_pinjam: e.target.value })
                                    }
                                    className="w-full border mt-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="font-medium">Tanggal Jatuh Tempo</label>
                                <input
                                    type="date"
                                    value={pinjamForm.tanggal_jatuh_tempo}
                                    onChange={(e) =>
                                        setPinjamForm({ ...pinjamForm, tanggal_jatuh_tempo: e.target.value })
                                    }
                                    className="w-full border mt-2 rounded-lg px-4 py-2"
                                />
                            </div>
                        </div>

                        {/* BUTTON TAMBAH BUKU */}
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleTambahBuku}
                                className="bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-600 cursor-pointer"
                            >
                                + Tambah Buku
                            </button>
                        </div>

                        <hr className="mb-6" />

                        {/* LIST BUKU */}
                        <div className="hidden lg:grid lg:grid-cols-[1fr_120px_40px] gap-4 mb-2 font-medium">
                            <div>Judul Buku</div>
                            <div>Jumlah</div>
                            <div></div>
                        </div>

                        <div className="space-y-4">
                            {pinjamForm.books.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 lg:grid-cols-[1fr_120px_40px] gap-4 items-center"
                                >
                                    <div>
                                        <label className="block lg:hidden mb-2 font-medium">Judul Buku</label>
                                        <select
                                            value={item.id_buku}
                                            onChange={(e) => {
                                                const updated = [...pinjamForm.books];
                                                updated[index].id_buku = e.target.value;
                                                setPinjamForm({ ...pinjamForm, books: updated });
                                            }}
                                            className="w-full border rounded-lg px-4 py-2"
                                        >
                                            <option value="">Pilih Buku</option>
                                            {bukuList.map((buku) => (
                                                <option key={buku.id_buku} value={buku.id_buku}>
                                                    {buku.judul}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block lg:hidden mb-2 font-medium">Jumlah</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.jumlah}
                                            onChange={(e) => {
                                                const updated = [...pinjamForm.books];
                                                updated[index].jumlah = Number(e.target.value);
                                                setPinjamForm({ ...pinjamForm, books: updated });
                                            }}
                                            className="w-full border rounded-lg px-4 py-2"
                                        />
                                    </div>

                                    {pinjamForm.books.length > 1 && (
                                        <div>
                                            <button
                                                onClick={() => handleHapusBukuForm(index)}
                                                className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                            >
                                                −
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* BUTTON BAWAH */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleTambahPeminjaman}
                                className="bg-[#2B87DA] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#236fb4] cursor-pointer"
                            >
                                Tambah
                            </button>
                            <button
                                onClick={() => {
                                    setShowTambahPinjam(false);
                                    resetForm();
                                }}
                                className="bg-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-400 cursor-pointer"
                            >
                                Batal
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