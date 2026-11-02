import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Logo } from "../Logo";
import { NavLinks } from "@/lib/constants";
import { AnimatedButton } from "../animated/animated-button";

export const DesktopNavbar = () => {
    const { pathname, hash } = useLocation();
    return (
        <nav aria-label="Main navigation" className="mx-auto hidden w-full max-w-[1530px] items-center justify-between gap-4 px-8 py-3 md:flex lg:px-12">
            <Logo />
            <div className="flex items-center gap-4">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        {NavLinks.map(link => (
                            <NavigationMenuItem key={link.label}>
                                {link.submenu ? <>
                                    <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                                    <NavigationMenuContent className="z-50 bg-navbar p-3">
                                        <ul className="w-64">
                                            {link.items.map(item => <li key={item.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link to={item.href} className="space-y-1">
                                                        <span>{item.label}</span>
                                                        <span className="text-xs text-muted-foreground">{item.description}</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>)}
                                        </ul>
                                    </NavigationMenuContent>
                                </> : <NavigationMenuLink asChild active={pathname + hash === link.href}>
                                    <Link to={link.href}>{link.label}</Link>
                                </NavigationMenuLink>}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <AnimatedButton to="/contact-us" text="Contact Us" />
            </div>
        </nav>
    );
};

