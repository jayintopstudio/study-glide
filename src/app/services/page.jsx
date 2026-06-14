import Services from '@/pages/Services'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Services',
  description: 'Comprehensive study abroad services from university selection to visa assistance.',
  path: '/services',
})

export default function Page() {
  return <Services />
}
