// services/bookServiceLocal.ts
import { Book, Kategori, Ebook } from "@/data/buku";
import { LogAktivitas } from "@/data/logsuperadmin";

import kategoriData from "@/data/kategori.json";
import logData from "@/data/logsuperadmin.json";    
import siswaData from "@/data/siswa.json"

type Siswa = typeof siswaData[number];

// Key untuk localStorage
const BOOKS_STORAGE_KEY = "solafide_books";
const KATEGORI_STORAGE_KEY = "solafide_kategori";
const EBOOK_STORAGE_KEY = "solafide_ebook";
const SUPERADMIN_LOG_STORAGE_KEY = "solafide_superadmin_logs";
const ADMIN_LOG_STORAGE_KEY = "solafide_admin_logs";
const SISWA_STORAGE_KEY = "solafide_siswa";

// Inisialisasi data pertama kali
// services/bookServiceLocal.ts - bagian initData()

const initData = () => {
    // Initialize kategori
    if (!localStorage.getItem(KATEGORI_STORAGE_KEY)) {
        localStorage.setItem(KATEGORI_STORAGE_KEY, JSON.stringify(kategoriData));
    }

    // Initialize buku dari JSON
    if (!localStorage.getItem(BOOKS_STORAGE_KEY)) {
        import("@/data/buku.json").then((module) => {
            const books = module.default;
            localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
        });
    }

    // Initialize ebook dari JSON
    if (!localStorage.getItem(EBOOK_STORAGE_KEY)) {
        import("@/data/ebook.json").then((module) => {
            localStorage.setItem(
                EBOOK_STORAGE_KEY,
                JSON.stringify(module.default)
            );
        });
    }

    // Initialize peminjaman
    if (!localStorage.getItem("solafide_peminjaman")) {
        import("@/data/peminjaman.json").then((module) => {
            const peminjaman = module.default;
            localStorage.setItem("solafide_peminjaman", JSON.stringify(peminjaman));
        });
    }

    // Initialize siswa
    // if (!localStorage.getItem("solafide_siswa")) {
    //     import("@/data/siswa.json").then((module) => {
    //         const siswa = module.default;
    //         localStorage.setItem("solafide_siswa", JSON.stringify(siswa));
    //     });
    // }

    // Initialize denda
    // if (!localStorage.getItem("solafide_denda")) {
    //     import("@/data/denda.json").then((module) => {
    //         const denda = module.default;
    //         localStorage.setItem("solafide_denda", JSON.stringify(denda));
    //     });
    // }

    // Initialize log aktivitas admin
    if (!localStorage.getItem(ADMIN_LOG_STORAGE_KEY)) {
        localStorage.setItem(
            ADMIN_LOG_STORAGE_KEY,
            JSON.stringify(logData)
        );
    }

    // Initialize log aktivitas superadmin
    if (!localStorage.getItem(SUPERADMIN_LOG_STORAGE_KEY)) {
    localStorage.setItem(
        SUPERADMIN_LOG_STORAGE_KEY,
        JSON.stringify(logData)
    );
}

    // Initialize data siswa
    if (!localStorage.getItem(SISWA_STORAGE_KEY)) {
    localStorage.setItem(
        SISWA_STORAGE_KEY,
        JSON.stringify(siswaData)
    );
}
};
// Panggil init saat pertama kali
if (typeof window !== "undefined") {
    initData();
}

