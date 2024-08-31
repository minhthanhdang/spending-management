"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Item } from "@prisma/client"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { format } from "path"
import { useEditItem } from "@/components/account/hooks/use-edit-item"

const numericStringSorter = (rowA: any, rowB: any, columnId: string) => {
  const valueA = Number(rowA.getValue(columnId));
  const valueB = Number(rowB.getValue(columnId));
  return valueA - valueB;
};

const formatDate = (date: Date): string => {
  if (!date) return ""
  if (!(date instanceof Date)) return ""
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="w-5 h-5 mt-[4px]"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="w-5 h-5"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 100,
    cell: ({ row }) => {
      return (
        <div
          className="font-medium max-w-[200px] truncate"
        >
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[120px]"
        >
          <div>
            Amount
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price")).toFixed(2);

      return (
        <div
          className="font-medium max-w-[50px] w-[50px] px-3"
        >
          {amount}
        </div>
      );
    },
    sortingFn: numericStringSorter,
    size: 50,
  },
  {
    accessorKey: "date",
    size: 30,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[90px]"
        >
          <div>
            Date
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("date")
      const datestring = formatDate(date)

      return (
        <div
          className="font-medium ps-3"
        >
          {datestring}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="w-[130px]">
          Category
        </div>
      )
    },
    size: 30,
    
  },
  {
    accessorKey: "seller",
    header: "Seller",
    size: 50,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { editItem, onOpenEditItem } = useEditItem()

      const onEditItem = () => {
        editItem(row.original)
        onOpenEditItem()
      }
      return (
        <div className="w-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.name)}
            >
              Copy Item name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEditItem}>Edit Item</DropdownMenuItem>
            <DropdownMenuItem>Copy row to clipboard</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
    size: 10,
  },
]