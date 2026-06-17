import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F5F5F5]">

            {/* NAVBAR */}
            <Navbar />

            {/* SIDEBAR + CONTENT */}
            <div className="flex flex-col lg:flex-row">

                <UserSidebar />

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}