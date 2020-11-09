//Start donut chart plots
let width = 450,
        height = 450,
        margin = 40

let radius = Math.min(width,height) / 2 - margin

let svg = d3.select("#myDiv")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("../output/population.csv").then(function(countyData){
  console.log(countyData);

  let color = d3.scaleOrdinal()
    .domain(countyData)
    .range(d3.schemeDark2)

  // Compute the position of)

  // Compute the position of each group on the pie:
  let pie = d3.pie().value(function(countyData){
    return countyData.Population;
  });

  let path = d3.arc()
        .innerRadius(100)
        .outerRadius(radius - 10)
    // let data_ready = pie(d3.entries(countyData.County))
  let label = d3.arc()
      .innerRadius(radius-80)
      .outerRadius(radius)

  // // Create dummy data
  // d3.csv("../output/population.csv").then(function(countyData){
  //   console.log(countyData);

  let arc = svg.selectAll(".arc")
              .data(pie(countyData))
              .enter()
              .attr("class", "arc");

  arc.append("path")
  .attr("d", path)
  .attr("fill", function(d) { return color(d.data.County); });

  console.log(arc)

  arc.append("text")
      .attr("transform", function(d) { 
              return "translate(" + label.centroid(d) + ")"; 
      })
      .text(function(d) { return d.data.County; });
  });

  svg.append("g")
      .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
      .append("text")
      .text("Population")
      .attr("class", "title")

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  // svg
  //   .selectAll('allslices')
  //   .data(data_ready)
  //   .enter()
  //   .attr('fill', function(d){ return(color(d.data.County)) })
  //   .attr("stroke", "black")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 0.7)
  //   .text("Population")


