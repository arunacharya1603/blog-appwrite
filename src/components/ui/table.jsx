import * as React from "react"
import { cn } from "@/lib/utils"

// Table Component
export const Table = React.forwardRef(({ children, className, ...props }, ref) => (
    <table
        ref={ref}
        className={cn("mt-4 border-slate-800 text-white w-full border", className)}
        {...props}
    >
        {children}
    </table>
))
Table.displayName = "Table";

// TableHeader Component
export const TableHeader = React.forwardRef(({ children, className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn("bg-slate-900 text-white", className)}
        {...props}
    >
        {children}
    </thead>
))
TableHeader.displayName = "TableHeader"

// TableRow Component
export const TableRow = React.forwardRef(({ children, className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("border-b border-slate-950", className)}
        {...props}
    >
        {children}
    </tr>
))
TableRow.displayName = "TableRow"

// TableHead Component
export const TableHead = React.forwardRef(({ children, className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn("px-4 py-2", className)}
        {...props}
    >
        {children}
    </th>
))
TableHead.displayName = "TableHead"

// TableBody Component
export const TableBody = React.forwardRef(({ children, className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn(className)}
        {...props}
    >
        {children}
    </tbody>
))
TableBody.displayName = "TableBody"

// TableCell Component
export const TableCell = React.forwardRef(({ children, className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("py-2 px-4", className)}
        {...props}
    >
        {children}
    </td>
))
TableCell.displayName = "TableCell"
