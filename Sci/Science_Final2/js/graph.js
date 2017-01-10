/**
 * Created by Glynn on 7/16/2016.
 */

var gg = gg || {};

(function () {
    /**
     * Heating graph
     * @type {number}
     */
    gg.HEATING = 0;
    /**
     * Cooling graph
     * @type {number}
     */
    gg.COOLING = 1;

    /**
     * Starting from Solid
     * @start {number}
     */
    gg.START_SOLID = 0;
    /**
     * Starting from Liquid
     * @start {number}
     */
    gg.START_LIQUID = 1;
    /**
     * Starting from Gas
     * @start {number}
     */
    gg.START_GAS = 2;

    /**
     * Moving from Solid to Liquid
     */
    gg.TRANSITION_MELTING = 0;
    /**
     * Moving from Liquid to Gas
     */
    gg.TRANSITION_BOILING = 1;

    /**
     * Moving from Liquid to Solid
     */
    gg.TRANSITION_FREEZING = 2;
    /**
     * Moving from Gas to Liquid
     */
    gg.TRANSITION_LIQUIFYING = 3;

    var box = null;
    //
    var scene = null;
    var type;
    var start;
    var width;
    var height;
    var world_position;             // graph box world coords
    var world_originX;              // box world bottom
    var world_originY;              // box world left
    var world_originZ;              // box world depth
    var startX, startY;             // graph axes start offsets from box bottom left
    var simX, simY;                 // running X, Y offsets from sim
    var skip_draw_cnt;              // skip drawing updates counter
    var melt_txt_plane              // text box 'melting'
    var boil_txt_plane              // text box 'boiling'
    var liquify_txt_plane           // text box 'liquefying'
    var freeze_txt_plane            // text box 'freezing'
    var finished_txt_plane          // text box 'Simulation Finished'
    var shown_finished_text         // have we shown the 'Simulation Finished' text yet?
    var id;                         // line id counter ("line"+id++)
    var objects;                    // disposable line objects

    gg.Graph = function (scene, options) {
        this.scene = scene;
        this.type = options.type;
        this.start = options.start;
        this.width = options.width || 1010;
        this.height = options.height || 280;
        // World co-ordinates
        this.world_position = options.world_position || new BABYLON.Vector3(0,0,0);
        this.world_originX = this.world_position.x - Math.floor(this.width / 2);
        this.world_originY = this.world_position.y - Math.floor(this.height / 2);
        this.world_originZ = -1;
        // Relative to graph left hand cartesian co-ords
        this.startX = options.startX || 5;
        this.startY = options.startY || 5;
        //
        this.simX = 0;
        this.simY = 0;
        //
        this.skip_draw_cnt = 0;
        //
        this.melt_txt_plane = null;
        this.boil_txt_plane = null;
        this.liquify_txt_plane = null;
        this.freeze_txt_plane = null;
        this.finished_txt_plane = null;
        this.shown_finished_text = false;
        //
        this.id = 0;
        this.objects = [];

        this.init();
    };

    gg.Graph.prototype.init = function() {
        var line;
        var colors = [];
        for (var i=0;i<6;i++) {
            colors.push(new BABYLON.Color4(0.2,0.2,0.2,0.5));
        }
        // This flat box is our graph background
        this.box = BABYLON.MeshBuilder.CreateBox("graph", {
            faceColors:colors,
            width:this.width,
            height:this.height,
            depth:1
        }, this.scene);
        this.box.position = this.world_position;

        // X-axis
        var xRight = this.width - (2*this.startX);
        line = this.lineFromTo(0, 0, xRight, 0);
        this.objects.push(line);
        line = this.lineFromTo(xRight -5, 5, xRight, 0);
        this.objects.push(line);
        line = this.lineFromTo(xRight -5, -5, xRight, 0);
        this.objects.push(line);
        //
        // "Time" ->
        //
        var time_txt_plane = BABYLON.MeshBuilder.CreatePlane("time_plane", {
            width: 60,
            height: 10
        }, this.scene, false);
        time_txt_plane.material = new BABYLON.StandardMaterial("time_plane_mat", this.scene);
        time_txt_plane.position = new BABYLON.Vector3((this.width/2) - 64 , -336, -10);
        var time_txt_plane_texture = new BABYLON.DynamicTexture("time_texture", {
            width: 100,
            height: 30
        }, this.scene, true);
        time_txt_plane.material.diffuseTexture = time_txt_plane_texture;
        time_txt_plane_texture.opacity = 0.0;
        time_txt_plane_texture.drawText("Time", 10, 30, "30px verdana", "#FFFFFF", "#303030", true);
        time_txt_plane.isVisible = true;
        this.objects.push(time_txt_plane);

        // Y-axis
        var yTop = this.height - (2*this.startY)
        line = this.lineFromTo(0, 0, 0, yTop);
        this.objects.push(line);
        line = this.lineFromTo(5, yTop - 5, 0, yTop);
        this.objects.push(line);
        line = this.lineFromTo(-5, yTop - 5, 0, yTop);
        this.objects.push(line);
        //
        // "Temperature"
        //
        var temp_txt_plane = BABYLON.MeshBuilder.CreatePlane("temp_plane", {
            width: 120,
            height: 12
        }, this.scene, false);
        temp_txt_plane.material = new BABYLON.StandardMaterial("temp_plane_mat", this.scene);
        temp_txt_plane.position = new BABYLON.Vector3(-(this.width/2) + 13 , -190, -10);
        // temp_txt_plane.rotation = new BABYLON.Vector3(0, 0, 3*Math.PI/2); // also need to centre on axis if reqd.
        temp_txt_plane.rotation = new BABYLON.Vector3(0, 0, Math.PI/2);
        var temp_txt_plane_texture = new BABYLON.DynamicTexture("temp_texture", {
            width: 140,
            height: 30
        }, this.scene, true);
        temp_txt_plane.material.diffuseTexture = temp_txt_plane_texture;
        temp_txt_plane_texture.opacity = 0.0;
        temp_txt_plane_texture.drawText("Temperature", 10, 28, "28px verdana", "#FFFFFF", "#303030", true);
        temp_txt_plane.isVisible = true;
        this.objects.push(temp_txt_plane);

        // Status Text Boxes
        if (this.type == gg.HEATING) {
            if (this.start == gg.START_SOLID) {
                // melting
                this.melt_txt_plane = BABYLON.MeshBuilder.CreatePlane("melt_plane", {
                    width: 60,
                    height: 18
                }, this.scene, false);
                this.melt_txt_plane.material = new BABYLON.StandardMaterial("melt_plane_mat", this.scene);
                this.melt_txt_plane.position = new BABYLON.Vector3(-175, -334, -10);//180
                // this.melt_txt_plane.scaling.y = 0.1;
                var melt_txt_plane_texture = new BABYLON.DynamicTexture("melt_texture", {
                    width: 100,
                    height: 30
                }, this.scene, true);
                this.melt_txt_plane.material.diffuseTexture = melt_txt_plane_texture;
                melt_txt_plane_texture.opacity = 0.0;
                melt_txt_plane_texture.drawText("melting", 10, 30, "30px verdana", "#FFFFFF", "#303030", true);
                this.melt_txt_plane.isVisible = false;
                this.objects.push(this.melt_txt_plane);

                // boiling
                this.boil_txt_plane = BABYLON.MeshBuilder.CreatePlane("boil_plane", {
                    width: 60,
                    height: 18
                }, this.scene, false);
                this.boil_txt_plane.material = new BABYLON.StandardMaterial("boil_plane_mat", this.scene);
                this.boil_txt_plane.position = new BABYLON.Vector3(-15, -334, -10);
                // this.boil_txt_plane.scaling.y = 0.1;
                var boil_txt_plane_texture = new BABYLON.DynamicTexture("boil_texture", {
                    width: 100,
                    height: 30
                }, this.scene, true);
                this.boil_txt_plane.material.diffuseTexture = boil_txt_plane_texture;
                boil_txt_plane_texture.opacity = 0.0;
                boil_txt_plane_texture.drawText("boiling", 10, 30, "30px verdana", "#FFFFFF", "#303030", true);
                this.boil_txt_plane.isVisible = false;
                this.objects.push(this.boil_txt_plane);
            }
            else if (this.start == gg.START_LIQUID) {
                // boiling
                this.boil_txt_plane = BABYLON.MeshBuilder.CreatePlane("boil_plane", {
                    width: 60,
                    height: 18
                }, this.scene, false);
                this.boil_txt_plane.material = new BABYLON.StandardMaterial("boil_mat", this.scene);
                this.boil_txt_plane.position = new BABYLON.Vector3(-75, -334, -10);
                // this.boil_txt_plane.scaling.y = 0.1;
                var boil_txt_plane_texture = new BABYLON.DynamicTexture("boil_texture", {
                    width: 100,
                    height: 30
                }, this.scene, true);
                this.boil_txt_plane.material.diffuseTexture = boil_txt_plane_texture;
                boil_txt_plane_texture.opacity = 0.0;
                boil_txt_plane_texture.drawText("boiling", 10, 30, "30px verdana", "#FFFFFF", "#303030", true);
                this.boil_txt_plane.isVisible = false;
                this.objects.push(this.boil_txt_plane);
            }
        }
        else if (this.type == gg.COOLING) {
            if (this.start == gg.START_GAS) {
                // liquefying
                this.liquify_txt_plane = BABYLON.MeshBuilder.CreatePlane("liquify_plane", {
                    width: 100,
                    height: 22
                }, this.scene, false);
                this.liquify_txt_plane.material = new BABYLON.StandardMaterial("liquify_plane_mat", this.scene);
                this.liquify_txt_plane.position = new BABYLON.Vector3(-56, -332, -10);
                var liquify_txt_plane_texture = new BABYLON.DynamicTexture("liquify_texture", {
                    width: 90,
                    height: 30
                }, this.scene, true);
                this.liquify_txt_plane.material.diffuseTexture = liquify_txt_plane_texture;
                liquify_txt_plane_texture.opacity = 0.0;
                // liquify_txt_plane_texture.drawText("liquifying", 10, 28, "28px verdana", "#FFFFFF", "#303030", true);
                liquify_txt_plane_texture.drawText("liquifying", 22, 28, "20px verdana", "#FFFFFF", "#303030", true);
                this.liquify_txt_plane.isVisible = false;
                this.objects.push(this.liquify_txt_plane);

                // freezing
                this.freeze_txt_plane = BABYLON.MeshBuilder.CreatePlane("freeze_plane", {
                    width: 100,
                    height: 22
                }, this.scene, false);
                this.freeze_txt_plane.material = new BABYLON.StandardMaterial("freeze_plane_mat", this.scene);
                this.freeze_txt_plane.position = new BABYLON.Vector3(108, -332, -10);
                var freeze_txt_plane_texture = new BABYLON.DynamicTexture("freeze_texture", {
                    width: 90,
                    height: 30
                }, this.scene, true);
                this.freeze_txt_plane.material.diffuseTexture = freeze_txt_plane_texture;
                freeze_txt_plane_texture.opacity = 0.0;
                freeze_txt_plane_texture.drawText("freezing", 30, 28, "20px verdana", "#FFFFFF", "#303030", true);
                this.freeze_txt_plane.isVisible = false;
                this.objects.push(this.freeze_txt_plane);
            }
            else if (this.start == gg.START_LIQUID) {
                // freezing
                this.freeze_txt_plane = BABYLON.MeshBuilder.CreatePlane("freeze_plane", {
                    width: 100,
                    height: 22
                }, this.scene, false);
                this.freeze_txt_plane.material = new BABYLON.StandardMaterial("freeze_plane_mat", this.scene);
                this.freeze_txt_plane.position = new BABYLON.Vector3(-70, -332, -10);
                var freeze_txt_plane_texture = new BABYLON.DynamicTexture("freeze_texture", {
                    width: 90,
                    height: 30
                }, this.scene, true);
                this.freeze_txt_plane.material.diffuseTexture = freeze_txt_plane_texture;
                freeze_txt_plane_texture.opacity = 0.0;
                freeze_txt_plane_texture.drawText("freezing", 30, 28, "20px verdana", "#FFFFFF", "#303030", true);
                this.freeze_txt_plane.isVisible = false;
                this.objects.push(this.freeze_txt_plane);
            }
        }

        // Simulation Finished
        this.finished_txt_plane = BABYLON.MeshBuilder.CreatePlane("finished_plane", {
            width: 220,
            height: 22
        }, this.scene, false);
        this.finished_txt_plane.material = new BABYLON.StandardMaterial("finished_mat", this.scene);
        this.finished_txt_plane.position = new BABYLON.Vector3(0, -80, -10);
        // this.finished_txt_plane.scaling.y = 0.1;
        var finished_txt_plane_texture = new BABYLON.DynamicTexture("finished_texture", {
            width: 180,
            height: 30
        }, this.scene, true);
        this.finished_txt_plane.material.diffuseTexture = finished_txt_plane_texture;
        finished_txt_plane_texture.opacity = 0.0;
        finished_txt_plane_texture.drawText("Simulation Finished", 12, 22, "24px verdana", "#FFFFFF", "#303030", true);
        this.finished_txt_plane.isVisible = false;
        this.objects.push(this.finished_txt_plane);
        
    }

    gg.Graph.prototype.dispose = function() {
        if (this.box) {
            this.box.dispose(false); //bool: doNotRecurse
            this.box = null;
        }
        this.disposeObjects();
    }

    gg.Graph.prototype.disposeObjects = function(){
        // console.log("disposeObjects");
        if (!this.objects) {
            return;
        }
        // disposes graph contents but not the background box
        // they are the children of this graph but not of the box
        var len = this.objects.length;
        for (var i=0; i<this.objects.length; i++) {
            this.objects[i].dispose();
        }
        this.objects = [];
    }

    gg.Graph.prototype.lineFromTo = function(fromX, fromY, toX, toY){
        // console.log("lineFromTo", fromX, fromY, toX, toY);
        var line;
        var line_id = "line" + this.id++;
        var points = [];
        var begin = new BABYLON.Vector3(this.world_originX, this.world_originY, this.world_originZ);
        begin.x += this.startX + fromX;
        begin.y += this.startY + fromY;
        points.push(begin);
        var end = new BABYLON.Vector3(this.world_originX, this.world_originY, this.world_originZ);
        end.x += this.startX + toX;
        end.y += this.startY + toY;
        points.push(end);
        line = BABYLON.Mesh.CreateLines(line_id, points, this.scene);
        line.color = new BABYLON.Color3(0.5,0.5,0.5);
        return line;
    }

    gg.Graph.prototype.update = function(pwr){
        var line;
        var newSimX, newSimY;
        var fromX, toX, fromY, toY;
        if ((++this.skip_draw_cnt) % 5000 == 0) {
            newSimX = this.simX + 0.0005;       // X increment
            newSimY = pwr;
            //
            fromX = this.simX*10000;            // scale X
            toX = newSimX*10000;
            fromY = this.simY * 100;            // scale Y
            toY = newSimY * 100;
            // double width double height (less gas possible as height restricted)
            // fromX = this.simX*20000;            // scale X
            // toX = newSimX*20000;
            // fromY = this.simY * 200;            // scale Y
            // toY = newSimY * 200;
            //
            if (this.simX != 0) {
                line = this.lineFromTo(fromX, fromY, toX, toY);
                this.objects.push(line);
            }
            //
            this.simX = newSimX;
            this.simY = newSimY;
        }
    }

    gg.Graph.prototype.dashedStateChangeIndicator = function(state_change){
        var line;
        var totalFromX, totalToX, totalFromY, totalToY;
        var fromX, toX, fromY, toY;
        var text;
        //
        totalFromX = this.simX * 10000;         // scale X
        totalToX = totalFromX;
        totalFromY = this.simY * 100;           // scale Y
        totalToY = this.startY -5;
        //
        fromX = totalFromX;
        toX = totalToX;
        fromY = totalFromY;
        toY = totalFromY - 1;
        //
        while (toY > totalToY) {
            line = this.lineFromTo(fromX, fromY, toX, toY);
            fromY = toY - 2;
            toY = toY - 4;
            this.objects.push(line);
        }
        //
        if (this.type == gg.HEATING) {
            if (state_change == gg.TRANSITION_MELTING) {
                if (this.melt_txt_plane) {
                    this.melt_txt_plane.isVisible = true;
                }
            } else if (state_change == gg.TRANSITION_BOILING) {
                if (this.boil_txt_plane) {
                    this.boil_txt_plane.isVisible = true;
                }
            }
        }
        else if (this.type == gg.COOLING) {
            if (state_change == gg.TRANSITION_LIQUIFYING) {
                if (this.liquify_txt_plane) {
                    this.liquify_txt_plane.isVisible = true;
                }
            } else if (state_change == gg.TRANSITION_FREEZING) {
                if (this.freeze_txt_plane) {
                    this.freeze_txt_plane.isVisible = true;
                }
            }
        }
    }

    gg.Graph.prototype.simFinished = function() {
        //
        if (this.finished_txt_plane && !this.shown_finished_text) {
            this.finished_txt_plane.isVisible = true;
            this.shown_finished_text = true;
        }
    }
})();

