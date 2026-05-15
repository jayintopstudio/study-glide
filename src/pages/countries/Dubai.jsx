import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'Murdoch University', 'Middlesex University', 'Curtin University',
]

export default function Dubai() {
  return (
    <CountryPage
      title="Study In Dubai"
      heroImage={countryHeroImages.dubai}
      description="Dubai is a modern global education hub that combines academic excellence with a vibrant, multicultural lifestyle and strong industry connections. Study in one of the world's most dynamic cities and access a vast network of global employers."
      schoolsLabel="List of Schools in Dubai"
      schools={schools}
    />
  )
}
