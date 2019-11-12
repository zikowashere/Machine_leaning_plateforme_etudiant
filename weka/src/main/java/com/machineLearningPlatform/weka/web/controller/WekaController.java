package com.machineLearningPlatform.weka.web.controller;
import YoutubePlayer.ApiExample;
import YoutubePlayer.YouTubeManager;
import com.machineLearningPlatform.weka.web.services.impl.WekaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

/**
 * Le controlleur de l'application
 * @author Mama
 */

@RestController
public class WekaController {

    @Autowired
    WekaServiceImpl wekaService;

    YouTubeManager youTubeManager =new YouTubeManager("434690036261-grurnltrvb3hro6orjp96k4a9ti80lii.apps.googleusercontent.com");
    ApiExample api = new ApiExample();

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public HashMap<String, String> FileUpload(
            @RequestParam(required = false) MultipartFile train,
            @RequestParam(required = false) MultipartFile test,
            @RequestParam("rf") Boolean rf,
            @RequestParam("nb") Boolean nb,
            @RequestParam("jr") Boolean jr,
            @RequestParam("j48") Boolean j48,
            @RequestParam("mlp") Boolean mlp,
            @RequestParam("cv") boolean cv,
            @RequestParam(name = "nbSplits", required = false) String nbSplits
            )
    {

        return wekaService.upload(train, test, rf, nb, jr,j48,mlp, cv, nbSplits);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/measure")
    public HashMap<String, String> Fmeasure(
            @RequestParam(required = false) MultipartFile train,
            @RequestParam(required = false) MultipartFile test,
            @RequestParam("rf") Boolean rf,
            @RequestParam("nb") Boolean nb,
            @RequestParam("jr") Boolean jr,
            @RequestParam("j48") Boolean j48,
            @RequestParam("mlp") Boolean mlp,
            @RequestParam("cv") boolean cv,
            @RequestParam(name = "nbSplits", required = false) String nbSplits
    )
    {
        return wekaService.testfmeasure(train, test, rf, nb, jr, j48, mlp, cv, nbSplits);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/recall")
    public HashMap<String, String> Recall(
            @RequestParam(required = false) MultipartFile train,
            @RequestParam(required = false) MultipartFile test,
            @RequestParam("rf") Boolean rf,
            @RequestParam("nb") Boolean nb,
            @RequestParam("jr") Boolean jr,
            @RequestParam("j48") Boolean j48,
            @RequestParam("mlp") Boolean mlp,
            @RequestParam("cv") boolean cv,
            @RequestParam(name = "nbSplits", required = false) String nbSplits
    )
    {
        return wekaService.RecallImpl(train, test, rf, nb, jr, j48, mlp, cv, nbSplits);
    }

}


