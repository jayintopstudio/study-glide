import Home from '@/pages/Home'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({ path: '/' })

export default function Page() {
  return <Home />
}
