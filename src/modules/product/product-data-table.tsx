"use client";

import { useEffect, useState } from "react";
import { DataTableUI } from "../shared/data-table";
import { useProductList } from "./hooks/use-product-list";
import { PRODUCT_DATA_TABLE_COLUMN } from "./product-data-table-column";
import { toFloat } from "radash";

const PPH_TAX = toFloat(process.env.UMKMK_PPH_TAX, 0.005); // 0,5%;
const RENT_FEE = toFloat(process.env.RENT_FEE, 75000);

export function ProductDataTable() {
  let [isPending, setIsPending] = useState(true);
  let data = useProductList();

  useEffect(() => {
    let timerId = setTimeout(() => setIsPending(false), 500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <section className="pt-6">
      <DataTableUI
        data={data}
        isPending={isPending}
        columns={PRODUCT_DATA_TABLE_COLUMN}
      />
    </section>
  );
}
