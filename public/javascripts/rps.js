var three = require("three");
var leapjs = require("leapjs");
var leapjsPlugins = require("leapjs-plugins");
var leapController = new Leap.Controller();


leapController
    .use('boneHand', {
        //targetEl: document.body,
        scene: undefined,
        targetEl: document.getElementById("HandSpace"),
        arm: true,
        useAllPlugins: true
    })
    .on('frame', function(frame) {
    
        if(!(frame && frame.hands.length > 0))
        {
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
        var choice = "did not choose";

        if (extendedFingers == 0) {
            choice = "rock";
        } else if (extendedFingers == 2 || extendedFingers == 3) {
            choice = "scissors";
        } else if (extendedFingers > 3) {
            choice = "paper";
        }

        document.getElementById("point").innerText = "Extended: " + extendedFingers;
        document.getElementById("choice").innerText = "You are showing: " + choice;
    })
    .connect();