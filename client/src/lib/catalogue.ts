export interface Product {
 code: string; name: string; category: string; image: number; material: string; size: number; application: string; description: string;
}

export const categories = [
    { id: "all", name: "All products" },
    { id: "mechanical", name: "Mechanical seals" },
    { id: "carbon", name: "Carbon seals" },
    { id: "water", name: "Water-pump seals" },
    { id: "automotive", name: "Automotive seals" },
];

// Fictional catalogue data. Replace with verified product data before commercial use.
export const products: Product[] = [
    { code: "CSH-M101", name: "Single Spring Mechanical Seal", category: "mechanical", image: 0, material: "Stainless steel / carbon", size: 25, application: "General pump equipment", description: "A fictional single-spring design to demonstrate how mechanical-seal information could be presented in the catalogue." },
    { code: "CSH-C201", name: "Precision Carbon Ring", category: "carbon", image: 1, material: "Carbon graphite", size: 30, application: "Industrial rotating equipment", description: "An illustrative stepped carbon ring. A starting point for exploring material, dimensions, and application information." },
    { code: "CSH-W301", name: "Bellows Water-Pump Seal", category: "water", image: 2, material: "Steel / elastomer", size: 16, application: "Water-pump assemblies", description: "A demo bellows-style water-pump seal, showing a possible layout for a compact product with multiple material components." },
    { code: "CSH-A401", name: "Radial Automotive Oil Seal", category: "automotive", image: 3, material: "Nitrile rubber / steel", size: 35, application: "Automotive shaft assemblies", description: "An illustrative radial oil seal for the automotive category. All dimensions and material selections shown here are sample data." },
    { code: "CSH-M102", name: "Compact Cartridge Seal", category: "mechanical", image: 0, material: "Stainless steel / ceramic", size: 40, application: "Process pump equipment", description: "A fictional compact cartridge model that demonstrates an alternative entry within the mechanical-seal category." },
    { code: "CSH-C202", name: "Stepped Carbon Face Ring", category: "carbon", image: 1, material: "Resin-bonded carbon", size: 45, application: "Rotary sealing assemblies", description: "A demo carbon face ring with sample specifications, designed to show how customers might compare models in the same category." },
    { code: "CSH-W302", name: "Compact Pump Face Seal", category: "water", image: 2, material: "Steel / ceramic / rubber", size: 20, application: "Compact pump systems", description: "An illustrative compact pump face seal. Use this sample to explore the proposed product-detail and enquiry flow." },
    { code: "CSH-A402", name: "Double-Lip Shaft Seal", category: "automotive", image: 3, material: "Nitrile rubber", size: 50, application: "Automotive drivetrain assemblies", description: "A fictional double-lip variant for browsing and filtering the demo automotive catalogue." },
];

export const categoryName = (id: string) => categories.find(category => category.id === id)?.name ?? "All products";

export function filterProducts(category: string, query: string, sort: string): Product[] {
 const search = query.toLowerCase().trim();
 const visible = products.filter(product => (category === "all" || product.category === category) && [product.name, product.code, product.material, product.application, categoryName(product.category)].join(" ").toLowerCase().includes(search));
 if (sort === "name") visible.sort((a,b) => a.name.localeCompare(b.name));
 if (sort === "size") visible.sort((a,b) => a.size - b.size);
 return visible;
}
