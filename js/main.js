window.onload = function() {
    var xPred = [];
    var yPred = []; 

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
             //console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
             //console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */

            xPred[x.length] = data.x; //these x coordinates are relative to the viewport
            yPred[y.length] = data.y; //these y coordinates are relative to the viewport
        })
        .begin();
    

    /*
    var prediction = webgazer.getCurrentPrediction();
    if (prediction) {
        x[x.length] = prediction.x;
        y[y.length] = prediction.y;
    }
    */
    for (var i in xPred) 
    {
       console.log(x[0]+", ");
    }
};

