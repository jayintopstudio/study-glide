import Australia from '@/pages/countries/Australia'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in Australia',
  description: 'Study in Australia with StudyGlide Educational Consult.',
  path: '/destination/australia',
})

export default function Page() {
  return <Australia />
}
