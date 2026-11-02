import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

const options = [
    { value: "featured", label: "Featured first" },
    { value: "name", label: "Name: A–Z" },
    { value: "size", label: "Shaft size: small to large" },
];

export const ProductSort = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const menu = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const closeOutside = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", closeOutside);
        const selected = menu.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
        selected?.focus();
        return () => document.removeEventListener("pointerdown", closeOutside);
    }, [open]);
    const close = () => { setOpen(false); trigger.current?.focus(); };
    const handleMenuKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") { event.preventDefault(); close(); return; }
        if (event.key === "Tab") { close(); return; }
        const buttons = Array.from(menu.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        let next: number;
        if (event.key === "ArrowDown") next = (index + 1) % buttons.length;
        else if (event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = buttons.length - 1;
        else return;
        event.preventDefault();
        buttons[next]?.focus();
    };
    return <div className="product-sort" ref={root}>
        <button ref={trigger} type="button" className="sort-trigger" aria-haspopup="menu" aria-expanded={open} aria-controls="product-sort-options" onClick={() => setOpen(!open)} onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
        }}>
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span><span className="sort-caption">Sort by</span><span>{options.find(option => option.value === value)?.label}</span></span>
            <ChevronDown size={16} aria-hidden="true" className={open ? "is-open" : ""} />
        </button>
        {open && <div ref={menu} id="product-sort-options" className="sort-options" role="menu" aria-label="Sort products" onKeyDown={handleMenuKey}>
            {options.map(option => <button key={option.value} type="button" role="menuitemradio" aria-checked={option.value === value} onClick={() => { onChange(option.value); close(); }}>
                <span>{option.label}</span><Check size={16} aria-hidden="true" className={option.value === value ? "" : "check-hidden"} />
            </button>)}
        </div>}
    </div>;
};

