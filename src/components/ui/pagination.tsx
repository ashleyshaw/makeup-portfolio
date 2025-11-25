/**
 * @fileoverview Mobile-optimized pagination component for Ash Shaw Portfolio
 * 
 * Enhanced pagination with proper mobile touch support, accessibility,
 * and brand-compliant styling following guidelines.
 * 
 * Features:
 * - Mobile-first touch targets (44px minimum)
 * - Proper button elements instead of anchor tags
 * - Brand gradient styling for active states
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Responsive design with mobile/desktop variants
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Mobile-optimized with proper touch support
 */

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1 sm:gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

function PaginationLink({
  className,
  isActive,
  onClick,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        // Base mobile-first styling with proper touch targets
        "inline-flex items-center justify-center rounded-lg text-sm font-medium font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        // Mobile touch targets (44px minimum)
        "h-11 w-11 min-w-[44px] min-h-[44px]",
        // Desktop sizing
        "sm:h-10 sm:w-10 sm:min-w-[40px] sm:min-h-[40px]",
        // Active state with brand gradient
        isActive
          ? "bg-gradient-pink-purple-blue text-white shadow-lg hover:from-purple-600 hover:to-pink-600"
          : "bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 border border-white/50 hover:border-white/70 shadow-sm hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationPrevious({
  className,
  onClick,
  disabled = false,
  ...props
}: Omit<PaginationLinkProps, 'children'>) {
  return (
    <PaginationLink
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to previous page"
      className={cn(
        "gap-1 px-3 w-auto min-w-[44px] sm:min-w-[auto]",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  onClick,
  disabled = false,
  ...props
}: Omit<PaginationLinkProps, 'children'>) {
  return (
    <PaginationLink
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to next page"
      className={cn(
        "gap-1 px-3 w-auto min-w-[44px] sm:min-w-[auto]",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-11 w-11 items-center justify-center sm:h-10 sm:w-10",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4 text-gray-400" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
