import Contact from '@/pages/Contact'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Get in touch with StudyGlide Educational Consult.',
  path: '/contact',
})

export default function Page() {
  return <Contact />
}
