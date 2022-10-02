import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function CountryDetails() {
  const { alpha3Code } = useParams();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);

  const getCountry = async (alpha3Code) => {
    return (
      await axios.get(
        'https://ih-countries-api.herokuapp.com/countries/' + alpha3Code
      )
    ).data;
  };

  const loadCountries = async () => {
    const countryData = await getCountry(alpha3Code);
    setCountry(countryData);

    const borders = [];
    for (let i = 0; i < countryData?.borders.length; i++)
      borders.push((await getCountry(countryData.borders[i])))

    setBorders(borders);
  };

  useEffect(() => {
    loadCountries();
  }, [alpha3Code]);

  return (
    <div className="col-7">
      <h1>{country?.name?.official}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country?.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {borders?.map((border) => (
                  <li>
                    <Link to={'/' + border.alpha3Code}>
                      {border.name.official}
                    </Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
