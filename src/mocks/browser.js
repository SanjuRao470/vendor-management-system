import { setupWorker } from 'msw/browser'
import {
  dashboardHandlers,
  vendorHandlers,
  notificationHandlers,
  approvalHandlers,
} from './handlers/index'

export const worker = setupWorker(
  ...dashboardHandlers,
  ...vendorHandlers,
  ...notificationHandlers,
  ...approvalHandlers,
)

export async function enableMocking() {
 // if (import.meta.env.PROD) return

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
