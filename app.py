from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    data = request.json
    text = data.get("text")

    words = text.lower().split()

    ignore_words = ["is", "am", "are", "the", "a", "an", "to"]
    pronouns = {
        "i": "ME",
        "you": "YOU",
        "he": "HE",
        "she": "SHE",
        "we": "WE",
        "they": "THEY"
    }

    result = []

    for word in words:
        if word in pronouns:
            result.append(pronouns[word])
        elif word not in ignore_words:
            result.append(word.upper())

    ai_text = " ".join(result)

    if len(ai_text) == 0:
        ai_text = "No meaningful words detected"

    return jsonify({"result": ai_text})


if __name__ == "__main__":
    app.run(debug=True)