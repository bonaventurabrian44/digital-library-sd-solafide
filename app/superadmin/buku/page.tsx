"use client";

import { useState, useEffect } from "react";
import { bookServiceLocal } from "@/services/bookServiceLocal";
import { Book, Kategori } from "@/data/buku";
import { Inter } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const inter = Inter({
    subsets: ["latin"],
});

export default function DaftarBukuPage() {

    const [bookList, setBookList] = useState<Book[]>([]);
    const [categoriesList, setCategoriesList] = useState<Kategori[]>([]);
    const [loading, setLoading] = useState(true);

    // Pesan error
    const [errors, setErrors] = useState({
        cover: "",
        judul: "",
        penulis: "",
        penerbit: "",
        kategori: "",
        pdf: "",
    });

    const [editErrors, setEditErrors] = useState({
        judul: "",
        penulis: "",
        penerbit: "",
        kategori: "",
        pdf: "",
    });

    // Filter
    const [filterType, setFilterType] = useState("all");
    const [sortType, setSortType] = useState("default");

    // Search
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Detail
    const [showDetail, setShowDetail] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState<Book | null>(null);

    // Cover edit
    const [editCover, setEditCover] = useState<{
        file: File | null;
        preview: string;
    }>({
        file: null,
        preview: "",
    });

    // Tambah
    const [showTambah, setShowTambah] = useState(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    // Hapus
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBookTitle, setSelectedBookTitle] = useState("");

    // Cover
    const [selectedCover, setSelectedCover] = useState<{
        file: File | null;
        preview: string;
    }>({
        file: null,
        preview: "/images/default-image.jpg",
    });

    const defaultBook = {
        judul: "",
        cover: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: new Date().getFullYear(),
        status_ketersediaan: "tersedia",
        tipe: "fisik",
        id_kategori: [] as number[],
        jumlah: 1,
    };

    const [newBook, setNewBook] = useState(defaultBook);

    // LOAD DATA
    const loadData = () => {
        setLoading(true);
        try {
            const books = bookServiceLocal.getAllBooks();
            const categories = bookServiceLocal.getAllKategori();
            setBookList(books);
            setCategoriesList(categories);
        } catch (err) {
            console.error("Error loading data:", err);
            toast.error("Gagal memuat data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Get kategori names
    const getKategoriName = (idKategori: number[]) => {
        return idKategori
            .map((id) => categoriesList.find((k) => k.id_kategori === id)?.nama_kategori)
            .filter(Boolean)
            .join(", ");
    };

    // Filter books
    const filteredBooks = [...bookList].filter((book) => {
        const matchType =
            filterType === "all" ||
            (filterType === "fisik" &&
                (book.tipe === "fisik" || book.tipe === "keduanya")) ||
            (filterType === "ebook" &&
                (book.tipe === "ebook" || book.tipe === "keduanya"));

        const matchSearch = book.judul
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchType && matchSearch;
    }).sort((a, b) => {
        switch (sortType) {
            case "az":
                return a.judul.localeCompare(b.judul);

            case "za":
                return b.judul.localeCompare(a.judul);

            case "jumlah_desc":
                return b.jumlah - a.jumlah;

            case "jumlah_asc":
                return a.jumlah - b.jumlah;

            default:
                return 0;
        }
    });

    // Pagination
    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const currentBooks = filteredBooks.slice(
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

    useEffect(() => {setCurrentPage(1);}, [filterType, searchTerm, sortType]);

    // Handle edit cover change
    const handleEditCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setEditCover({
            file,
            preview: URL.createObjectURL(file),
        });
    };

    // HANDLE TAMBAH BUKU
    const handleAddBook = async () => {
        const newErrors = {
            cover: "",
            judul: "",
            penulis: "",
            penerbit: "",
            kategori: "",
            pdf: "",
        };

        let hasError = false;

        if (!selectedCover.file) {
            newErrors.cover = "Silakan pilih cover buku";
            hasError = true;
        }

        if (!newBook.judul.trim()) {
            newErrors.judul = "Harus diisi";
            hasError = true;
        }

        if (!newBook.penulis.trim()) {
            newErrors.penulis = "Harus diisi";
            hasError = true;
        }

        if (!newBook.penerbit.trim()) {
            newErrors.penerbit = "Harus diisi";
            hasError = true;
        }

        if (newBook.id_kategori.length === 0) {
            newErrors.kategori = "Pilih minimal satu kategori";
            hasError = true;
        }

        if ((newBook.tipe === "ebook" || newBook.tipe === "keduanya") &&
            !pdfFile
        ) {
            newErrors.pdf = "Silakan unggah file PDF.";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        setUploading(true);
        try {
            let coverUrl = "";
            let pdfUrl = "";

            if (selectedCover.file) {
                coverUrl = await bookServiceLocal.uploadImage(selectedCover.file);
            }

            if (pdfFile && (newBook.tipe === "ebook" || newBook.tipe === "keduanya")) {
                pdfUrl = await bookServiceLocal.uploadPdf(pdfFile);
            }

            const createdBook = bookServiceLocal.createBook({
                ...newBook,
                cover: coverUrl || "/images/default-image.jpg",
            });

            if ((newBook.tipe === "ebook" || newBook.tipe === "keduanya") &&
                pdfUrl
            ) {
                bookServiceLocal.createEbook({
                    id_buku: createdBook.id_buku,
                    file_path: pdfUrl,
                    format: "pdf",
                });
            }

            loadData();
            setShowTambah(false);
            resetForm();
            toast.success("Buku berhasil ditambahkan!");
        } catch (err) {
            console.error("Error adding book:", err);
            toast.error("Gagal menambahkan buku. Silakan coba lagi.");
        } finally {
            setUploading(false);
        }
        bookServiceLocal.addSuperadminLog("Superadmin","Daftar Buku", "Tambah", `Menambahkan buku: ${newBook.judul}`);
    };
    
    // HANDLE EDIT BUKU - PERBAIKAN UTAMA
    const handleEditBook = async () => {
        if (!editedBook) return;

        const newErrors = {
            judul: "",
            penulis: "",
            penerbit: "",
            kategori: "",
            pdf: "",
        };

        let hasError = false;

        if (!editedBook.judul.trim()) {
            newErrors.judul = "Harus diisi";
            hasError = true;
        }

        if (!editedBook.penulis.trim()) {
            newErrors.penulis = "Harus diisi";
            hasError = true;
        }

        if (!editedBook.penerbit.trim()) {
            newErrors.penerbit = "Harus diisi";
            hasError = true;
        }

        if (editedBook.id_kategori.length === 0) {
            newErrors.kategori = "Pilih minimal satu kategori";
            hasError = true;
        }

        const ebook = bookServiceLocal.getEbookByBookId(editedBook.id_buku);

        if (
            (editedBook.tipe === "ebook" || editedBook.tipe === "keduanya") &&
            !ebook &&
            !editPdfFile
        ) {
            newErrors.pdf = "Silakan unggah file PDF.";
            hasError = true;
        }

        setEditErrors(newErrors);

        if (hasError) return;

        setUploading(true);
        try {
            let coverUrl = editedBook.cover;

            // Jika ada cover baru yang diupload
            if (editCover.file) {
                coverUrl = await bookServiceLocal.uploadImage(editCover.file);
            }

            // Upload PDF jika ada
            const ebook = bookServiceLocal.getEbookByBookId(editedBook.id_buku);

            let pdfUrl = ebook?.file_path ?? "";

            if (editPdfFile) {
                pdfUrl = await bookServiceLocal.uploadPdf(editPdfFile);
            }

            // PASTIKAN: update buku dengan id_kategori dari editedBook
            const updateData = {
                judul: editedBook.judul,
                penulis: editedBook.penulis,
                penerbit: editedBook.penerbit,
                tahun_terbit: editedBook.tahun_terbit,
                status_ketersediaan: editedBook.status_ketersediaan,
                tipe: editedBook.tipe,
                jumlah: editedBook.jumlah,
                cover: coverUrl,
                id_kategori: editedBook.id_kategori || [], // <-- PASTIKAN INI
            };

            console.log("Updating book with categories:", updateData.id_kategori); // Debug

            bookServiceLocal.updateBook(editedBook.id_buku, updateData);

            if (
                editedBook.tipe === "ebook" ||
                editedBook.tipe === "keduanya"
            ) {
                bookServiceLocal.updateEbook(
                    editedBook.id_buku,
                    {
                        file_path: pdfUrl,
                        format: "pdf",
                    }
                );
            }

            if (editedBook.tipe === "fisik") {
                bookServiceLocal.deleteEbook(editedBook.id_buku);
            }

            loadData();
            setIsEditing(false);
            setShowDetail(false);
            setEditCover({ file: null, preview: "" });
            setEditPdfFile(null);
            setEditErrors({
                judul: "",
                penulis: "",
                penerbit: "",
                kategori: "",
                pdf:"",
            });
            toast.success("Buku berhasil diperbarui!");
        } catch (err) {
            console.error("Error updating book:", err);
            toast.error("Gagal mengupdate buku. Silakan coba lagi.");
        } finally {
            setUploading(false);
        }
        bookServiceLocal.addSuperadminLog("Superadmin","Daftar Buku","Edit",`Mengubah buku: ${editedBook.judul}`);
    };

    // HANDLE HAPUS BUKU
    const handleDeleteBook = () => {
        if (!selectedBook) return;

        try {
            bookServiceLocal.deleteBook(selectedBook.id_buku);
            loadData();
            setShowDeleteModal(false);
            toast.success("Buku berhasil dihapus!");
        } catch (err) {
            console.error("Error deleting book:", err);
            toast.error("Gagal menghapus buku. Silakan coba lagi.");
        }
        bookServiceLocal.addSuperadminLog("Superadmin", "Daftar Buku", "Hapus", `Menghapus buku: ${selectedBookTitle}`);
    };

    // Reset form
    const resetForm = () => {
        setNewBook(defaultBook);
        setSelectedCover({ file: null, preview: "/images/default-image.jpg" });
        setPdfFile(null);
        setErrors({
            judul: "",
            penulis: "",
            penerbit: "",
            kategori: "",
            cover: "",
            pdf: "",
        });
        setEditErrors({
            judul: "",
            penulis: "",
            penerbit: "",
            kategori: "",
            pdf: "",
        });
    };

    // Handle cover change
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedCover({
            file,
            preview: URL.createObjectURL(file),
        });
        setErrors({
            ...errors,
            cover: "",
        });
    };

    // Edit PDF
    const [editPdfFile, setEditPdfFile] = useState<File | null>(null);

    const ebook =
    selectedBook
        ? bookServiceLocal.getEbookByBookId(selectedBook.id_buku)
        : null;

    // Preview Kategori
    const getKategoriPreview = (idKategori: number[]) => {
        const kategori = idKategori.map((id) => categoriesList.find((k) => k.id_kategori === id)?.nama_kategori).filter(Boolean);
        return kategori.length <= 2
            ? kategori.join(", ")
            : `${kategori[0]}, ${kategori[1]}, ...`;
    };

    return (
        <div className={`${inter.className} bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm`}>
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                    Daftar Buku
                </h1>

                <button 
                    onClick={() => setShowTambah(true)}
                    className="w-full sm:w-auto bg-[#2B87DA] text-white px-5 py-2 rounded-lg hover:bg-[#236fb4] cursor-pointer"
                >
                    + Tambah Buku
                </button>

            </div>

            {/* FILTER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2">

                    <button onClick={() => setFilterType("all")}
                        className={`px-6 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "all" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        Semua Daftar
                    </button>

                    <button onClick={() => setFilterType("fisik")}
                        className={`px-5 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "fisik" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        Buku Fisik
                    </button>

                    <button onClick={() => setFilterType("ebook")}
                        className={`px-5 py-2 border rounded-full font-medium transition-all cursor-pointer
                            ${filterType === "ebook" ? "bg-[#2B87DA] text-white" : "hover:bg-[#2B87DA] hover:text-white"}`}
                    >
                        E-Book
                    </button>

                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium text-gray-700 whitespace-nowrap">
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
                        <option value="jumlah_desc">Jumlah Terbanyak</option>
                        <option value="jumlah_asc">Jumlah Tersedikit</option>
                    </select>
                </div>

                <input type="text" placeholder="Cari Judul Buku..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full lg:w-[320px] h-[42px] border border-gray-300 rounded-lg px-4 outline-none focus:border-[#2B87DA]"/>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : (
                    <>
                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="pr-6 text-left py-3">
                                        No
                                    </th>

                                    <th className="pr-6 text-left py-3">
                                        Cover
                                    </th>

                                    <th className="pr-6 text-left py-3">
                                        Judul Buku
                                    </th>

                                    <th className="pr-6 text-left py-3">
                                        Jumlah
                                    </th>

                                    <th className="pr-6 text-left py-3">
                                        Tipe
                                    </th>

                                    <th className="pr-6 text-left py-3">
                                        Kategori
                                    </th>

                                    <th className="pr-6 text-center py-3">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentBooks.map((book, index) => {

                                    return (
                                        <tr key={book.id_buku} className="border-b">
                                            <td className="pr-6">
                                                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                            </td>

                                            <td>
                                                <img
                                                    src={book.cover}
                                                    alt={book.judul}
                                                    className="
                                                        w-16
                                                        h-20
                                                        object-cover
                                                        rounded
                                                        border
                                                    "
                                                />
                                            </td>

                                            <td>
                                                {book.judul}
                                            </td>

                                            <td>
                                                {book.jumlah}
                                            </td>

                                            <td className="capitalize">
                                                {book.tipe}
                                            </td>

                                            <td title={getKategoriName(book.id_kategori)}>
                                                {getKategoriPreview(book.id_kategori)}
                                            </td>

                                            <td>

                                                <div className="flex flex-col sm:flex-row justify-center gap-2">

                                                    <button onClick={() => {
                                                            setSelectedBook(book);
                                                            setEditedBook({ 
                                                                ...book,
                                                                id_kategori: [...book.id_kategori] 
                                                            });
                                                            setEditCover({ file: null, preview: "" });
                                                            setIsEditing(false);
                                                            setShowDetail(true);
                                                        }}
                                                        className="bg-[#2B87DA] text-white px-3 py-1 rounded text-sm cursor-pointer"
                                                    >
                                                        Detail
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedBook(book);
                                                            setSelectedBookTitle(book.judul);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all cursor-pointer"
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>
                    </>
                    )}
                
                    {/* POP UP DETAIL & EDIT BUKU */}
                    {showDetail && selectedBook && editedBook && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white w-[95%] max-w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-4 md:p-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold">Detail Buku</h2>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={
                                                editCover.preview || 
                                                (editedBook.cover && editedBook.cover !== "/images/default-image.jpg" 
                                                    ? editedBook.cover 
                                                    : "/images/default-image.jpg")
                                            }
                                            alt={editedBook.judul}
                                            className="w-full md:w-[220px] h-[320px] object-cover rounded-xl border"
                                        />
                                        
                                        {isEditing && (
                                            <div className="mt-4 w-full">
                                                <input
                                                    id="edit-cover-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={handleEditCoverChange}
                                                />
                                                <label
                                                    htmlFor="edit-cover-upload"
                                                    className="w-full bg-[#2B87DA] text-white px-4 py-2 rounded-lg cursor-pointer text-center block hover:bg-[#236fb4]"
                                                >
                                                    Ubah Cover
                                                </label>
                                                {editCover.file && (
                                                    <p className="text-sm text-green-600 mt-2 text-center">
                                                        Cover baru dipilih
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-gray-500">Judul Buku</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editedBook.judul}
                                                        onChange={(e) => {setEditedBook({...editedBook,judul: e.target.value,});
                                                            setEditErrors({...editErrors,judul: "",});
                                                        }}
                                                        className={`w-full border rounded-lg px-3 py-2 ${editErrors.judul ? "border-red-500" : ""}`}
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{selectedBook.judul}</p>
                                                )}
                                                {editErrors.judul && (<p className="mt-1 text-sm text-red-500">{editErrors.judul}</p>)}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Penulis</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editedBook.penulis}
                                                        onChange={(e) => {setEditedBook({...editedBook,penulis: e.target.value,});
                                                            setEditErrors({...editErrors,penulis: "",});
                                                        }}
                                                        className={`w-full border rounded-lg px-3 py-2 ${editErrors.penulis ? "border-red-500" : ""}`}
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{selectedBook.penulis}</p>
                                                )}
                                                {editErrors.penulis && (<p className="mt-1 text-sm text-red-500">{editErrors.penulis}</p>)}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Penerbit</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editedBook.penerbit}
                                                        onChange={(e) => {setEditedBook({...editedBook,penerbit: e.target.value,});
                                                            setEditErrors({...editErrors,penerbit: "",});
                                                        }}
                                                        className={`w-full border rounded-lg px-3 py-2 ${editErrors.penerbit ? "border-red-500" : ""}`}
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{selectedBook.penerbit}</p>
                                                )}
                                                {editErrors.penerbit && (<p className="mt-1 text-sm text-red-500">{editErrors.penerbit}</p>)}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Tahun Terbit</p>
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={editedBook.tahun_terbit}
                                                        onChange={(e) =>
                                                            setEditedBook({ ...editedBook, tahun_terbit: Number(e.target.value) })
                                                        }
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{selectedBook.tahun_terbit}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Status Ketersediaan</p>
                                                {isEditing ? (
                                                    <select
                                                        value={editedBook.status_ketersediaan}
                                                        onChange={(e) =>
                                                            setEditedBook({ ...editedBook, status_ketersediaan: e.target.value })
                                                        }
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    >
                                                        <option value="tersedia">Tersedia</option>
                                                        <option value="tidak tersedia">Tidak Tersedia</option>
                                                    </select>
                                                ) : (
                                                    <p className="font-semibold capitalize">{selectedBook.status_ketersediaan}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Tipe</p>
                                                {isEditing ? (
                                                    <select
                                                        value={editedBook.tipe}
                                                        onChange={(e) => {const tipe = e.target.value;
                                                            setEditedBook({...editedBook,tipe,jumlah: tipe === "ebook" ? 1 : editedBook.jumlah,});
                                                            if (tipe === "fisik") {
                                                                setEditPdfFile(null);
                                                                setEditErrors({...editErrors,pdf: "",});
                                                            }
                                                        }}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    >
                                                        <option value="fisik">Fisik</option>
                                                        <option value="ebook">E-Book</option>
                                                        <option value="keduanya">Keduanya</option>
                                                    </select>
                                                ) : (
                                                    <p className="font-semibold capitalize">{selectedBook.tipe}</p>
                                                )}
                                            </div>
                                            {(editedBook.tipe === "ebook" || editedBook.tipe === "keduanya") && (
                                                <div>
                                                    <p className="text-gray-500">File PDF E-Book</p>
                                                    <p className="font-semibold">{ebook?.file_path ?? "-"}</p>
                                                    {isEditing && (
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            className="w-full border rounded-lg px-3 py-2 mt-2"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setEditPdfFile(file);
                                                                    setEditErrors({...editErrors,pdf: "",});
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    {editErrors.pdf && (<p className="mt-2 text-sm text-red-500">{editErrors.pdf}</p>)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-gray-500">Kategori</p>
                                                {isEditing ? (
                                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                                                        {categoriesList.map((kategori) => {
                                                            const isChecked = editedBook.id_kategori?.includes(kategori.id_kategori) || false;
                                                            return (
                                                                <label key={kategori.id_kategori} className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={kategori.id_kategori}
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            const id = Number(e.target.value);
                                                                            if (e.target.checked) {
                                                                                setEditedBook({
                                                                                    ...editedBook,
                                                                                    id_kategori: [...(editedBook.id_kategori || []), id],
                                                                                });
                                                                            } else {
                                                                                setEditedBook({
                                                                                    ...editedBook,
                                                                                    id_kategori: (editedBook.id_kategori || []).filter(
                                                                                        (item) => item !== id
                                                                                    ),
                                                                                });
                                                                            }
                                                                            setEditErrors({...editErrors,kategori: "",});
                                                                        }}
                                                                    />
                                                                    {kategori.nama_kategori}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="font-semibold">{getKategoriName(editedBook.id_kategori || [])}</p>
                                                )}
                                                {editErrors.kategori && (<p className="mt-2 text-sm text-red-500">{editErrors.kategori}</p>)}
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Jumlah Buku</p>
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={editedBook.jumlah}
                                                        onChange={(e) =>
                                                            setEditedBook({ ...editedBook, jumlah: Number(e.target.value) })
                                                        }
                                                        disabled={editedBook.tipe === "ebook"}
                                                        className={`w-full border rounded-lg px-3 py-2 ${
                                                            editedBook.tipe === "ebook"
                                                                ? "bg-gray-100 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{selectedBook.jumlah}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-8">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleEditBook}
                                                disabled={uploading}
                                                className={`bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer ${
                                                    uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                                                }`}
                                            >
                                                {uploading ? "Menyimpan..." : "Simpan"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditedBook(selectedBook ? { ...selectedBook } : null);
                                                    setEditCover({ file: null, preview: "" });
                                                    setEditErrors({
                                                        judul: "",
                                                        penulis: "",
                                                        penerbit: "",
                                                        kategori: "",
                                                        pdf: "",
                                                    });
                                                    setEditPdfFile(null);
                                                    setIsEditing(false);
                                                }}
                                                className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowDetail(false);
                                                    setIsEditing(false);
                                                    setEditCover({ file: null, preview: "" });
                                                    setEditErrors({
                                                        judul: "",
                                                        penulis: "",
                                                        penerbit: "",
                                                        kategori: "",
                                                        pdf: "",
                                                    });
                                                    setEditPdfFile(null);
                                                }}
                                                className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                                            >
                                                Tutup
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    if (selectedBook) {
                                                        setEditedBook({ 
                                                            ...selectedBook,
                                                            id_kategori: [...selectedBook.id_kategori] 
                                                        });
                                                    }
                                                }}
                                                className="bg-[#2B87DA] text-white px-6 py-2 rounded-lg cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowDetail(false);
                                                    setEditCover({file: null,preview: "",});
                                                    setEditPdfFile(null);
                                                    setEditErrors({
                                                        judul: "",
                                                        penulis: "",
                                                        penerbit: "",
                                                        kategori: "",
                                                        pdf: "",
                                                    });
                                                }}
                                                className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                                            >
                                                Tutup
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POP UP TAMBAH BUKU */}
                    {showTambah && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-x-auto">
                            <div className="bg-white w-[95%] max-w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-4 md:p-6">
                                <h2 className="text-2xl font-bold mb-6">Tambah Buku</h2>
                                <div className="flex flex-col xl:flex-row gap-6">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={selectedCover.preview}
                                            alt="Preview Cover"
                                            className="w-[220px] h-[320px] object-cover rounded-xl border"
                                        />
                                        <input
                                            id="cover-upload"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleCoverChange}
                                        />
                                        <label
                                            htmlFor="cover-upload"
                                            className="mt-4 w-full bg-[#2B87DA] text-white px-4 py-2 rounded-lg cursor-pointer text-center block hover:bg-[#236fb4]"
                                        >
                                            Pilih Cover
                                        </label>
                                        {errors.cover && (<p className="mt-2 text-sm text-red-500 text-center">{errors.cover}</p>)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="font-medium">Judul Buku</label>
                                                <input
                                                    type="text"
                                                    value={newBook.judul}
                                                    onChange={(e) => {setNewBook({...newBook,judul: e.target.value,});
                                                        setErrors({...errors,judul: "",});
                                                    }}
                                                    className={`w-full border rounded-lg px-3 py-2 ${errors.judul ? "border-red-500" : ""}`}
                                                />
                                                {errors.judul && (<p className="mt-1 text-sm text-red-500">{errors.judul}</p>)}
                                            </div>
                                            <div>
                                                <label className="font-medium">Penulis</label>
                                                <input
                                                    type="text"
                                                    value={newBook.penulis}
                                                    onChange={(e) => {setNewBook({ ...newBook, penulis: e.target.value,});
                                                        setErrors({...errors,penulis: "",});
                                                    }}
                                                    className={`w-full border rounded-lg px-3 py-2 ${errors.penulis ? "border-red-500" : ""}`}
                                                />
                                                {errors.penulis && (<p className="mt-1 text-sm text-red-500">{errors.penulis}</p>)}
                                            </div>
                                            <div>
                                                <label className="font-medium">Penerbit</label>
                                                <input
                                                    type="text"
                                                    value={newBook.penerbit}
                                                    onChange={(e) => {setNewBook({ ...newBook, penerbit: e.target.value,});
                                                        setErrors({...errors,penerbit: "",});
                                                    }}
                                                    className={`w-full border rounded-lg px-3 py-2 ${errors.penerbit ? "border-red-500" : ""}`}
                                                />
                                                {errors.penerbit && (<p className="mt-1 text-sm text-red-500">{errors.penerbit}</p>)}
                                            </div>
                                            <div>
                                                <label className="font-medium">Tahun Terbit</label>
                                                <input
                                                    type="number"
                                                    value={newBook.tahun_terbit}
                                                    onChange={(e) =>
                                                        setNewBook({ ...newBook, tahun_terbit: Number(e.target.value) })
                                                    }
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-medium">Status Ketersediaan</label>
                                                <select
                                                    value={newBook.status_ketersediaan}
                                                    onChange={(e) =>
                                                        setNewBook({ ...newBook, status_ketersediaan: e.target.value })
                                                    }
                                                    className="w-full border rounded-lg px-3 py-2"
                                                >
                                                    <option value="tersedia">Tersedia</option>
                                                    <option value="tidak tersedia">Tidak Tersedia</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="font-medium">Tipe</label>
                                                <select
                                                    value={newBook.tipe}
                                                    onChange={(e) => {
                                                        const tipe = e.target.value;
                                                        setNewBook({
                                                            ...newBook,
                                                            tipe,
                                                            jumlah: tipe === "ebook" ? 1 : newBook.jumlah,
                                                        });
                                                        if (tipe === "fisik") {
                                                            setPdfFile(null);
                                                        }
                                                    }}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                >
                                                    <option value="fisik">Fisik</option>
                                                    <option value="ebook">E-Book</option>
                                                    <option value="keduanya">Keduanya</option>
                                                </select>
                                            </div>
                                            {(newBook.tipe === "ebook" || newBook.tipe === "keduanya") && (
                                                <div>
                                                    <label className="block mb-2 font-medium">File PDF E-Book</label>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => {
                                                            setPdfFile(e.target.files?.[0] ?? null);
                                                            setErrors({...errors,pdf: "",});
                                                        }}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                    {errors.pdf && (<p className="mt-2 text-sm text-red-500">{errors.pdf}</p>)}
                                                    {pdfFile && (
                                                        <p className="mt-2 text-sm text-green-600">{pdfFile.name}</p>
                                                    )}
                                                </div>
                                            )}
                                            <div>
                                                <label className="font-medium">Kategori</label>
                                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                                                    {categoriesList.map((kategori) => (
                                                        <label key={kategori.id_kategori} className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                value={kategori.id_kategori}
                                                                checked={newBook.id_kategori.includes(kategori.id_kategori)}
                                                                onChange={(e) => {
                                                                    const id = Number(e.target.value);
                                                                    if (e.target.checked) {
                                                                        setNewBook({
                                                                            ...newBook,
                                                                            id_kategori: [...newBook.id_kategori, id],
                                                                        });
                                                                    } else {
                                                                        setNewBook({
                                                                            ...newBook,
                                                                            id_kategori: newBook.id_kategori.filter(
                                                                                (item) => item !== id
                                                                            ),
                                                                        });
                                                                    }
                                                                    setErrors({...errors,kategori: "",});
                                                                }}
                                                            />
                                                            {kategori.nama_kategori}
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.kategori && (<p className="mt-2 text-sm text-red-500">{errors.kategori}</p>)}
                                            </div>
                                            <div className="mb-5">
                                                <label className="block mb-2 font-medium">Jumlah Buku</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={newBook.jumlah}
                                                    disabled={newBook.tipe === "ebook"}
                                                    onChange={(e) =>
                                                        setNewBook({
                                                            ...newBook,
                                                            jumlah: Number(e.target.value),
                                                        })
                                                    }
                                                    className={`w-full border rounded-lg px-3 py-2 ${
                                                        newBook.tipe === "ebook"
                                                            ? "bg-gray-100 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        onClick={handleAddBook}
                                        disabled={uploading}
                                        className={`bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer ${
                                            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                                        }`}
                                    >
                                        {uploading ? "Menyimpan..." : "Tambah"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowTambah(false);
                                            resetForm();
                                        }}
                                        className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POP UP HAPUS BUKU */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white w-[90%] max-w-[400px] rounded-xl p-6 shadow-xl">
                                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
                                <p className="text-gray-700 mb-6">
                                    Hapus <b>{selectedBookTitle}</b>?
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                                    >
                                        Tidak
                                    </button>
                                    <button
                                        onClick={handleDeleteBook}
                                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                    >
                                        Ya
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

            </div>
            {/*PAGINATION */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">

                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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