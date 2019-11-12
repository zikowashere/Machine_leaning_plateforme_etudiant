import os
import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from sklearn import datasets, linear_model
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn import neighbors
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn import metrics
from werkzeug.utils import secure_filename
import numpy as np
import pandas as pd
import scipy
import matplotlib.pyplot as plt
from pylab import rcParams
import urllib
import sklearn
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler

from Convertisseur import toCsv


def Cross_validation(file):
    filesCross=[]
    App_ROOT = os.path.dirname(os.path.abspath(__file__))
    filecross = file
    filenamecross = secure_filename(filecross.filename)
    filecross.save(os.path.join(App_ROOT, filenamecross))
    if filecross.filename.endswith(".arff"):
        filesCross.append(filecross.filename)
        for file in filesCross:
            with open(file , "r") as inFile:
                content = inFile.readlines()
                name,ext = os.path.splitext(inFile.name)
                new = toCsv(content)
                #print(new)
                with open(name+".csv", "w") as outFile:
                    outFile.writelines(new)
                    filenamecross = name+".csv"

    fileCrossUpload = pd.read_csv(os.path.abspath(filenamecross))
    X = fileCrossUpload.iloc[:, 0:-1].values
    y = fileCrossUpload.iloc[:, -1].values
    if not request.form['nbSplits']:
        X_train,X_test,y_train,y_test  = train_test_split(X,y,test_size=0.33)
    else:
        X_train,X_test,y_train,y_test  = train_test_split(X,y,test_size=float(request.form['nbSplits'])/100)
    #del filesCross[0]
    return X_train,X_test,y_train,y_test
