import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Forest theme variants
        forest: "bg-primary text-primary-foreground hover:bg-forest-medium shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        sage: "bg-sage text-forest-deep hover:bg-sage/80 shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        gold: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        hero: "bg-primary text-primary-foreground hover:bg-forest-medium shadow-medium hover:shadow-glow hover:-translate-y-1 text-base",
        heroOutline: "border-2 border-primary/30 text-primary bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-soft hover:-translate-y-1",
        company: "bg-forest-medium text-primary-foreground hover:bg-primary shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        college: "bg-sage text-forest-deep hover:bg-secondary shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        student: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        admin: "bg-earth text-primary-foreground hover:bg-bark shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        glass: "bg-card/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/50 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
