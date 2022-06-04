import axios from 'axios';
import { useState, useEffect } from 'react';
import CountriesInfo from './components/CountriesInfo'
function App() {

  const [findCountry, setFindCountry] = useState("")
  const [countries, setCountries] = useState([])


  const onFindChange = (event) => {
    setFindCountry(event.target.value)
    console.log(event.target.value)
  }
  const countriesToShow = findCountry != "" ? countries.filter(c => 
    c.name.common.toLowerCase().includes(findCountry)) : []
  
  const oneCountry = countriesToShow.length == 1 ? countriesToShow : []

  useEffect(() => {
  const promise = axios.get('https://restcountries.com/v3.1/all')
  promise
  .then(response=> {
      setCountries(response.data)
    })
  }, [])
  console.log(countries)
  return (
    <div>
      <div>
        find countries <input value={findCountry}
                              onChange={onFindChange}/>
      </div>
      <div>
        {countriesToShow.map(c => {
          return(<div key = {c.cca2}>{c.name.common}</div>)
        })}
      </div>
      <CountriesInfo array = {countriesToShow}/>

    </div>
  );
}

export default App;
