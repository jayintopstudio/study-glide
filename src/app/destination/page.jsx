import Destination from '@/pages/Destination'
import { pageMetadata } from '@/config/siteMeta'

export const metadata = pageMetadata({
  title: 'Destinations',
  description: 'Explore top study destinations including the UK, USA, Canada, Australia, and more.',
  path: '/destination',
})

export default function Page() {
  return <Destination />
}
