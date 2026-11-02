import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RouteScroll = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        const title = pathname === "/products" ? "Products" : pathname === "/about-us" ? "About Us" : pathname === "/contact-us" ? "Contact Us" : "";
        document.title = title ? title + " — Comet Seal House" : "Comet Seal House";
        if (hash) {
            let id = hash.slice(1);
            try { id = decodeURIComponent(id); } catch { /* Keep malformed hashes as literal IDs. */ }
            const target = document.getElementById(id);
            if (target) { target.scrollIntoView(); return; }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);
    return null;
};

