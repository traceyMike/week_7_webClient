// make request to api when page loads
// use data in response to make html elements
// for the table that shows weather forecast
let weatherApiUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast' // url for weather api


let forecastTableElement = document.querySelector('#weather-forecast')
// // use a request - not instant to make request to another url
// make script do other stuff so site is not laggy - set up structure to deal with responses we may get back in future
// A Promise promises that it will tell you program once results available
// or it will tell program that there was error - attach to function call
fetch(weatherApiUrl).then(response => {
    // response is bytes of data - use then method
    // need to get the response's data and convert to JSON - 
    // javacript objects and arrays our program can use
    // describe funciton to be called when we get response back
    let jsonProcessingPromise = response.json() //
    return jsonProcessingPromise // .json built-in JS method
}).then(processedJson => {
    // processedJson is JavaScript objects we can use in the program
    console.log(processedJson)
    let forecastProperties = processedJson.properties
    let forecastArray = forecastProperties.periods
    console.log(forecastArray)

    forecastArray.forEach(forecast => {
        // for every forecast period, we need a new table row
        let tableRowElement = document.createElement('tr')
        // for each piece of info, need one table data
        // time period, temp, etc, need one table data td element
        console.log(forecast)
        let timePeriod = forecast.name // e.g. 'tonight' or 'thursday'
        console.log(timePeriod)
        let timePeriodTdElement = document.createElement('td')
        timePeriodTdElement.innerHTML = timePeriod // set the text to the data read from API
        // add the td to the table row
        tableRowElement.appendChild(timePeriodTdElement)
        // todo make the other td elements 
        // use the temperature property for temp
        // use the detailedForecast property for text description
        // use the icon prop to get the url for the icon
        // use the windSpeed and windDirection for the wind forecast
        let temperatureText = forecast.temperature
        let temperatureTdElement = document.createElement('td')
        temperatureTdElement.innerHTML = temperatureText
        tableRowElement.appendChild(temperatureTdElement)
        // you will need a new img element and set source to the icon
        // property's value. See wikipedia example from 2 weeks
        // ago
        // make a td to contain the img element

        // add table row to the table
        forecastTableElement.appendChild(tableRowElement)
    })
})
    // returns what?
    // returns it to where? in return response - hover over - 




