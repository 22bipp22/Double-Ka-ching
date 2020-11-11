let total_population = 0

d3.csv("../output/complete.csv").then(function (data) {
  data.forEach(function (d) {
    total_population = +d.Population;
  });

  console.log("total_population");
  console.log(total_population);
});

let select_tag = d3.select("#selDataset");

d3.csv("../output/complete.csv").then(function (data) {
  select_tag
    .append("option")
    .property("value", "")
    .text("Pick a county");
  data.forEach(function (d) {
    select_tag
      .append("option")
      .property("value", d.County)
      .text(d.County);
  });
});

function optionChanged(name) {
  console.log("County name=", name);

  county_info(name)
}

function county_info(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        income = d.Median_Household_Income
        crime = d.Total_Crime
        population = d.Population
        // console.log("county_info");
        // console.log(crime);
      }
    });

    let fig = d3.select("#county-metadata");
    fig.html("");

    // fig.append("h2").text(`County:`);
    fig.append("h2").text(`Name: ${countyName}`);
    fig.append("h2").text(`Median Household Income: ${income}`);
    fig.append("h2").text(`Total Crime Events: ${crime}`);
    fig.append("h2").text(`Population: ${population}`);
//   });
// }


//Start donut chart plots

let width = 250,
        height = 250,
        margin = 40

let radius = Math.min(width,height) / 2 - margin

let svg = d3.select("#populationDiv")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("../output/complete.csv").then(function(data){
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
    let data_ready = pie(d3.entries(data.County))
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

  });
}