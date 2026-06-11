import Link from "next/link";

export default function AdminNavbar() {
    return (
        <nav
            className="
                h-[60px]
                bg-gradient-to-r
                from-[#2B87DA]
                to-[#33D0B2]
                flex
                items-center
                justify-between
                px-10
            "
        >
            <div className="flex items-center gap-3">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[120px] object-contain"
                />

            </div>

            <div className="flex items-center gap-3">

                <button>
                    <img
                        src="/icons/account.png"
                        alt="Profile"
                        className="w-9 h-9"
                    />
                </button>

            </div>

        </nav>
    );
}