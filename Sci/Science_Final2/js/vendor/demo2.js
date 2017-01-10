var isplay = true;      //is playing?
var state = 0;          //0:gas, 1:liquid, 2:solid
var gas, liquid, solid, instruction, pause, playbtn; //buttons
var gas_active, liquid_active, instruction_active, pause_active, playbtn_active;    //active buttons
var isinstruction;      //instruction opened?
var timelab;            //time label
var heatcool;           //heating: 0/cooling: 1
var delta;              //delta value
var tmptemp;
var temprature;         //current temprature
var points;             //points
var reset;              //reset button
var solidflag;          //solid hot flag
var ac;                 //red, green, blue
var pos = 1.755;
var min1 = [], min2 = [], sec1 = [], sec2 = [], mili1=[], mili2=[];     //min:sec
var dispImg = false; //Nikitha
var stateChanged = false; //Nikitha

// graph
var graph = null;
var SOLID_BTN_STATE = 0;
var LIQUID_BTN_STATE = 1;
var GAS_BTN_STATE = 2;
// save button states before hiding them
var save_active_state_select_btn = SOLID_BTN_STATE;


function PointA(x, y)       //Point class
{
    this.x = x;
    this.y = y;
};

var clickobj = {
    constructor: CreatePhysicsScene,
    onload: function (scene) {
        createGUI(scene);
    }
};



