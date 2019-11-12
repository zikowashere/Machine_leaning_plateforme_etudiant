package com.machineLearningPlatform.weka.web.services.impl;

import com.machineLearningPlatform.weka.algorithms.J48.TreeDecision;
import com.machineLearningPlatform.weka.algorithms.jRip.JRAlgo;
import com.machineLearningPlatform.weka.algorithms.multiLayerPerceptron.mlpAlgo;
import com.machineLearningPlatform.weka.algorithms.naiveBayes.NBAlgo;
import com.machineLearningPlatform.weka.algorithms.randomForest.RFAlgo;
import com.machineLearningPlatform.weka.web.services.WekaService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import weka.core.Instances;
import weka.core.converters.ArffSaver;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;

/**
 * La classe définissant implémentant le service
 * gérant l'upload et la conversion des fichiers csv vers arff.
 * @author Mama
 */
@Service
public class WekaServiceImpl implements WekaService {

    @Override
    public HashMap<String, String> upload(
            MultipartFile train,
            MultipartFile test,
            Boolean rf,
            Boolean nb,
            Boolean jr,
            Boolean j48,
            Boolean mlp,
            boolean cv,
            String nbSplits)
    {
        HashMap<String, String> result = new HashMap<>();

        // On crée deux fichiers locaux pour y écrire les fichiers récupérés
        // du front.
        File train_file = new File("train.arff");
        File test_file = null;
        try {
            OutputStream out_train = new FileOutputStream(train_file);
            out_train.write(train.getBytes());
            if(!cv) {
                test_file = new File("test.arff");
                OutputStream out_test = new FileOutputStream(test_file);
                out_test.write(test.getBytes());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // SI ce sont des fichiers csv, on fait la conversion avant
        String[] fileNameTab = train.getOriginalFilename().split("\\.");
        String extension = fileNameTab[fileNameTab.length - 1];
        if(extension.equals("csv")){
            try {
                csv2Arff(train_file, train_file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //Si non cross validation
        if(!cv){
            test_file = new File("test.arff");
            fileNameTab = test.getOriginalFilename().split("\\.");
            extension = fileNameTab[fileNameTab.length - 1];
            if(extension.equals("csv")){
                try {
                    csv2Arff(test_file, test_file);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        //Si l'algo random forest a été sélectionné
        if(rf) {
            try {
                //Si cross validation
                if(cv)
                    result.put("rf", RFAlgo.process(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("rf", RFAlgo.process(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("rf", "-1000");
                e.printStackTrace();
            }
        }
        if(nb) {
            try {
                if(cv)
                    result.put("nb", NBAlgo.process(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("nb", NBAlgo.process(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("nb", "-1000");
                e.printStackTrace();
            }
        }

        if(jr) {
            try {
                if(cv)
                    result.put("jr", JRAlgo.process(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("jr", JRAlgo.process(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("jr", "-1000");
                e.printStackTrace();
            }
        }
        if(j48) {
            try {
                if(cv)
                    result.put("j48", TreeDecision.process(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("j48", TreeDecision.process(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("j48", "-1000");
                e.printStackTrace();
            }
        }
        if(mlp) {
            try {
                if(cv)
                    result.put("mlp", mlpAlgo.process(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("mlp", mlpAlgo.process(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("mlp", "-1000");
                e.printStackTrace();
            }
        }

        return result;

    }

    @Override
    public HashMap<String, String> testfmeasure(MultipartFile train, MultipartFile test, Boolean rf, Boolean nb, Boolean jr, Boolean J48, Boolean mlp, boolean cv, String nbSplits) {
        HashMap<String, String> result = new HashMap<>();

        // On crée deux fichiers locaux pour y écrire les fichiers récupérés
        // du front.
        File train_file = new File("train.arff");
        File test_file = null;
        try {
            OutputStream out_train = new FileOutputStream(train_file);
            out_train.write(train.getBytes());
            if(!cv) {
                test_file = new File("test.arff");
                OutputStream out_test = new FileOutputStream(test_file);
                out_test.write(test.getBytes());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // SI ce sont des fichiers csv, on fait la conversion avant
        String[] fileNameTab = train.getOriginalFilename().split("\\.");
        String extension = fileNameTab[fileNameTab.length - 1];
        if(extension.equals("csv")){
            try {
                csv2Arff(train_file, train_file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //Si non cross validation
        if(!cv){
            test_file = new File("test.arff");
            fileNameTab = test.getOriginalFilename().split("\\.");
            extension = fileNameTab[fileNameTab.length - 1];
            if(extension.equals("csv")){
                try {
                    csv2Arff(test_file, test_file);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        //Si l'algo random forest a été sélectionné
        if(rf) {
            try {
                //Si cross validation
                if(cv)
                    result.put("rf", RFAlgo.test(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("rf", RFAlgo.test(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("rf", "-1000");
                e.printStackTrace();
            }
        }
        if(nb) {
            try {
                if(cv)
                    result.put("nb", NBAlgo.test(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("nb", NBAlgo.test(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("nb", "-1000");
                e.printStackTrace();
            }
        }

        if(jr) {
            try {
                if(cv)
                    result.put("jr", JRAlgo.test(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("jr", JRAlgo.test(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("jr", "-1000");
                e.printStackTrace();
            }
        }
        if(J48) {
            try {
                if(cv)
                    result.put("j48", TreeDecision.test(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("j48", TreeDecision.test(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("j48", "-1000");
                e.printStackTrace();
            }
        }
        if(mlp) {
            try {
                if(cv)
                    result.put("mlp", mlpAlgo.test(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("mlp", mlpAlgo.test(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("mlp", "-1000");
                e.printStackTrace();
            }
        }

        return result;

    }
    public HashMap<String, String> RecallImpl(MultipartFile train, MultipartFile test, Boolean rf, Boolean nb, Boolean jr, Boolean J48, Boolean mlp, boolean cv, String nbSplits) {
        HashMap<String, String> result = new HashMap<>();

        // On crée deux fichiers locaux pour y écrire les fichiers récupérés
        // du front.
        File train_file = new File("train.arff");
        File test_file = null;
        try {
            OutputStream out_train = new FileOutputStream(train_file);
            out_train.write(train.getBytes());
            if(!cv) {
                test_file = new File("test.arff");
                OutputStream out_test = new FileOutputStream(test_file);
                out_test.write(test.getBytes());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // SI ce sont des fichiers csv, on fait la conversion avant
        String[] fileNameTab = train.getOriginalFilename().split("\\.");
        String extension = fileNameTab[fileNameTab.length - 1];
        if(extension.equals("csv")){
            try {
                csv2Arff(train_file, train_file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //Si non cross validation
        if(!cv){
            test_file = new File("test.arff");
            fileNameTab = test.getOriginalFilename().split("\\.");
            extension = fileNameTab[fileNameTab.length - 1];
            if(extension.equals("csv")){
                try {
                    csv2Arff(test_file, test_file);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        //Si l'algo random forest a été sélectionné
        if(rf) {
            try {
                //Si cross validation
                if(cv)
                    result.put("rf", RFAlgo.RecallTest(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("rf", RFAlgo.RecallTest(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("rf", "-1000");
                e.printStackTrace();
            }
        }

        if(nb) {
            try {
                if(cv)
                    result.put("nb", NBAlgo.RecallTest(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("nb", NBAlgo.RecallTest(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("nb", "-1000");
                e.printStackTrace();
            }
        }

        if(jr) {
            try {
                if(cv)
                    result.put("jr", JRAlgo.RecallTest(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("jr", JRAlgo.RecallTest(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("jr", "-1000");
                e.printStackTrace();
            }
        }
        if(J48) {
            try {
                if(cv)
                    result.put("j48", TreeDecision.RecallTest(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("j48", TreeDecision.RecallTest(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("j48", "-1000");
                e.printStackTrace();
            }
        }
        if(mlp) {
            try {
                if(cv)
                    result.put("mpl", mlpAlgo.RecallTest(1, train_file, test_file, nbSplits)+"");
                else
                    result.put("mlp", mlpAlgo.RecallTest(2, train_file, test_file, nbSplits)+"");
            } catch (Exception e) {
                result.put("mlp", "-1000");
                e.printStackTrace();
            }
        }


        return result;

    }

    public void csv2Arff(File csv, File output) throws IOException {
        CSVLoader loader = new CSVLoader();
        //On dit que la dernière colonne correspond à la classe.
        loader.setNominalAttributes("last");
        loader.setSource(csv);
        Instances data = loader.getDataSet();

        ArffSaver saver = new ArffSaver();
        saver.setInstances(data);
        saver.setFile(output);
        saver.writeBatch();
    }
}
