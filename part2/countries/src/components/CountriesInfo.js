import { useEffect, useState } from 'react';
const DisplayCountries = (array) => {
    const languages = array[0].languages
    console.log(languages)
    return (
            <div>
                <h2>{array[0].name.common}</h2>
                <div>
                    capital {array[0].capital[0]}<br></br>
                    area {array[0].area}
                </div>
                <div>
                    <p><b>languages:</b></p>
                    <ul>
                      {Object.keys(languages).map(key => {
                          return(
                            <li key={key}>
                                {languages[key]}
                            </li>
                          )
                      })}
                    </ul>
                </div>
                <div>
                    <img src={array[0].flags.png}/>
                </div>

            </div>
        )
}

const DisplayCountry = (country) => {
    const languages = country.languages
    console.log("run")
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>
                    capital {country.capital}<br></br>
                    area {country.area}
                </div>
                <div>
                    <p><b>languages:</b></p>
                    <ul>
                      {Object.keys(languages).map(key => {
                          return(
                            <li key={key}>
                                {languages[key]}
                            </li>
                          )
                      })}
                    </ul>
                </div>
                <div>
                    <img src={country.flags.png}/>
                </div>
            </div>
        )
}
// y 1 5 1
// r 1 0 0
const Countries = (props) => {
    var array_cca2 = props.array.map(c => {
            return c.cca2
        }
    )
    const key_api="4bc72c7112c04849fcc7430d52eba260"

    array_cca2 = array_cca2.reduce((acc, cur)=> (acc[cur]=false, acc), {})
    
    var [isShown, setisShown] = useState(array_cca2)
    
    function handleClick(e) {
        const key = e.target.getAttribute("data-name")
        console.log(e.target.getAttribute("data-name"))
        var isShownCopy = {...isShown}
        console.log("before element",isShownCopy[key])
        console.log("before array", isShownCopy)       
        setisShown(isShownCopy)
        
        isShownCopy[key] = !isShownCopy[key]
        
        setisShown(isShownCopy)
        console.log("after element",isShownCopy[key])
        console.log("after array", isShownCopy)
    }
    if (props.array.length == 1) {
        return (DisplayCountries(props.array))
    }
    else {
        const countriesToShow = props.array
        return (
            <div>
                {countriesToShow.map(c => {
                    return(
                        <div key = {c.cca2}>
                            {c.name.common}
                            <button onClick={handleClick}
                            data-name={c.cca2}
                            >show</button>
                            {
                                isShown[c.cca2] ? DisplayCountry(c) : null
                            }

                        </div>
                    )
                })
                }
            </div>
        )
    }
}
export default Countries