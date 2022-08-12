import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const countriesToShow = () => {
    if (search === '') return [];
    return countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div>
      <Search value={search} onChange={(event) => { setSearch(event.target.value) }} />
      <Results countries={countriesToShow()} onShowCountry={(countryname) => { setSearch(countryname) }} />
    </div>
  )
}

export default App;
