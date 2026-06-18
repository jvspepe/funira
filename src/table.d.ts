import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteResource: (id: string) => void;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    deleteResource?: (id: string | number) => void;
  }
}
