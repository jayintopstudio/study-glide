import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'Dublin Business School', 'Griffith College', 'CCT Dublin',
  'Munster Technological University', 'Technology University of Shannon',
  'National College of Ireland', 'University of Limerick', 'Maynooth University',
]

export default function Ireland() {
  return (
    <CountryPage
      title="Study In Ireland"
      heroImage={countryHeroImages.ireland}
      description="Ireland is known for its excellent education system, friendly environment, and strong post-study work opportunities. Home to global tech giants and a vibrant student culture, Ireland is a smart choice for students seeking quality education at accessible prices within Europe."
      schoolsLabel="List of Schools in Ireland"
      schools={schools}
    />
  )
}
