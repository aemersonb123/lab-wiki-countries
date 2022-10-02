import React from 'react';
import { Link } from 'react-router-dom';

function CountriesList({ countries }) {
  return (
    <div className="row">
      <div className="col">
        <div className="list-group">
          {countries.map((country) => (
            <Link
              className="list-group-item list-group-item-action"
              to={'/' + country.alpha3Code}
            >
              {country.name.official}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountriesList;
