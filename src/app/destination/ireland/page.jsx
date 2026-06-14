import Ireland from '@/pages/countries/Ireland'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in Ireland',
  description: 'Study in Ireland with StudyGlide Educational Consult.',
  path: '/destination/ireland',
})

export default function Page() {
  return <Ireland />
}