export const bookServiceLocal = {
    // ==================== BUKU ====================
    // GET ALL BOOKS
    getAllBooks(): Book[] {
        const data = localStorage.getItem(BOOKS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // GET ALL KATEGORI
    getAllKategori(): Kategori[] {
        const data = localStorage.getItem(KATEGORI_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // GET BOOK BY ID
    getBookById(id: number): Book | null {
        const books = this.getAllBooks();
        return books.find((b) => b.id_buku === id) || null;
    },

    // CREATE BOOK
    createBook(book: Omit<Book, "id_buku">): Book {
        const books = this.getAllBooks();
        const newId = books.length > 0 ? Math.max(...books.map((b) => b.id_buku)) + 1 : 1;

        const newBook: Book = {
            ...book,
            id_buku: newId,
        };

        books.push(newBook);
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

        return newBook;
    },

    // UPDATE BOOK
    updateBook(id: number, bookData: Partial<Book>): Book | null {
        const books = this.getAllBooks();
        const index = books.findIndex((b) => b.id_buku === id);

        if (index === -1) return null;

        const updatedBook: Book = {
            ...books[index],
            ...bookData,
            // PASTIKAN id_kategori tetap tersimpan
            id_kategori: bookData.id_kategori !== undefined 
                ? bookData.id_kategori 
                : books[index].id_kategori,
        };

        books[index] = updatedBook;
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

        return updatedBook;
    },

    // DELETE BOOK
    deleteBook(id:number):boolean{
    const books=this.getAllBooks();
    const filtered=
    books.filter(
    b=>b.id_buku!==id
    );

    if(filtered.length===books.length)
    return false;
    localStorage.setItem(
    BOOKS_STORAGE_KEY,
    JSON.stringify(filtered)
    );

    // hapus ebook yang terkait
    this.deleteEbook(id);
    return true;
    },

    // UPLOAD IMAGE (simulasi - convert ke base64)
    uploadImage(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // UPLOAD PDF (simulasi - simpan nama file)
    uploadPdf(file: File): Promise<string> {
        return new Promise((resolve) => {
            resolve(`/pdfs/${file.name}`);
        });
    },

    // ==================== EBOOK ====================

    // GET ALL
    getAllEbooks(): Ebook[] {
        const data = localStorage.getItem(EBOOK_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // GET BY BOOK
    getEbookByBookId(idBuku: number): Ebook | null {
        const ebooks = this.getAllEbooks();
        return ebooks.find(e => e.id_buku === idBuku) || null;
    },

    // CREATE
    createEbook(data: Omit<Ebook,"id_ebook">): Ebook {

        const ebooks = this.getAllEbooks();

        const newId =
            ebooks.length > 0
                ? Math.max(...ebooks.map(e => e.id_ebook)) + 1
                : 1;

        const ebook: Ebook = {
            ...data,
            id_ebook: newId,
        };

        ebooks.push(ebook);

        localStorage.setItem(
            EBOOK_STORAGE_KEY,
            JSON.stringify(ebooks)
        );

        return ebook;
    },

    // UPDATE
    updateEbook(idBuku: number, data: Partial<Ebook>) {

        const ebooks = this.getAllEbooks();

        const index = ebooks.findIndex(
            e => e.id_buku === idBuku
        );

        if (index === -1) {

            this.createEbook({
                id_buku: idBuku,
                file_path: data.file_path ?? "",
                format: data.format ?? "pdf",
            });

            return;
        }

        ebooks[index] = {
            ...ebooks[index],
            ...data,
        };

        localStorage.setItem(
            EBOOK_STORAGE_KEY,
            JSON.stringify(ebooks)
        );
    },

    // DELETE
    deleteEbook(idBuku:number):boolean{

        const ebooks=this.getAllEbooks();

        const filtered=
            ebooks.filter(
                e=>e.id_buku!==idBuku
            );

        localStorage.setItem(
            EBOOK_STORAGE_KEY,
            JSON.stringify(filtered)
        );

        return true;
    },

    // ==================== KATEGORI ====================
    // CREATE KATEGORI
    createKategori(namaKategori: string): Kategori {
        const categories = this.getAllKategori();
        const newId = categories.length > 0 ? Math.max(...categories.map((k) => k.id_kategori)) + 1 : 1;

        const newKategori: Kategori = {
            id_kategori: newId,
            nama_kategori: namaKategori,
        };

        categories.push(newKategori);
        localStorage.setItem(KATEGORI_STORAGE_KEY, JSON.stringify(categories));

        return newKategori;
    },

    // UPDATE KATEGORI
    updateKategori(id: number, namaKategori: string): Kategori | null {
        const categories = this.getAllKategori();
        const index = categories.findIndex((k) => k.id_kategori === id);

        if (index === -1) return null;

        const updatedKategori = {
            ...categories[index],
            nama_kategori: namaKategori,
        };

        categories[index] = updatedKategori;
        localStorage.setItem(KATEGORI_STORAGE_KEY, JSON.stringify(categories));

        return updatedKategori;
    },

    // DELETE KATEGORI
    deleteKategori(id: number): boolean {
        const categories = this.getAllKategori();
        const filtered = categories.filter((k) => k.id_kategori !== id);

        if (filtered.length === categories.length) return false;

        localStorage.setItem(KATEGORI_STORAGE_KEY, JSON.stringify(filtered));
        return true;
    },

    // GET JUMLAH BUKU PER KATEGORI
    getJumlahBukuByKategori(idKategori: number): number {
        const books = this.getAllBooks();
        return books.filter((book) => book.id_kategori.includes(idKategori)).length;
    },
    // services/bookServiceLocal.ts
    // ... tambahkan di bagian bawah

    // ==================== SISWA =======================
    // GET ALL SISWA
    getAllSiswa(): Siswa[] {
        const data = localStorage.getItem(SISWA_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    updateSiswa(id: number,data: Partial<Siswa>): Siswa | null {
        const siswa = this.getAllSiswa();
        const index = siswa.findIndex(
            (item) => item.id_siswa === id
        );

        if (index === -1) return null;
        siswa[index] = {
            ...siswa[index],
            ...data,
        };
        localStorage.setItem(
            SISWA_STORAGE_KEY,
            JSON.stringify(siswa)
        );
        return siswa[index];
    },

    // ==================== PEMINJAMAN ====================
    // GET ALL PEMINJAMAN
    getAllPeminjaman(): any[] {
        const data = localStorage.getItem("solafide_peminjaman");
        if (data) {
            return JSON.parse(data);
        }
        // Jika belum ada, import dari JSON
        import("@/data/peminjaman.json").then((module) => {
            const peminjaman = module.default;
            localStorage.setItem("solafide_peminjaman", JSON.stringify(peminjaman));
            return peminjaman;
        });
        return [];
    },

    // GET PEMINJAMAN BY ID
    getPeminjamanById(id: number): any | null {
        const peminjaman = this.getAllPeminjaman();
        return peminjaman.find((p) => p.id_pinjam === id) || null;
    },

    // CREATE PEMINJAMAN
    createPeminjaman(data: any): any {
        const peminjaman = this.getAllPeminjaman();
        const newId = peminjaman.length > 0 ? Math.max(...peminjaman.map((p) => p.id_pinjam)) + 1 : 1;

        const newPeminjaman = {
            ...data,
            id_pinjam: newId,
        };

        peminjaman.push(newPeminjaman);
        localStorage.setItem("solafide_peminjaman", JSON.stringify(peminjaman));

        return newPeminjaman;
    },

    // UPDATE DETAIL PEMINJAMAN
    updateDetailPeminjaman(idPinjam: number, idDetail: number, data: { status: string; tanggal_kembali: string | null; denda?: number }): any | null {
        const peminjaman = this.getAllPeminjaman();
        const index = peminjaman.findIndex((p) => p.id_pinjam === idPinjam);

        if (index === -1) return null;

        const detailIndex = peminjaman[index].detail.findIndex((d: any) => d.id_detail === idDetail);
        if (detailIndex === -1) return null;

        // Update detail
        peminjaman[index].detail[detailIndex] = {
            ...peminjaman[index].detail[detailIndex],
            status: data.status,
            tanggal_kembali: data.tanggal_kembali,
            denda: data.denda || 0,
        };

        const detail = peminjaman[index].detail[detailIndex];
        const denda = this.getAllDenda();

        if (detail.status === "terlambat" && detail.denda > 0) {

            const siswa = this.getAllSiswa().find(
                s => s.id_siswa === peminjaman[index].id_siswa
            );

            const buku = this.getAllBooks().find(
                b => b.id_buku === detail.id_buku
            );

            denda.push({
                id: Date.now(),
                id_detail: detail.id_detail,
                nis: siswa?.nis ?? "-",
                nama_siswa: siswa?.nama_siswa ?? "-",
                judul_buku: buku?.judul ?? "-",
                tanggal_pinjam: peminjaman[index].tanggal_pinjam,
                tanggal_jatuh_tempo: peminjaman[index].tanggal_jatuh_tempo,
                tanggal_dikembalikan: detail.tanggal_kembali ?? "-",
                denda: detail.denda,
                status: "Belum Lunas",
            });

            localStorage.setItem(
                "solafide_denda",
                JSON.stringify(denda)
            );
        }

        if (detail.status === "kembali") {

            const filtered = denda.filter(
                item => item.id_detail !== detail.id_detail
            );

            localStorage.setItem(
                "solafide_denda",
                JSON.stringify(filtered)
            );
        }

        // Update status utama peminjaman
        const allStatus = peminjaman[index].detail.map((d: any) => d.status);
        if (allStatus.every((s: string) => s === "kembali")) {
            peminjaman[index].status = "kembali";
        } else if (allStatus.some((s: string) => s === "terlambat")) {
            peminjaman[index].status = "terlambat";
        } else if (allStatus.some((s: string) => s === "dipinjam")) {
            peminjaman[index].status = "dipinjam";
        }

        localStorage.setItem("solafide_peminjaman", JSON.stringify(peminjaman));

        return peminjaman[index];
    },

    // DELETE PEMINJAMAN
    deletePeminjaman(id: number): boolean {
        const peminjaman = this.getAllPeminjaman();
        const filtered = peminjaman.filter((p) => p.id_pinjam !== id);

        if (filtered.length === peminjaman.length) return false;

        localStorage.setItem("solafide_peminjaman", JSON.stringify(filtered));
        return true;
    },

    // GET ALL SISWA (dari localStorage atau JSON)
    // getAllSiswa(): any[] {
    //     const data = localStorage.getItem("solafide_siswa");
    //     if (data) {
    //         return JSON.parse(data);
    //     }
    //     import("@/data/siswa.json").then((module) => {
    //         const siswa = module.default;
    //         localStorage.setItem("solafide_siswa", JSON.stringify(siswa));
    //         return siswa;
    //     });
    //     return [];
    // },
    // services/bookServiceLocal.ts
// ... tambahkan di bagian bawah, setelah method peminjaman

  // ==================== DENDA ====================

// GET ALL DENDA
getAllDenda(): any[] {
    const data = localStorage.getItem("solafide_denda");
    if (data) {
        return JSON.parse(data);
    }
    return [];
},

// UPDATE DENDA STATUS
updateDendaStatus(id: number, status: string): any | null {
    const denda = this.getAllDenda();
    const index = denda.findIndex((d) => d.id === id);

    if (index === -1) return null;

    denda[index].status = status;
    localStorage.setItem("solafide_denda", JSON.stringify(denda));

    return denda[index];
},

    // GENERATE DAN SINKRONKAN DENDA DARI PEMINJAMAN
    // generateDendaFromPeminjaman(): void {
    //     const peminjaman = this.getAllPeminjaman();
    //     const existingDenda = this.getAllDenda();
    //     const newDenda: any[] = [];
    //     const activeDetailIds = new Set<number>();

    //     // Kumpulkan semua id_detail yang masih aktif (terlambat)
    //     peminjaman.forEach((pinjam) => {
    //         pinjam.detail.forEach((detail: any) => {
    //             if (detail.status === "terlambat" && detail.denda > 0) {
    //                 activeDetailIds.add(detail.id_detail);
    //             }
    //         });
    //     });

    //     // Hapus denda yang sudah tidak aktif (status sudah berubah)
    //     const filteredDenda = existingDenda.filter((d) => {
    //         // Jika denda sudah Lunas, tetap pertahankan
    //         if (d.status === "Lunas") return true;
    //         // Jika denda masih Belum Lunas tapi id_detail tidak ada di active, hapus
    //         return activeDetailIds.has(d.id_detail);
    //     });

    //     // Buat denda baru untuk yang belum ada
    //     peminjaman.forEach((pinjam) => {
    //         pinjam.detail.forEach((detail: any) => {
    //             if (detail.status === "terlambat" && detail.denda > 0) {
    //                 // Cek apakah sudah ada denda (termasuk yang sudah Lunas)
    //                 const exists = filteredDenda.some(
    //                     (d) => d.id_detail === detail.id_detail
    //                 );
    //                 if (!exists) {
    //                     const siswa = this.getAllSiswa().find(
    //                         (s) => s.id_siswa === pinjam.id_siswa
    //                     );
    //                     const buku = this.getAllBooks().find(
    //                         (b) => b.id_buku === detail.id_buku
    //                     );
                        
    //                     const uniqueId = Date.now() + Math.floor(Math.random() * 1000) + detail.id_detail;
                        
    //                     filteredDenda.push({
    //                         id: uniqueId,
    //                         id_detail: detail.id_detail,
    //                         nis: siswa?.nis || "-",
    //                         nama_siswa: siswa?.nama_siswa || "-",
    //                         judul_buku: buku?.judul || "-",
    //                         tanggal_pinjam: pinjam.tanggal_pinjam,
    //                         tanggal_jatuh_tempo: pinjam.tanggal_jatuh_tempo,
    //                         tanggal_dikembalikan: detail.tanggal_kembali || "-",
    //                         denda: detail.denda,
    //                         status: "Belum Lunas",
    //                     });
    //                 }
    //             }
    //         });
    //     });

    //     // Simpan data denda yang sudah disinkronkan
    //     localStorage.setItem("solafide_denda", JSON.stringify(filteredDenda));
    // },
    // services/bookServiceLocal.ts - tambahkan di bagian bawah

// services/bookServiceLocal.ts - tambahkan di bagian bawah

// ==================== LOG AKTIVITAS SUPERADMIN ====================

    // GET ALL LOGS SUPERADMIN
    getAllSuperadminLogs(): LogAktivitas[] {
        const data = localStorage.getItem(SUPERADMIN_LOG_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // ADD LOG SUPERADMIN
    addSuperadminLog(nama: string, modul: string, aksi: string, aktivitas: string): void {
        const logs = this.getAllSuperadminLogs();
        const now = new Date();
        const tanggal = now.toISOString().split("T")[0]; // YYYY-MM-DD
        const waktu = now.toTimeString().split(" ")[0]; // HH:MM:SS

        logs.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            nama,
            modul,
            aksi,
            tanggal: `${tanggal} ${waktu}`,
            aktivitas,
        });

        // Simpan maksimal 1000 log
        if (logs.length > 1000) {
            logs.splice(0, logs.length - 1000);
        }

        localStorage.setItem(SUPERADMIN_LOG_STORAGE_KEY, JSON.stringify(logs));
    },

// ==================== LOG AKTIVITAS ADMIN ====================

    getAllAdminLogs(): LogAktivitas[] {
        const data = localStorage.getItem(ADMIN_LOG_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    addAdminLog(
        nama: string,
        modul: string,
        aksi: string,
        aktivitas: string
    ): void {
        const logs = this.getAllAdminLogs();

        const now = new Date();
        const tanggal = now.toISOString().split("T")[0];
        const waktu = now.toTimeString().split(" ")[0];

        logs.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            nama,
            modul,
            aksi,
            tanggal: `${tanggal} ${waktu}`,
            aktivitas,
        });

        if (logs.length > 1000) {
            logs.splice(0, logs.length - 1000);
        }

        localStorage.setItem(
            ADMIN_LOG_STORAGE_KEY,
            JSON.stringify(logs)
        );
    }
};
