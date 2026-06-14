import USA from '@/pages/countries/USA'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in United States',
  description: 'Study in the United States with StudyGlide Educational Consult.',
  path: '/destination/usa',
})

export default function Page() {
  return <USA />
}
