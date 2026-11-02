import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";
import { NavLinks } from "@/lib/constants";

export const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    return <nav aria-label="Mobile navigation" className="w-full px-5 py-3 md:hidden" onKeyDown={event => {
        if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    }}>
        <div className="flex items-center justify-between gap-4">
            <Logo />
            <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="rounded-md p-2" onClick={() => setOpen(!open)}>
                {open ? <X /> : <Menu />}
            </button>
        </div>
        <div id="mobile-menu" hidden={!open} className="pt-4 pb-2">
            <ul className="space-y-1">
                {NavLinks.map(link => <li key={link.label}>
                    <Link to={link.href} className="block rounded-md px-3 py-2 font-medium hover:bg-muted" onClick={() => setOpen(false)}>{link.label}</Link>
                    {link.submenu && <ul className="pl-4 text-sm">{link.items.map(item => <li key={item.href}><Link to={item.href} className="block px-3 py-2" onClick={() => setOpen(false)}>{item.label}</Link></li>)}</ul>}
                </li>)}
                <li><Link to="/contact-us" className="block rounded-md bg-primary px-3 py-2 text-primary-foreground" onClick={() => setOpen(false)}>Contact Us</Link></li>
            </ul>
        </div>
    </nav>;
};

