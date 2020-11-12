let select_tag = d3.select("#selDataset");

d3.csv("/static/complete.csv").then(function (data) {
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
  county_poverty(name)
  county_unemployed(name)
  county_crime(name)
  
}


function county_info(countyName) {
  d3.csv("/static/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        income = d3.format("($,.2f")(d.Median_Household_Income)
        crime = d3.format(".0f")(d.Total_Crime)
        population = d3.format(",")(d.Population)
      }
    });


    if (countyName == "") {
      income = ""
      crime = ""
      population = ""
    }

    let fig = d3.select("#county-metadata");
    fig.html("");
    
    fig.append("h2").text(`Name: ${countyName}`);
    fig.append("h2").text(`Median household income: ${income}`);
    fig.append("h2").text(`Total crime events: ${crime}`);
    fig.append("h2").text(`County population: ${population}`);


    
  });
}

function county_poverty(countyName) {
  d3.csv("/static/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        poverty_pop = d3.format(".0f")(d.Population * (d.Poverty_Percent*.01));
        not_poverty = d.Population - poverty_pop
      }
    });
  
    if (countyName == "") {
      poverty_pop = ""
      not_poverty = ""
    }

    console.log("County_poverty: ", poverty_pop);

     let poverty_data = {
      "in_poverty": poverty_pop,
      "not_poverty": not_poverty
    }
  
    let trace1 = [
      {
          values: [poverty_pop, not_poverty] ,   
          text: ["In poverty", "Not in poverty"],
          textfont:{family: "Cabin Sketch", size: 10 },    
          marker: {
            colors: ["lightblue", "navy"]
          },
          hole: .4,
          type: 'pie',
          rotation: 90,
          direction: "clockwise",
          hoverinfo: "text+value",
          showlegend: false,
          domain: {
              row:1,
              column: 0
            },
      }
  ];
  let layout = { width: 300,
      height: 300,
      margin: { t: 45, b: 10 },
      title: "Poverty Rate", 
      titlefont:{ color: "royalblue", family: "Cabin Sketch", size: 18 }, 
      grid: {rows: 1, columns: 0}     
    }

    Plotly.newPlot('povertyDiv', trace1, layout);

  });
  

}

function county_unemployed(countyName) {
  d3.csv("/static/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        unemployed_pop = d3.format(".0f")(d.Population * (d.Unemployment_Rate*.01));
        employed_pop = d.Population - unemployed_pop
      }
    });
  
    if (countyName == "") {
      unemployed_pop = ""
      employed_pop = ""
    }

    console.log("County_unemployed ", unemployed_pop);

     let unemployment_data = {
      "unemployed": unemployed_pop,
      "employed": employed_pop

    }
  
 
    let trace2 = [
      {
          values: [unemployed_pop, employed_pop] ,   
          text: ["Unemployed", "Employed"],
          textfont:{family: "Cabin Sketch", size: 10 },   
          marker: {
              colors: ["lightblue", "navy"]
          },
          hole: .4,
          type: 'pie',
          rotation: 90,
          direction: "clockwise",
          hoverinfo: "text+value",
          showlegend: false,
          domain: {
              row: 1,
              column: 2
            },
      }
  ];
  let layout = { width: 300,
      height: 300,
      margin: { t: 45, b: 10 },
      title: "Unemployment Rate",
      titlefont:{ color: "royalblue", family: "Cabin Sketch", size: 18 },
      grid: {rows: 1, columns: 1}      
    }

    Plotly.newPlot('unemployedDiv', trace2, layout);

  });
  

}

function county_crime(countyName) {
  d3.csv("/static/complete.csv").then(function (data) {
    data.forEach(function (d) {
      if (d.County == countyName) {
        violent_crime= d.Violent_Crime;
        property_crime = d.Property_Crime; 
      }
    });
  
    if (countyName == "") {
      violent_crime = ""
      property_crime = ""
    }

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
          textfont:{family: "Cabin Sketch", size: 10 }, 
          marker: {
              colors: ["lightblue", "navy"]
          },
          hole: .4,
          type: 'pie',
          rotation: 90,
          direction: "clockwise",
          hoverinfo: "text+value",
          showlegend: false,
          domain: {
              row: 1,
              column: 3
            },
      }
  ];
  let layout = { width: 300,
      height: 300,
      margin: { t: 45, b: 10 },
      title: "Total Crime",
      titlefont:{ color: "royalblue", family: "Cabin Sketch", size: 18 }, 
      grid: {rows: 1, columns: 3}       
    }

 
    Plotly.newPlot('crimeDiv', trace3, layout);

  });

}
  