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
    return (
        <div className="min-h-screen bg-[#F3F3F3]">
            <Navbar />

            <div className={`${inter.className} w-[86%] mx-auto py-8`}>

                {/* Welcome */}
                <h1 className="text-[42px] font-bold mb-8">
                SELAMAT DATANG,{" "}
                <span className="text-[#2B87DA]">USER!</span>
                </h1>

                <div className="w-full h-[1px] bg-black my-6"></div>

                {/* Top Section */}
                <div className="flex justify-between items-start mb-12">

                    {/* LEFT */}
                    <div className="flex gap-6">

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
                    <StatusCard />

                </div>

                {/* Recommendation */}
                <div>

                <div className="flex items-center gap-4 mb-6">

                    <h2 className="font-bold text-[28px] whitespace-nowrap">
                    REKOMENDASI BUKU UNTUK KAMU
                    </h2>

                    <div className="h-[1px] bg-black w-full"></div>

                </div>

                <div className="flex justify-center gap-6">

                    <RecommendationCard />
                    <RecommendationCard />
                    <RecommendationCard />
                    <RecommendationCard />
                    <RecommendationCard />

                </div>

                </div>

            </div>

            <Footer />
        </div>
    );
}