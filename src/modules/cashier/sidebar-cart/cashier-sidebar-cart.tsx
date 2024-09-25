'use client'

import { Card, CardContent } from '@/components/ui/card'

import { sidebarCartAtom } from '@/states/storage'

import { CashierSidebarCartEmpty } from './cashier-sidebar-cart-empty'
import { CashierSidebarCartHeader } from './cashier-sidebar-cart-header'
import { CashierSidebarCartProductList } from './cashier-sidebar-cart-product-list'
import { CashierSidebarCartTotals } from './cashier-sidebar-cart-totals'
import { SidebarCartFooter } from './sidebar-cart-footer'

import { useAtomValue } from 'jotai'

export function CashierSidebarCart() {
  let isSidebarOpen = useAtomValue(sidebarCartAtom)

  if (!isSidebarOpen) return null

  return (
    <Card>
      <CashierSidebarCartHeader />

      <CardContent>
        <CashierSidebarCartEmpty />
        <CashierSidebarCartProductList />
        <CashierSidebarCartTotals />
      </CardContent>

      <SidebarCartFooter />
    </Card>
  )
}
