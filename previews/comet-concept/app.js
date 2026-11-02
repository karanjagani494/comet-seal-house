"use strict";
const categories = [
    { id: "all", name: "All products" },
    { id: "mechanical", name: "Mechanical seals" },
    { id: "carbon", name: "Carbon seals" },
    { id: "water", name: "Water-pump seals" },
    { id: "automotive", name: "Automotive seals" },
];
const products = [
    { code: "CSH-M101", name: "Single Spring Mechanical Seal", category: "mechanical", image: 0, material: "Stainless steel / carbon", size: 25, application: "General pump equipment", description: "A fictional single-spring design to demonstrate how mechanical-seal information could be presented in the catalogue." },
    { code: "CSH-C201", name: "Precision Carbon Ring", category: "carbon", image: 1, material: "Carbon graphite", size: 30, application: "Industrial rotating equipment", description: "An illustrative stepped carbon ring. A starting point for exploring material, dimensions, and application information." },
    { code: "CSH-W301", name: "Bellows Water-Pump Seal", category: "water", image: 2, material: "Steel / elastomer", size: 16, application: "Water-pump assemblies", description: "A demo bellows-style water-pump seal, showing a possible layout for a compact product with multiple material components." },
    { code: "CSH-A401", name: "Radial Automotive Oil Seal", category: "automotive", image: 3, material: "Nitrile rubber / steel", size: 35, application: "Automotive shaft assemblies", description: "An illustrative radial oil seal for the automotive category. All dimensions and material selections shown here are sample data." },
    { code: "CSH-M102", name: "Compact Cartridge Seal", category: "mechanical", image: 0, material: "Stainless steel / ceramic", size: 40, application: "Process pump equipment", description: "A fictional compact cartridge model that demonstrates an alternative entry within the mechanical-seal category." },
    { code: "CSH-C202", name: "Stepped Carbon Face Ring", category: "carbon", image: 1, material: "Resin-bonded carbon", size: 45, application: "Rotary sealing assemblies", description: "A demo carbon face ring with sample specifications, designed to show how customers might compare models in the same category." },
    { code: "CSH-W302", name: "Compact Pump Face Seal", category: "water", image: 2, material: "Steel / ceramic / rubber", size: 20, application: "Compact pump systems", description: "An illustrative compact pump face seal. Use this sample to explore the proposed product-detail and enquiry flow." },
    { code: "CSH-A402", name: "Double-Lip Shaft Seal", category: "automotive", image: 3, material: "Nitrile rubber", size: 50, application: "Automotive drivetrain assemblies", description: "A fictional double-lip variant for browsing and filtering the demo automotive catalogue." },
];
let activeCategory = "all";
const productDialog = document.getElementById("product-dialog");
const enquiryDialog = document.getElementById("enquiry-dialog");
const main = document.getElementById("main");
const menu = document.getElementById("mobile-menu");
const menuToggle = document.getElementById("menu-toggle");
const categoryName = id => categories.find(category => category.id === id).name;
function productCard(product) {
    return '<article class="product-card"><button class="product-image" data-detail="' + product.code + '" aria-label="View ' + product.name + '"><span class="card-code">' + product.code + '</span><span class="product-picture pic-' + product.image + '" aria-hidden="true"></span><span class="card-arrow" aria-hidden="true">↗</span></button><p class="card-category">' + categoryName(product.category) + '</p><h3><button class="text-link" data-detail="' + product.code + '">' + product.name + '</button></h3><div class="card-meta"><span>Ø ' + product.size + ' mm · sample</span><span>View details ↗</span></div></article>';
}
function renderCatalogue() {
    const query = document.getElementById("product-search").value.toLowerCase().trim();
    const sort = document.getElementById("product-sort").value;
    let visible = products.filter(product => (activeCategory === "all" || product.category === activeCategory) && [product.name, product.code, product.material, product.application, categoryName(product.category)].join(" ").toLowerCase().includes(query));
    if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "size") visible.sort((a, b) => a.size - b.size);
    document.getElementById("catalogue-products").innerHTML = visible.map(productCard).join("");
    document.getElementById("result-count").textContent = "Showing " + visible.length + " of " + products.length + " demo products";
    document.getElementById("empty-state").hidden = visible.length !== 0;
    document.getElementById("category-filters").innerHTML = categories.map(category => '<button type="button" data-category="' + category.id + '" class="' + (activeCategory === category.id ? "active" : "") + '" aria-pressed="' + (activeCategory === category.id) + '">' + category.name + '<span>' + String(category.id === "all" ? products.length : products.filter(product => product.category === category.id).length).padStart(2, "0") + '</span></button>').join("");
}
function closeMenu() {
    menu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
}
function route() {
    const path = location.hash.slice(1).split("/");
    const page = ["home", "products", "about"].includes(path[0]) ? path[0] : "home";
    document.querySelectorAll("[data-view]").forEach(view => { view.hidden = view.dataset.view !== page; });
    document.querySelectorAll("[data-page]").forEach(link => {
        const active = link.dataset.page === page;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    if (page === "products") {
        activeCategory = categories.some(category => category.id === path[1]) ? path[1] : "all";
        renderCatalogue();
    }
    document.title = (page === "home" ? "Comet Seal House" : page === "products" ? "Products — Comet Seal House" : "About Us — Comet Seal House") + " · Concept";
    closeMenu();
    window.scrollTo({ top: 0, behavior: "instant" });
}
function openEnquiry(code) {
    if (productDialog.open) productDialog.close();
    document.getElementById("enquiry-form").reset();
    const product = products.find(item => item.code === code);
    document.getElementById("enquiry-product").value = product ? product.code + " — " + product.name : "";
    document.getElementById("enquiry-status").textContent = "";
    document.querySelector('#enquiry-form button[type="submit"]').disabled = false;
    enquiryDialog.showModal();
}
function showProduct(code) {
    const product = products.find(item => item.code === code);
    if (!product) return;
    document.getElementById("product-detail").innerHTML = '<div class="detail-grid"><div class="detail-image" role="img" aria-label="Illustrative ' + product.name + '"><div class="product-picture pic-' + product.image + '"></div></div><div class="detail-copy"><p class="eyebrow">' + product.code + ' · DEMO MODEL</p><h2 id="detail-title">' + product.name + '</h2><p>' + product.description + '</p><dl><dt>Category</dt><dd>' + categoryName(product.category) + '</dd><dt>Sample shaft size</dt><dd>Ø ' + product.size + ' mm</dd><dt>Sample material</dt><dd>' + product.material + '</dd><dt>Application concept</dt><dd>' + product.application + '</dd></dl><button class="button primary" data-enquire="' + product.code + '">Enquire about this seal <span>↗</span></button><p class="detail-demo">Fictional specifications. Shared illustrative imagery. Not a verified product listing.</p></div></div>';
    productDialog.setAttribute("aria-labelledby", "detail-title");
    productDialog.showModal();
}
document.getElementById("featured-products").innerHTML = products.slice(0, 4).map(productCard).join("");
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("product-search").addEventListener("input", renderCatalogue);
document.getElementById("product-sort").addEventListener("change", renderCatalogue);
document.getElementById("category-filters").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    history.replaceState(null, "", "#products" + (activeCategory === "all" ? "" : "/" + activeCategory));
    renderCatalogue();
    document.querySelector('[data-category="' + activeCategory + '"]').focus({ preventScroll: true });
});
document.getElementById("reset-filters").addEventListener("click", () => {
    activeCategory = "all";
    document.getElementById("product-search").value = "";
    document.getElementById("product-sort").value = "featured";
    history.replaceState(null, "", "#products");
    renderCatalogue();
    document.getElementById("product-search").focus();
});
menuToggle.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
document.addEventListener("keydown", event => { if (event.key === "Escape" && !menu.hidden) { closeMenu(); menuToggle.focus(); } });
document.addEventListener("click", event => {
    const detail = event.target.closest("[data-detail]");
    if (detail) showProduct(detail.dataset.detail);
    const enquiry = event.target.closest("[data-enquire]");
    if (enquiry) { closeMenu(); openEnquiry(enquiry.dataset.enquire); }
    const close = event.target.closest(".dialog-close");
    if (close) close.closest("dialog").close();
    const link = event.target.closest('a[href^="#"]');
    if (link && link.getAttribute("href") === location.hash && link.getAttribute("href") !== "#main") { closeMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }
});
document.getElementById("enquiry-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.elements.name.value.trim() || !form.elements.message.value.trim()) {
        document.getElementById("enquiry-status").textContent = "Please enter your name and requirement using more than spaces.";
        return;
    }
    document.getElementById("enquiry-status").textContent = "Demo complete — your enquiry preview is ready. Nothing was sent or saved. In the finished website, this step could submit your requirement to the Comet team.";
});
for (const dialog of [productDialog, enquiryDialog]) {
    dialog.addEventListener("click", event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
}
enquiryDialog.setAttribute("aria-label", "Demo product enquiry");
window.addEventListener("hashchange", route);
route();

