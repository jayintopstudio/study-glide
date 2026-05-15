import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'Griffith University', 'La Trobe (thru Navitas)', 'Western Sydney (thru Navitas)',
  'University of Adelaide (Kaplan)', 'James Cook University Brisbane',
  'Western Sydney Intl College (Navitas)', 'Western Sydney University Sydney City Campus',
  'La Trobe University Sydney Campus', 'La Trobe College (Navitas)', 'Curtin College',
  'Deakin College', 'Edith Cowan College', 'Eynesbury College', 'Newcastle Intl College',
  'South Australia IBT', 'Sydney IBT', 'Torrens University',
]

export default function Australia() {
  return (
    <CountryPage
      title="Study In Australia"
      heroImage={countryHeroImages.australia}
      description="Australia offers one of the world's best education systems, outstanding quality of life, and generous post-study work visas. Students benefit from practical learning, industry connections, and excellent opportunities to gain international experience."
      schoolsLabel="List of Schools in Australia"
      schools={schools}
    />
  )
}
