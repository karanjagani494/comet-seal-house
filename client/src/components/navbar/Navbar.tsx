import { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";
import { products } from "@/lib/catalogue";

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    return <header className="header" onKeyDown={event => {
        if (event.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); }
    }}>
        <div className="container header-inner">
            <div onClick={() => setOpen(false)}><Logo /></div>
            <nav className="desktop-nav" aria-label="Main navigation">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/products">Products <span className="nav-count">{String(products.length).padStart(2, "0")}</span></NavLink>
                <NavLink to="/about-us">About Us</NavLink>
            </nav>
            <div className="contact-nav"><Link className="button primary" to="/contact-us">Contact Us <span aria-hidden="true">↗</span></Link></div>
            <button ref={toggleRef} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        <nav id="mobile-menu" hidden={!open} aria-label="Mobile navigation">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link to="/about-us" onClick={() => setOpen(false)}>About Us</Link>
            <Link className="button primary" to="/contact-us" onClick={() => setOpen(false)}>Contact Us <span aria-hidden="true">↗</span></Link>
        </nav>
    </header>;
};

