"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalSlider({
    children,
}: {
    children: React.ReactNode;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;

        if (!el) return;

        setShowLeft(el.scrollLeft > 0);

        setShowRight(
        el.scrollLeft <
            el.scrollWidth - el.clientWidth - 5
        );
    };

    useEffect(() => {
        checkScroll();

        const el = scrollRef.current;

        if (!el) return;

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scrollLeft = () => {
        const el = scrollRef.current;

        if (!el) return;

        el.scrollBy({
            left: -el.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        const el = scrollRef.current;

        if (!el) return;

        el.scrollBy({
            left: el.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full max-w-full overflow-hidden">

        {showLeft && (
            <button
            onClick={scrollLeft}
            className="absolute
    left-2
    top-1/2
    -translate-y-1/2
    z-10
    bg-white/90
    shadow
    rounded-full
    p-2"
            >
            <ChevronLeft size={24} />
            </button>
        )}

        {showRight && (
            <button
            onClick={scrollRight}
            className="absolute
    right-2
    top-1/2
    -translate-y-1/2
    z-10
    bg-white/90
    shadow
    rounded-full
    p-2"
            >
            <ChevronRight size={24} />
            </button>
        )}

        <div className="overflow-hidden">
            <div
                ref={scrollRef}
                className="flex
                gap-4
                px-4
                py-4
                overflow-x-auto
                overflow-y-hidden
                w-full
                max-w-full
                scrollbar-hide
                scroll-smooth"
            >
                {children}
            </div>
        </div>

        </div>
    );
}