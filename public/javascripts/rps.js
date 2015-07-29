//var three = require("three");
//var leapjs = require("leapjs");
var leapjsPlugins = require("leapjs-plugins");
var leapController1 = new Leap.Controller();
var leapController2 = new Leap.Controller();

leapController1
    .connect()
    .use('boneHand', {
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
        onHandFound(hand);
    })

leapController2
    .use('boneHand', {
        targetEl: document.getElementById("OtherHandCanvas"),
        arm: false
    })
    .use('playback', {
        recording: 'recordings/demoMovingHand.json.lz'
    })


function setupGame() {
    canvasResize(leapController1, 200, 200); //This will NOT persist through a window resize
    canvasResize(leapController2, 300, 300); //This will NOT persist through a window resize
}

function onHandFound(hand) {
    console.log("Hand Found.");
}

function canvasResize(controller, width, height) {
    controller.plugins.boneHand.camera.aspect = width / height;
    controller.plugins.boneHand.camera.updateProjectionMatrix();
    controller.plugins.boneHand.renderer.setSize(width, height);
}

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


setupGame();
controller.plugins.playback.player.play();