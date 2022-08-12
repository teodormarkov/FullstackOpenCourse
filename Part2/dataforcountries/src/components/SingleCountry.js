import { useEffect, useState } from 'react';
import Languages from './Languages';
import Weather from './Weather';
import axios from 'axios';

function SingleCountry({ data }) {
    const [weather, setWeather] = useState();

    useEffect(() => {
        const api = process.env.REACT_APP_API_KEY;
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&units=metric&appid=${api}`)
            .then(response => {
                let result = response.data;
                let iconid = result.weather[0].icon;
                result.icon = `http://openweathermap.org/img/wn/${iconid}@2x.png`
                setWeather(result);
            })
    });

    return (
        <div>
            <h3>{data.name.common}</h3>
            <div>
                <span>capital:</span>
                <span>{data.capital[0]}</span>
            </div>
            <div>
                <span>area:</span>
                <span>{data.area}</span>
            </div>
            <Languages data={data.languages} />
            <img src={Object.values(data.flags)[0]} />
            <Weather data={weather} />
        </div>
    )
}

export default SingleCountry;