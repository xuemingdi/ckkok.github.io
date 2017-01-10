var isplay = true;      //is playing?
var state = 2;          //0:gas, 1:liquid, 2:solid
var gas, liquid, solid, instruction, pause, playbtn; //buttons
var gas_active, liquid_active, instruction_active, pause_active, playbtn_active;    //active buttons
var isinstruction;      //instruction opened?
var heatcool;           //heating: 0/cooling: 1
var reset;


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
        {name: 'instruction_active', src: 'img/new_instruction-main.png'},
        {name: 'gas', src: 'img/btn_gas.png'},
        {name: 'gas_active', src: 'img/btn_gas_active.png'},
        {name: 'liquid', src: 'img/btn_liquid.png'},
        {name: 'liquid_active', src: 'img/btn_liquid_active.png'},
        {name: 'solid', src: 'img/btn_solid.png'},
        {name: 'solid_active', src: 'img/btn_solid_active.png'},
        {name: 'title_states', src: 'img/title_SOM.png'} //Nikitha 7/10
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

            var title_states = new bGUI.GUIPanel('title_states', assets['title_states'], null, gui);
            title_states.relativePosition(new BABYLON.Vector3(0.9, 0.20, 0)); //Nikitha 7/10

            isinstruction = false;
            instruction_active = new bGUI.GUIPanel('instruction_active', assets['instruction_active'], null, gui);
            instruction_active.relativePosition(new BABYLON.Vector3(0.5, 0.5, 0));
            instruction_active.onClick = function () {
                isinstruction = !isinstruction;
                instruction_active.setVisible(false);
            };

            instruction_active.setVisible(false);

            instruction = new bGUI.GUIPanel('instruction', assets['instruction'], null, gui);
            // instruction.relativePosition(new BABYLON.Vector3(0.1, 0.15, 0));0.3, 0
            instruction.relativePosition(new BABYLON.Vector3(0.1, 0.5, 0));
            instruction.enableClick = false;
            instruction.onClick = function () {
                isinstruction = !isinstruction;
                instruction_active.setVisible(isinstruction);
            };

            gas = new bGUI.GUIPanel('gas', assets['gas'], null, gui);
            gas.relativePosition(new BABYLON.Vector3(0.9, 0.3, 0));
            gas.setVisible(true);

            gas.onClick = onGas;

            gas_active = new bGUI.GUIPanel('gas_active', assets['gas_active'], null, gui);
            gas_active.relativePosition(new BABYLON.Vector3(0.9, 0.3, 0));
            gas_active.setVisible(false);

            liquid = new bGUI.GUIPanel('liquid', assets['liquid'], null, gui);
            liquid.relativePosition(new BABYLON.Vector3(0.9, 0.4, 0));
            liquid.setVisible(true);
            liquid.onClick = onLiquid;

            liquid_active = new bGUI.GUIPanel('liquid_active', assets['liquid_active'], null, gui);
            liquid_active.relativePosition(new BABYLON.Vector3(0.9, 0.4, 0));
            liquid_active.setVisible(false);

            solid = new bGUI.GUIPanel('solid', assets['solid'], null, gui);
            solid.relativePosition(new BABYLON.Vector3(0.9, 0.5, 0));
            solid.setVisible(false);
            solid.onClick = onSolid;

            solid_active = new bGUI.GUIPanel('solid_active', assets['solid_active'], null, gui);
            solid_active.relativePosition(new BABYLON.Vector3(0.9, 0.5, 0));
            solid_active.setVisible(true);

            function onGas() {
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

                heatcool = -1;
            };

            function onLiquid() {
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

                heatcool = -1;
            };

            function onSolid() {
                power = 0.01;
                state = 2;
                points = [];
                temprature = 0;
                gas.setVisible(true);
                gas_active.setVisible(false);
                liquid.setVisible(true);
                liquid_active.setVisible(false);
                solid.setVisible(false);
                solid_active.setVisible(true);
                pos = 1.97;
                heatcool = -1;

                var index = 0;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0 ; j < 5; j++) {
                        for (var k = 0; k < 5 ;k++) {
                            particles[index].dispose(); // delete
                            particles[index] = BABYLON.Mesh.CreateSphere('particles'+index, 25, 0.50, scene); //re-create
                            particles[index].position.y = (i * 0.5) + 2.12; // do not 'drop' from a great height
                            particles[index].position.x = (j * 0.5) - 1.2;  // nice and square
                            particles[index].position.z = (k * 0.5) - 1.2;  // nice and square
                            particles[index].checkCollisions = true;        // 'bounce'
                            particles[index].material = spheremat;          // beauty
                            particles[index].setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {mass: 0.001}); // weight
                            index++;
                        }
                    }
                }

                setted = false; // bang it up
            };

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
