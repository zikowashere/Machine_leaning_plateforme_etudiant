import os
import json
from flask import Flask, jsonify, request
from sklearn import datasets, linear_model
from sklearn.linear_model import LinearRegression,lasso_path,LogisticRegression
from sklearn import neighbors,linear_model,tree
from sklearn.naive_bayes import GaussianNB,MultinomialNB,BernoulliNB,ComplementNB
from sklearn.neighbors import RadiusNeighborsClassifier,NearestNeighbors,KNeighborsClassifier
from sklearn import preprocessing
from sklearn import metrics
from werkzeug.utils import secure_filename
import numpy as np
import pandas as pd
import numpy as np
import scipy
import matplotlib.pyplot as plt
from pylab import rcParams
import urllib
import sklearn
from flask_cors import CORS
import logging
import sys
from sklearn.feature_selection import RFE
from sklearn.svm import SVR

sys.path.append('/home/zakaria/youtube_tutorial/')
from Youtube.youtube_videos import youtube_search
from Youtube.youtube_videos import geo_query
from Convertisseur import toCsv
from Cross_validation import Cross_validation
from sklearn.metrics import precision_recall_fscore_support,recall_score
from sklearn.metrics import confusion_matrix

logger = logging.getLogger()

app = Flask(__name__)
CORS(app)


