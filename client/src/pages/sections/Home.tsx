import { motion, useReducedMotion } from "framer-motion";

export const Home = () => {
    const reducedMotion = useReducedMotion();
    return (
        <section id="home" aria-labelledby="home-heading" className="mx-auto grid w-full max-w-[1530px] grid-cols-1 items-center gap-8 px-5 py-12 sm:px-8 md:py-16 lg:min-h-[680px] lg:grid-cols-2 lg:gap-10 lg:px-12 xl:px-24">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-w-0 space-y-5">
                <h1 id="home-heading" className="text-4xl leading-tight font-bold text-primary sm:text-5xl xl:text-6xl">
                    Comet <span className="text-accent">Seal</span> House<span className="text-accent">.</span>
                </h1>
                <p className="text-2xl leading-snug font-semibold text-primary/95 sm:text-3xl">
                    Where <span className="text-accent">precision</span> meets <span className="text-accent">performance</span>
                </p>
                <p className="text-lg font-semibold text-primary/90 sm:text-xl">Comprehensive sealing solutions for industrial excellence.</p>
                <p className="max-w-xl text-base leading-relaxed text-primary/80">
                    With an unmatched range of mechanical, automotive, and water-pump seals. Comet Seal House is your trusted partner in achieving superior efficiency and reliability.
                </p>
            </motion.div>
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex min-w-0 items-center justify-center">
                <img src="/hero-seal-02.png" alt="Industrial mechanical seal assembly" width={1766} height={891} className="h-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[550px]" fetchPriority="high" />
            </motion.div>
        </section>
    );
};

