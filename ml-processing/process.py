from flask import Flask, jsonify, request
import os
import pickle
import glob

app = Flask(__name__)


@app.route('/score', methods=['GET'])
def get_score(): 
    input = request.args['input']
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(dir_path, 'ml-models')
    model_file = get_latest_model(dir_path)
    load_clf = open(model_file, 'rb')
    model = pickle.load(load_clf)
    score = model.predict([input])
    return jsonify(score[0])

def get_latest_model(model_dir :str):
    list_of_files = glob.glob(model_dir + '/*')
    return max(list_of_files, key=os.path.getctime)

if __name__ == "__main__":
    port = 5000
    app.run(debug=True, host='0.0.0.0', port=port)