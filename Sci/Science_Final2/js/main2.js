
/*
 *
 * main2.js -- Cooling
 *
 */
var paused = false;
var doneFirstOn = false;
var particles = [];         //particles
var tmp_particle = [];      //tmp particle positions
var spheremat;              //particle material
var nonemat;                //unvisible material
var total = 75;            //number of particles .. 3 rows of 5x5
var sim_finished = false;
var transitionLiquidToSolidPerformed = false;
var transitionGasToLiquidPerformed = false;
var transitionLiquidToSolidCounter = 0;
var transitionGasToLiquidCounter = 0;
var lowered_top_flow_collider_for_solid_sim = false;
var switched_off_flow_colliders_for_solid_sim = false;
var bounced_for_solid_sim = false;

var power = 0.01;           //particle's power

var biker;                  //biker
var bottombox;              //bottom
var cover;                  //cover
var hitmater;               //hitmater
var hitma;                  //hitmaterial
var flowCollider = [];      //flow colliders
var topFlowCollider;        //top of solid flow collider
var setted = false;         //mode set one time


// --> Nikitha 10/10 
var graphDrawn = false; //check if the graph has already been drawn
var graph_img_mask; //the mask on the graph image
var graph_img_mask_mat; //the material for the mask
var graph_img; //the graph image
var graph_img_mat; //CK
var graph_textures_init = false; //CK
var graph_img_mat_texture = []; //CK
var graph_img_mask_mat_init = false; //CK

var textgraph_img;
var textgraph_img_mat;
var textgraph_img_init = false; //CK
var textgraph_img_mat_texture = []; //CK
var graphtext_img;
var graphtext_width;
var graphtext_count=0;
var graphtext2_count=0;


var currentTotalGraphWidth = 13.64; //the total width of the image
var currentTotalGraphHeight = 7.0; //the total height of the image
var yPosForGraph = -5.5; //the Y position of the graph image

var currentTotalMaskWidth = 11.9; //the total width of the image
var currentTotalMaskHeight = 5.33; //the total height of the image
var yPosForMask = -5.5; //the Y position of the graph image
var zPosForMask = 0.001; //the Z position of the graph image

var depthForMask = 3;
var variableCheck = 0;
var updatedWidth=0;

// <-- Nikitha 10/10 


var CreatePhysicsScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
	console.log("createphysicsscene called");
    scene.clearColor = new BABYLON.Color3(30, 30, 30);

    var camera = new BABYLON.DeviceOrientationCamera("FreeCamera", new BABYLON.Vector3(11, 8, 11), scene);
    camera.lockedTarget = BABYLON.Vector3.Zero();

    //DEBUG->
    // scene.debugLayer.show();
    //<-DEBUG

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
	backmat.diffuseTexture.hasAlpha = true;
    backmat.diffuseTexture.uScale = 2;
    backmat.diffuseTexture.vScale = 2;
    back.material = backmat;

	
	// --> Nikitha 07/10
	if(!graphDrawn)
	{
		graphDrawn = true;
		console.log("graph init");
		graph_img = BABYLON.Mesh.CreateGround("graph_img", currentTotalGraphWidth, currentTotalGraphHeight,2, scene);
		graph_img.rotation.x = Math.PI/3;  
		graph_img.rotation.y = Math.PI/4;    
		graph_img.rotation.z = 0; 
		
		graph_img.position.z = 0;
		graph_img.position.y = yPosForGraph;
		graph_img.position.x = 0;
		
		graph_img_mat = new BABYLON.StandardMaterial('graph_img_texture', scene);
		graph_img_mat.diffuseTexture = new BABYLON.Texture('img/initial.png', scene);
		graph_img_mat.diffuseTexture.hasAlpha = true;
		graph_img_mat.diffuseTexture.uScale = 1;
		graph_img_mat.diffuseTexture.vScale = 1;
		
		graph_img.material = graph_img_mat;
		
		textgraph_img = BABYLON.Mesh.CreateGround("textgraph_img", currentTotalGraphWidth, currentTotalGraphHeight,2, scene);
		textgraph_img.rotation.x = Math.PI/3;  
		textgraph_img.rotation.y = Math.PI/4;    
		textgraph_img.rotation.z = 0; 
			
		textgraph_img.position.z = 0;
		textgraph_img.position.y = yPosForGraph;
		textgraph_img.position.x = 0;
			
		textgraph_img_mat = new BABYLON.StandardMaterial('textgraph_img_texture', scene);
		textgraph_img_mat.diffuseTexture = new BABYLON.Texture('img/initial.png', scene);
		textgraph_img_mat.diffuseTexture.hasAlpha = true;
		textgraph_img_mat.diffuseTexture.uScale = 1;
		textgraph_img_mat.diffuseTexture.vScale = 1;
		textgraph_img.material = textgraph_img_mat;
		
		graph_img_mask = BABYLON.Mesh.CreateGround("graph_img_mask", currentTotalMaskWidth, currentTotalMaskHeight,depthForMask, scene);//size of the image
		graph_img_mask.rotation.x = Math.PI/3;    // 180
		graph_img_mask.rotation.y = Math.PI/4;    // 90
		graph_img_mask.rotation.z = 0;    // 180
	   
		graph_img_mask.position.z = zPosForMask;
		graph_img_mask.position.y = yPosForMask;
		graph_img_mask.position.x = 0;
			
		graph_img_mask_mat = new BABYLON.StandardMaterial('graph_img_mask_texture', scene);
		graph_img_mask_mat.diffuseTexture = new BABYLON.Texture('img/newMask.png', scene);
		graph_img_mask_mat.diffuseTexture.uScale = 1;
		graph_img_mask_mat.diffuseTexture.vScale = 1;
		graph_img_mask.material = graph_img_mask_mat;
	}
	// <-- Nikitha 07/10
	
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

    //--- cool material
    coolma = new BABYLON.StandardMaterial('wallMat', scene);
    coolma.alpha = 0.8;
    coolma.diffuseColor = new BABYLON.Color3(0, 0, 0.8);
    coolma.backFaceCulling = false;

    coolmater = new BABYLON.Mesh.CreateCylinder("cylinder", 0.4, 5, 5, 36, 36, scene, false);
    coolmater.position = new BABYLON.Vector3(0, 1.655, 0);
    coolmater.material = coolma;

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
    flowcolmat.alpha = 0.0; //0.2;
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
    topflowcolmat.alpha = 0.0; //0.3;
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
            case -1:
                coolmater.material = nonemat;
                break;
            case 1:
                coolmater.material = coolma; // show blue
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
                            topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);
                            break;
                        case 1:
                            cnt = 0;
                            for (var al = 0; al < 2 * Math.PI; al += Math.PI / 2) {
                                flowCollider[cnt].position = new BABYLON.Vector3(10 * Math.sin(al), 3.5, 10 * Math.cos(al));
                                cnt++;
                            }
                            topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);
                            break;
                        case 2:
                            pos = 2.0;
                            cnt = 0;
                            for (var al = 0; al < 2 * Math.PI; al += Math.PI / 2) {
                                flowCollider[cnt].position = new BABYLON.Vector3(pos * Math.sin(al), 3.5, pos * Math.cos(al));
                                cnt++;
                            }
                            topFlowCollider.position = new BABYLON.Vector3(0, 7, 0);
                            break;
                    }
                }
            }

            if (heatcool == 1) {
                // bring down the top flow collider to restrict upward ball vectors
                if (power <= 0.53) {
                    if (!lowered_top_flow_collider_for_solid_sim) {
                        // console.log("lowering top collider", pos, power);
                        topFlowCollider.position = new BABYLON.Vector3(0, 3.9, 0);
                        lowered_top_flow_collider_for_solid_sim = true;
                    }
                }
            }
        }
    }, 30);

    return scene;
};

