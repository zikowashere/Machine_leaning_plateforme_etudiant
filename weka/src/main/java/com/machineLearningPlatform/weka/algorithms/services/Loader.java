package com.machineLearningPlatform.weka.algorithms.services;

import weka.core.Instances;
import weka.core.converters.ArffLoader;
import java.io.File;
import java.io.IOException;

/**
 * @author Mama
 * La classe qui permet de charger les données dans
 * des fichiers
 */
public class Loader {

    public static Instances getDataSet(File file) throws IOException {

        ArffLoader loader = new ArffLoader();
        loader.setSource(file);
        Instances dataSet = loader.getDataSet();
        if(dataSet.classIndex() == -1)
            dataSet.setClassIndex(dataSet.numAttributes() - 1);
        return dataSet;
    }
}
