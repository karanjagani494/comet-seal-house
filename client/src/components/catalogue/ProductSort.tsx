import { SlidersHorizontal } from "lucide-react";
import { SelectMenu } from "@/components/ui/SelectMenu";

const options = [
    { value: "featured", label: "Featured first" },
    { value: "name", label: "Name: A–Z" },
    { value: "size", label: "Shaft size: small to large" },
];

export const ProductSort = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <SelectMenu value={value} onChange={onChange} options={options} label="Sort by" icon={<SlidersHorizontal size={16} aria-hidden="true" />} className="product-sort" />
);
