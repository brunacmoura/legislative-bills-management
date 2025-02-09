from flask import Flask, render_template
from data_processing import process_legislators, process_bills

app = Flask(__name__)


@app.route("/")
def index():
    legislators_data = process_legislators()
    bills_data = process_bills()
    return render_template("index.html", legislators=legislators_data, bills=bills_data)


if __name__ == "__main__":
    app.run(debug=True)
