import { PRODUCT_CATEGORY_COLORS } from '@/lib/constant'
import { formatDate } from '@/lib/dates'

import { ProductCategoryDataTableAction } from './product-category-data-table-action'

import { A, B, D, F, G, N, O, pipe } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'

let ch = createColumnHelper<ProductCategory>()

export const PRODUCT_CATEGORY_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => N.add(props.row.index, 1),
  }),
  ch.accessor('name', {
    header: 'Label Kategori',
    cell: (props) => <span className='text-balance'>{props.getValue()}</span>,
  }),
  ch.accessor('color', {
    header: 'Warna Label',
    cell: (p) => {
      let color = p.getValue()

      return F.ifElse(
        color,
        (fieldValue) => B.and(fieldValue.length > 0)(G.isString(fieldValue)),
        (fieldValue) => (
          <span className='inline-flex items-center gap-x-2'>
            <span className='h-4 w-4 rounded' style={{ backgroundColor: fieldValue }} />
            {pipe(
              PRODUCT_CATEGORY_COLORS,
              A.getBy((field) => F.equals(fieldValue)(field.value)),
              O.getWithDefault({ label: '-', value: '' }),
              D.get('label'),
            )}
          </span>
        ),
        () => <span>-</span>,
      )
    },
  }),
  ch.accessor('updatedAt', {
    header: 'Terakhir Diperbarui',
    cell: (props) => formatDate(props.getValue(), 'EEEE, dd MMM, yyyy. HH:mm:ss'),
  }),
  ch.display({
    id: 'action',
    header: 'Aksi',
    cell: (props) => {
      return <ProductCategoryDataTableAction {...props.row.original} />
    },
  }),
]
