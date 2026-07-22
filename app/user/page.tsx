import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import HomeMenuCard from "../../components/HomeMenuCard";
import StatusCard from "../../components/StatusCard";
import RecommendationCard from "../../components/RecommendationCard";
import Footer from "../../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Beranda | Digital Library SD Solafide",
};

export default function UserPage() {
    const firstName = "Budi";

    const recommendedBooks = [
        {
            id: 1,
            judul: "Bumi",
            kategori: "Dongeng",
            cover: "/images/bumi.jpg",
        },
        {
            id: 2,
            judul: "Supernova: Akar",
            kategori: "Dongeng",
            cover: "/images/supernova-akar.avif",
        },
        {
            id: 3,
            judul: "Laskar Pelangi",
            kategori: "Dongeng",
            cover: "/images/laskar-pelangi.jpg",
        },
        {
            id: 4,
            judul: "Koala Kumal",
            kategori: "Komik",
            cover: "/images/koala-kumal.jpg",
        },
        {
            id: 5,
            judul: "Negeri 5 Menara",
            kategori: "Cerita Anak",
            cover: "/images/negeri-5-menara.jpg",
        },
    ];
    return (
        <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
            <Navbar />
            <main className="flex-1">

                <div className={`${inter.className} w-[95%] md:w-[92%] lg:w-[86%] mx-auto py-6 md:py-8`}>

                    {/* Welcome */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold  mb-6  md:mb-8">
                    SELAMAT DATANG,{" "}
                    <span className="text-[#2B87DA]">{firstName.toUpperCase()}!</span>
                    </h1>

                    <div className="w-full h-[1px] bg-black my-6"></div>

                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">

                        {/* LEFT */}
                        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto">

                            <HomeMenuCard
                            title="KOLEKSI BUKU"
                            image="/homepage/bookshelf.png"
                            buttonText="LIHAT BUKU"
                            bgColor="bg-[#1E88E5]"
                            href="/books"
                            />

                            <HomeMenuCard
                            title="E-BOOK"
                            image="/homepage/ebook.png"
                            buttonText="JELAJAHI"
                            bgColor="bg-[#F7931E]"
                            href="/ebook"
                            />

                        </div>

                        {/* RIGHT */}
                        <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                            <StatusCard />
                        </div>

                    </div>

                    {/* Recommendation */}
                    <div>

                    <div className="flex items-center gap-3 mb-6">

                        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] whitespace-nowrap">
                        REKOMENDASI BUKU UNTUK KAMU
                        </h2>

                        <div className="h-[1px] bg-black w-full"></div>

                    </div>

                    {/* MENAMPILKAN 5 REKOMENDASI BUKU */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {recommendedBooks.slice(0, 5).map((book) => (
                            <RecommendationCard
                                key={book.id}
                                id={book.id}
                                title={book.judul}
                                category={book.kategori}
                                image={book.cover}
                            />
                        ))}
                    </div>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}