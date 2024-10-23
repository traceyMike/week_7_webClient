let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector('#user-answer')
let submitButton = document.querySelector('#submit-answer')
let resultTextElement = document.querySelector('#result')
let PlayAgainButton = document.querySelector('#play-again-btn')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 


// TODO when the page loads, select an element at random from the countriesAndCodes array

// TODO display the country's name in the randomCountryElement 

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare the actual capital city to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 

let currentCountryCode // stores current country code
let countryIndex = 0 // select 0 to start with first country
// function to get random country from countriesAndCodes
function getRandomCountry() { // getRandomCountry function -
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length)
    let selectedCountry = countriesAndCodes[randomIndex]
    return selectedCountry // return the selected country
}

// function to start game - set up game by displaying random country name, prepare user input fields
function startGame() { 
    let randomCountry = getRandomCountry()
    randomCountryElement.innerHTML = randomCountry['name'] // use country name
    currentCountryCode = randomCountry['code'] // store country code
    resultTextElement.innerHTML = '' // clear previous result
    userAnswerElement.value = '' // clear previous answer
    PlayAgainButton.style.display = 'none' // hide play again button 

} // comment

// check user's answer - input compared to capital city, correct message displayed otherwise 'wrong' message
function checkAnswer() {
    let userAnswer = userAnswerElement.value // get user's input 
    // regular expression to check if input is empty or contains only spaces
    if (/^\s*$/.test(userAnswer)) {
        alert('please enter an answer')
        return
    }
    // use country code associated with current country
    // add ${currentCountryCode} to insert two letter country code associated
    // with random country user is being tested on
    let apiUrl = `https://api.worldbank.org/v2/country/${currentCountryCode}?format=json`

    fetch(apiUrl)
        .then(function(response){
            if (!response.ok) {
                alert('Network response not working. Try again later.')
                return // exit function early if repsonse not okay
            }
            return response.json()
        })
        .then(data => {
            // capital city is stored in data [1][0].captialCity
            let actualCapitalCity = data[1][0].capitalCity 
            // check is capital city matches user input
            if (actualCapitalCity.toLowerCase() === userAnswer.toLowerCase()) {
                resultTextElement.innerHTML = `Correct, the capital of ${randomCountryElement.innerHTML} is ${actualCapitalCity}.`;
            } else {
                resultTextElement.innerHTML = `Wrong! the capital of ${randomCountryElement.innerHTML} is not ${userAnswer}, it is ${actualCapitalCity}.`;
            }
            // show playagain btn after result
            PlayAgainButton.computedStyleMap.display = 'block'
        })
        .catch(error => {
            console.log('Error:', error)
            alert('There was an error fetching data, try again.')
        })
}
// event listener for the submit button - call checkAnswer function to evaluate users's answer
submitButton.addEventListener('click', checkAnswer)

// event listener for play again btn - call startGame to reset the game and show new random country
PlayAgainButton.addEventListener('click', startGame)

// start the game when the page loads
startGame()