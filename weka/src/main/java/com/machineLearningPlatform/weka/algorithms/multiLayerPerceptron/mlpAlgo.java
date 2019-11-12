package com.machineLearningPlatform.weka.algorithms.multiLayerPerceptron;

import com.machineLearningPlatform.weka.algorithms.services.Evaluate;
import com.machineLearningPlatform.weka.algorithms.services.Loader;
import weka.classifiers.Evaluation;
import weka.classifiers.functions.MultilayerPerceptron;
import weka.core.Instances;

import java.io.File;
import java.util.Random;

public class mlpAlgo {
    public static double process(int status, File train_file, File test_file, String nbSplits) throws Exception {


        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        if(test_file != null)
            test = Loader.getDataSet(test_file);

        MultilayerPerceptron mlp = new MultilayerPerceptron();

        return Evaluate.evaluate(status, train, test, mlp, nbSplits);
    }
    public static double test(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        //int nb_split = Integer.parseInt(nbSplits);
        if (test_file != null) {
            test = Loader.getDataSet(test_file);
            MultilayerPerceptron mlp = new MultilayerPerceptron();
            return 100*Evaluate.classifier(train, test, mlp);

        } else {
            MultilayerPerceptron mlp = new MultilayerPerceptron();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(mlp, train, 10, new Random(1));
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
            MultilayerPerceptron mlp = new MultilayerPerceptron();
            return 100*Evaluate.Recall(train, test, mlp);

        } else {
            MultilayerPerceptron mlp = new MultilayerPerceptron();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(mlp, train, 10, new Random(1));

            return 100*eval.recall(0);
        }

    }
}
