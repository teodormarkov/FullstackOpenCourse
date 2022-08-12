const Weather = ({ data }) => {
    if (data == undefined) {
        return (
            <div>No weather data yet</div>
        )
    }
    return (
        <div>
            <h4>Weather in {data.name}</h4>
            <div>
                <span>temperature: </span>
                <span>{data.main.temp} Celcius</span>
            </div>
            <img src={data.icon}/>
            <div>
                <span>wind: </span>
                <span>{data.wind.speed} m/s</span>
            </div>
        </div>
    );
}

export default Weather;