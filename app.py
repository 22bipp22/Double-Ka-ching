import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import pandas as pd
import numpy as np
import os
from flask import (
    Flask, 
    jsonify, 
    render_template, 
    request, 
    redirect)

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/texas_counties.sqlite")


# County = Base.classes
# inspector = inspect(engine)
# print(inspector.get_table_names())

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
def home():
    
    return render_template("index.html");


@app.route("/api/county")
def county():
    
    session = Session(engine)
    result = session.query(County).all()
    session.close()

    # all_counties = list(np.ravel(result))

    # Create a dictionary from the row data and append to a list of all_passengers
    all_counties = []
    for result in results:
        counties_dict = {}
        counties_dict["county"] = result[0]
        
        all_counties.append(counties_dict)


    return jsonify(all_counties)
    
    

if __name__ == '__main__':
    app.run(debug=True)
