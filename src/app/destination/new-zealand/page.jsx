import NewZealand from '@/pages/countries/NewZealand'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Study in New Zealand',
  description: 'Study in New Zealand with StudyGlide Educational Consult.',
  path: '/destination/new-zealand',
})

export default function Page() {
  return <NewZealand />
}
