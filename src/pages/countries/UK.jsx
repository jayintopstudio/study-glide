import CountryPage from '../../components/CountryPage'
import { countryHeroImages } from '../../data/countryHeroImages'

const schools = [
  'Robert Gordon University', 'University of Hertfordshire', 'Middlesex University',
  'Sunderland University', 'Coventry University', 'Birmingham City University College',
  'Cambridge Ruskin University College', 'University of Chester', 'Aston University',
  'University of Lancashire', 'University of Plymouth', 'Northumbria University',
  'University of Chichester', 'University of Creative Arts', 'International College Portsmouth',
  'Leicester Global Study Center', 'London Brunel Intl College', 'The College, Swansea University',
  'University of Northampton Intl College', 'University of Plymouth Intl College', 'Kaplan',
  'Queens University of Belfast', 'DeMontfort University', 'University of Stirling',
  'University of East Anglia', 'GCU (through INTO)', 'MMU (through INTO)', 'Newcastle University',
  'Cranfield University', 'QAHE', 'University of Gloucestershire', 'University of Edinburgh',
  'University of Derby', 'Keele University', 'CATS Colleges (A Level)', 'Mander Portman Woodward',
  'University of Liverpool (Kaplan)', 'University of Glasgow (Kaplan)', 'University of Bristol (Kaplan)',
  'University of West of England (Kaplan)', 'Nottingham Trent University (Kaplan)',
  'University of Birmingham (Kaplan)', 'University of Bournemouth (Kaplan)',
  'University of Nottingham (Kaplan)', 'University of York', 'University of West Scotland',
  'University of West London', 'Liverpool John Moore University', 'Edge Hill University',
  'University of Salford', 'York St John University', 'INTO Pathway',
  'Glasgow Caledonian University', 'Manchester Metropolitan University', 'University of Exeter',
  'University of Roehampton', 'University of Ulster', 'Lincoln University',
  'Canterbury Christchurch University', 'Buckinghamshire New University', 'Padworth College',
]

export default function UK() {
  return (
    <CountryPage
      title="Study In UK"
      heroImage={countryHeroImages.uk}
      description="The United Kingdom is one of the world's most prestigious education destinations. With renowned universities, shorter course durations, and the UK Graduate Route visa allowing up to 2 years of post-study work, the UK offers exceptional value and strong career outcomes for international students."
      schoolsLabel="List of Schools in the United Kingdom"
      schools={schools}
    />
  )
}
