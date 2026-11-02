import { Link } from "react-router-dom";
import CometLogo from "@/assets/images/comet.svg";

export const Logo = () => <Link className="brand" to="/" aria-label="Comet Seal House home">
    <img src={CometLogo} width={120} height={40} alt="Comet" />
    <span>SEAL HOUSE</span>
</Link>;

