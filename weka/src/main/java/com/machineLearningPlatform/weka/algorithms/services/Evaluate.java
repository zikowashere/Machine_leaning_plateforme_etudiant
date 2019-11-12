package com.machineLearningPlatform.weka.algorithms.services;

import weka.classifiers.Classifier;
import weka.classifiers.Evaluation;
import weka.core.Instances;

/**
 *
 * La classe d'évaluation de l'algorithme
 * @author Mama
 */
public class Evaluate {

    /**
     * Cette méthode renvoie la précision de l'algorithme
     * @param status si 1 cross validation
     * @param data les données de train
     * @param test les données de test
     * @param tree le classifier
     * @param nbSplits le nombre de split pour la cross validation
     * @return accuracy la précision de l'algorithme
     * @throws Exception
     */

    public static double evaluate(int status, Instances data, Instances test, Classifier tree, String nbSplits) throws Exception{
        double accuracy = 0.0;

        if(status == 1){    //if you use crossvalidation

            Evaluation eval = null;
            eval = new Evaluation(data);
            int nbSplit = 10;

            if(nbSplits != null)
                nbSplit = Integer.parseInt(nbSplits);

            eval.crossValidateModel(tree, data, nbSplit, new java.util.Random(1));
            accuracy = eval.pctCorrect();
        } else{       //if you use train-test validation
            tree.buildClassifier(data);
            for (int i = 0; i < test.numInstances(); i++) {
                int TruthTest = (int)test.instance(i).value(test.numAttributes()-1);
                int pred = (int)tree.classifyInstance(test.instance(i));
                if(TruthTest == pred)
                    accuracy++;
            }
            accuracy = 100*accuracy/(double)test.numInstances();
        }

        return accuracy;
    }

    public static double classifier(Instances data, Instances test, Classifier tree) throws Exception{
        data.setClassIndex(data.numAttributes() - 1);
        tree.buildClassifier(data);
        Evaluation eTest = new Evaluation(data);
        eTest.evaluateModel(tree, test);


        //print out the results
        System.out.println("=====================================================================");
        //System.out.println("Results for "+this.getClass().getSimpleName());
        String strSummary = eTest.toSummaryString();
        System.out.println(strSummary);

        System.out.println("F-measure : "+eTest.weightedFMeasure());
        return eTest.weightedFMeasure();
    }
    public static double Recall(Instances data, Instances test, Classifier tree) throws Exception{
        data.setClassIndex(data.numAttributes() - 1);
        tree.buildClassifier(data);
        Evaluation eTest = new Evaluation(data);
        eTest.evaluateModel(tree, test);


        //print out the results
        System.out.println("=====================================================================");
        System.out.println("Recall : "+eTest.weightedRecall());
        return eTest.weightedRecall();
    }
    }
