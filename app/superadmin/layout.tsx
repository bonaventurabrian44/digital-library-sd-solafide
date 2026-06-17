import AdminNavbar from "../../components/AdminNavbar";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F5F5F5]">

            {/* NAVBAR */}
            <AdminNavbar />

            {/* SIDEBAR + CONTENT */}
            <div className="flex flex-col lg:flex-row">

                <SuperAdminSidebar />

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}