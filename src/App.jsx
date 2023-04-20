import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.scss'
import Location from './assets/components/Location'
import ResidentInfo from './assets/components/ResidentInfo'
import Loader from './assets/components/Loader'
import Pagination from './assets/components/Pagination'

function App() {

  const [locationData, setLocationData] = useState({})
  const [residentsArray, setResidentsArray] = useState([])
  const [charactersSearched, setCharactersSearched] = useState("")
  const [arrayLocations, setArrayLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState (1)
  const [residentsPerPage] = useState(15)

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
    .finally(setIsLoading(false))
  }

  const closeSelection = (location) => {
    setIsLoading(false)
    getAPIByLocation(location)
    setIsVisible(false)
  }

  useEffect(() => {
    getRandomAPI()
    stayLoading()
  }, [])

  getAPIByCharacter(charactersSearched)

  const indexOfLastResident = currentPage * residentsPerPage
  const indexOfFirstResident = indexOfLastResident - residentsPerPage
  const currentResidents = residentsArray.slice(indexOfFirstResident,indexOfLastResident)
  const paginate = pageNumber => setCurrentPage (pageNumber)

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
        {
          (currentResidents.length===0)
          ?<span url = {null} key = {null} className='App-span--ul'>There are no residents at this location</span>
          :<ul className='App-ul'> {currentResidents.map((url,index) => (<ResidentInfo url = {url} key = {index}/>))}</ul>
        }
      </main>
      <footer className='App-footer'>
        <Pagination
          residentsPerPage = {residentsPerPage}
          totalResidents = {residentsArray.length}
          paginate = {paginate}
        />
      </footer>
    </div>
  )
}

export default App
