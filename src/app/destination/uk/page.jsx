import UK from '@/pages/countries/UK'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in United Kingdom',
  description: 'Study in the United Kingdom with StudyGlide Educational Consult.',
  path: '/destination/uk',
})

export default function Page() {
  return <UK />
}
