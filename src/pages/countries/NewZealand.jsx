import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'University of Canterbury College (Navitas)',
  'Lincoln University',
]

export default function NewZealand() {
  return (
    <CountryPage
      title="Study In New Zealand"
      heroImage={countryHeroImages.newZealand}
      description="New Zealand delivers world-class education in a safe, clean, and naturally beautiful environment with recognized qualifications and good post-study work opportunities."
      schoolsLabel="List of Schools in New Zealand"
      schools={schools}
    />
  )
}
