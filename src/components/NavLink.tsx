import { Link, useLocation } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

interface NavLinkCompatProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    const { pathname } = useLocation();
    const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
