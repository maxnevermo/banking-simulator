from flask import Flask, request
from email.message import EmailMessage
import smtplib
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def send_email(email_to, text):
    msg = EmailMessage()

    msg["From"] = os.environ["EMAIL"]
    msg["To"] = email_to
    msg["Subject"] = "Transaction notification"

    msg.set_content(text)

    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.starttls()

        smtp.login(
            os.environ["EMAIL"],
            os.environ["PASSWORD"]
        )

        smtp.send_message(msg)


@app.post("/send-email")
def send():
    data = request.get_json()

    receiver = data["receiver"]
    message = data["message"]

    send_email(
        receiver,
        message
    )

    return {"status": "sent"}, 200


@app.post("/save-to-file")
def save_to_file():
    data = request.get_json()

    with open("messages.json", "a", encoding="utf-8") as file:
        file.write(json.dumps(data, ensure_ascii=False) + "\n")

    return {"status": "saved"}, 200


if __name__ == "__main__":
    app.run(debug=True)