"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customers = {
  id: number;
  fullName: string;
  phoneNumber: string;
};

export const columns: ColumnDef<Customers>[] = [
  {
    accessorKey: "fullName",
    header: "الإسم الكامل",
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
  },
];
