img = "";
status = "";
objects = [];

function preload() {
    video = createVideo("justin_bieber_baby.mp3");
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    poseNet = ml5.poseNet(video,modelLoaded);
    canvas.position(480,250);
    video.size(300,290);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

   
}

function modelLoaded() {
    console.log("ModelLoaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "person") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Person Found" + objects.length;
            audio.stop();

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    else {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Person Not Found" + objects.length;
        audio.play();
    }
}