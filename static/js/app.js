function buildPlot() {
  /* data route */
  let url = "/api/county";
  d3.json(url).then(function(data) {
    console.log(data)
});

// let dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
}

buildPlot();
