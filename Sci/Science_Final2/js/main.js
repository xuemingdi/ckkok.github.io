
/*
 *
 * main.js -- States of Matter
 *
 */

var particles = [];         //particles
var tmp_particle = [];      //tmp particle positions
var spheremat;              //particle material
var nonemat;                //unvisible material
var total = 75;             //number of particles .. 3 rows of 5x5
var sim_finished = false;
var transitionSolidToLiquidPerformed = false;
var transitionLiquidToGasPerformed = false;
var transitionSolidToLiquidCounter = 0;
var transitionLiquidToGasCounter = 0;
var lowered_top_flow_collider_for_solid_sim = false;
var switched_off_flow_colliders_for_solid_sim = false;
var re_raised_top_flow_collider_for_solid_sim = false;

var power = 0.01;              //particle's power

var biker;                  //biker
var bottombox;              //bottom
var cover;                  //cover
var hitmater;               //hitmater
var hitma;                  //hitmaterial
var flowCollider = [];      //flow colliders
var topFlowCollider;        //top of solid flow collider
var setted = false;         //mode set one time


var CreatePhysicsScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(30, 30, 30);

    var camera = new BABYLON.DeviceOrientationCamera("FreeCamera", new BABYLON.Vector3(11, 8, 11), scene);
    camera.lockedTarget = BABYLON.Vector3.Zero();

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-5, 10, 5), scene);
    light.intensity = 1.3;

    // Physics - use not the bleeding edge version
    scene.enablePhysics(null, new BABYLON.OimoJSPlugin());

    //-- background
    var back = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);
    back.rotation.x = Math.PI/2;    // 180
    back.rotation.y = Math.PI/4;    // 90
    back.position.z = -10;
    var backmat = new BABYLON.StandardMaterial('texture1', scene);
    backmat.diffuseTexture = new BABYLON.Texture('img/newBG.png', scene);
    backmat.diffuseTexture.uScale = 2;
    backmat.diffuseTexture.vScale = 2;
    back.material = backmat;

    // biker
    BABYLON.SceneLoader.ImportMesh("", "model/", "biker.babylon", scene, function (newMeshes) {

        // Set the target of the camera to the first imported mesh
        biker = newMeshes[0];

        var bikermat = new BABYLON.StandardMaterial('wallMat', scene);
        bikermat.alpha = 0.333;//0.3
        bikermat.diffuseColor = new BABYLON.Color3(1, 1, 1);
        bikermat.backFaceCulling = false;

        biker.material = bikermat;
        biker.position = new BABYLON.Vector3(0, 1.7, 0);

        biker.rotation.y = -Math.PI/4;

        biker._scaling.x = 0.085; // << play with this
        biker._scaling.y = 0.075;
        biker._scaling.z = 0.09;
    });

    //--- bottom - white box with switch on it
    var bottommat = new BABYLON.StandardMaterial('wallMat', scene);
    bottommat.alpha = 1;
    bottommat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    bottommat.backFaceCulling = false;

    var boxopt = {
        width: 7,
        height: 0.8,
        depth: 7
    };
    bottombox = BABYLON.MeshBuilder.CreateBox('bottom', boxopt, scene);
    bottombox.position = new BABYLON.Vector3(0, 1.0, 0);
    bottombox.rotation.y = Math.PI/4;
    bottombox.material = bottommat;
    bottombox.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
    bottombox.checkCollisions = true;

    //--- bottom1 -- flat black layer on top of the bottom box
    var bottommat1 = new BABYLON.StandardMaterial('wallMat1', scene);
    bottommat1.alpha = 1;
    bottommat1.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    bottommat1.backFaceCulling = false;

    var boxopt1 = {
        width: 6,
        height: 0.5,
        depth: 6
    };
    bottombox1 = BABYLON.MeshBuilder.CreateBox('bottom1', boxopt1, scene);
    bottombox1.position = new BABYLON.Vector3(0, 1.6, 0);
    bottombox1.rotation.y = Math.PI/4;
    bottombox1.material = bottommat1;
    bottombox1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
    bottombox1.checkCollisions = true;

    //--- cover - on top
    var covermat = new BABYLON.StandardMaterial('wallMat', scene);
    covermat.alpha = 1;
    covermat.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.6);
    covermat.backFaceCulling = false;

    cover = new BABYLON.Mesh.CreateCylinder("cylinder", 0.4, 4.7, 4.7, 36, 36, scene, false);
    cover.position = new BABYLON.Vector3(0, 5.77, 0);
    cover.checkCollisions = true;
    cover.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
    cover.material = covermat;

    //--- invisible material
    nonemat = new BABYLON.StandardMaterial('nonemat', scene);
    nonemat.alpha = 0;

    //--- heat material
    hitma = new BABYLON.StandardMaterial('wallMat', scene);
    hitma.alpha = 0.8;
    hitma.diffuseColor = new BABYLON.Color3(0.8, 0, 0);
    hitma.backFaceCulling = false;

    hitmater = new BABYLON.Mesh.CreateCylinder("cylinder", 0.4, 5, 5, 36, 36, scene, false);
    hitmater.position = new BABYLON.Vector3(0, 1.655, 0);
    hitmater.material = hitma;

    // Beaker colliders -- contain the beaker side walls
    var colmat = new BABYLON.StandardMaterial('collidermat', scene);
    colmat.alpha = 0.0;
    colmat.diffuseColor = new BABYLON.Color3(1,192/255, 203/255);   // << dbg color - pink for Ryvan
    var colopt = {
        width: 7,
        height: 7,
        depth: 1.5
    };
    var colliders = [];
    var rad = 2.78;
    var cnt = 0;
    for(var al=0; al<2*Math.PI; al+=Math.PI/9)
    {
        colliders[cnt] = BABYLON.MeshBuilder.CreateBox('collider'+cnt, colopt, scene);
        colliders[cnt].position = new BABYLON.Vector3(rad*Math.sin(al), 3.5, rad*Math.cos(al));
        colliders[cnt].rotation.y = al;
        colliders[cnt].material = colmat;
        colliders[cnt].checkCollisions = true;
        colliders[cnt].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
        cnt ++;
    }

    // Flow Colliders -- squeezes and holds the 'solid' lattice together -- # shape
    var flowcolmat = new BABYLON.StandardMaterial('collidermat', scene);
    flowcolmat.alpha = 0; //0.2;
    flowcolmat.diffuseColor = new BABYLON.Color3(0, 0, 1); // << dbg color
    var flowcolopt = {
        width: 5.5,
        height: 7,
        depth: 1.46
    };
    cnt = 0;
    for(var al = 0; al<=2*Math.PI; al+=Math.PI/2)
    {
        flowCollider[cnt] = BABYLON.MeshBuilder.CreateBox('flowcollider'+cnt, flowcolopt, scene);
        flowCollider[cnt].position = new BABYLON.Vector3(13*Math.sin(al), 3.5, 13*Math.cos(al));
        flowCollider[cnt].rotation.y = al;
        flowCollider[cnt].material = flowcolmat;
        flowCollider[cnt].checkCollisions = true;
        flowCollider[cnt].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
        cnt ++;
    }

    //------------------------------------------------------------------------------------
    var topflowcolmat = new BABYLON.StandardMaterial('topcollidermat', scene);
    topflowcolmat.alpha = 0; //0.3;
    topflowcolmat.diffuseColor = new BABYLON.Color3(0, 1, 0); // << dbg color
    var topflowcolopt = {
        width: 7,
        height: 1,
        depth: 7
    };

    topFlowCollider = BABYLON.MeshBuilder.CreateBox('topflowcollider', topflowcolopt, scene);
    topFlowCollider.position = new BABYLON.Vector3(0,7,0);
    topFlowCollider.material = topflowcolmat;
    topFlowCollider.checkCollisions = true;
    topFlowCollider.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
    //------------------------------------------------------------------------------------

    //-- particles number- total
    spheremat = new BABYLON.StandardMaterial('amiga', scene);
    spheremat.diffuseColor = new BABYLON.Color3(0, 1, 1);

    var index = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0 ; j < 5; j++) {
            for (var k = 0; k < 5 ;k++) {
                particles[index] = BABYLON.Mesh.CreateSphere('particles'+index, 25, 0.50, scene);
                particles[index].position.y = (i * 0.5) + 2.12;
                particles[index].position.x = (j * 0.5) - 1.2;
                particles[index].position.z = (k * 0.5) - 1.2;
                particles[index].checkCollisions = true;
                particles[index].material = spheremat;
                particles[index].setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {mass: 0.001});
                index++;
            }
        }
    }

    scene.registerBeforeRender(function(){
        if(scene.isReady())
        {
            updateMovement();
        }
    });


    window.setInterval(function(){
        switch(heatcool)
        {
            case 0:
                hitmater.material = hitma; // show red
                break;
            case 1:
            case -1:
                hitmater.material = nonemat;
                break;
        }

        if (isplay) {
            if (!setted) {
                setted = true;
                for (var i = 0; i < 4; i++) {
                    switch (state) {
                        case 0:
                            cnt = 0;
                            for (var al = 0; al < 2 * Math.PI; al += Math.PI / 2) {
                                flowCollider[cnt].position = new BABYLON.Vector3(10 * Math.sin(al), 3.5, 10 * Math.cos(al));
                                cnt++;
                            }
                            topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);                // Up
                            //final->
                            scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));    // Earth normal
                            //<-final
                            break;
                        case 1:
                            cnt = 0;
                            for (var al = 0; al < 2 * Math.PI; al += Math.PI / 2) {
                                flowCollider[cnt].position = new BABYLON.Vector3(10 * Math.sin(al), 3.5, 10 * Math.cos(al));
                                cnt++;
                            }
                            topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);                // Up
                            //final->
                            scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));    // Earth normal
                            //<-final
                            break;
                        case 2:
                            pos = 2.0;
                            cnt = 0;
                            for (var al = 0; al < 2 * Math.PI; al += Math.PI / 2) {
                                flowCollider[cnt].position = new BABYLON.Vector3(pos * Math.sin(al), 3.5, pos * Math.cos(al));
                                cnt++;
                            }
                            //final->
                            // topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);
                            topFlowCollider.position = new BABYLON.Vector3(0, 3.85, 0);             // Lower just above
                            scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,0,0));        // Zero gravity
                            //<-final                                                               // Contained in 'box'
                            break;
                    }
                }
            }
            //
            // No Simulation sequence
            //
        }
    }, 30);

    return scene;
};

function updateMovement()
{
    for(var i=0; i<total; i++)
    {
        if(isplay)
        {
            var dir = new BABYLON.Vector3(getRandom(), getRandom(), getRandom());
            particles[i].applyImpulse(dir.scale(power), particles[i].position);
            tmp_particle[i] = particles[i].position;
        }
        else
        {
            particles[i].position = tmp_particle[i];
        }

        //
        // No Simulation sequence
        //

        if(isplay)
        {
            //final->
            if (state == 0)
                power = 3;
            else if (state == 1)
                power = 0.525;      // Fairly hot water
            else if (state == 2)
                power = 0.3;        // Rapidly vibrating in zero-gravity. Contained in a
            //<-final
        }
    }
}

function getRandom()
{
    var a = Math.random();
    a = a*2-1;
    return a;
}