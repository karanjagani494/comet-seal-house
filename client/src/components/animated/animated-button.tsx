// Import required modules

// Import UI components
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import custom components

// A animated button component for the app
export const AnimatedButton = ({ text, to }: { text: string; to?: string }) => {
    // TSX to render the component
    const content = (
        <>
            {/* Accent effect */}
            <span className="absolute h-0 w-0 rounded-full bg-accent transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
            {/* Small flakes inside the button */}
            <span className="absolute bottom-0 left-0 -ml-1 h-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="object-containi h-full w-auto opacity-100"
                    viewBox="0 0 487 487"
                >
                    <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="#FFF"
                        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                    ></path>
                </svg>                
            </span>
            <span className="absolute right-0 top-0 -mr-3 h-full w-12">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full object-cover"
                viewBox="0 0 487 487"
                >
                    <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="#FFF"
                        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                    ></path>
                </svg>
            </span>
            {/* White gradient to give a glassy effect */}
            <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-200 opacity-30"></span>
            {/* Actual text within the button */}
            <span className="relative z-10 text-sm">
                {text}
            </span>
        </>
    );
    return (
        <Button asChild={Boolean(to)} variant={"null"} size={"default"} className="animated-button group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary tracking-normal text-white">
            {to ? <Link to={to}>{content}</Link> : content}
        </Button>
    );
};
