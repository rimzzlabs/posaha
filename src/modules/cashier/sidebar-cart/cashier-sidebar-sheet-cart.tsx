'use client'

import { Sheet, SheetContent } from '@/components/ui/sheet'

import { sheetCartAtom, toggleSheetCartAtom } from '@/states/cart'

import { CashierSidebarCartEmpty } from './cashier-sidebar-cart-empty'
import { CashierSidebarCartHeader } from './cashier-sidebar-cart-header'
import { CashierSidebarCartProductList } from './cashier-sidebar-cart-product-list'
import { CashierSidebarCartTotals } from './cashier-sidebar-cart-totals'
import { SidebarCartFooter } from './sidebar-cart-footer'

import { useAtomValue, useSetAtom } from 'jotai'

export function CashierSidebarSheetCart({ cartItems }: { cartItems: Array<TCartProductItem> }) {
  let isSheetOpen = useAtomValue(sheetCartAtom)
  let onOpenChange = useSetAtom(toggleSheetCartAtom)

  return (
    <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <CashierSidebarCartHeader asSheet />

        <div className='py-4'>
          <CashierSidebarCartEmpty cartItems={cartItems} />
          <CashierSidebarCartProductList cartItems={cartItems} />
          <CashierSidebarCartTotals cartItems={cartItems} />
        </div>

        <SidebarCartFooter asSheet cartItems={cartItems} />
      </SheetContent>
    </Sheet>
  )
}
