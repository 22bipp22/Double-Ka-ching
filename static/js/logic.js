function buildMenu() {
    /* data route */
    const url = "/api/county";
    d3.json(url).then(function(response) {
  
      console.log(response);
  
  
      // Plotly.newPlot("plot", data, layout);
    });
  }
  
  buildMenu();
  