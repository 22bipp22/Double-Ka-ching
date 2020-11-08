
// Code for configuration of the map

// Set longitude, latitude, and starting zoom
// Map it to the div

var countyMap = L.map("mapid",{
    center:[-100.076758, 31.319547],
    zoom: 8
});

//add tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/tiarasgreen/ckh9kn3dq1r4j19lxxogt36lu.html?fresh=true&title=view&access_token=pk.eyJ1IjoidGlhcmFzZ3JlZW4iLCJhIjoiY2toOWdxZDdmMHNqdjJ6azgycGFiMzhzOSJ9.-gJ5Cytsbdyggv4l8HdohQ",{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
   accessToken: API_KEY
}).addTo(countyMAP);

