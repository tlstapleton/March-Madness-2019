var teamMap = L.map("map", {
    center: [35.50, -98.35],
    zoom: 5,
    zoomControl: true
  });
const API_KEY = "pk.eyJ1IjoiZG9ubjY1NDgiLCJhIjoiY2p0Z2YwY2Z5MjM1MzQ0b2JyMHYycXB6ayJ9.6pbYTxaqCLCU6IcwjoVOUw";
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(teamMap);



console.log(schoolmarkers)

for (var m = 0; m < schoolmarkers.length; m++) {
var myIcon = L.icon({
    iconUrl: schoolmarkers[m].schoolIcon,
    iconSize: [25, 25],
    iconAnchor: [22, 22],
    popupAnchor: [-10, -20],
});
L.marker([schoolmarkers[m].LATITUDE, schoolmarkers[m].LONGITUDE], {icon: myIcon}).addTo(teamMap)
.bindPopup(`${schoolmarkers[m].School}<br>
            ${schoolmarkers[m].CITY}, ${schoolmarkers[m].STABBR}<br>
            Conference: ${schoolmarkers[m].Conference}<br>
            Record: ${schoolmarkers[m].Record}<br>
            Overall Seed: ${schoolmarkers[m]['Overall Seed']}<br>
            <hr>
            Admission Rate: ${schoolmarkers[m].ADM_RATE}%<br>
            Average SAT: ${schoolmarkers[m].SAT_AVG}`)
.openPopup()
}



teamMap.scrollWheelZoom.disable();


//dropdown menu with zoom
var select = d3.select('#selTeam')


const optionSelection = select.selectAll('option').data(schoolmarkers)

optionSelection.enter()
.append('option')
.text(d => d.School)
.attr('value', (d, i) => i)

select.on('change', () => {
    var index = select.property('value')
    var d = schoolmarkers[index]
    var zoom = 10
    var lat = d.LATITUDE
    var long = d.LONGITUDE
    teamMap.setView([lat, long], zoom)
})
  