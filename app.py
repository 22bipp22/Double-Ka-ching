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

<<<<<<< Updated upstream

# County = Base.classes
# inspector = inspect(engine)
# print(inspector.get_table_names())
=======
inspector = inspect(engine)
print(inspector.get_table_names())
>>>>>>> Stashed changes

# County = pd.read_sql_query("Select  from counties", engine)

# print(County)

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
    
    result = County

<<<<<<< Updated upstream
    all_counties = list(np.ravel(result))
=======
    #  Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all counties
    data = session.query(counties).all()

    session.close()

    all_counties = list(np.ravel(data))
>>>>>>> Stashed changes

    return jsonify(all_counties)
    
    

if __name__ == '__main__':
    app.run(debug=True)
