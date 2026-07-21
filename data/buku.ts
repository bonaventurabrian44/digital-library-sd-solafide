// data/buku.ts
import bukuData from "./buku.json";

export type Book = {
    id_buku: number;
    judul: string;
    cover: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: number;
    status_ketersediaan: string;
    tipe: string;
    id_kategori: number[];
    jumlah: number;
};

export type Kategori = {
    id_kategori: number;
    nama_kategori: string;
};

export type Ebook = {
    id_ebook: number;
    id_buku: number;
    file_path: string;
    format: string;
};

export const initialBooks = bukuData;