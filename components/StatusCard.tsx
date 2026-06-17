import Link from "next/link";

export default function StatusCard() {
    return (
        <div className="w-full max-w-[320px] bg-white border p-3 shadow-sm">

        <div className="flex flex-col gap-3">

            <div className="bg-[#1E88E5] text-white p-4">
            <p className="font-bold">BUKU SEDANG DIPINJAM</p>
            <p>0 BUKU</p>
            </div>

            <div className="bg-[#E53935] text-white p-4">
            <p className="font-bold">DENDA</p>
            <p>Rp 0</p>
            </div>

            <div className="bg-[#0F9D58] text-white p-4">
            <p className="font-bold">RIWAYAT PEMINJAMAN</p>

            <button className="mt-2 bg-[#006837] hover:bg-[#00552D] text-white px-3 py-1 text-sm font-medium cursor-pointer">
                <Link href="/profile?menu=riwayat">LIHAT DETAIL</Link>
            </button>
            </div>

        </div>

        </div>
    );
}