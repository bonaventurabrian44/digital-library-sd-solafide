import type { Metadata } from "next"; 
import RegisterForm from "../../components/RegisterForm";

export const metadata: Metadata = {
    title: "Daftar | Digital Library SD Solafide",
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2B87DA] to-[#0DD0B9] p-6">
            <RegisterForm />
        </div>
    );
}