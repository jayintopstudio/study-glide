import Europe from '@/pages/countries/Europe'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in Europe',
  description: 'Study in Europe with StudyGlide Educational Consult.',
  path: '/destination/europe',
})

export default function Page() {
  return <Europe />
}
