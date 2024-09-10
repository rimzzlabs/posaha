import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

type TModalForm = {
  title: string
  description: string
  isPending: boolean
  render: () => JSX.Element
}

export function ModalForm(props: TModalForm) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
      </DialogHeader>

      {props.render()}
    </DialogContent>
  )
}