function createGUI(scene) {
    delta = 0;
    temprature = 0;
    tmptemp = 0;
    points = [];
    heatcool = -1;           //heating material state
    reset = false;
    solidflag = false;
    ac = 1;

    var assets = [];
    var loader = new BABYLON.AssetsManager(scene);
    var toLoad = [
        {name: 'instruction', src: 'img/btn_instruction.png'},
        {name: 'instruction_active', src: 'img/new_instruction-cool.png'},
        {name: 'title', src: 'img/title.png'},
        {name: 'gas', src: 'img/btn_gas.png'},
        {name: 'gas_active', src: 'img/btn_gas_active.png'},
        {name: 'liquid', src: 'img/btn_liquid.png'},
        {name: 'liquid_active', src: 'img/btn_liquid_active.png'},
        {name: 'solid', src: 'img/btn_solid.png'},
        {name: 'solid_active', src: 'img/btn_solid_active.png'},
        {name: 'bgtime', src: 'img/bg_time.png'},
        {name: 'timetitle', src: 'img/title_time.png'},
        {name: 'graphtitle', src: 'img/title_graph.png'},
        {name: 'coldplate_off', src: 'img/btn_hotplate_off.png'},
        {name: 'coldplate_on', src: 'img/btn_hotplate_on.png'},
        {name: 'btnprev', src: 'img/btn_prev.png'},
        {name: 'reset_btn', src: 'img/reset_btn.png'},
        {name:'title_cooling', src:'img/title_cooling.png'},
    ];

    toLoad.forEach(function (obj) {
        var img = loader.addTextureTask(obj.name, obj.src);
        img.onSuccess = function (t) {
            assets[t.name] = t.texture;
        }
    });

    loader.onFinish = function () {
        setTimeout(function () {

            var gui = new bGUI.GUISystem(scene, engine.getRenderWidth(), engine.getRenderHeight());
            gui.enableClick();

            var title_cooling = new bGUI.GUIPanel('title_cooling', assets['title_cooling'], null, gui);
            title_cooling.relativePosition(new BABYLON.Vector3(0.50, 0.90, 0));

            isinstruction = false;
            instruction_active = new bGUI.GUIPanel('instruction_active', assets['instruction_active'], null, gui);
            instruction_active.relativePosition(new BABYLON.Vector3(0.5, 0.5, 0));
            instruction_active.onClick = function () {
                isinstruction = !isinstruction;
                instruction_active.setVisible(false);
            };

            instruction_active.setVisible(false);

            instruction = new bGUI.GUIPanel('instruction', assets['instruction'], null, gui);
            instruction.relativePosition(new BABYLON.Vector3(0.1, 0.15, 0));
            instruction.enableClick = false;
            instruction.onClick = function () {
                isinstruction = !isinstruction;
                instruction_active.setVisible(isinstruction);
            };

            var resetbtn = new bGUI.GUIPanel('reset_btn', assets['reset_btn'], null, gui);
            resetbtn.relativePosition(new BABYLON.Vector3(0.1, 0.51, 0));
            resetbtn.setVisible(true);
            resetbtn.onClick = function () {
                //
                // Reverse any gravity changes that may have been made by Sim or onGas()
                //
                scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));

                reset = true;
                switch (state) {
                    case 0:
                        power = 3;
                        onGas();
                        break;
                    case 1:
                        power = 0.5;
                        onLiquid();
                        break;
                    case 2:
                        power = 0.01;
                        onSolid();
                        break;
                }
                points = [];
                temprature = 0;
                setted = false;

                heatcool = -1;
            }

            gas = new bGUI.GUIPanel('gas', assets['gas'], null, gui);
            gas.relativePosition(new BABYLON.Vector3(0.9, 0.3, 0));
            gas.setVisible(false);

            gas.onClick = onGas;

            gas_active = new bGUI.GUIPanel('gas_active', assets['gas_active'], null, gui);
            gas_active.relativePosition(new BABYLON.Vector3(0.9, 0.3, 0));
            gas_active.setVisible(true);

            liquid = new bGUI.GUIPanel('liquid', assets['liquid'], null, gui);
            liquid.relativePosition(new BABYLON.Vector3(0.9, 0.4, 0));
            liquid.setVisible(true);
            liquid.onClick = onLiquid;

            liquid_active = new bGUI.GUIPanel('liquid_active', assets['liquid_active'], null, gui);
            liquid_active.relativePosition(new BABYLON.Vector3(0.9, 0.4, 0));
            liquid_active.setVisible(false);

            solid = new bGUI.GUIPanel('solid', assets['solid'], null, gui);
            solid.relativePosition(new BABYLON.Vector3(0.9, 0.5, 0));
            solid.setVisible(true);
            solid.onClick = onSolid;

            solid_active = new bGUI.GUIPanel('solid_active', assets['solid_active'], null, gui);
            solid_active.relativePosition(new BABYLON.Vector3(0.9, 0.5, 0));
            solid_active.setVisible(false);

            function onGas() {
                doneFirstOn = false;
				stateChanged = true; //Nikitha
                //
                // Reduce some gravity here. Currently at -Y 9.81 m/s/s -> 5.00 m/s/s
                //
                scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-7.00,0));

                power = 1.65;
                state = 0;
                points = [];
                temprature = 0;
                gas.setVisible(false);
                gas_active.setVisible(true);
                liquid.setVisible(true);
                liquid_active.setVisible(false);
                solid.setVisible(true);
                solid_active.setVisible(false);

                var index = 0;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0 ; j < 5; j++) {
                        for (var k = 0; k < 5 ;k++) {
                            particles[i].physicsImpostor.setMass(0.000);
                            particles[index].position.y = (i * 0.5) + 2.6;
                            particles[index].position.x = (j * 0.5) - 1.2;
                            particles[index].position.z = (k * 0.5) - 1.2;
                            particles[i].physicsImpostor.setMass(0.001);
                            index++;
                        }
                    }
                }

                setted = false;
                pos = 10;

				title_cooling.mesh.isVisible = true;
				
                heatcool = -1;
            };

            function onLiquid() {
                doneFirstOn = false;
				stateChanged = true; //Nikitha
                //
                // Reverse any gravity changes that may have been made
                //
                scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));

                power = 0.40;
                state = 1;
                points = [];
                temprature = 0;
                gas.setVisible(true);
                gas_active.setVisible(false);
                liquid.setVisible(false);
                liquid_active.setVisible(true);
                solid.setVisible(true);
                solid_active.setVisible(false);

                var index = 0;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0 ; j < 5; j++) {
                        for (var k = 0; k < 5 ;k++) {
                            particles[i].physicsImpostor.setMass(0.000);
                            particles[index].position.y = (i * 0.5) + 2.6;
                            particles[index].position.x = (j * 0.5) - 1.2;
                            particles[index].position.z = (k * 0.5) - 1.2;
                            particles[i].physicsImpostor.setMass(0.001);
                            index++;
                        }
                    }
                }

                setted = false;
                pos = 10;

				title_cooling.mesh.isVisible = true;
				
                heatcool = -1;
            };

            function onSolid() {
                doneFirstOn = false;
				stateChanged = true; //Nikitha
                //
                // Reverse any gravity changes that may have been made
                //
                // scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));

                //gfp->
                // power = 0.01;
                power = 0.03;
                //<-gfp
                state = 2;
                points = [];
                temprature = 0;
                gas.setVisible(true);
                gas_active.setVisible(false);
                liquid.setVisible(true);
                liquid_active.setVisible(false);
                solid.setVisible(false);
                solid_active.setVisible(true);

                var index = 0;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0 ; j < 5; j++) {
                        for (var k = 0; k < 5 ;k++) {
                            particles[index].dispose();
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

                setted = false;

				title_cooling.mesh.isVisible = true;
				
                pos = 1.97;
                heatcool = -1;
            };


            //hot on/off
            var hoton = new bGUI.GUIPanel('hoton', assets['coldplate_on'], null, gui);
            hoton.relativePosition(new BABYLON.Vector3(0.5, 0.562, 0));
            hoton.onClick = onHoton;
            hoton.setVisible(false);

            function onHoton() {
                paused = true;
				dispImg = false; //Nikitha
                //gfp->
                // //
                // // Reverse any gravity changes that may have been made during the sim
                // //
                // scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-9.81,0));
                //
                // topFlowCollider.position = new BABYLON.Vector3(0,7,0);
                //<-gfp

                //
                // Dispose old graph and all line segments within it
                //
                if (graph) {
                    graph.dispose();
                    graph = null;
                }

                //
                // Revert UI and buttons
                //
                if (save_active_state_select_btn == SOLID_BTN_STATE) {
                    solid_active.mesh.isVisible = true;
                    solid.mesh.isVisible = false;
                    //
                    liquid_active.mesh.isVisible = false;
                    liquid.mesh.isVisible = true;
                    //
                    gas_active.mesh.isVisible = false;
                    gas.mesh.isVisible = true;
                    //
                } else if (save_active_state_select_btn == LIQUID_BTN_STATE) {
                    liquid_active.mesh.isVisible = true;
                    liquid.mesh.isVisible = false;
                    //
                    solid_active.mesh.isVisible = false;
                    solid.mesh.isVisible = true;
                    //
                    gas_active.mesh.isVisible = false;
                    gas.mesh.isVisible = true;
                    //
                } else if (save_active_state_select_btn == GAS_BTN_STATE) {
                    gas_active.mesh.isVisible = true;
                    gas.mesh.isVisible = false;
                    //
                    liquid_active.mesh.isVisible = false;
                    liquid.mesh.isVisible = true;
                    //
                    solid_active.mesh.isVisible = false;
                    solid.mesh.isVisible = true;
                    //
                } else {
                    throw new Exception("BAD SAVED BUTTON STATE");
                }
                instruction.mesh.isVisible = true;
                resetbtn.mesh.isVisible = true;
                title_cooling.mesh.isVisible = false;

                heatcool = 0;               // Heating loop enabled
                hotoff.setVisible(true);
                hoton.setVisible(false);
            }

            var hotoff = new bGUI.GUIPanel('hoton', assets['coldplate_off'], null, gui);
            hotoff.relativePosition(new BABYLON.Vector3(0.5, 0.562, 0));
            hotoff.onClick = onHotoff;

            function onHotoff() {
                paused = false;
				dispImg = true; //Nikitha
                var graph_start;
                var graph_width;
                var graph_height;

                //
                // Set up for graph parameters for the simulation
                //
                // Reset 'power' to default energy level for the state
                //
                switch (state) {
                    case 0:
                        graph_width = 610;
                        graph_height = 280;
                        graph_start = gg.START_GAS;
                        if(!doneFirstOn)
                        {
                            onGas();
                            power = 2.5;
                        }
                        
                        scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,-7,0)); // Low gravity shows more like gas - it's a cheat
                        break;
                    case 1:
                        graph_width = 260;
                        graph_height = 280;
                        graph_start = gg.START_LIQUID;
                        if(!doneFirstOn)
                        {
                            onLiquid();
                            power = 1.0;
                        }
                        ;
                        break;
                    case 2:
                        graph_width = 160;//310;
                        graph_height = 280;
                        graph_start = gg.START_SOLID;
                        if(!doneFirstOn)
                        {
                            onSolid();
                            power = 0.3;
                        }
                        
                        // power = 0.01;
                        scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0,0,0));
                        break;
                }

                //
                // Save current buttons state (on/off)
                //
                if (solid_active.mesh.isVisible) {
                    save_active_state_select_btn = SOLID_BTN_STATE;
                } else if (liquid_active.mesh.isVisible) {
                    save_active_state_select_btn = LIQUID_BTN_STATE;
                } else if (gas_active.mesh.isVisible) {
                    save_active_state_select_btn = GAS_BTN_STATE;
                } else {
                    throw new Exception("BAD BUTTON STATE");
                }

                //
                // Set UI state for simulation without buttons visible
                //
                title_cooling.mesh.isVisible = false;
                solid.mesh.isVisible = false;
                solid_active.mesh.isVisible = false;
                liquid.mesh.isVisible = false;
                liquid_active.mesh.isVisible = false;
                gas.mesh.isVisible = false;
                gas_active.mesh.isVisible = false;
                resetbtn.mesh.isVisible = false;
                instruction.mesh.isVisible = false;

                //
                // Create the graph for the simulation
                //
                if (!graph) {
					// --> Nikitha 10/10
                   /* graph = new gg.Graph(scene, {
                        type: gg.COOLING,
                        start: graph_start,
                        width: graph_width,
                        height: graph_height,
                        world_position: new BABYLON.Vector3(0, -210, 0),
                        startX: 5,
                        startY: 5
                    });*/
					// <-- Nikitha 10/10
                }

                //
                // Set up sim sequence for 'state transition' interludes and solid/liquid special treatment
                //
                 if(!doneFirstOn){
                     transitionLiquidToSolidPerformed = false;
                transitionGasToLiquidPerformed = false;
                transitionLiquidToSolidCounter = 0;
                transitionGasToLiquidCounter = 0;
                lowered_top_flow_collider_for_solid_sim = false;
                switched_off_flow_colliders_for_solid_sim = false;
                bounced_for_solid_sim = false;
                //
                sim_finished = false;
                }
                
                

                heatcool = 1;                   // Cooling enabled
                hotoff.setVisible(false);
                hoton.setVisible(true);
                
                doneFirstOn = true;
            }

            //
            // -- resize window for the first time
            // -- gf:see if we can dispose of this?
            // --
            //
            var newWidth = window.innerWidth;
            var newHeight = window.innerHeight;
            var newWidthToHeight = newWidth / newHeight;
            if (newWidthToHeight > widthToHeight) {
                if (newHeight > 720)
                    newHeight = 720;
                newWidth = newHeight * widthToHeight;
                if (newWidth > 1280)
                    newWidth = 1280;
                canvas.height = newHeight;
                canvas.width = newWidth;

            } else {
                if (newWidth > 1280)
                    newWidth = 1280;
                newHeight = newWidth / widthToHeight;
                if (newHeight > 720)
                    newHeight = 720;
                canvas.width = newWidth;
                canvas.height = newHeight;
            }
            //
            // After all scene in place
            //
            gui.updateCamera();
            //
        }, 10);
    };
    loader.load();
}