// --> Nikitha 10/10
function updateGraphMask(newVal)
{
		if(dispImg == false)
		{
			graph_img_mask.dispose();
			graph_img_mask_mat.dispose();
			graph_img.isVisible = false;
			textgraph_img.dispose();
			textgraph_img_mat.dispose();
			graphtext_count =0;
			graphtext2_count =0;
		}
		else if(dispImg == true)
		{
			var originalWidth = currentTotalMaskWidth;
			updatedWidth=updatedWidth-0.00002;
			newVal=updatedWidth;
			var newWidth = newVal;
			graphtext_width = newVal;
			graph_img.isVisible = true;
			if(newWidth>0 || newWidth <= currentTotalMaskWidth)
			{
				graph_img_mask.dispose();
								
				graph_img_mask = BABYLON.Mesh.CreateGround("graph_img_mask", newWidth, currentTotalMaskHeight,depthForMask, scene);//size of the image
				graph_img_mask.rotation.x = Math.PI/3;    // 180
				graph_img_mask.rotation.y = Math.PI/4;    // 90
				graph_img_mask.rotation.z = 0;    // 180
			   
				graph_img_mask.position.z = zPosForMask;
				graph_img_mask.position.y = yPosForMask;
				graph_img_mask.position.x = 0;
				
				graph_img_mask.setPivotMatrix(BABYLON.Matrix.Translation(-(originalWidth-newWidth)/2.0, 0, 0));
				if (graph_img_mask_mat_init) {
				} else {
					graph_img_mask_mat_init = true;
					graph_img_mask_mat = new BABYLON.StandardMaterial('graph_img_mask_texture', scene);
					graph_img_mask_mat.diffuseTexture = new BABYLON.Texture('img/newMask.png', scene);
					//console.log("graph_img_mask_mat_init");
				}
				graph_img_mask_mat.diffuseTexture.uScale = 1;
				graph_img_mask_mat.diffuseTexture.vScale = 1;
				graph_img_mask.material = graph_img_mask_mat;
				//graph_img_mask.setPivotMatrix(BABYLON.Matrix.Translation(-(originalWidth-newWidth)/2.0, 0, 0));
			}
	
			if(newWidth==0)
			{
				graph_img_mask.dispose();
				graph_img_mask_mat.dispose();
				
			}
			
			switch(state)
			{
				case 1: 
						if(graphtext_width<4.8 && graphtext_count == 0)
							{
								if(variableCheck!=1)
									drawStates();
								else
									variableCheck = 1;
							}
				
						if(graphtext_width<2.6 && graphtext_count == 1)
							{
								if(variableCheck!=3)
									drawStates();
								else
									variableCheck = 3;
							}
				
						if(graphtext_width<1.6 && graphtext_count == 2)
							{
								if(variableCheck!=5)
									drawStates();
								else
									variableCheck = 5;
							}
	
				
						break;
				case 0: 
						if(graphtext_width<11.9 && graphtext_count == 0)
							{
								if(variableCheck!=6)
									drawStates();
								else
									variableCheck = 6;
							}
							
						if(graphtext_width<5.9 && graphtext_count == 1)
							{
								if(variableCheck!=8)
									drawStates();
								else
									variableCheck = 8;
							}
							
						if(graphtext_width<4.9 && graphtext_count == 2)
							{
								if(variableCheck!=10)
									drawStates();
								else
									variableCheck = 10;
							}
							
						if(graphtext_width<2.7 && graphtext_count == 3)
							{
								if(variableCheck!=12)
									drawStates();
								else
									variableCheck = 12;
							}
						
						if(graphtext_width<1.6 && graphtext_count == 4)
							{
								if(variableCheck!=14)
									drawStates();
								else
									variableCheck = 14;
							}
						break;
			}
		}
}
// <-- Nikitha 10/10

