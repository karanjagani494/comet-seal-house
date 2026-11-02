export const ProductCategories = [
    { id: "carbon", name: "Carbon Seals", description: "Contact us to discuss carbon seals for your application." },
    { id: "water", name: "Water Pump Seals", description: "Discuss sealing requirements for your water-pump equipment." },
    { id: "mechanical", name: "Mechanical Seals", description: "Find sealing solutions for your industrial equipment." },
    { id: "automotive", name: "Automobile Seals", description: "Enquire about seals for automotive applications." },
];

export const NavLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", submenu: true, items: [
        { label: "Carbon Seals", href: "/products?category=carbon", description: "Explore carbon seals" },
        { label: "Water Pump Seals", href: "/products?category=water", description: "Explore water-pump seals" },
        { label: "View All Products", href: "/products", description: "Browse our product categories" },
    ] },
    { label: "About Us", href: "/about-us" },
];

export const FooterLinks = [
    { title: "Company", links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
    ] },
    { title: "Products", links: ProductCategories.map(category => ({
        name: category.name, href: "/products?category=" + category.id,
    })) },
];

