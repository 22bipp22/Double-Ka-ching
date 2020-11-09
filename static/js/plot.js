//Start donut chart plots
let width = 450,
        height = 500,
        margin = 40

let radius = Math.min(width,height) / 2 - margin

let svg = d3.select("#myDiv")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("../output/population.csv").then(function(data){
  console.log(data);

  let color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeDark2)

  let pie = d3.pie().value(function(data){
    return data.Population;
  });

  let path = d3.arc()
        .innerRadius(100)
        .outerRadius(radius - 10)
    // let data_ready = pie(d3.entries(countyData.County))
  let label = d3.arc()
      .innerRadius(radius-80)
      .outerRadius(radius)

  let arc = svg.selectAll(".arc")
              .data(pie(data))
              .enter()
             

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