function drawStates()
{		
			if (textgraph_img_init) {
			} else {
				textgraph_img_init = true;
				
				textgraph_img_mat_texture[0] = new BABYLON.Texture('img/CL-1-02.png', scene);
				textgraph_img_mat_texture[1] = new BABYLON.Texture('img/CL-2-02.png', scene);
				textgraph_img_mat_texture[2] = new BABYLON.Texture('img/CL-3-02.png', scene);
				textgraph_img_mat_texture[3] = new BABYLON.Texture('img/CG-1-01.png', scene);
				textgraph_img_mat_texture[4] = new BABYLON.Texture('img/CG-2-01.png', scene);
				textgraph_img_mat_texture[5] = new BABYLON.Texture('img/CG-3-01.png', scene);
				textgraph_img_mat_texture[6] = new BABYLON.Texture('img/CG-4-01.png', scene);
				textgraph_img_mat_texture[7] = new BABYLON.Texture('img/CG-5-01.png', scene);
				console.log("textgraph initialized");
			};

			textgraph_img.dispose();
			textgraph_img = BABYLON.Mesh.CreateGround("textgraph_img", currentTotalGraphWidth, currentTotalGraphHeight,2, scene);
			textgraph_img.rotation.x = Math.PI/3;  
			textgraph_img.rotation.y = Math.PI/4;    
			textgraph_img.rotation.z = 0; 
			
			textgraph_img.position.z = 0;
			textgraph_img.position.y = -5.3;
			textgraph_img.position.x = 0.1;
			
			textgraph_img_mat = new BABYLON.StandardMaterial('textgraph_img_texture', scene);
			
			switch(state)
			{
				case 1: 
						if(graphtext_width>=4.6 && graphtext_width<4.8)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[0];
							graphtext_count ++;
						}
						
						if(graphtext_width>=2.4 && graphtext_width<2.6)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[1];
							graphtext_count ++;
						}
						
						if(graphtext_width>=1.4 && graphtext_width<1.6)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[2];
							graphtext_count ++;
						}
						textgraph_img_mat.diffuseTexture.hasAlpha = true;
						textgraph_img_mat.diffuseTexture.uScale = 1;
						textgraph_img_mat.diffuseTexture.vScale = 1;
						textgraph_img.material = textgraph_img_mat;
						break;
						
				case 0: 
						if(graphtext_width>=11.7 && graphtext_width<11.9)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[3];
							graphtext_count ++;
						}
						
						if(graphtext_width>=5.7 && graphtext_width<5.9)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[4];
							graphtext_count ++;
						}
						
						if(graphtext_width>=4.7 && graphtext_width<4.9)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[5];
							graphtext_count ++;
						}
						
						if(graphtext_width>=2.5 && graphtext_width<2.7)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[6];
							graphtext_count ++;
						}
						
						if(graphtext_width>=1.4 && graphtext_width<1.6)
						{
							textgraph_img_mat.diffuseTexture = textgraph_img_mat_texture[7];
							graphtext_count ++;
						}
										
						textgraph_img_mat.diffuseTexture.hasAlpha = true;
						textgraph_img_mat.diffuseTexture.uScale = 1;
						textgraph_img_mat.diffuseTexture.vScale = 1;
						textgraph_img.material = textgraph_img_mat;
						break;
			}
}

