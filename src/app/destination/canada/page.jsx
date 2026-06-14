import Canada from '@/pages/countries/Canada'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in Canada',
  description: 'Study in Canada with StudyGlide Educational Consult.',
  path: '/destination/canada',
})

export default function Page() {
  return <Canada />
}
