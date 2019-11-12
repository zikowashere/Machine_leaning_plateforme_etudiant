package com.machineLearningPlatform.weka.web.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

/**
 * L'interface définissant les services
 * @author Mama
 */

public interface WekaService {

    HashMap<String, String> upload(MultipartFile train, MultipartFile test, Boolean rf, Boolean nb,  Boolean jr,Boolean J48,Boolean mpl, boolean cv, String nbSplits);
    HashMap<String, String> testfmeasure(MultipartFile train, MultipartFile test, Boolean rf, Boolean nb,  Boolean jr,Boolean J48,Boolean mpl, boolean cv, String nbSplits);
    HashMap<String, String> RecallImpl(MultipartFile train, MultipartFile test, Boolean rf, Boolean nb,  Boolean jr,Boolean J48,Boolean mpl, boolean cv, String nbSplits);

    public void csv2Arff(File csv, File output) throws IOException;
}