function updateMovement()
{
	// --> Nikitha 07/10
	if(stateChanged == true && dispImg == true)
	{
		stateChanged = false;
		graphDrawn = false;
		
		switch(state)
		{
			case 0:
			//GAS
			currentTotalGraphWidth = 13.64; //the total width of the image
			currentTotalGraphHeight = 7.0; //the total height of the image
			yPosForGraph = -5.5; //the Y position of the graph image

			currentTotalMaskWidth = 11.9; //the total width of the image
			currentTotalMaskHeight = 5.33; //the total height of the image
			yPosForMask = -5.5; //the Y position of the graph image
			zPosForMask = 0.001; //the Z position of the graph image
			updatedWidth=11.9;
			break;
			
			case 1: 
			//LIQUID
			currentTotalGraphWidth = 6.45; //the total width of the image
			currentTotalGraphHeight = 7.0; //the total height of the image
			yPosForGraph = -5.5; //the Y position of the graph image

			currentTotalMaskWidth = 4.8; //the total width of the image
			currentTotalMaskHeight = 5.20; //the total height of the image
			yPosForMask = -5.5; //the Y position of the graph image
			zPosForMask = 0.001; //the Z position of the graph image
			updatedWidth=4.8;
			break;
			
			case 2: 
			//SOLID
			currentTotalGraphWidth = 3.96; //the total width of the image
			currentTotalGraphHeight = 7.0; //the total height of the image
			yPosForGraph = -5.5; //the Y position of the graph image

			currentTotalMaskWidth = 2.25; //the total width of the image
			currentTotalMaskHeight = 4.2; //the total height of the image
			yPosForMask = -5.5; //the Y position of the graph image
			zPosForMask = 0.001; //the Z position of the graph image
			updatedWidth=2.25;
			break;
		}
		
		if(!graphDrawn)
		{
			graphDrawn = true;
			
			graph_img.dispose();
			graph_img = BABYLON.Mesh.CreateGround("graph_img", currentTotalGraphWidth, currentTotalGraphHeight,2, scene);
			graph_img.rotation.x = Math.PI/3;  
			graph_img.rotation.y = Math.PI/4;    
			graph_img.rotation.z = 0; 
			
			graph_img.position.z = 0;
			graph_img.position.y = yPosForGraph;
			graph_img.position.x = 0;
			graph_img_mat.dispose(); //CK
			graph_img_mat = new BABYLON.StandardMaterial('graph_img_texture', scene);
			switch(state)
			{
				case 0: graph_img_mat.diffuseTexture = new BABYLON.Texture('img/C-gas0.png', scene);
				break;
				case 1: graph_img_mat.diffuseTexture = new BABYLON.Texture('img/C-liquid0.png', scene);
				break;
				case 2: graph_img_mat.diffuseTexture = new BABYLON.Texture('img/C-solid0.png', scene);
				break;
			}

			graph_img_mat.diffuseTexture.uScale = 1;
			graph_img_mat.diffuseTexture.vScale = 1;
			
			graph_img.material = graph_img_mat;
			graph_img_mask_mat.diffuseTexture.dispose();
            graph_img_mask_mat.dispose();
			graph_img_mask.dispose();
			
			graph_img_mask = BABYLON.Mesh.CreateGround("graph_img_mask", currentTotalMaskWidth, currentTotalMaskHeight,depthForMask, scene);//size of the image
			graph_img_mask.rotation.x = Math.PI/3;    // 180
			graph_img_mask.rotation.y = Math.PI/4;    // 90
			graph_img_mask.rotation.z = 0;    // 180
		   
			graph_img_mask.position.z = zPosForMask;
			graph_img_mask.position.y = yPosForMask;
			graph_img_mask.position.x = 0;
				
			graph_img_mask_mat = new BABYLON.StandardMaterial('graph_img_mask_texture', scene);
			graph_img_mask_mat.diffuseTexture = new BABYLON.Texture('img/newMask.png', scene);
			graph_img_mask_mat.diffuseTexture.uScale = 1;
			graph_img_mask_mat.diffuseTexture.vScale = 1;
			graph_img_mask.material = graph_img_mask_mat;
		}
	}
    
    if(stateChanged){  
			graph_img_mask_mat.diffuseTexture.dispose();
            graph_img_mask.dispose();
			graph_img_mask_mat.dispose();
			textgraph_img.dispose();
			textgraph_img_mat.dispose();
			graphtext_count =0;
			graphtext2_count =0;
			graph_img.isVisible = false;
			variableCheck=0;
    }
	
	// <-- Nikitha 07/10
	
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
        if(isplay)
        {
			// --> Nikitha 10/10
			//console.log(power);
			var valToDeduct = 0;
			switch(state)
			{
				case 0: valToDeduct=2.5;
				break;
				case 1: valToDeduct=1.0;
				break;
				case 2: valToDeduct=0.3;
				break;
			}
			if((power)<=0.03)
			{
				updateGraphMask(0);
			}
			else if((valToDeduct-power) <= 0 && heatcool == 1)
			{
				updateGraphMask(currentTotalMaskWidth);
			}
			else
			{
				var tempWidth = currentTotalMaskWidth-(currentTotalMaskWidth*((valToDeduct-power)/(valToDeduct-0.03)));
				if(!paused) updateGraphMask(tempWidth);
			}
			// <-- Nikitha 10/10
			
			
            //--- calc power
            // if(ccc%100 == 1)     //<---------------- 100 x more updates from render() ... so we adjust the delta
            {
                if(heatcool == 1) {
                    if (power > 2.5) {
                        power = 2.5;
                        //console.log("coolinging - too high");
                    }
                    //gfp->
                    // else if (power < 0.01) {
                    //     // console.log("Sim done");
                    //     sim_finished = true;
                    //     power = 0.01;
                    // }
                    else if (power < 0.03) {
                        // console.log("Sim done");
                        sim_finished = true;
                        if (state==2) {
                            power = 0.03;
                        } else {
                            power = 0.25;
                        }
                    }
                    //<-gfp
                    else {
                        // .. match this to collider activity above
                        if ((power < 0.45) && (!transitionLiquidToSolidPerformed) && ((state == 1) || (state == 0))) {
                            if (transitionLiquidToSolidCounter==0) {
                                if (graph) {
                                    graph.dashedStateChangeIndicator(gg.TRANSITION_FREEZING);
                                }
                            }
                            transitionLiquidToSolidCounter++;
                            if ((transitionLiquidToSolidCounter > 50000)&&(!transitionLiquidToSolidPerformed)) {
                                transitionLiquidToSolidPerformed = true;
                            }
                        }

                        else if ((power < 1.0) && (!transitionGasToLiquidPerformed)  && (state == 0)) {
                            if (transitionGasToLiquidCounter==0) {
                                if (graph) {
                                    graph.dashedStateChangeIndicator(gg.TRANSITION_LIQUIFYING);
                                }
                                //
                                // Increase some gravity here. Currently at -Y 7.00 m/s/s -> 9.81 m/s/s
                                //
                                scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));
                            }
                            transitionGasToLiquidCounter++;
                            if ((transitionGasToLiquidCounter > 50000)&&(!transitionGasToLiquidPerformed)) {
                                transitionGasToLiquidPerformed = true;
                            }
                        }

                        else {
                            power -= 0.000005;
                        }
                    }

                    // console.log(power);

                    if (graph && !sim_finished) {
                        graph.update(power);
                    } else if (graph && sim_finished) {
                        graph.simFinished();
                    }
                }
                else if (heatcool == 0)
                {
//                     //gfp->
//                     //
//                     // Wind down when Sim clicked off but no energy level buttons yet pressed
//                     //
//                     if (power >= 1.0) {
//                         power = 1.0;
//                     }
//                     else if (power < 1.0  &&  power >= 0.6) {
//                         power += 0.007;
// //                    } else {
// //                        power += 0.01; // nah! .. if solid .. leave solid
//                     }
//                     //
//                     // Dont go all the way up as we do not want gas - just tail off
//                     //
//                     //<-gfp
                }
                else
                {
                    if(state == 0)
                        power = 3;
                    else if(state == 1)
                        power = 0.6;
                    else if(state == 2)
                        //gfp->
                        //power = 0.01;
                        power = 0.03;
                        //<-gfp
                }
            }
        }
    }

    if(reset)
    {
        reset = false;

        var bounceY;
        var index = 0;

        switch(state) {
            case 0:
            case 1:
                pos = 10;
                bounceY = 2.6;
                break;

            case 2:
                pos = 2.00;
                bounceY = 2.12;
                break;
        }

        for(var i = 0; i < 3; i++) {
            for (var j = 0; j < 5; j++) {
                for (var k = 0; k < 5; k++) {
                    particles[index].physicsImpostor.setMass(0.000);
                    particles[index].position.y = (i * 0.5) + bounceY;
                    particles[index].position.x = (j * 0.5) - 1.2;
                    particles[index].position.z = (k * 0.5) - 1.2;
                    particles[index].physicsImpostor.setMass(0.001);
                    index++;
                }
            }
        }
    }
}

function getRandom()
{
    var a = Math.random();
    a = a*2-1;
    return a;
}