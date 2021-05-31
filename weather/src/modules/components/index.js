import * as React from 'react'
import { weatherService } from '../../service'
import { CityWeatherList } from './CityWeatherList'

export function WeatherForecast() {

    const [city, setCity] = React.useState('')
    const [cityList, setCityList] = React.useState([])
    const [degreeStatus, setDegreeStatus] = React.useState('Celcius')

    const handleCityChange = (evt) => {
        setCity(evt.target.value)
    }
    const handleRemoveFromCityList = (cityName) => {
        console.log(cityList)
        const newArray = cityList.filter((city) => city.data.name != cityName)
        setCityList(newArray)
    }
    const handleSubmitWeatherCity = (e) => {
        e.preventDefault();
        let exists = false
        weatherService.getWeatherDataByCityName(city)
            .then((resp) => {
                if (cityList.length <= 0) {
                    setCityList([...cityList, resp])
                    setCity('')
                } else {
                    cityList.map(({ data }) => {
                        (data.name.toLowerCase()) === (city.toLowerCase()) && (exists = true)
                    })
                    if (!exists) {
                        document.querySelector(".warningExists").classList.add("d-none")

                        setCityList([...cityList, resp])
                        setCity('')
                    } else {
                        document.querySelector(".warningExists").classList.remove("d-none")
                    }
                }

            }).catch(err => {
                return err
            })
    }

    const handleDegreeChange = (degree) => {
        setDegreeStatus(degree)
    }

    return (<>
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-6 ">
                    <form className="w-100" onSubmit={handleSubmitWeatherCity}>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Email address</label>
                            <input name="city" value={city} onChange={handleCityChange} type="text" className="form-control" id="city" />
                            <div id="city" className="form-text">Please enter a city name .</div>
                            <div className="text-danger d-none warningExists">This city data already exists</div>
                            <button className="btn btn-primary" type="submit" > Find</button>
                        </div>
                    </form>
                    <CityWeatherList handleRemoveFromCityList={handleRemoveFromCityList} degree={degreeStatus} cityList={cityList} />
                </div>
                <div className="col-lg-6 mt-5 d-flex justify-content-end">
                    <form action="">
                        <div className="form-check">
                            <input className="form-check-input" value="Kelvin" onChange={e => handleDegreeChange(e.target.value)} type="radio" name="degree" id="Kelvin" />
                            <label className="form-check-label" htmlFor="Kelvin"> Kelvin</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Celcius" onChange={e => handleDegreeChange(e.target.value)} type="radio" name="degree" id="Celcius" />
                            <label className="form-check-label" htmlFor="Celcius">  Celcius</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Fehrenheight" onChange={e => handleDegreeChange(e.target.value)} type="radio" name="degree" id="Fehrenheight" />
                            <label className="form-check-label" htmlFor="Fehrenheight">Fehrenheight </label>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    </>
    )
}


