type Sales = TPrettify<
  {
    id: string
    product: Product
    qty: number
    total: number
    remark?: string
    cashier: { name: string; id: string }
  } & TTimeStamp
>
