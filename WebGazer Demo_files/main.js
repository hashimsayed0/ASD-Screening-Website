var count = 0;
var scene = 1 ;
var chart;
window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
            .setTracker('clmtrackr')
            .begin();

    webgazer.pause();
    var vid = document.getElementById("mov");
    vid.onplaying = function() {
        //start the webgazer tracker
        webgazer.resume();
        for (var i = 0; i < 8; i++) {
            setTimeout(pushScene,i*7000);
        }
        
        
    };
    vid.onended = function() {

        window.location.href="results.html";

    };
};

function pushScene() {
    chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        exportFileName: "Scene-"+scene,
        width: 1366,
        height: 768,
       
        axisX:{
            minimum: 0,
            maximum: 1366,
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
              return " ";
            }
        },

        axisY:{
            minimum: 0,
            maximum: 768,
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
              return " ";
            }
        },
        data: [{
            color: "red",
            type: "scatter",
            dataPoints: []
        }]
    });
        
    for (var i = 0; i < 100; i++) {
        setTimeout(pushFrame, i*50);
    }

}


function pushFrame() {    
    var prediction = webgazer.getCurrentPrediction();
    if (prediction) {
        console.log(prediction);
        chart.options.data[0].dataPoints.push({x: prediction.x, y: prediction.y});
    }  
    if(count==99){
        count=0;
        scene++;    
        if(scene==9){
            scene=1;
        }
        chart.render();
        document.getElementById("chartContainer").style.display = "none";
        chart.exportChart({format: "png"});
    }
    else{
        count++;
    }      
}

    
    

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}
