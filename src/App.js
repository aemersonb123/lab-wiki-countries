import { Route, Routes } from 'react-router-dom';
import './App.css';
import CountriesList from './components/CountriesList';
import Navbar from './components/Navbar';
import CountryDetails from './components/CountryDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    setCountries(
      (await axios.get('https://ih-countries-api.herokuapp.com/countries')).data
    );
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<CountriesList countries={countries} />}
          exact
        />
        <Route path="/:alpha3Code" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}
export default App;
