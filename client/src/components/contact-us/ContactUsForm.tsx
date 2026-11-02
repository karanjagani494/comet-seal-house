import { useState, type FormEvent } from "react";
import { type Product } from "@/lib/catalogue";

export const ContactUsForm = ({ product }: { product?: Product }) => {
    const [status, setStatus] = useState("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = (key: string) => String(data.get(key) ?? "").trim();
        if (!value("firstName") || !value("lastName") || !value("message")) {
            setStatus("Please enter your name and message using more than spaces.");
            return;
        }
        const subject = "Comet Seal House: " + value("topic") + (value("product") ? " — " + value("product") : "");
        const body = [
            "Name: " + value("firstName") + " " + value("lastName"),
            "Email: " + value("email"), "Phone: " + value("phone"),
            "Role: " + value("role"), "Product / requirement: " + value("product"),
            "", value("message"),
        ].join("\n");
        window.location.href = "mailto:cometseals@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        setStatus("Your email app has been requested. Review and send the draft there to complete your enquiry. If it does not open, email cometseals@gmail.com directly. This website has not sent your message.");
    };
    return <form onSubmit={handleSubmit} className="contact-form">
        <p className="dialog-intro">Complete this form to prepare an email to our team. You will review and send it in your email app. Fields marked * are required.</p>
        <div className="form-grid">
            {[
                { name: "firstName", label: "First name", type: "text", autoComplete: "given-name" },
                { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
                { name: "email", label: "Email address", type: "email", autoComplete: "email" },
                { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
            ].map(({ label, ...field }) => <label key={field.name} htmlFor={field.name}>{label} *<input {...field} id={field.name} required maxLength={field.type === "tel" ? 30 : 150} /></label>)}
        </div>
        <label htmlFor="product">Product / requirement<input id="product" name="product" defaultValue={product ? product.code + " — " + product.name : ""} maxLength={150} placeholder="Model number or application" /></label>
        <label htmlFor="topic">Choose topic *<select id="topic" name="topic" defaultValue="Enquiry" required>
            {["Enquiry", "Complaint", "Business Proposal", "Suggestion", "Other"].map(topic => <option key={topic}>{topic}</option>)}
        </select></label>
        <fieldset><legend>Which best describes you? *</legend><div className="role-options">
            {["Dealer", "Consumer", "Supplier", "Manufacturer", "Other"].map(role => <label key={role}><input type="radio" name="role" value={role} required />{role}</label>)}
        </div></fieldset>
        <label htmlFor="message">Tell us a little more *<textarea id="message" name="message" rows={5} required maxLength={2000} placeholder="Dimensions, quantity, or equipment details..." /></label>
        <button type="submit" className="button primary">Prepare Email <span>↗</span></button>
        <p className="form-status" role="status">{status}</p>
    </form>;
};

