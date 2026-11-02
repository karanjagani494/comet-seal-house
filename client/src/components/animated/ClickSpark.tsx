// Import required modules
import React, { useEffect, useRef, useCallback } from "react";

// An interface to define the props for the component
interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
    extraScale?: number;
    children?: React.ReactNode;
};

// An interface to define basic properties of a Spark
interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
};

// Animated component to animate mouse-clicks
export const ClickSpark = ({
    sparkColor = "#ee6c4d",
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = "ease-out",
    extraScale = 1.0,
    children
}: ClickSparkProps) => {
    // Defining some DOM references
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);
    const animationRef = useRef<number | null>(null);
    const drawRef = useRef<((timestamp: number) => void) | null>(null);

    // An effect to prepare and manage a canvas element
    useEffect(() => {
        // get a canvas element
        const canvas = canvasRef.current;
        if (!canvas) return;

        // get a parent element from canvas
        const parent = canvas.parentElement;
        if (!parent) return;

        let resizeTimeout: NodeJS.Timeout;

        // helper function to resize the canvas
        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        // handler function to resize the canvas
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(parent);

        // call to a function for resizing the canvas
        resizeCanvas();

        // cleaning function
        return (() => {
            ro.disconnect();
            clearTimeout(resizeTimeout);
        });
    }, []);

    // callback hook to set the easing of animation
    const easingFunc = useCallback((t: number) => {
        switch (easing) {
            case "linear": return (t);
            case "ease-in": return (t * t);
            case "ease-in-out": return (t < 0.5 ? (2 * t * t) : ((-1) + (4 - 2 * t) * t));
            default: return (t * (2 - t));
        }
    }, [easing]);

    // An effect to create a spark on the canvas
    useEffect(() => {
        // get the canvas element
        const canvas = canvasRef.current;
        if (!canvas) return;

        // get a 2D context to canvas
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // a function to draw a spark on the canvas
        const draw = (timestamp: number) => {
            // set the reference to start the animation

            // clear the canvas
            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter((spark: Spark) => {
                // calculate the elapsed time of animation
                const ellapsed = timestamp - spark.startTime;
                if (ellapsed >= duration) return false;

                // calculate the progress of animation
                const progress = ellapsed / duration;
                // set the easing function for animation
                const eased = easingFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                // set the coordinates for the spark
                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                // set the spark properties
                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            animationRef.current = sparksRef.current.length ? requestAnimationFrame(draw) : null;
        };

        drawRef.current = draw;

        // cleaning function
        return (() => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
            drawRef.current = null;
            sparksRef.current = [];
        });
    }, [sparkColor, sparkSize, sparkRadius, duration, easingFunc, extraScale]);

    //  handler function to handle the mouse clicks
    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        // get the canvas element
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // get the boundaries of canvas element
        const rect = canvas.getBoundingClientRect();

        // coordinates of click
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // get the time of click event
        const now = performance.now();

        // create a spark on click
        const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
            x, y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now
        }));

        sparksRef.current.push(...newSparks);
        if (animationRef.current === null && drawRef.current) {
            animationRef.current = requestAnimationFrame(drawRef.current);
        }
    };

    // TSX to render the component
    return (
        <div onClick={handleClick} className="relative w-full h-full">
            <canvas aria-hidden="true" ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
            {children}
        </div>
    );
};
