import React from 'react';
import SingleCountry from './SingleCountry';

const Results = ({ countries, onShowCountry }) => {
    if (countries.length <= 10 && countries.length > 1) {
        return (
            <div>
                {
                    countries.map((c, i) =>
                        <div key={c.name.official}>
                            <span>
                                {c.name.common}
                            </span>
                            <button type="button" onClick={() => onShowCountry(c.name.common)}>show</button>
                        </div>
                    )
                }
            </div>
        )
    } else if (countries.length == 1) {
        return (
            <SingleCountry data={countries[0]} />
        )
    } else if (countries.length > 0) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
}

export default Results;