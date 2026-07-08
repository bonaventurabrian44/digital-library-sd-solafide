import type { Metadata } from "next";
import BooksClient from "./BooksClient";

export const metadata: Metadata = {
    title: "Buku Perpustakaan | Digital Library SD Solafide",
};

export default function BooksPage() {
    return <BooksClient />;
}