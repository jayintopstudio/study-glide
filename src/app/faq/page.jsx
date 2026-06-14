import Faq from '@/pages/Faq'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'FAQ',
  description: 'Frequently asked questions about studying abroad with StudyGlide Educational Consult.',
  path: '/faq',
})

export default function Page() {
  return <Faq />
}
