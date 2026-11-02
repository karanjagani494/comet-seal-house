import { useState } from "react";
import { categoryName, type Product } from "@/lib/catalogue";
import { ProductDialog } from "./ProductDialog";

export const ProductGrid = ({ products, featured = false }: { products: Product[]; featured?: boolean }) => {
    const [selected, setSelected] = useState<Product | null>(null);
    return <>
        <div className={`product-grid ${featured ? "featured-grid" : ""}`}>
            {products.map(product => <article className="product-card" key={product.code}>
                <button type="button" className="product-image" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                    <span className="card-code">{product.code}</span>
                    <span className={`product-picture pic-${product.image}`} aria-hidden="true" />
                    <span className="card-arrow" aria-hidden="true">↗</span>
                </button>
                <p className="card-category">{categoryName(product.category)}</p>
                <h3><button type="button" className="text-link product-title" onClick={() => setSelected(product)}>{product.name}</button></h3>
                <div className="card-meta"><span>Ø {product.size} mm</span><button type="button" className="card-details" onClick={() => setSelected(product)}>View details <span aria-hidden="true">↗</span></button></div>
            </article>)}
        </div>
        {selected && <ProductDialog product={selected} onClose={() => setSelected(null)} />}
    </>;
};

