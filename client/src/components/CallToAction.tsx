import { Link } from "react-router-dom";

export const CallToAction = () => <section className="cta-section">
    <div className="container cta-inner">
        <div><p className="eyebrow">LET’S FIND YOUR NEXT SOLUTION</p><h2>Your application.<br /><em>Our next conversation.</em></h2></div>
        <Link className="button light" to="/contact-us">Tell us what you need <span>↗</span></Link>
    </div>
</section>;