class Test:
    Train = ''

    def __init__(self, Algotab, ):
        self.Algotab = Algotab
        self.Algotab.append([1, 2, 7, 9])


    @app.route('/upload', methods=['POST', 'GET'])
    def upload():
        Algotab1 = [1, 3, 4]
        resultat = {}
        cross_validation = False
        filesTrain=[]
        filesTest=[]
        filesCross=[]
        testscore=0
        ialpha=0
        App_ROOT = os.path.dirname(os.path.abspath(__file__))
        if request.form['cv'] != 'true':
            """upload train file"""
            train = request.files['train']
            filenameTrain = secure_filename(train.filename)
            train.save(os.path.join(App_ROOT, filenameTrain))
            if train.filename.endswith(".arff"):
                filesTrain.append(train.filename)
                for file in filesTrain:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTrain= name+".csv"
                del filesTrain[0]
            """upload test file """
            test = request.files['test']
            filenameTest = secure_filename(test.filename)
            test.save(os.path.join(App_ROOT, filenameTest))
            """ Convertisseur arff to csv """
            if test.filename.endswith(".arff"):
                filesTest.append(test.filename)
                for file in filesTest:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTest=name+".csv"
                del filesTest[0]
            np.set_printoptions(precision=4, suppress=True)
            rcParams['figure.figsize'] = 7, 4
            plt.style.use('seaborn-whitegrid')
            Trainfile = pd.read_csv(os.path.abspath(filenameTrain))
            X_train = Trainfile.iloc[:, 0:-1].values
            y_train = Trainfile.iloc[:, -1].values
            Testfile = pd.read_csv(os.path.abspath(filenameTest))
            X_test = Testfile.iloc[:, 0:-1].values
            y_test = Testfile.iloc[:, -1].values
        else:
            X_train,X_test,y_train,y_test=Cross_validation(request.files['train'])

        if request.method == 'POST':
            if request.form['knn'] == 'true':
                if not request.form['neighbors']:
                    clf = KNeighborsClassifier()
                else:
                    clf =KNeighborsClassifier(int(request.form['neighbors']))
                clf.fit(X_train, y_train)
                resultat.update({"knn": clf.score(X_test, y_test)})



            if request.form['lr'] == 'true':
                clf = LinearRegression().fit(X_train, y_train)
                resultat.update({"lr": clf.score(X_test, y_test)})

            if request.form['logistic'] == 'true':
                clf = LogisticRegression()
                clf.fit(X_train,y_train)
                resultat.update({"logistic": clf.score(X_test, y_test)})

            if request.form['BRRidge'] == 'true':
                clf = linear_model.BayesianRidge().fit(X_train, y_train)
                resultat.update({"BRRidge": clf.score(X_test, y_test)})

            if request.form['dts'] == 'true':
                clf=tree.DecisionTreeClassifier()
                clf = clf.fit(X_train, y_train)
                resultat.update({"dts": clf.score(X_test, y_test)})

            if request.form['lrRidge'] =='true':
                if not request.form['alpharidge']:
                    clf =linear_model.Ridge(0.5)
                else:
                    clf = linear_model.Ridge(float(request.form['alpharidge']))
                clf.fit(X_train,y_train)
                resultat.update({"lrRidge": clf.score(X_test, y_test)})

            if request.form['lasso'] =='true':
                if not request.form['alphalasso']:
                        clf =linear_model.Lasso(0.1)
                else:
                    clf = linear_model.Lasso(float(request.form['alphalasso']))
                clf.fit(X_train,y_train)
                resultat.update({"lasso": clf.score(X_test, y_test)})
            if request.form['gaussien'] == 'true':
                clf = GaussianNB()
                clf.fit(X_train,y_train)
                resultat.update({"gaussien": clf.score(X_test,y_test)})
            if request.form['multinavesBayes']=='true':
                clf=MultinomialNB()
                clf.fit(X_train,y_train)
                resultat.update({"multinavesBayes": clf.score(X_test,y_test)})
            if request.form['BernouilliNb']=='true':
                clf=BernoulliNB()
                clf.fit(X_train,y_train)
                resultat.update({"BernouilliNb": clf.score(X_test,y_test)})
            if request.form['ComplementNb']=='true':
                clf=ComplementNB()
                clf.fit(X_train,y_train)
                resultat.update({"ComplementNb": clf.score(X_test,y_test)})
                
            if request.form['rfe']=='true':
                estimator = SVR(kernel="linear")
                selector = RFE(estimator, 5, step=1)
                selector = selector.fit(X_train, y_train)
                resultat.update({"rfe": selector.score(X_test,y_test)})

            print(json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': ')))
            return json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': '))

    @app.route('/youtube', methods=['POST', 'GET'])
    def youtube():
        test = youtube_search(request.form["st"])
        test1=[]
        test2=[]
        i=0
        video_dict = {'youID':[], 'title':[], 'pub_date':[]}
        just_json = test[1]
        len(just_json)
        for video in just_json:
            video_dict['youID'].append(video['id']['videoId'])
            print(video_dict['youID'])
        for id in video_dict['youID']:
            test1.append( geo_query(id))
            """la partie filter"""
        while i < len(test1):
            test2.append(test1[i]['items'])
            print(test2[i][0]['statistics']['viewCount'])
            i+=1
        print(test1)
        return jsonify(test1)

    @app.route('/measure',methods=['POST','GET'])
    def measure():
        i=0
        TP=0
        FP=0
        TN=0
        FN=0
        Algotab1 = [1, 3, 4]
        resultat = {}
        cross_validation = False
        filesTrain=[]
        filesTest=[]
        filesCross=[]

        App_ROOT = os.path.dirname(os.path.abspath(__file__))
        if request.form['cv'] != 'true':
            """upload train file"""
            print("khikhi")
            train = request.files['train']
            filenameTrain = secure_filename(train.filename)
            train.save(os.path.join(App_ROOT, filenameTrain))
            if train.filename.endswith(".arff"):
                filesTrain.append(train.filename)
                for file in filesTrain:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTrain= name+".csv"
                del filesTrain[0]
            """upload test file """
            test = request.files['test']
            filenameTest = secure_filename(test.filename)
            test.save(os.path.join(App_ROOT, filenameTest))
            """ Convertisseur arff to csv """
            if test.filename.endswith(".arff"):
                filesTest.append(test.filename)
                for file in filesTest:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTest=name+".csv"
                del filesTest[0]
            np.set_printoptions(precision=4, suppress=True)
            rcParams['figure.figsize'] = 7, 4
            plt.style.use('seaborn-whitegrid')
            Trainfile = pd.read_csv(os.path.abspath(filenameTrain))
            X_train = Trainfile.iloc[:, 0:-1].values
            y_train = Trainfile.iloc[:, -1].values
            Testfile = pd.read_csv(os.path.abspath(filenameTest))
            X_test = Testfile.iloc[:, 0:-1].values
            y_test = Testfile.iloc[:, -1].values
        else:
            X_train,X_test,y_train,y_test=Cross_validation(request.files['train'])

        if request.method == 'POST':
            if request.form['knn'] == 'true':
                if not request.form['neighbors']:
                    clf = neighbors.KNeighborsClassifier()
                else:
                    clf = neighbors.KNeighborsClassifier(float(request.form['neighbors']))
                clf.fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_pred[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_pred[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"knn": f_measure})

            if request.form['lr'] == 'true':
                clf = LinearRegression().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_pred[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_pred[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"lr": f_measure})

            if request.form['logistic'] == 'true':
                clf = LogisticRegression()
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_pred[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_pred[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"logistic": f_measure})

            if request.form['lrRidge'] == 'true':
                if not request.form['alpharidge']:
                    clf =linear_model.Ridge(0.5)
                else:
                    clf =  linear_model.Ridge(float(request.form['alpharidge']))
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                print("ytest",y_test)
                print("ypred",y_pred)

                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"lrRidge": f_measure})

            if request.form['dts'] == 'true':
                clf = tree.DecisionTreeClassifier().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"dts": f_measure})

            if request.form['lasso'] =='true':
                if not request.form['alphalasso']:
                    clf =linear_model.Lasso(0.1)
                else:
                    clf = linear_model.Lasso(float(request.form['alphalasso']))
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"lasso": f_measure})

            if request.form['BRRidge'] == 'true':
                clf = linear_model.BayesianRidge().fit(X_train, y_train)
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"BRRidge": f_measure})

            if request.form['gaussien'] == 'true':
                clf = GaussianNB()
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"gaussien": f_measure})
            if request.form['multinavesBayes'] == 'true':
                clf = MultinomialNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"multinavesBayes": f_measure})

            if request.form['BernouilliNb'] == 'true':
                clf = BernoulliNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"BernouilliNb": f_measure})

            if request.form['ComplementNb'] == 'true':
                clf = ComplementNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"ComplementNb": f_measure})

            if request.form['rfe']=='true':
                estimator = SVR(kernel="linear")
                selector = RFE(estimator, 5, step=1)
                selector = selector.fit(X_train, y_train)
                y_pred = selector.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"rfe": f_measure})

        print(json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': ')))
        return json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': '))
 ########################################################################################
 ################################### recall #############################################



    @app.route('/recall',methods=['POST','GET'])
    def recall():
        Algotab1 = [1, 3, 4]
        resultat = {}
        cross_validation = False
        filesTrain=[]
        filesTest=[]
        filesCross=[]
        TP=0
        FP=0
        TN=0
        FN=0


        App_ROOT = os.path.dirname(os.path.abspath(__file__))
        if request.form['cv'] != 'true':
            """upload train file"""
            train = request.files['train']
            filenameTrain = secure_filename(train.filename)
            train.save(os.path.join(App_ROOT, filenameTrain))
            if train.filename.endswith(".arff"):
                filesTrain.append(train.filename)
                for file in filesTrain:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTrain= name+".csv"
                del filesTrain[0]
            """upload test file """
            test = request.files['test']
            filenameTest = secure_filename(test.filename)
            test.save(os.path.join(App_ROOT, filenameTest))
            """ Convertisseur arff to csv """
            if test.filename.endswith(".arff"):
                filesTest.append(test.filename)
                for file in filesTest:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTest=name+".csv"
                del filesTest[0]
            np.set_printoptions(precision=4, suppress=True)
            rcParams['figure.figsize'] = 7, 4
            plt.style.use('seaborn-whitegrid')
            Trainfile = pd.read_csv(os.path.abspath(filenameTrain))
            X_train = Trainfile.iloc[:, 0:-1].values
            y_train = Trainfile.iloc[:, -1].values
            Testfile = pd.read_csv(os.path.abspath(filenameTest))
            X_test = Testfile.iloc[:, 0:-1].values
            y_test = Testfile.iloc[:, -1].values
        else:
            X_train,X_test,y_train,y_test=Cross_validation(request.files['train'])

        if request.method == 'POST':
            if request.form['knn'] == 'true':
                if not request.form['neighbors']:
                    clf = neighbors.KNeighborsClassifier()
                else:
                    clf =neighbors.KNeighborsClassifier(float(request.form['neighbors']))
                clf.fit(X_train, y_train)
                y_pred= clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                     y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)

                recall =(TP/(TP+FN))
                resultat.update({"knn": recall})

            if request.form['lr'] == 'true':
                clf = LinearRegression()
                y_pred = clf.fit(X_train, y_train).predict(X_test)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                recall =(TP/(TP+FN))
                resultat.update({"lr": recall})
            if request.form['logistic'] == 'true':
                clf = LogisticRegression()
                y_pred = clf.fit(X_train, y_train).predict(X_test)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                recall =(TP/(TP+FN))
                resultat.update({"logistic": recall})

            if request.form['lrRidge'] == 'true':
                if not request.form['alpharidge']:
                    clf =linear_model.Ridge(0.5)
                else:
                    clf =  linear_model.Ridge(float(request.form['alpharidge']))
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                recall =(TP/(TP+FN))
                resultat.update({"lrRidge": recall})

            if request.form['dts'] == 'true':
                clf = tree.DecisionTreeClassifier().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                recall =(TP/(TP+FN))
                resultat.update({"dts": recall})
            if request.form['BRRidge'] == 'true':
                clf = linear_model.BayesianRidge().fit(X_train, y_train)
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                recall =(TP/(TP+FN))
                resultat.update({"BRRidge": recall})

            if request.form['gaussien'] == 'true':
                clf = GaussianNB()
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print(y_test)
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1

                recall =(TP/(TP+FN))
                resultat.update({"gaussien": recall})
            if request.form['lasso'] =='true':
                if not request.form['alphalasso']:
                    clf =linear_model.Lasso(0.1)
                else:
                    clf = linear_model.Lasso(float(request.form['alphalasso']))
                clf.fit(X_train,y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                recall =(TP/(TP+FN))
                resultat.update({"lasso": recall})
            if request.form['multinavesBayes'] == 'true':
                clf = MultinomialNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"multinavesBayes": recall})

            if request.form['BernouilliNb'] == 'true':
                clf = BernoulliNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"BernouilliNb": recall})

            if request.form['ComplementNb'] == 'true':
                clf = ComplementNB().fit(X_train, y_train)
                y_pred = clf.predict(X_test)
                for i in range(len(y_pred)):
                    if y_pred[i]<0.5:
                        y_pred[i]=0
                    else:
                        y_pred[i]=1
                print(len(y_pred))
                print("ypred",y_pred)
                for i in range(len(y_pred)):
                    if y_pred[i]==1 and  y_pred[i]==y_test[i]:
                        TP=TP+1
                    if y_pred[i]==0 and y_pred[i]==y_test[i]:
                        TN=TN+1
                    if y_test[i]==1 and y_pred[i]!=y_test[i]:
                        FP=FP+1
                    if y_test[i]==0 and y_pred[i]!=y_test[i]:
                        FN=FN+1
                print(TP,FP,FN,TN)
                precision=(TP/(TP+FP))
                recall =(TP/(TP+FN))
                f_measure=2*((precision*recall)/(precision+recall))
                resultat.update({"ComplementNb": recall})
        print(json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': ')))
        return json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': '))
