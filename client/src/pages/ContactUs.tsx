import { Link, useSearchParams } from "react-router-dom";
import { Mail, MapPin, Phone, ReceiptText } from "lucide-react";
import { ContactUsForm } from "@/components/contact-us/ContactUsForm";
import { products } from "@/lib/catalogue";

export const ContactUs = () => {
    const [params] = useSearchParams();
    const product = products.find(item => item.code === params.get("product"));
    return <div className="container contact-page">
        <p className="breadcrumb"><Link to="/">Home</Link> / Contact Us</p>
        <div className="contact-grid">
            <div className="contact-copy">
                <p className="eyebrow">START A CONVERSATION</p>
                <h1>Let’s find<br /><em>your right fit.</em></h1>
                <p className="about-lead">Looking for reliable sealing solutions? Connect with us to discuss your requirements.</p>
                <address className="contact-details">
                    <div><MapPin size={18} /><a href="https://maps.app.goo.gl/YB7yNQYBvC4RpT1aA" target="_blank" rel="noopener noreferrer">Comet Seal House, B/4 Satkar Commercial Complex,<br />Nr Gondal Road Railway Crossing, Malaviya,<br />Rajkot, Gujarat 360003, India</a></div>
                    <div><Phone size={18} /><a href="tel:028112368367">028112 368367</a></div>
                    <div><Mail size={18} /><a href="mailto:cometseals@gmail.com">cometseals@gmail.com</a></div>
                    <div><ReceiptText size={18} /><span>GSTIN 24ACXPM4792Q1ZE</span></div>
                </address>
            </div>
            <ContactUsForm key={product?.code ?? "general"} product={product} />
        </div>
    </div>;
};

