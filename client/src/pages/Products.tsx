import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { ProductSort } from "@/components/catalogue/ProductSort";
import { Search, X } from "lucide-react";
import { categories, products, filterProducts } from "@/lib/catalogue";

export const ProductsPage = () => {
    const [params, setParams] = useSearchParams();
    const requestedCategory = params.get("category") ?? "all";
    const category = categories.some(item => item.id === requestedCategory) ? requestedCategory : "all";
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("featured");
    const visible = filterProducts(category, query, sort);
    const changeCategory = (next: string) => {
        setParams(previous => {
            const nextParams = new URLSearchParams(previous);
            if (next === "all") nextParams.delete("category"); else nextParams.set("category", next);
            return nextParams;
        }, { preventScrollReset: true });
    };
    return <>
        <div className="page-intro container">
            <p className="breadcrumb"><Link to="/">Home</Link> / Products</p>
            <div className="intro-row"><div><p className="eyebrow">THE COMET COLLECTION</p><h1>Precision starts<br />with the <em>right fit.</em></h1></div><p>Explore our range of sealing components.<br />Find the right starting point for your application.</p></div>
        </div>
        <div className="container catalogue">
            <aside className="catalogue-sidebar">
                <h2>Product categories</h2>
                <div className="category-filters">{categories.map(item => <button type="button" key={item.id} className={category === item.id ? "active" : ""} aria-pressed={category === item.id} onClick={() => changeCategory(item.id)}>
                    {item.name}<span>{String(item.id === "all" ? products.length : products.filter(product => product.category === item.id).length).padStart(2, "0")}</span>
                </button>)}</div>
                <div className="sidebar-help"><span className="help-icon">↗</span><h3>Not sure what<br />you need?</h3><p>Start with your application. We’ll take it from there.</p><Link className="text-link" to="/contact-us">Talk to the team <span aria-hidden="true">→</span></Link></div>
            </aside>
            <div className="catalogue-main">
                <div className="catalogue-toolbar">
                    <label className="search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search products</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name, model, application..." autoComplete="off" /></label>
                    <ProductSort value={sort} onChange={setSort} />
                </div>
                <div className="results-row"><span role="status">Showing {visible.length} of {products.length} products</span>{(query || category !== "all" || sort !== "featured") && <button type="button" className="clear-filters" onClick={() => { changeCategory("all"); setQuery(""); setSort("featured"); }}>Clear filters <X size={14} aria-hidden="true" /></button>}</div>
                <ProductGrid products={visible} />
                {visible.length === 0 && <div className="empty-state"><h3>No matching seals found.</h3><p>Try a different model, application, or category.</p><button type="button" className="button primary" onClick={() => { changeCategory("all"); setQuery(""); setSort("featured"); }}>Reset filters</button></div>}
                <div className="catalogue-note"><span>✳</span><p>Have a drawing or an existing part?<br /><strong>Use it as the starting point for your enquiry.</strong></p><Link className="text-link" to="/contact-us">Discuss a requirement <span aria-hidden="true">↗</span></Link></div>
            </div>
        </div>
    </>;
};

