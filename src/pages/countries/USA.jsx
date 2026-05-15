import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'Arizona State University', 'Queens College', 'Virginia Commonwealth University',
  'University of Massachusetts (Lowell)', 'University of Massachusetts (Dartmouth)',
  'University of Massachusetts (Boston)', 'Florida Atlantic University',
  'Thomas Jefferson University', 'Quinnipiac University', 'University of Arizona',
  'University of Alabama, Birmingham', 'University of South Florida',
  'Colorado State University', 'George Mason University', 'Hofstra University',
  'Saint Louis University',
]

export default function USA() {
  return (
    <CountryPage
      title="Study In USA"
      heroImage={countryHeroImages.usa}
      description="The United States offers unmatched academic flexibility, cutting-edge research, and vast networking opportunities. With options to work while studying and various post-study pathways, it is ideal for ambitious students aiming for global careers."
      schoolsLabel="List of Schools in the United States"
      schools={schools}
    />
  )
}
