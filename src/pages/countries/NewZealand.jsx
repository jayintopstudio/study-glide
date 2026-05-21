import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'University of Canterbury College (Navitas)',
  'Lincoln University', 
  'University of Auckland',
'University of Otago',
'Massey University',
'Victoria University of Wellington – Degree Programs',
'Victoria University of Wellington – Pathway Programs',
'University of Waikato',
'University of Canterbury',
'Auckland University of Technology',
'Unitec Institute of Technology',
'Otago Polytechnic',
'Manukau Institute of Technology',
'Ara Institute of Canterbury',
'Eastern Institute of Technology',
'Waikato Institute of Technology (Wintec)',
'Southern Institute of Technology',
'Western Institute of Technology at Taranaki (WITT)',
'The Universal College of Learning (UCOL)',
'Toi Ohomai Institute of Technology'
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
