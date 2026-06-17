import books from "../../data/buku.json";
import kategoriList from "../../data/kategori.json";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function SuperAdminDashboard() {

    // TOTAL BUKU YANG TERSEDIA
    const totalBuku = books.length;

    // TOTAL KATEGORI
    const totalKategori = kategoriList.length;

    // TOTAL BUKU FISIK
    const totalBukuFisik =
    books.filter(
        (book) =>
            book.tipe === "fisik" ||
            book.tipe === "keduanya"
    ).length;

    // TOTAL EBOOK
    const totalEbook =
    books.filter(
        (book) =>
            book.tipe === "ebook" ||
            book.tipe === "keduanya"
    ).length;

    // FILTER BUKU TERBARU
    const bukuTerbaru =
    [...books]
        .sort(
            (a, b) =>
                b.id_buku - a.id_buku
        )
        .slice(0, 5);
    
    // KATEGORI TERATAS
    const kategoriDenganJumlah =
    kategoriList
        .map((kategori) => ({
            ...kategori,
            jumlahBuku: books.filter(
                (book) =>
                    book.id_kategori.includes(
                        kategori.id_kategori
                    )
            ).length,
        }))
        .sort(
            (a, b) =>
                b.jumlahBuku -
                a.jumlahBuku
        )
        .slice(0, 5);

    return (
        <div className={`${inter.className} space-y-6`}>

            {/* CARD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

                <div className="bg-white rounded-2xl p-6 shadow-sm border-none">
                    <h3 className="font-semibold text-gray-500">
                        Total Buku
                    </h3>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalBuku}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-500">
                        Buku Fisik
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalBukuFisik}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-500">
                        E-Book
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalEbook}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border-none">
                    <h3 className="font-semibold text-gray-500">
                        Total Kategori
                    </h3>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalKategori}
                    </h2>
                </div>

            </div>

            {/* PREVIEW */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">

                <div className="col-span-1 bg-white rounded-2xl border-none shadow-sm p-6 min-h-[320px]">

                    <h2 className="font-bold text-lg mb-4">
                        Daftar Buku Terbaru
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-1">
                                        No
                                    </th>

                                    <th className="text-left py-1">
                                        Judul Buku
                                    </th>

                                    <th className="text-left py-1">
                                        Tipe
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {bukuTerbaru.map(
                                    (book, index) => (

                                        <tr
                                            key={book.id_buku}
                                            className="border-none"
                                        >

                                            <td className="py-2">
                                                {index + 1}
                                            </td>

                                            <td>
                                                {book.judul}
                                            </td>

                                            <td className="capitalize">
                                                {book.tipe}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>

                <div className="bg-white rounded-2xl border-none shadow-sm p-6 min-h-[320px]">

                    <h2 className="font-bold text-lg mb-4">
                        Kategori Teratas
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-1">
                                        No
                                    </th>

                                    <th className="text-left py-1">
                                        Nama Kategori
                                    </th>

                                    <th className="text-left py-1">
                                        Jumlah Buku
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {kategoriDenganJumlah.map(
                                    (kategori, index) => (

                                        <tr
                                            key={
                                                kategori.id_kategori
                                            }
                                            className="border-none"
                                        >

                                            <td className="py-2">
                                                {index + 1}
                                            </td>

                                            <td>
                                                {
                                                    kategori.nama_kategori
                                                }
                                            </td>

                                            <td>
                                                {
                                                    kategori.jumlahBuku
                                                }
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {/* STATISTIK */}
            <div className="bg-white rounded-2xl border-none shadow-sm p-6 min-h-[250px] md:min-h-[300px]">

                <h2 className="font-bold text-lg mb-4">
                    Statistik Perpustakaan
                </h2>

                <div className="h-full flex items-center justify-center text-gray-400">
                    Grafik statistik akan ditampilkan di sini
                </div>
            </div>

        </div>
    );
}