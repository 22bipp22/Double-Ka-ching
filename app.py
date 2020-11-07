import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import pandas as pd
from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/texas_counties.sqlite")

inspector = inspect(engine)
print(inspector.get_table_names())

County = pd.read_sql_query("Select * from counties", engine)

print(County)




#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
     # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all counties
    results = session.query(County).all()

    session.close()

    all_counties = list(np.ravel(results))

    return jsonify(all_counties)

#     return jsonify(all_counties)
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         # f"/api/v1.0/names<br/>"
#         f"/api/v1.0/counties"
#     )

# @app.route("/api/v1.0/counties")
# def counties():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all counties
#     results = session.query(County.County).all()

#     session.close()

#     all_counties = list(np.ravel(results))

#     return jsonify(all_counties)

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
