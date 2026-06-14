import About from '@/pages/About'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'About Us',
  description: 'Learn about StudyGlide Educational Consult and our mission to guide students abroad.',
  path: '/about',
})

export default function Page() {
  return <About />
}
