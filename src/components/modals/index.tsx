import { ModalConfirmation } from './modal-confirmation'

import { createPushModal } from 'pushmodal'

export const {
  pushModal,
  popModal,
  popAllModals,
  replaceWithModal,
  useOnPushModal,
  onPushModal,
  ModalProvider,
} = createPushModal({
  modals: {
    ModalConfirmation,
  },
})
