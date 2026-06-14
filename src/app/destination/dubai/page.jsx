import Dubai from '@/pages/countries/Dubai'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in Dubai',
  description: 'Study in Dubai with StudyGlide Educational Consult.',
  path: '/destination/dubai',
})

export default function Page() {
  return <Dubai />
}
