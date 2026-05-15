import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'LUT University, Lappeenranta (Finland)',
  'University of Eastern Finland, Kuopio',
  'University of Vaasa, Vaasa',
  'University of Jyväskylä, Jyväskylä',
  'INSEEC Business School, Paris',
  'ECE Engineering School, Paris',
  'College de Paris, Paris',
  'Corvinus University of Budapest, Budapest',
  'Vilnius University',
  'Warsaw University of Business and Psychology, Warsaw',
  'University of Technology and Arts in Applied Sciences in Warsaw',
  'University of Information Technology and Management in Rzeszow',
  'EU Business School, Barcelona',
  'UCAM International, Murcia',
  'Universidad Europea, Madrid',
  'LCI Barcelona',
  'University of Applied Sciences Europe, Amsterdam',
  'Constructor University, Bremen',
  'EBS University, Wiesbaden',
  'International School of Management, Dortmund',
]

export default function Europe() {
  return (
    <CountryPage
      title="Study In Europe"
      heroImage={countryHeroImages.europe}
      description="Europe provides high-quality English-taught programmes, affordable tuition in many countries, and rich cultural experiences. Discover historic and innovative institutions across the continent with strong graduate employment outcomes."
      schoolsLabel="List of Schools in Europe"
      schools={schools}
    />
  )
}
