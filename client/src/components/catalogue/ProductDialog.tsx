import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { categoryName, type Product } from "@/lib/catalogue";

export const ProductDialog = ({ product, onClose }: { product: Product; onClose: () => void }) => {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog?.showModal();
        return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
    }, []);
    return <dialog ref={ref} className="product-dialog" aria-labelledby="product-detail-title" onCancel={onClose} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
        <button type="button" className="dialog-close" aria-label="Close product details" onClick={onClose}>×</button>
        <div className="detail-grid">
            <div className="detail-image" role="img" aria-label={product.name}><div className={`product-picture pic-${product.image}`} /></div>
            <div className="detail-copy">
                <p className="eyebrow">{product.code}</p>
                <h2 id="product-detail-title">{product.name}</h2>
                <p>{product.description}</p>
                <dl>
                    <dt>Category</dt><dd>{categoryName(product.category)}</dd>
                    <dt>Shaft size</dt><dd>Ø {product.size} mm</dd>
                    <dt>Material</dt><dd>{product.material}</dd>
                    <dt>Application</dt><dd>{product.application}</dd>
                </dl>
                <Link className="button primary" to={`/contact-us?product=${encodeURIComponent(product.code)}`} onClick={onClose}>Enquire about this seal <span>↗</span></Link>
            </div>
        </div>
    </dialog>;
};

