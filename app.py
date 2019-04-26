from flask import Flask, render_template, redirect, json
from flask_pymongo import PyMongo
import happening_now

app = Flask(__name__)


app.config["MONGO_URI"] = 'mongodb://localhost:27017/march_madness'
mongo = PyMongo(app)

@app.route("/")
def index():
    march_madness = mongo.db.ncaa.find_one()
    return render_template("index.html", all_results_dictionary= march_madness)


@app.route("/scrape")
def scraper():
    news = mongo.db.ncaa
    all_results_dictionary = happening_now.scrape()
    news.update({}, all_results_dictionary, upsert=True)
    return redirect("/#now", code=302)

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/graphs")
def graphs():
    return render_template("graphs.html")



if __name__ == "__main__":
    app.run(debug=True)
