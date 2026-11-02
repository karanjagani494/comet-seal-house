import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
                null:
                    "bg-transparent text-foreground",
				default:
					"bg-accent text-primary-foreground hover:bg-accent/85",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90",
				outline:
					"border border-accent bg-transparent text-foreground/80 hover:bg-accent hover:text-background",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-foreground/10",
				ghost:
                    "bg-secondary/20 hover:bg-accent/30 hover:text-foreground/90",
				link: 
                    "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: 
                    "px-8 py-1.5 has-[>svg]:px-3",
				sm: 
                    "px-4 py-1.5 text-xs gap-1.5 has-[>svg]:px-8",
				lg: 
                    "px-12 py-2 has-[>svg]:px-14",
				icon: 
                    "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button }
