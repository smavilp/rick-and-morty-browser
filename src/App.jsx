import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.scss'
import Location from './assets/components/Location'
import ResidentInfo from './assets/components/ResidentInfo'
import Loader from './assets/components/Loader'
import Selection from './assets/components/Selection'

function App() {

  const [locationData, setLocationData] = useState({})
  const [residentsArray, setResidentsArray] = useState([])
  const [charactersSearched, setCharactersSearched] = useState("")
  const [arrayLocations, setArrayLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const stayLoading = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)
  }

  const getRandomAPI = () => {
    let randomId = Math.floor(Math.random()*126) + 1
    axios.get(`https://rickandmortyapi.com/api/location/${randomId}`)
    .then(resp => {
      setResidentsArray(resp.data?.residents)
      setLocationData(resp.data)
    })
    .catch(error => console.error(error))
  }

  const getAPIByCharacter = (characters) => {
    if (characters === ""){
      return
    } else{
      axios.get(`https://rickandmortyapi.com/api/location/?name=${characters}`)
      .then(resp => setArrayLocations(resp.data.results))
      .catch(error => console.error(error))
    }

  }

  const getAPIByLocation = (location) => {
    axios.get(`https://rickandmortyapi.com/api/location/?name=${location}`)
    .then(resp => {
      setResidentsArray(resp.data.results[0].residents)
      setLocationData(resp.data.results[0])
    })
    .catch(error => console.error(error))
  }

  const closeSelection = (location) => {
    getAPIByLocation(location)
    setIsVisible(false)

  }

  useEffect(() => {
    getRandomAPI()
    stayLoading()
  }, [])

  getAPIByCharacter(charactersSearched)


  return (
    <div className="App">
      {isLoading && <Loader />}
      <header className='App-header'>
        <img className='App-img' src="/logo.svg" alt="" />
        <nav className='App-nav'>
          <form className='App-form' onChange={e =>{
            e.preventDefault()
            setCharactersSearched(e.target.value)
            setIsVisible(true)
          }}>
            <input className='App-input' type="text" name='search' placeholder='Search location'/>
              {isVisible ? <div className='App-div'> {arrayLocations.map( (location, index) => (<span className='App-span' onClick={e => closeSelection(e.target.textContent)} key={index}> {location.name} </span>))}</div> : null}
          </form>
        </nav>
        <h1 className='App-h1'>Location</h1>
        <Location
          data = {locationData}
        />
      </header>
      <main className='App-main'>
      <h2 className='App-h2'>Residents</h2>
        <ul className='App-ul'>
          {residentsArray.map((url,index) => (
            <ResidentInfo
            url = {url}
            key = {index}
            />
          ))}
        </ul>
      </main>
      <footer>
        <nav>

        </nav>
      </footer>
    </div>
  )
}

export default App
