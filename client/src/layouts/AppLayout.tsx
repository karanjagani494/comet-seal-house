// Import required modules
import React from "react";

// Import custom components
import { ClickSpark } from "@/components/animated/ClickSpark";

// A interface to define the props for the App Layout
interface AppLayoutProps {
    children: React.ReactNode;
};

// A root layout for the application
export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <main id="main-content" className="w-full min-h-[60vh] bg-background">
            <ClickSpark>
                {children}
            </ClickSpark>
        </main>
    );
};
