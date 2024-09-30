import { Card, CardContent } from '@/components/ui/card'

import { getCartItemsByUserId } from '@/database/query/cart'
import { auth } from '@/server/next-auth'

import { CashierSidebarCartEmpty } from './cashier-sidebar-cart-empty'
import { CashierSidebarCartHeader } from './cashier-sidebar-cart-header'
import { CashierSidebarCartProductList } from './cashier-sidebar-cart-product-list'
import { CashierSidebarCartTotals } from './cashier-sidebar-cart-totals'
import { CashierSidebarSheetCart } from './cashier-sidebar-sheet-cart'
import { SidebarCartFooter } from './sidebar-cart-footer'

import * as R from 'react'

export async function CashierSidebarCart() {
  let session = await auth()
  if (!session) return null

  let cartItems = await getCartItemsByUserId(session.user.id)

  return (
    <R.Fragment>
      <CashierSidebarSheetCart cartItems={cartItems} />

      <div className='max-xl:hidden'>
        <Card>
          <CashierSidebarCartHeader />

          <CardContent>
            <CashierSidebarCartEmpty cartItems={cartItems} />
            <CashierSidebarCartProductList cartItems={cartItems} />
            <CashierSidebarCartTotals cartItems={cartItems} />
          </CardContent>

          <SidebarCartFooter cartItems={cartItems} />
        </Card>
      </div>
    </R.Fragment>
  )
}
