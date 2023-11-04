from flask import Flask, jsonify, request
import os
import pickle
import glob

def get_latest_model(model_dir :str):
    list_of_files = glob.glob(model_dir + '/*')
    return max(list_of_files, key=os.path.getctime)

dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path = os.path.join(dir_path, "ml-models")
model_file = get_latest_model(dir_path)
load_clf = open(model_file, 'rb')
model = pickle.load(load_clf)
score = model.predict([input])


