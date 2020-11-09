function buildPlot() {
  /* data route */
//   let url = "/api/county";
//   d3.json(url).then(function(data) {
//     console.log(data)
// });
//  let svg = d3.select("#svg-area").append("svg");

 let svgWidth = window.innerWidth;
 let svgHeight = "100px";

 let svg = d3.select("#svg-area").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Part 2
// Bind the SVG to the Data!

  // let circles = svg.selectAll("circle");

  let segmentWidth = svgWidth/6
  let rValues = [(segmentWidth-segmentWidth/2), 
        (segmentWidth*2 - segmentWidth/2), 
        (segmentWidth*3 - segmentWidth/2),
        (segmentWidth*4 - segmentWidth/2),
        (segmentWidth*5 - segmentWidth/2)];
  let colors = ["red", "yellow", "green", "blue", "orange"]
  let circleText = ["  Population", "     Income", "    Poverty", "     Crime", "Unemployment"]


  for (let i = 0; i < rValues.length; i++) {
    console.log(rValues[i]);
  
    let chartGroup = svg.append("g")
          .attr("transform", `translate(${rValues[i]}, 10)`);


    chartGroup.selectAll("circle")
        .data("10")
        .enter()
        .append("circle")
        .attr("cx", "50")
        .attr("cy", "50")
        .attr("r", "40")
        .attr("stroke", colors[i])
        .attr("stroke-width", "2")
        .attr("opacity", "25%")
        .attr("fill", colors[i]);

    chartGroup.append('text')
      .html(circleText[i])
      .attr('font-size', "12px")
      .attr("x", "15")
      .attr("y", "50")
// let dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
    
  };
}

buildPlot();
