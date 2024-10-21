let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000
let maxFailedAttempts = 3
let issMarker
let issIcon = L.icon ({ // leaflet type of object
    iconUrl: 'iss_icon.png',
    iconSize: [100, 100],
    iconAnchor: [25, 25]
}) 


let map = L.map('iss-map').setView( [0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// (res) => {}) takes the place of the call back function
// takes on parameter, res
// put everything below into function called iss()
iss(maxFailedAttempts) // call function one timne to start
//setInterval(iss, update) // 1000 is 10 seconds, update = 10000

function iss(attempts) {

    if (attempts <= 0) {
        alert('Attempted to contact server, failed')
        return
    }

    fetch(url)
    .then( (res) => {
        return res.json() // return as json so there is another js
    }).then( (issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long


        // create marker if it does not exist
        // move marker if it does exist

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: icon} ).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let now = Date()
        timeIssLocationFetched.innerHTML = `Fetched ${now}`

    }).catch( (err) => { // handle errors 
        attempts = attempts - 1 // same as attempts--
        console.log('ERROR', err)
    })
    .finally( () => {
        // finally runs whether the fetch() worked or failed
        // call the iss function after a delay of update miliseconds
        // to update the position
        setTimeout(iss, update, attempts) // add attempts here, if error, started at 3 now at 2
    })
}