import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

// HANYA DAPAT DIAKSES OLEH USER ROLE ADMIN
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="min-h-screen bg-[#F5F5F5]">

            <AdminNavbar />

            <div className="flex flex-col lg:flex-row">

                <AdminSidebar />

                <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
                    {children}
                </main>

            </div>

        </div>

    );
}