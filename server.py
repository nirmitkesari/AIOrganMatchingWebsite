from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

DATA_FILE = 'donors.json'

# Load donor data if file exists
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'r') as f:
        donors = json.load(f)
else:
    donors = []

@app.route('/')
def home():
    return send_from_directory('.', 'pages/home.html')

@app.route('/api/donors', methods=['GET'])
def get_donors():
    return jsonify(donors)

@app.route('/api/register', methods=['POST'])
def register_donor():
    data = request.get_json()
    if data:
        donors.append(data)
        with open(DATA_FILE, 'w') as f:
            json.dump(donors, f, indent=2)
        return jsonify({"message": "Donor registered successfully!"}), 200
    return jsonify({"error": "Invalid data"}), 400

# Serve other static pages (like donor form, donor list)
@app.route('/<path:path>')
def serve_page(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)





# register page

@app.route('/api/recipient/register', methods=['POST'])
def register_recipient():
    data = request.json
    recipients = []

    # Load existing data
    if os.path.exists('recipients.json'):
        with open('recipients.json', 'r') as f:
            recipients = json.load(f)

    # Add new recipient
    recipients.append(data)

    # Save to file
    with open('recipients.json', 'w') as f:
        json.dump(recipients, f, indent=2)

    return jsonify({'message': 'Recipient registered successfully'}), 200
