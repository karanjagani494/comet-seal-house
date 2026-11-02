import { useState, type FormEvent } from "react";
import { type Product } from "@/lib/catalogue";
import { Mail, MessageSquareText, Package, Phone, UserRound } from "lucide-react";
import { SelectMenu } from "@/components/ui/SelectMenu";

const topicOptions = ["Enquiry", "Complaint", "Business Proposal", "Suggestion", "Other"].map(topic => ({ value: topic, label: topic }));

export const ContactUsForm = ({ product }: { product?: Product }) => {
    const [status, setStatus] = useState("");
    const [topic, setTopic] = useState("Enquiry");
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
        <p className="dialog-intro">Tell us about your requirements. Your query opens in your email app for review and sending. Fields marked * are required.</p>
        <div className="form-grid">
            {[
                { name: "firstName", label: "First name", placeholder: "First name", type: "text", autoComplete: "given-name", Icon: UserRound },
                { name: "lastName", label: "Last name", placeholder: "Last name", type: "text", autoComplete: "family-name", Icon: UserRound },
                { name: "email", label: "Email address", placeholder: "you@company.com", type: "email", autoComplete: "email", Icon: Mail },
                { name: "phone", label: "Phone number", placeholder: "Your phone number", type: "tel", autoComplete: "tel", Icon: Phone },
            ].map(({ label, Icon, ...field }) => <label key={field.name} htmlFor={field.name}>{label} *<span className="form-control"><Icon size={18} aria-hidden="true" /><input {...field} id={field.name} required maxLength={field.type === "tel" ? 30 : 150} /></span></label>)}
        </div>
        <label htmlFor="product">Product / requirement<span className="form-control"><Package size={18} aria-hidden="true" /><input id="product" name="product" defaultValue={product ? product.code + " — " + product.name : ""} maxLength={150} placeholder="Model number or application" /></span></label>
        <div className="topic-field">
            <input type="hidden" name="topic" value={topic} />
            <SelectMenu value={topic} onChange={setTopic} options={topicOptions} label="Choose topic *" icon={<MessageSquareText size={18} aria-hidden="true" />} className="contact-select" />
        </div>
        <fieldset><legend>Which best describes you? *</legend><div className="role-options">
            {["Dealer", "Consumer", "Supplier", "Manufacturer", "Other"].map(role => <label key={role}><input type="radio" name="role" value={role} required />{role}</label>)}
        </div></fieldset>
        <label htmlFor="message">Tell us a little more *<span className="form-control form-message"><MessageSquareText size={18} aria-hidden="true" /><textarea id="message" name="message" rows={5} required maxLength={2000} placeholder="Dimensions, quantity, or equipment details..." /></span></label>
        <button type="submit" className="button primary">Send Query <span aria-hidden="true">↗</span></button>
        <p className="form-status" role="status">{status}</p>
    </form>;
};

