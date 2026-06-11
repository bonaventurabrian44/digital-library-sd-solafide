import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LibraryBookCard from "../../../components/LibraryBookCard";
import Link from "next/link";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CategoryDetailPage({
    params,
}: Props) {
    const { slug } = await params;

    const categoryName =
        slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const books = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `${categoryName} ${i + 1}`,
        image: "/buku/kisah-rumah-pohon.png",
    }));

    return (
        <div className="min-h-screen bg-[#F3F3F3]">

            <Navbar />

            <div className="w-[86%] mx-auto py-8">

                {/* HEADER */}
                <Link
                        href="/kategori"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mb-6
                            px-5
                            py-2
                            bg-[#2B87DA]
                            text-white
                            rounded-lg
                            transition-all
                            hover:bg-[#236fb4]
                        "
                    >
                        ← Kembali
                </Link>

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-[36px] font-bold">
                        {categoryName}
                    </h1>

                    <input
                        type="text"
                        placeholder="Cari Buku..."
                        className="
                            w-[280px]
                            h-[42px]
                            bg-white
                            border
                            border-gray-300
                            px-4
                            rounded-lg
                        "
                    />

                </div>

                {/* GRID BUKU */}

                <div className="grid grid-cols-5 gap-6">

                    {books.map((book) => (
                        <LibraryBookCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            image={book.image}
                        />
                    ))}

                </div>

                {/* PAGINATION */}

                <div className="flex justify-center mt-10 gap-2">

                    <button className="w-10 h-10 bg-white border rounded">
                        {"<"}
                    </button>

                    <button className="w-10 h-10 bg-[#2B87DA] text-white rounded">
                        1
                    </button>

                    <button className="w-10 h-10 bg-white border rounded">
                        2
                    </button>

                    <button className="w-10 h-10 bg-white border rounded">
                        3
                    </button>

                    <button className="w-10 h-10 bg-white border rounded">
                        {">"}
                    </button>

                </div>

            </div>

            <Footer />

        </div>
    );
}