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
                                temp = data.main.temp * 241
                                break;
                            case 'Celcius':
                                temp = data.main.temp
                                break;
                            case 'Fehrenheight':
                                temp = data.main.temp * 33.8
                                break;

                            default:
                                break;
                        }
                        return (
                            <>
                                <li> <button onClick={() => handleRemoveFromCityList(data.name)}
                                    className="badge bg-secondary">--</button>{data.name}  <b>
                                        {temp} C </b></li>
                            </>)
                    })}

                </ul>
            </div >
        </>
    )
}

