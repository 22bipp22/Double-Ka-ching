
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
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(countyMap);

  //load in data 

  //var geoData = "static/data/complete.geojson"

  //var json

  //d3.json (geoData, function(data))

  //geojson = L.choropleth(data, {
    // Define what  property in the features to use
    //valueProperty: 'MHI2016',
    // Set color scale
    //scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    //steps: 10,
    // q for quantile, e for equidistant, k for k-means
   // mode: "q",
    // border styling
    //style: {
     // color: "#fff",
      //weight: 1,
      //fillOpacity: 0.8
    //},
    // Binding a pop-up to each layer
    //onEachFeature: function(feature, layer) {
      //layer.bindPopup("County: " + feature.properties.County + "<br>Population<br>" + "$" + feature.properties.MHI2016)
  //  }
  //}).addTo(myMap);





