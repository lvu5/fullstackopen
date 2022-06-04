const Countries = (props) => {
    
    if (props.array.length == 1) {
        const languages = props.array[0].languages
        console.log(languages)
        return (
            <div>
                <h2>{props.array[0].name.official}</h2>
                <div>
                    capital {props.array[0].capital[0]}<br></br>
                    area {props.array[0].area}
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
                    <img src={props.array[0].flags.png}/>
                </div>
            </div>
        )
    }
}

export default Countries