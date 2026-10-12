import { useState } from 'react'
import './App.css'

// ---------------------------------------------------------------
// DATA: a plain array of objects. Each object is one resource.
// Your team can add, edit, or remove items here without touching
// any of the other code. "topics" and "format" are what the
// filter looks at.
// ---------------------------------------------------------------
const RESOURCES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, 24/7 support by call or text for anyone in emotional distress or crisis.',
    topics: ['crisis', 'anxiety', 'depression', 'stress'],
    format: 'phone/text',
    contact: 'Call or text 988',
  },
  {
    name: 'Crisis Text Line',
    description: 'Free, 24/7 text-based support with a trained crisis counselor.',
    topics: ['crisis', 'anxiety', 'stress'],
    format: 'phone/text',
    contact: 'Text HOME to 741741',
  },
  {
    name: 'SAMHSA National Helpline',
    description: 'Free, confidential referrals to treatment and support services, 24/7.',
    topics: ['substance use', 'depression', 'anxiety'],
    format: 'phone/text',
    contact: '1-800-662-4357',
  },
  {
    name: 'NAMI (National Alliance on Mental Illness)',
    description: 'Education, support groups, and a helpline for people and families.',
    topics: ['depression', 'anxiety', 'stress'],
    format: 'online',
    contact: 'nami.org',
  },
  {
    name: 'Mental Health America',
    description: 'Free screening tools and articles about common mental health topics.',
    topics: ['anxiety', 'depression', 'stress', 'sleep'],
    format: 'online',
    contact: 'mhanational.org',
  },
  {
    name: 'The Jed Foundation',
    description: 'Mental health resources made specifically for teens and college students.',
    topics: ['stress', 'anxiety', 'depression'],
    format: 'online',
    contact: 'jedfoundation.org',
  },
  {
    name: 'Active Minds',
    description: 'Student-focused organization with campus chapters that reduce stigma.',
    topics: ['stress', 'anxiety', 'depression'],
    format: 'on-campus',
    contact: 'activeminds.org (find a chapter)',
  },
  {
    name: 'USC Student Health and Well-being Center',
    description: 'Covered by your student health fees, with trained counselors and support groups.',
    topics: ['stress', 'anxiety', 'depression', 'sleep', 'substance use'],
    format: 'on-campus',
    contact: 'https://sc.edu/about/offices_and_divisions/student-health-well-being/',
  },
]

const TOPICS = ['anxiety', 'depression', 'stress', 'sleep', 'substance use', 'crisis']
const FORMATS = ['online', 'on-campus', 'phone/text']

function App() {
  // ---------------------------------------------------------------
  // STATE: values React remembers. When one changes, React re-draws
  // the page automatically.
  // useState('') means "start with an empty value".
  // ---------------------------------------------------------------
  const [topic, setTopic] = useState('')
  const [format, setFormat] = useState('')
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  // Runs when the user clicks "Find resources" (or presses Enter).
  function handleSubmit(event) {
    event.preventDefault() // stops the browser from reloading the page

    // THE "PROGRAM DOES SOMETHING" PART: filter the array using
    // what the user chose. An empty choice means "match anything".
    const matches = RESOURCES.filter((resource) => {
      const topicMatches = topic === '' || resource.topics.includes(topic)
      const formatMatches = format === '' || resource.format === format
      return topicMatches && formatMatches
    })

    setResults(matches)
    setHasSearched(true)
  }

  function handleReset() {
    setTopic('')
    setFormat('')
    setResults([])
    setHasSearched(false)
  }

  return (
    <div className="app">
      <header>
        <h1>Mental Minds</h1>
        <p>Find mental health support that fits what you need.</p>
      </header>

      {/* Always visible, no matter what the user searches */}
      <div className="crisis-banner">
        <strong>In crisis or need to talk right now?</strong> Call or text <strong>988</strong>,
        or text <strong>HOME</strong> to <strong>741741</strong>. Free, 24/7.
      </div>

      {/* THE "USER ENTERS DATA" PART: a form with two dropdowns */}
      <form onSubmit={handleSubmit}>
        <label>
          What are you looking for help with?
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Anything</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          How would you like to get support?
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">Any way</option>
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <div className="buttons">
          <button type="submit">Find resources</button>
          <button type="button" className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* THE "SHOWS THE USER" PART: only appears after a search */}
      {hasSearched && (
        <section>
          <h2>
            {results.length} {results.length === 1 ? 'resource' : 'resources'} found
          </h2>

          {results.length === 0 && (
            <p>No matches. Try choosing "Anything" or "Any way" to widen your search.</p>
          )}

          {/* .map() turns each resource object into a card on screen.
              "key" helps React keep track of each item in the list. */}
          {results.map((resource) => (
            <article key={resource.name} className="card">
              <h3>{resource.name}</h3>
              <p>{resource.description}</p>
              <p className="meta">
                <span className="tag">{resource.format}</span>
                <strong>{resource.contact}</strong>
              </p>
            </article>
          ))}
        </section>
      )}

      <footer>
        <p>
          This app shares general information and is not a substitute for professional
          care, diagnosis, or treatment.
        </p>
      </footer>
    </div>
  )
}

export default App
