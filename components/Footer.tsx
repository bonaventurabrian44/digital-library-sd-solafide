import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export default function Footer() {
    return (
        <footer
            className=
            {`${inter.className}
                mt-20
                bg-gradient-to-b
                from-[#2B87DA]
                to-[#33D0B2]
                text-white
            `}
        >
            <div className="w-[86%] mx-auto py-4">

                {/* LOGO + JUDUL */}
                <div className="flex items-center justify-between">

                    <img
                        src="/logo.png"
                        alt="SD Solafide"
                        width={80}
                        height={80}
                    />

                    <h2 className="text-[14px] font-semibold">
                        Perpustakaan Digital SD Solafide
                    </h2>

                </div>

                {/* GARIS */}
                <hr className="my-4 border-white/60" />

                {/* ALAMAT */}
                <div className="max-w-3xl">

                    <p className="text-[14px] leading-relaxed">
                        Jl. Kh. Hasyim Ashari,
                        Banaran Barat,
                        Bandarjo,
                        Kec. Ungaran Barat,
                        Kabupaten Semarang,
                        Jawa Tengah
                    </p>

                </div>

                {/* GARIS */}
                <hr className="my-4 border-white/60" />

                {/* COPYRIGHT */}
                <p className="text-[14px]">
                    © 2026 SD Solafide
                </p>

            </div>
        </footer>
    );
}