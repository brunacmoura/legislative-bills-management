from flask import Flask, render_template
from data_processing import process_legislators

app = Flask(__name__)


@app.route("/")
def index():
    legislators_data = process_legislators()
    return render_template("index.html", legislators=legislators_data)


if __name__ == "__main__":
    app.run(debug=True)
