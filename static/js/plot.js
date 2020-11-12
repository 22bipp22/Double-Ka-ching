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
  // county_population(name)
  county_poverty(name)
  county_unemployed(name)
  county_crime(name)
  
}

function county_info(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        income = d3.format("($,.2f")(d.Median_Household_Income)
        crime = d3.format(".0f")(d.Total_Crime)
        population = d3.format(",")(d.Population)
      }
    });

    let fig = d3.select("#county-metadata");
    fig.html("");
    
    fig.append("h2").text(`Name: ${countyName}`);
    fig.append("h2").text(`Median household income: ${income}`);
    fig.append("h2").text(`Total crime events: ${crime}`);
    fig.append("h2").text(`County population: ${population}`);
  });
}

// function county_population(countyName) {
//   d3.csv("../output/complete.csv").then(function (data) {
//     data.forEach(function (d) {
//       if (d.County == countyName) {
//       total_population = d.Population;
//       }
//     });
  
//     console.log("County_population: ", total_population);
//   });
// }

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
  
    let trace1 = [
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
              row:0,
              column: 0
            },
      }
  ];
  let layout = { width: 300,
      height: 300,
      margin: { t: 45, b: 10 },
      title: "Poverty Rate",
      font: { color: "royalblue", family: "Arial", size: 18 },    
    }

    Plotly.newPlot('povertyDiv', trace1, layout);

  });
  

}

function county_unemployed(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        unemployed_pop = d.Population * (d.Unemployment_Rate*.01);
        employed_pop = d.Population - unemployed_pop
      }
    });
  
    console.log("County_unemployed ", unemployed_pop);

     let poverty_data = {
      "unemployed": unemployed_pop,
      "employed": employed_pop
    }
  
    let trace2 = [
      {
          values: [unemployed_pop, employed_pop] ,   
          text: ["Unemployed", "Employed"],
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
              row: 1,
              column: 0
            },
      }
  ];
  let layout = { width: 300,
      height: 300,
      margin: { t: 45, b: 10 },
      title: "Unemployment Rate",
      font: { color: "royalblue", family: "Arial", size: 18 },       
    }

    Plotly.newPlot('unemployedDiv', trace2, layout);

  });
  

}

function county_crime(countyName) {
  d3.csv("../output/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        violent_crime= (d.Violent_Crime / d.Total_Crime)*.01;
        property_crime = (d.Property_Crime / d.Total_Crime)*.01;
      }
    });
  
    console.log("Vioulent_crime ", violent_crime);
    console.log("Property_crime ", property_crime);

     let crime_data = {
      "violent": violent_crime,
      "property": property_crime
    }
  
    let trace3 = [
      {
          values: [violent_crime, property_crime] ,   
          text: ["Violent", "Property"],
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
              row: 0,
              column: 1
            },
      }
  ];
  let layout = { width: 600,
      height: 600,
      margin: { t: 45, b: 10 },
      title: "Total Crime",
      font: { color: "royalblue", family: "Arial", size: 18 },       
    }

    Plotly.newPlot('crimeDiv', trace3, layout);

  });
  

}
  