import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ReceiptText } from "lucide-react";
import { Logo } from "../Logo";

export const Footer = () => (
    <footer className="footer container">
        <div className="footer-top business-footer">
            <div className="footer-brand">
                <Logo />
                <p>Precision in the details.<br />Connection at the core.</p>
            </div>
            <div>
                <span className="mini-label">EXPLORE</span>
                <Link to="/">Home</Link>
                <Link to="/products">Products ↗</Link>
                <Link to="/about-us">About Us ↗</Link>
                <Link to="/contact-us">Contact Us ↗</Link>
            </div>
            <div className="footer-business-details">
                <span className="mini-label">CONTACT & BUSINESS DETAILS</span>
                <a href="tel:028112368367"><Phone size={15} aria-hidden="true" /><span>028112 368367</span></a>
                <a href="mailto:cometseals@gmail.com"><Mail size={15} aria-hidden="true" /><span>cometseals@gmail.com</span></a>
                <p><ReceiptText size={15} aria-hidden="true" /><span>GSTIN<br /><strong>24ACXPM4792Q1ZE</strong></span></p>
            </div>
            <div className="footer-location">
                <span className="mini-label">VISIT COMET SEAL HOUSE</span>
                <address>
                    <MapPin size={16} aria-hidden="true" />
                    <a href="https://maps.app.goo.gl/YB7yNQYBvC4RpT1aA" target="_blank" rel="noopener noreferrer">
                        Comet Seal House, B/4 Satkar Commercial Complex,<br />
                        Nr Gondal Road Railway Crossing, Malaviya,<br />
                        Rajkot, Gujarat 360003, India
                    </a>
                </address>
                <a className="footer-map-link" href="https://maps.app.goo.gl/YB7yNQYBvC4RpT1aA" target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
            </div>
        </div>
        <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Comet Seal House. All rights reserved.</span>
            <span>Sample products · Confirm specifications with our team.</span>
            <Link to="/">Back to top ↑</Link>
        </div>
    </footer>
);
