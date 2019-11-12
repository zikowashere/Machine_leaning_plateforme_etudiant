package com.machineLearningPlatform.weka.algorithms.J48;

import com.machineLearningPlatform.weka.algorithms.services.Evaluate;
import com.machineLearningPlatform.weka.algorithms.services.Loader;
import weka.classifiers.Evaluation;
import weka.classifiers.trees.J48;
import weka.core.Instances;

import javax.sql.DataSource;
import java.io.File;
import java.util.Random;

public class TreeDecision {
    public static double process(int status, File train_file, File test_file, String nbSplits) throws Exception {
        DataSource sourceTrain;
        DataSource sourceTest;
        Instances instancesTrain=null;
        Instances instancesTest=null;

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        if(test_file != null)
            test = Loader.getDataSet(test_file);

        J48 classifieur = new J48();

        return Evaluate.evaluate(status, train, test, classifieur, nbSplits);
    }
    public static double test(int status, File train_file, File test_file, String nbSplits) throws Exception {

        Instances train = Loader.getDataSet(train_file);
        Instances test = null;
        //int nb_split = Integer.parseInt(nbSplits);
        if (test_file != null) {
            test = Loader.getDataSet(test_file);
            J48 classifieur = new J48();
            return 100*Evaluate.classifier(train, test, classifieur);

        } else {
            J48 classifieur = new J48();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(classifieur, train, 10, new Random(1));
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
            J48 classifieur = new J48();
            return 100*Evaluate.Recall(train, test, classifieur);

        } else {
            J48 classifieur = new J48();
            Evaluation eval = new Evaluation(train);
            eval.crossValidateModel(classifieur, train, 10, new Random(1));

            return 100*eval.recall(0);
        }

    }
}
