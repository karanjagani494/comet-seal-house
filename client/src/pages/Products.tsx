import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
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
            <div className="intro-row"><div><p className="eyebrow">THE COMET COLLECTION</p><h1>Precision starts<br />with the <em>right fit.</em></h1></div><p>Explore a demo range of sealing components.<br />Designed to help you find your starting point.</p></div>
            <p className="demo-note"><span>ⓘ</span> Sample catalogue. Model numbers, materials, and dimensions are fictional and are not purchasing specifications.</p>
        </div>
        <div className="container catalogue">
            <aside className="catalogue-sidebar">
                <h2>Product categories</h2>
                <div className="category-filters">{categories.map(item => <button type="button" key={item.id} className={category === item.id ? "active" : ""} aria-pressed={category === item.id} onClick={() => changeCategory(item.id)}>
                    {item.name}<span>{String(item.id === "all" ? products.length : products.filter(product => product.category === item.id).length).padStart(2, "0")}</span>
                </button>)}</div>
                <div className="sidebar-help"><span className="help-icon">↗</span><h3>Not sure what<br />you need?</h3><p>Start with your application. We’ll take it from there.</p><Link className="text-link" to="/contact-us">Talk to the team →</Link></div>
            </aside>
            <div className="catalogue-main">
                <div className="catalogue-toolbar">
                    <label className="search"><span aria-hidden="true">⌕</span><span className="sr-only">Search products</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name, model, application..." autoComplete="off" /></label>
                    <label className="sort"><span className="sr-only">Sort products</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured first</option><option value="name">Name: A–Z</option><option value="size">Shaft size: small to large</option></select></label>
                </div>
                <div className="results-row"><span role="status">Showing {visible.length} of {products.length} demo products</span><span>ILLUSTRATIVE PRODUCT IMAGERY</span></div>
                <ProductGrid products={visible} />
                {visible.length === 0 && <div className="empty-state"><h3>No matching seals found.</h3><p>Try a different model, application, or category.</p><button type="button" className="button primary" onClick={() => { changeCategory("all"); setQuery(""); setSort("featured"); }}>Reset filters</button></div>}
                <div className="catalogue-note"><span>✳</span><p>Have a drawing or an existing part?<br /><strong>Use it as the starting point for your enquiry.</strong></p><Link className="text-link" to="/contact-us">Discuss a requirement ↗</Link></div>
            </div>
        </div>
    </>;
};

