import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { RouteScroll } from "./components/RouteScroll";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { CallToAction } from "./components/CallToAction";
import { LandingPage } from "./pages/LandingPage";
import { ProductsPage } from "./pages/Products";
import { AboutUsPage } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import "./concept.css";

const App = () => (
    <BrowserRouter>
        <MotionConfig reducedMotion="user">
            <div className="comet-site">
                <RouteScroll />
                <a href="#main-content" className="skip">Skip to content</a>
                <Navbar />
                <main id="main-content" tabIndex={-1}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/about-us" element={<AboutUsPage />} />
                        <Route path="/about" element={<Navigate to="/about-us" replace />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="*" element={<div className="container section"><h1>Page not found</h1><p className="dialog-intro">The page you’re looking for isn’t here.</p><Link to="/" className="button primary">Return home ↗</Link></div>} />
                    </Routes>
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    </BrowserRouter>
);
export default App;
