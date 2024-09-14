import { Children } from 'react'

type TFor<D> = {
  each: Array<D> | Readonly<Array<D>>
  children: (item: D, index: number) => JSX.Element
}

export function For<TData>(props: TFor<TData>) {
  return Children.toArray(props.each.map((item, index) => props.children(item, index)))
}
