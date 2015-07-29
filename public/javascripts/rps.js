//var three = require("three");
//var leapjs = require("leapjs");
var leapjsPlugins = require("leapjs-plugins");
var leapController = new Leap.Controller();

leapController
    .connect()
    .use('boneHand', {
        //scene: undefined,
        targetEl: document.getElementById("HandCanvas"),
        arm: true,
        useAllPlugins: true
    })
    .on('frame', function(frame) {

        var extendedFingers = getExtendedFingers(frame);
        var choice = getPose(extendedFingers);

        document.getElementById("point").innerText = "Extended: " + extendedFingers;
        document.getElementById("choice").innerText = "You are showing: " + choice;
    })
    .on('handFound', function(hand) {
//        document.querySelector('canvas').style.height = "100px !important"
//        document.querySelector('canvas').style.width = "100px !important"
    })
//    .on('handLost', function(hand) {
//        if (Leap.loopController.frame(0).hands.length === 0) {
//            document.querySelector('canvas').style.display = 'none';
//        }
//    });

//three.renderer.setSize( 100, 200 );

leapController.plugins.boneHand.renderer.setSize(300, 300); //YAYAYAYYA


function getExtendedFingers(frame) {
    if (!(frame && frame.hands.length > 0)) {
        return;
    }
    var extendedFingers = 0;
    for (var f = 0; f < frame.hands[0].fingers.length; f++) {
        if (!frame.hands[0]) {
            break;
        }
        var finger = frame.hands[0].fingers[f];
        if (finger.extended) extendedFingers++;
    }
    return extendedFingers;
}

function getPose(extendedFingers) {
    var choice = "did not choose";

    //RPS Detection start
    if (extendedFingers == 0) {
        choice = "rock";
    } else if (extendedFingers == 2 || extendedFingers == 3) {
        choice = "scissors";
    } else if (extendedFingers > 3) {
        choice = "paper";
    }
    //RPS Detection end
    return choice;
}