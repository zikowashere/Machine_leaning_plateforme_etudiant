package com.machineLearningPlatform.weka.algorithms.randomForest;

import com.machineLearningPlatform.weka.algorithms.services.Evaluate;
import com.machineLearningPlatform.weka.algorithms.services.Loader;
import weka.classifiers.Evaluation;
import weka.classifiers.trees.RandomForest;
import weka.core.Instances;

import java.io.File;
import java.util.Random;

/**
 * La classe implémentant l'algorithme Random Forest
 * @author Mama
 *
 */

public class RFAlgo {

    /**
     * This method is used to process the input and return the statistics.
     *
     * @throws Exception
     */
    public static double process(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances trainingDataSet = Loader.getDataSet(train_file);
        Instances testingDataSet = null;
        if(test_file != null)
            testingDataSet = Loader.getDataSet(test_file);

        RandomForest forest = new RandomForest();

        return Evaluate.evaluate(status, trainingDataSet, testingDataSet, forest, nbSplits);
    }
    public static double test(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        //int nb_split = Integer.parseInt(nbSplits);
        if (test_file != null) {
            test = Loader.getDataSet(test_file);
            RandomForest forest = new RandomForest();
            return 100*Evaluate.classifier(train, test, forest);

        } else {
            RandomForest forest = new RandomForest();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(forest, train, 10, new Random(1));
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
            RandomForest forest = new RandomForest();
            return 100*Evaluate.Recall(train, test, forest);

        } else {
            RandomForest forest = new RandomForest();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(forest, train, 10, new Random(1));

            return 100*eval.recall(0);
        }

    }
}
