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
    { code: "CSH-M101", name: "Single Spring Mechanical Seal", category: "mechanical", image: 0, material: "Stainless steel / carbon", size: 25, application: "General pump equipment", description: "Single-spring mechanical seal for general pump equipment, combining a stainless-steel assembly with a carbon sealing face." },
    { code: "CSH-C201", name: "Precision Carbon Ring", category: "carbon", image: 1, material: "Carbon graphite", size: 30, application: "Industrial rotating equipment", description: "Stepped carbon graphite ring for industrial rotating equipment and sealing assemblies." },
    { code: "CSH-W301", name: "Bellows Water-Pump Seal", category: "water", image: 2, material: "Steel / elastomer", size: 16, application: "Water-pump assemblies", description: "Bellows-style water-pump seal with a steel assembly and flexible elastomer components." },
    { code: "CSH-A401", name: "Radial Automotive Oil Seal", category: "automotive", image: 3, material: "Nitrile rubber / steel", size: 35, application: "Automotive shaft assemblies", description: "Radial oil seal with a nitrile rubber body and steel support for automotive shaft assemblies." },
    { code: "CSH-M102", name: "Compact Cartridge Seal", category: "mechanical", image: 0, material: "Stainless steel / ceramic", size: 40, application: "Process pump equipment", description: "Compact cartridge-style mechanical seal with stainless-steel and ceramic components for process pump equipment." },
    { code: "CSH-C202", name: "Stepped Carbon Face Ring", category: "carbon", image: 1, material: "Resin-bonded carbon", size: 45, application: "Rotary sealing assemblies", description: "Stepped face ring made from resin-bonded carbon for rotary sealing assemblies." },
    { code: "CSH-W302", name: "Compact Pump Face Seal", category: "water", image: 2, material: "Steel / ceramic / rubber", size: 20, application: "Compact pump systems", description: "Compact face seal with steel, ceramic, and rubber components for pump systems." },
    { code: "CSH-A402", name: "Double-Lip Shaft Seal", category: "automotive", image: 3, material: "Nitrile rubber", size: 50, application: "Automotive drivetrain assemblies", description: "Double-lip nitrile rubber seal for automotive drivetrain and shaft applications." },
];

export const categoryName = (id: string) => categories.find(category => category.id === id)?.name ?? "All products";

export function filterProducts(category: string, query: string, sort: string): Product[] {
 const search = query.toLowerCase().trim();
 const visible = products.filter(product => (category === "all" || product.category === category) && [product.name, product.code, product.material, product.application, categoryName(product.category)].join(" ").toLowerCase().includes(search));
 if (sort === "name") visible.sort((a,b) => a.name.localeCompare(b.name));
 if (sort === "size") visible.sort((a,b) => a.size - b.size);
 return visible;
}
