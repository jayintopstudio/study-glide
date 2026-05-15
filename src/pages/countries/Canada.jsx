import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'University of Canada West', 'Farleigh Dickinson University', 'University of Niagara Falls',
  'Sheridan College', 'University of Manitoba (ICM)', 'Simon Fraser University (FIC)',
  'Niagara College', 'Brock University', 'Sheridan College', 'Southern Ontario Collegiate'
]

export default function Canada() {
  return (
    <CountryPage
      title="Study In Canada"
      heroImage={countryHeroImages.canada}
      description="Canada is a top destination for international students, known for high-quality education, safe communities, and strong post-graduation pathways. With welcoming immigration policies and a multicultural environment, Canada offers an exceptional experience for Nigerian students looking to build global careers."
      schoolsLabel="List of Schools in Canada"
      schools={schools}
    />
  )
}
