
// Code for configuration of the map

let countyMap = L.map("map",{
  center:[31.319547, -100.076758],
  zoom: 6
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
}).addTo(countyMap);

//load in Geojson data 

let circleChart = {}
let mapMarkers = []

function mapOverlay(selection) {  
  const url = "/api/county";
  d3.json(url).then(function(response) {

    console.log(response);
       
    if (mapMarkers != undefined) {
      for(let i = 0; i < mapMarkers.length; i++){
        countyMap.removeLayer(mapMarkers[i]);
      }
    }

    for (let i =0; i < 253; i++) {
      switch (selection) {
        case "Population": 
          // Create a circle at each county's population 
          circleChart = L.circle([response.Longitude[i], response.Latitude[i]], {
            fillOpacity: getColor(response.Population[i]),
            color: "red",
            weight: 1,
            fillColor: "red",
            radius: 25000
            }).bindPopup("<h2>" + response.County[i] + "</h2> <hr> <h3> " + "Population: " + response.Population[i] + "</h3>").addTo(countyMap);   
            mapMarkers.push(circleChart);
          break;

        case "Income": 
            // Create a circle at each county's population 
          income = parseInt(response["Median Household Income"][i].replace(/,/g, ''))
    
          circleChart = L.circle([response.Longitude[i], response.Latitude[i]], {
            fillOpacity: getColorIncome(income),
            color: "yellow",
            weight: 1,
            fillColor: "yellow",
            radius: 25000
            }).bindPopup("<h2>" + response.County[i] + "</h2> <hr> <h3> " + "Median Household Income: $" + response["Median Household Income"][i]+ "</h3>").addTo(countyMap);   
            mapMarkers.push(circleChart);
          break;

        case "Poverty": 
          // Create a circle at each county's population 
          circleChart = L.circle([response.Longitude[i], response.Latitude[i]], {
            fillOpacity: getColorPoverty(response["Poverty Percent"][i]),
            color: "green",
            weight: 1,
            fillColor: "green",
            radius: 25000
            }).bindPopup("<h2>" + response.County[i] + "</h2> <hr> <h3> " + "Impoverished Residents: " + response["Poverty Percent"][i] + "% </h3>").addTo(countyMap);   
            mapMarkers.push(circleChart);
          break;

        case "Crime": 
          // Create a circle at each county's population 
          circleChart = L.circle([response.Longitude[i], response.Latitude[i]], {
            fillOpacity: getColorCrime(response.Total_Crime[i]),
            color: "blue",
            weight: 1,
            fillColor: 'blue',
            radius: 25000
            }).bindPopup("<h2>" + response.County[i] + "</h2> <hr> <h3> " + "Criminal Incidents: " + response.Total_Crime[i]+ "</h3>").addTo(countyMap);   
            mapMarkers.push(circleChart);
          break;

        case "Unemployment": 
          // Create a circle at each county's population 
          circleChart = L.circle([response.Longitude[i], response.Latitude[i]], {
            fillOpacity: getColorUnemploy(response["Unemployment Rate (%)"][i]),
            color: "orange",
            weight: 1,
            fillColor: "orange",
            radius: 25000
            }).bindPopup("<h2>" + response.County[i] + "</h2> <hr> <h3> " + "Unemployment Rate: " + response["Unemployment Rate (%)"][i] + "% </h3>").addTo(countyMap);   
            mapMarkers.push(circleChart);
          break;

      }
    
    }  

  })

}


//Get the color for the population circles
function getColor(d){
  return  d > 4000000 ? '100%' :
          d > 1000000 ? '80%' :
          d > 500000  ? '60%' :
          d > 100000  ? '40%' :
          d > 50000   ? '20%' :
          d > 10000   ? '5%' :
                        '5%' ;
                         
  
}
function getColorIncome(d){
  return  d > 100000 ? '100%' :
          d > 80000  ? '75%' :
          d > 60000  ? '50%' :
          d > 40000  ? '25%' :
          d > 30000  ? '5%' :
                       '5%';                        
  
}

function getColorPoverty(d){
  return  d > 30 ? '100%' :
          d > 20  ? '75%' :
          d > 10  ? '50%' :
          d > 5  ?  '25%' :
                      '5%';                        
  
}

function getColorCrime(d){
  return  d > 40000 ? '100%' :
          d > 10000 ? '75%' :
          d > 1000  ? '50%' :
          d > 100   ? '25%' :
                      '5%';                        
  
}

function getColorUnemploy(d){
  return  d > 10 ? '100%' :
          d > 7  ? '75%' :
          d > 5  ? '50%' :
          d > 1  ? '25%' :
                     '5%';                        
  
}

// function getColor(d){
//   return  d > 10000000 ? '#800026' :
//           d > 2000000  ? '#E31A1C' :
//           d > 100000   ? '#FC4E2A' :
//           d > 50000    ? '#FD8D3C' :
//           d > 20000    ? '#FEB24C' :
//           d > 10000    ? '#FED976' :
//                          '#FFEDA0';
  
// }



///**Code to make GEOJson .... Not needed

// let features = [{}]
    //   features.push({
    //       // "type": "FeatureCollection", 
    //       // "features": {
    //           "type": "Feature",
    //           "geometery": {
    //             "type": "Point",
    //             "coordinates": [response.Latitude[i], response.Longitude[i]]
    //           },        
    //           "properties": {
    //             "county": response.County[i],
    //             "income": response["Median Household Income"][i],
    //             "population": response.Population[i],
    //             "poverty": response["Poverty Percent"][i],
    //             "crime": response.Total_Crime[i],
    //             "unemployment": response["Unemployment Rate (%)"][i]
    //           }
          
    //         })
    //       } 
        
    //   let geoData = {"features": [{features}]}
    //     console.log(geoData)

    //  //iterate through the returned data
    //  for (let i = 1; i < features.length; i++) {
    //     let location = features[i].geometery;
    //     let properties = features[i].properties;
  

      // console.log(properties); */