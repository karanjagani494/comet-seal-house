// Import required modules
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

// Register the GSAP animation plugin
gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

// Define the props for the component
interface SplitTextProps {
    text: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string | ((t: number) => number);
    splitType?: "chars" | "words" | "lines" | "words, chars";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties["textAlign"];
    onLetterAnimationComplete?: () => void;
};

// A animated component for text animation with a Split effect
export const SplitText = ({
    text,
    className = "",
    delay = 100,
    duration = 0.6,
    ease = "power3.inOut",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "left",
    onLetterAnimationComplete
}: SplitTextProps) => {
    // initialize the useRef hook
    const pRef = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        // no animations if any one of below mentioned is missing
        if (typeof window === "undefined" || !pRef.current || !text) return;

        // define an element to be animated as reference
        const el = pRef.current;

        // set the animation completed ref to false
        animationCompletedRef.current = false;

        // if the animation split type is Lines
        const absoluteLines = splitType === "lines";
        if (absoluteLines) el.style.position = "relative";

        // define the splitter for text animations
        let splitter: GSAPSplitText;
        try {
            splitter = new GSAPSplitText(el, {
                type: splitType,
                absolute: absoluteLines,
                linesClass: "split-line",
            });
        } catch (err) {
            console.log("Failed to create Split Text animaiton." + err);
            return;
        }

        // define the targets for animations based on split type
        let targets: Element[];
        switch (splitType) {
            case "lines": targets = splitter.lines;
                break;
            case "words": targets = splitter.words;
                break;
            case "chars": targets = splitter.chars;
                break;
            default: targets = splitter.chars;
        }

        if (!targets || targets.length === 0) {
            console.warn("No targets found for Split text animation");
            splitter.revert();
            return;
        }

        targets.forEach((t) => {
            (t as HTMLElement).style.willChange = "transform, opacity";
        });

        // define configs for animations
        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
        const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;

        // start the animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
                once: true,
                onToggle: (self) => scrollTriggerRef.current = self,
            },
            smoothChildTiming: true,
            onComplete: () => {
                animationCompletedRef.current = true;
                    gsap.set(targets, {
                        ...to,
                        clearProps: "willChange",
                        immediateRender: true,
                    });
                onLetterAnimationComplete?.();
            },
        });

        tl.set(targets, { ...from, immediateRender: false, force3D: true });
        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
        });

        // a cleanup function
        return () => {
            tl.kill();
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            gsap.killTweensOf(targets);
            if (splitter) splitter.revert();
        }
    }, [
        text, 
        delay,
        duration, 
        ease,
        splitType,
        from,
        to,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
    ]);

    // TSX to render the component
    return (
        <p ref={pRef} className={`split-parent overflow-hidden inline-flex whitespace-normal wrap-break-word text-${textAlign} ${className}`} >
            {text}
        </p>
    );
};
