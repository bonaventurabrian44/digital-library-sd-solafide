import type { Metadata } from "next"; 
import LoginForm from "../../components/LoginForm";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Masuk | Digital Library SD Solafide",
}

export default function LoginPage() {
    return (
        <div className={`${openSans.className} min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2B87DA] to-[#0DD0B9] p-6`}>
            <LoginForm />
        </div>
    );
}