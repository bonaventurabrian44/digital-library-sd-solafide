import type { Metadata } from "next";
import EbookClient from "./EbookClient";

export const metadata: Metadata = {
    title: "Buku Perpustakaan | Digital Library SD Solafide",
};

export default function BooksPage() {
    return <EbookClient />;
}