######################################################################################
#########################      suggestion         #################################



    @app.route('/suggestion',methods=['POST','GET'])
    def suggestion():
        Algotab1 = [1, 3, 4]
        resultat = {}
        cross_validation = False
        filesTrain=[]
        filesTest=[]
        filesCross=[]
        testscore=0
        ialpha=0
        App_ROOT = os.path.dirname(os.path.abspath(__file__))
        if request.form['cv'] != 'true':
            """upload train file"""
            train = request.files['train']
            filenameTrain = secure_filename(train.filename)
            train.save(os.path.join(App_ROOT, filenameTrain))
            if train.filename.endswith(".arff"):
                filesTrain.append(train.filename)
                for file in filesTrain:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTrain= name+".csv"
                del filesTrain[0]
            """upload test file """
            test = request.files['test']
            filenameTest = secure_filename(test.filename)
            test.save(os.path.join(App_ROOT, filenameTest))
            """ Convertisseur arff to csv """
            if test.filename.endswith(".arff"):
                filesTest.append(test.filename)
                for file in filesTest:
                    with open(file , "r") as inFile:
                        content = inFile.readlines()
                        name,ext = os.path.splitext(inFile.name)
                        new = toCsv(content)
                        #print(new)
                        with open(name+".csv", "w") as outFile:
                            outFile.writelines(new)
                            filenameTest=name+".csv"
                del filesTest[0]
            np.set_printoptions(precision=4, suppress=True)
            rcParams['figure.figsize'] = 7, 4
            plt.style.use('seaborn-whitegrid')
            Trainfile = pd.read_csv(os.path.abspath(filenameTrain))
            X_train = Trainfile.iloc[:, 0:-1].values
            y_train = Trainfile.iloc[:, -1].values
            Testfile = pd.read_csv(os.path.abspath(filenameTest))
            X_test = Testfile.iloc[:, 0:-1].values
            y_test = Testfile.iloc[:, -1].values
        else:
            X_train,X_test,y_train,y_test=Cross_validation(request.files['train'])

        my_alphas = np.array([0.001,0.01,0.02,0.025,0.05,0.1,0.25,0.5,0.8,1.0])
        alpha_for_path, coefs_lasso, _ = lasso_path(X_train,X_train,alphas=my_alphas)
        i=0.001
        if request.form['lasso'] != 'true':

            while i < 1:
                clf =linear_model.Lasso(i)
                clf.fit(X_train,y_train)
                score=clf.score(X_test, y_test)
                print(" score ",score)
                if testscore < score:
                    testscore=score
                    print("test score if",testscore)
                    ialpha=i
                i=i+0.001
            clf =linear_model.Lasso(ialpha)
            clf.fit(X_train,y_train)
            score1=clf.score(X_test, y_test)
            print("testscore1",score1)
            print("ialpha",ialpha)
            resultat.update({"alpha": ialpha})
            return json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': '))
        if request.form['lrRidge'] != 'true':

                    while i < 1:
                        clf =linear_model.Ridge(i)
                        clf.fit(X_train,y_train)
                        score=clf.score(X_test, y_test)
                        print(" score ",score)
                        if testscore < score:
                            testscore=score
                            print("test score if",testscore)
                            ialpha=i
                        i=i+0.001
                    clf =linear_model.Lasso(ialpha)
                    clf.fit(X_train,y_train)
                    score1=clf.score(X_test, y_test)
                    print("testscore1",score1)
                    print("ialpha",ialpha)
                    resultat.update({"alpha": ialpha})
                    return json.dumps(resultat, sort_keys=True, indent=4, separators=(',', ': '))
"""
        video_dict = {'youID':[], 'title':[], 'pub_date':[]}

    def grab_videos(keyword, token=None):
        res = youtube_search(keyword, token=token)
        token = res[0]
        videos = res[1]
        for vid in videos:
            video_dict['youID'].append(vid['id']['videoId'])
            video_dict['title'].append(vid['snippet']['title'])
            video_dict['pub_date'].append(vid['snippet']['publishedAt'])
        print ("added " + str(len(videos)) + " videos to a total of " + str(len(video_dict['youID'])))
        print(token)
        return token





    token = grab_videos("spinners")
    while token != "last_page":
        token = grab_videos("spinners", token=token)
"""




if __name__ == '__main__':
    app.run(debug=True)
