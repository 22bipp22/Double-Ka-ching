// // Calculate the total pupulation of Texas
// function optionChanged(name) {
//   console.log("County name=", name);

//   county_info(name)
// }

// let total_population = 0

// function county_info(countyName) {
//   d3.csv("../output/complete.csv").then(function (data) {
//     data.forEach(function (d) {
//       if (d.County == countyName) {
//       total_population = d.Population;
//       }
//     });
  
//     console.log("total_population: ", total_population);
//   });
// }
// Calculate the number of population that is in poverty 
// let poverty_pop = 0

// d3.csv("../output/complete.csv").then(function (data) {
//   data.forEach(function (d) {
//     poverty_pop = d.Population * (d.Poverty_Percent*.01);
//   });

//   console.log("poverty_pop");
//   console.log(poverty_pop);
// });

let select_tag = d3.select("#selDataset");

d3.csv("../output/complete.csv").then(function (data) {
  select_tag
    .append("option")
    .property("value", "")
    .text(" ");
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
  county_population(name)
  county_poverty(name)
  
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
    
    fig.append("h2").text(`Name: ${countyName}`);
    fig.append("h2").text(`Median Household Income: ${income}`);
    fig.append("h2").text(`Total Crime Events: ${crime}`);
    fig.append("h2").text(`Population: ${population}`);
  });
}

function county_population(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
      total_population = d.Population;
      }
    });
  
    console.log("County_population: ", total_population);
  });
}

function county_poverty(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        poverty_pop = d.Population * (d.Poverty_Percent*.01);
        not_poverty = d.Population - poverty_pop
      }
    });
  
    console.log("County_poverty: ", poverty_pop);

     let poverty_data = {
      "in_poverty": poverty_pop,
      "not_poverty": not_poverty
    }
  
    let trace = [
      {
          values: [poverty_pop, not_poverty] ,   
          text: ["In poverty"],
          marker: {
              colors: ["lightblue", "navy"]
          },
          hole: .4,
          type: 'pie',
          rotation: 90,
          direction: "clockwise",
          // textinfo: 'text',
          // textposition: 'inside',
          showlegend: false,
          domain: {
              x: [0,1],
              y: [0, 1]
            },
      }
  ];
  let layout = { width: 600,
      height: 600,
      margin: { t: 45, b: 10 },
      title: "Poverty",
      font: { color: "royalblue", family: "Arial", size: 18 },
      // annotations: [
      //     {
      //         text: "Scrubs per Week",
      //         font: { color: "darkskyblue", size: 18},
      //         align: "center",
      //         x: .5,
      //         y: 1,
      //         showarrow: false
      //         }]
            
    }

    Plotly.newPlot('povertyDiv', trace, layout);

  });


    

}
      // shapes:[{
      //     type: 'path',
      //     path: gaugePointer(metaWfreq),
      //     fillcolor: '850000',
      //     line: {
      //         color: '850000'
      //     }
      // }],
  //Start donut chart plots

    // // Poverty Donut
    // let width = 250,
    // height = 250,
    // margin = 40

    // let radius = Math.min(width) / 2 - margin

    // let svg = d3.select("#povertyDiv")
    //   .append("svg")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .append("g")
    //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // // function donut(countyName) {
    // // d3.csv("../output/complete.csv").then(function(data){


    // let poverty_data = {
    //   "in_poverty": poverty_pop,
    //   "not_poverty": not_poverty
    // }

    // console.log("Poverty data", poverty_data)

    // let color = d3.scaleOrdinal()
    //   .domain(poverty_data)
    //   .range(d3.schemeDark2)

    // let pie = d3.pie()
    // //  let data_ready = pie(d3.entries(poverty_data))
    // let arc = d3.arc()
    //   .innerRadius(100)
    //   .outerRadius(radius)

    // let arcs = svg.selectAll("arc")
    //   .data(pie(poverty_data))
    //   .enter()
    //   .append("g")

    //   console.log(arcs)
    //   console.log(arc)
    //   console.log(pie)

    // arcs.append("path")
    //   // .attr("d", arc)
    //   .attr("fill", "red");

  
    //  svg
    //   .selectAll('pie')
    //   .data(poverty_data)
    //   .enter()
    //   .append('path')
    //   .attr('d', d3.arc()
    //     .innerRadius(100)         // This is the size of the donut hole
    //     .outerRadius(radius)
    //   )
    //   .attr('fill', "red")
    //   .attr("stroke", "black")
    //   .style("stroke-width", "2px")
    //   .style("opacity", 0.7)
    
    // let pie = d3.pie().value(function(data){
    //   return poverty_data;
    // });

    // let path = d3.arc()
    //   .innerRadius(100)
    //   .outerRadius(radius - 10)

    //   console.log(path)
    // // let data_ready = pie(d3.entries(data.County))
    // let label = d3.arc()
    // .innerRadius(radius-80)
    // .outerRadius(radius)

    // let arc = svg.selectAll(".arc")
    //         // .data(pie(poverty_data))
    //         .enter()
          

    // arc.append("path")
    // .attr("d", path)
    // .attr("fill", function(d) { return color(d.poverty_data); });

    // console.log(arc)

    // arc.append("text")
    //   .attr("transform", function(d) { 
    //           return "translate(" + label.centroid(d) + ")"; 
    //   })
    //   .text(function(d) { return d.poverty_data; });
    // //   }
    // // });
    // // }            
    // // }             
    // svg.append("g")
    // .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    // .append("text")
    // .text("Poverty")
    // .attr("class", "title")


