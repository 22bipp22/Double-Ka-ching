// Start donut chart plots
let width = 450,
        height = 450,
        margin = 40

let radius = Math.min(width,height) / 2 - margin

let svg = d3.select("myDiv")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
 
let chartGroup = svg.append("g")
    .attr("transform", "translate("+width / 2 + "," + height / 2 + ")");

d3.csv("../output/complete.csv").then(function(countyData) {
  console.log(countyData);

  countyData.forEach(function(data){
    data.population= +data.Population
  });

    let color = d3.scaleOrdinal()
      .domain(countyData)
      .range(d3.schemeDark2);

    let pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function(data) {return data.population; })

    let data_ready = pie(d3.entries(countyData))

    let arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8)

    chartGroup.selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

});