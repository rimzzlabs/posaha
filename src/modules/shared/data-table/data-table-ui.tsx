import { For } from "@/components/ui/for";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { O, Option, pipe } from "@mobily/ts-belt";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { InboxIcon, Loader2 } from "lucide-react";

type TDataTableUI<D> = {
  data: Option<Array<D>>;
  columns: Array<ColumnDef<D, any>>;

  className?: string;

  isPending: boolean;
  emptyState?: {
    label?: string;
    description?: string;
  };
};

export function DataTableUI<D>(props: TDataTableUI<D>) {
  let table = useReactTable({
    data: pipe(O.fromNullable(props.data), O.getWithDefault([] as Array<D>)),
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });

  let headerGroups = table.getHeaderGroups();
  let rows = table.getSortedRowModel().rows;
  let displayLoading = props.isPending;

  return (
    <ScrollArea className={cn("h-[calc(100vh-27rem)]", props.className)}>
      <Table>
        <TableHeader>
          <For each={headerGroups}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <TableHead>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>

        <TableBody>
          {displayLoading && (
            <TableRow>
              <TableCell colSpan={table.getLeafHeaders().length}>
                <div className="h-[calc(100vh-32rem)] flex flex-col items-center justify-center gap-2 tracking-tight">
                  <Loader2
                    size="2rem"
                    className="text-muted-foreground animate-spin"
                  />
                  <p className="text-sm font-semibold text-muted-foreground">
                    Memproses permintaan
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {rows.length === 0 && !displayLoading && (
            <TableRow>
              <TableCell colSpan={table.getLeafHeaders().length}>
                <div className="h-[calc(100vh-32rem)] flex flex-col items-center justify-center gap-2 tracking-tight">
                  <InboxIcon size="2rem" className="text-muted-foreground" />
                  <p className="text-sm font-semibold text-muted-foreground">
                    Tidak ada daftar produk
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {rows.length > 0 && !displayLoading && (
            <For each={rows}>
              {(row) => (
                <TableRow>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <TableCell>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
