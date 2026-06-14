import Applicants from '@/pages/Applicants'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Applicants',
  description: 'Apply to study abroad with StudyGlide Educational Consult.',
  path: '/applicants',
})

export default function Page() {
  return <Applicants />
}
