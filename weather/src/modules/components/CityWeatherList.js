import * as  React from 'react'

export function CityWeatherList({ cityList, degree, handleRemoveFromCityList }) {
    let temp;


    return (
        <>
            < div className="div" >
                <ul className="list-unstyled">
                    {cityList.map(({ data }) => {
                        switch (degree) {
                            case 'Kelvin':
                                temp = (data.main.temp * 241).toString() + " K"
                                break;
                            case 'Celcius':
                                temp = (data.main.temp).toString() + " C"
                                break;
                            case 'Fehrenheight':
                                temp = (data.main.temp * 33.8).toString() + " F"
                                break;

                            default:
                                break;
                        }
                        return (
                            <>
                                <li key={data.name}> <button onClick={() => handleRemoveFromCityList(data.name)}
                                    className="badge bg-secondary">--</button>{data.name}  <b>
                                        {temp}  </b></li>
                            </>)
                    })}

                </ul>
            </div >
        </>
    )
}

