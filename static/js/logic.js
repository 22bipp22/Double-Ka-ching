
// Code for configuration of the map

// Set longitude, latitude, and starting zoom
// Map it to the div
// let myMap = L.map("map", {
//     center: [37.09, -100.71],
//     zoom: 4
// });

var countyMap = L.map("map",{
    center:[31.319547, -100.076758],
    zoom: 7
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(countyMap);




