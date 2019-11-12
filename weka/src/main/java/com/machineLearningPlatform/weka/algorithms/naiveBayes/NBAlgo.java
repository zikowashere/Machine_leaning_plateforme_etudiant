package com.machineLearningPlatform.weka.algorithms.naiveBayes;

import com.machineLearningPlatform.weka.algorithms.services.Evaluate;
import com.machineLearningPlatform.weka.algorithms.services.Loader;
import weka.classifiers.Classifier;
import weka.classifiers.Evaluation;
import weka.classifiers.bayes.NaiveBayes;
import weka.core.Instances;

import java.io.File;
import java.util.Random;

/**
 * La classe implémentant l'algorithme Naive Bayes
 * @author Mama
 *
 */

public class NBAlgo {

    public static double process(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        if (test_file != null)
            test = Loader.getDataSet(test_file);

        NaiveBayes scheme = new NaiveBayes();

        return Evaluate.evaluate(status, train, test, scheme, nbSplits);
    }

    public static double test(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        //int nb_split = Integer.parseInt(nbSplits);
        if (test_file != null) {
            test = Loader.getDataSet(test_file);
            Classifier c1 = new NaiveBayes();
            return 100*Evaluate.classifier(train, test, c1);

        } else {
            Classifier c1 = new NaiveBayes();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(c1, train, 10, new Random(1));
            System.out.println("Estimated Accuracy: " + Double.toString(eval.fMeasure(1)));
            return 100*eval.fMeasure(0);
        }
    }


    public static double RecallTest(int status, File train_file, File test_file, String nbSplits) throws Exception {



        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        //int nb_split = Integer.parseInt(nbSplits);
        if (test_file != null) {
            test = Loader.getDataSet(test_file);
            Classifier c1 = new NaiveBayes();
            return 100*Evaluate.Recall(train, test, c1);

        } else {
            Classifier c1 = new NaiveBayes();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(c1, train, 10, new Random(1));

            return 100*eval.recall(0);
        }

        }
    }

