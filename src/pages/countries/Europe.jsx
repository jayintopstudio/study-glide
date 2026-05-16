import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'LUT University, Lappeenranta',
  'LAB University of Applied Sciences, Lahti',
  'University of Eastern Finland, Kuopio',
  'University of Vaasa, Vaasa',
  'Tampere University',
  'University of Jyväskylä, Jyväskylä',
  'INSEEC Business School, Paris',
  'NEOMA Business School, Rouen',
  'ECE Engineering School, Paris',
  'College de Paris, Paris',
  'ICN Business School, Nancy and Paris Campus',
  'Budapest University of Economics and Business, Budapest',
  'Corvinus University of Budapest, Budapest',
  'International Business School (IBS)',
  'Vilnius University',
  'Kazimieras Simonavičius University',
  'Warsaw University of Business and Psychology, Warsaw',
  'WSB University, Dąbrowa Górnicz',
  'University of Technology and Arts in Applied Sciences in Warsaw',
  'Coventry University, Poland Campus',
  'University of Information Technology and Management in Rzeszow',
  '(INTO) Saint Louis University, Madrid',
  'EU Business School, Barcelona',
  'UCAM International, Murcia',
  'Berlin School of Business and Innovation, Barcelona and Madrid campus',
  'Schiller International University, Madrid Campus',
  'Universidad Europea, Madrid',
  'LCI Barcelona',
  'Erasmus University Rotterdam, Rotterdam',
  'University of Applied Sciences Europe, Amsterdam',
  'SRH Haarlem University of Applied Sciences, Haarlem',
  'Constructor University, Bremen',
  'EBS University, Wiesbaden',
  'International School of Management, Dortmund',
  'Northern Institute of Technology Management (NIT)',
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
