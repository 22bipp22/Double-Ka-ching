import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import os
import csv
csvpath = os.path.join("output","population.csv")

with open(csvpath) as csvfile:

    county_list = csv.reader(csvfile, delimiter = ",")
    
    csv_header = next(county_list)

    print(f"CSV Header: {csv_header}")

    # for row in county_list:
    #     budget_date.append(row[0])
    #     profit_loss.append(row[1])
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///counties.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Counties = Base.classes.counties

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        # f"/api/v1.0/names<br/>"
        f"/api/v1.0/counties"
    )

@app.route("/api/v1.0/counties")
def counties():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(County.county_name, County.population, County.med_income, County.tax).all()

    session.close()

    # # Create a dictionary from the row data and append to a list of all_passengers
    # all_passengers = []
    # for name, age, sex in results:
    #     passenger_dict = {}
    #     passenger_dict["name"] = name
    #     passenger_dict["age"] = age
    #     passenger_dict["sex"] = sex
    #     all_passengers.append(passenger_dict)

    # return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
