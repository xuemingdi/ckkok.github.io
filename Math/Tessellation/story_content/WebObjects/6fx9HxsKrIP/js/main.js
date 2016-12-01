/*
 * Changelog:
 *
 * Tag:         Date:           Explanation:
 * ---------------------------------------------------------------------------------------------------------------------
 * gf           2016/07/08      Pre-Changelog fixes and experiments that work
 * gf11         2016/07/08      Fix scene 11: Snap, re-try sequencing
 * gf12         2016/07/08      More scene 11 sequencing for help page
 * gf13         2016/07/08      Fix scene 13
 * gf14         2016/07/08      Fix scene 13->14 transfer
 * gfjq         2016/07/08      Use jQuery event handling additions
 */


var canvas, ctx;
var ratio;

var mousePositionX, mousePositionY;
var mousePressed = false;
var mouseMoving = false;
var mouseUpflag=false;
var backimg = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/game.png', 'img/game.png', 'img/game.png', 'img/backgrounds/back_11.png', 'img/background3.jpg', 'img/grid_background1.jpg', 'img/grid_background2.jpg', 'img/grid_background3.jpg', 'img/grid_background4.jpg'];
var continuebtn, homebtn, rotatebtn, helpbutton, help_closebt;       //continue and home btn
//gf11->

//<-gf11
//gf12->
var trybtn12, backbtn12;
var hitcounter12 = 0;
//<-gf12
var sceneNo = 11;
var subsceneNo = 0;
var selectNo=-1, disX=0, disY=0;
var blocks_flag=[];
var blocks_size=[];
var tiles=[], tiles2=[], tiles3=[];
var success_flag=0;//0: normal, 1: faild, 2: success
var raxy =[];//right ans positions
var raxy_state=[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
var click_flag=false;
var help_flag=false;

var step2_subcounter= 0, step2_generatebt, triangle_showflag=false, ste2_continuebt, step2_trybt;
var triangles1=[], triangles2=[], triangles3=[], round_boders=[];
var select_counter=-1, aim_pos=null, m_flag=-1;
var step2_bottombt;
var temp_flag=false;
var step2_hintcounter= 0, step2_hintflag=false, step2_hitpos=0;
var step2_dis_vals=[[1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0]];
var step2_trybutton, step2_trybt_flag=false;
var gm_points=[
    [[110, 60], [120, 100], [150, 130], [50, 140]],
    [[180, 70], [50, 170], [150, 40], [70, 130]],
    [[100, 70], [70, 110], [60, 70], [60, 60]]
];
var sub_error_flag=0;
var step2_anim_flag=false;

var trs1=[], trs2=[], trs3=[], trs4=[];
var step3_subcounter= 0, step3_subpos=0, step3_hintcounter;
var success_vals_X=[[170, 220, 269, 222, 320, 272, 321], [177, 332, 382, 180, 232, 336, 387], [219, 373, 325, 479, 477, 173, 325, 429], [162, 229, 231, 295, 299, 229, 295, 162]];
var success_vals_Y=[[171, 272, 174, 371, 174, 374, 275], [206, 204, 204, 360, 360, 359, 359], [317, 264, 317, 264, 366, 370, 418, 416] ,[244, 241, 179, 240, 179, 385, 383, 385]];
var success_types=[[1, 1, 0, 0, 1, 1, 0], [0, 0, 1, 0, 1, 0, 1], [1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 0, 0, 0, 0]];
var exist_vals=[];
var step3_hintbutton, step3_rotatebutton, step3_continuebt;
var step3_successflag=0;//0; normal, 1: less success, 2: best success;
var hint_flag=false, hint_type=0;
var hint_deltaX, hint_deltaY, hint_aimX=-1, hint_aimY=-1;
var hit_no;
var tile_enable_flag=true;
var anim_points=[], anim_objs=[], anim_pointer= 0, anim_flag=false, anim_counterflag=false, anim_completeflag=false, anim_timecounter= 0, anim_deltaX=-1, anim_deltaY=-1, anim_gols=[[150, 357], [332, 482], [650, 291]];
var touch_startflag=false, touch_endflag=false;
//customize control boxes

var audio = new Audio('audio/formed_parallelogram.mp3');
var audio2 = new Audio('audio/great.mp3');
var audio3 = new Audio('audio/awesome.mp3');
var audio4 = new Audio('audio/any_two_identical_triangles.mp3');
var audio_count = 0, audio2_count = 0, audio3_count = 0, audio4_count = 0;

function clear() {
    ctx.save();//gfexperimental
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();//gfexperimental
}
function Button(ctx, x, y, w, h, flag, text, colors, images, clickCB) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = colors;
    this.text = text;
    this.images = images;
    this.ctx = ctx;
    this.flag=flag;
    this.state = 0;  // current button state

    var isClicking = false;

    /**
     * Check to see if the user is hovering over or clicking on the button.
     */
    this.update = function() {
        // check for hover

        // console.log("this.flag", this.flag, "hint_flag", hint_flag, "help_flag", help_flag, "select_counter", select_counter);

        if(this.flag && !hint_flag && !help_flag && select_counter==-1){
            if (mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
                mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
            {
                this.state = 1;
                // check for click
                if (mousePressed)
                {
                    this.state = 0;

                    if (typeof clickCB === 'function' && !isClicking)
                    {
                        clickCB();
                        isClicking = true;
                    }
                }
                else
                {
                    isClicking = false;
                }
                canvas.style.cursor = "pointer";
            }
            else
            {
                this.state = 0;
                canvas.style.cursor = "default";
            }
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();

        if(this.images != null)
        {
            if(this.flag){
                var img = new Image();
                img.src = this.images[this.state];
                // console.log("image", this.state);
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }else{
                var img = new Image();
                img.src = this.images[2];
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }
        }

        this.ctx.restore();
    };
}

function HelpButton(ctx, x, y, w, h, flag, text, colors, images, clickCB) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = colors;
    this.text = text;
    this.images = images;
    this.ctx = ctx;
    this.flag=flag;
    this.state = 0;  // current button state

    var isClicking = false;

    /**
     * Check to see if the user is hovering over or clicking on the button.
     */
    this.update = function() {
        // check for hover
        if(this.flag && !hint_flag){
            if (mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
                mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
            {
                this.state = 1;
                // check for click
                if (mousePressed)
                {
                    this.state = 0;

                    if (typeof clickCB === 'function' && !isClicking)
                    {
                        clickCB();
                        isClicking = true;
                    }
                }
                else
                {
                    isClicking = false;
                }
                canvas.style.cursor = "pointer";
            }
            else
            {
                this.state = 0;
                canvas.style.cursor = "default";
            }
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();

        if(this.images != null)
        {
            if(this.flag){
                var img = new Image();
                img.src = this.images[this.state];
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }else{
                var img = new Image();
                img.src = this.images[2];
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }

        }

        this.ctx.restore();
    };
}
function BottomButton(ctx, x, y, w, h, type, continue_images, try_images) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.continue_images = continue_images;
    this.try_images=try_images;
    this.ctx = ctx;
    this.type=type;
    this.state = 0;  // current button state

    var isClicking = false;

    /**
     * Check to see if the user is hovering over or clicking on the button.
     */
    this.update = function() {
        // check for hover
        //gf13->
        // if(select_counter==-1){ // orig - commented by dev2
        // if(select_counter != -1){
        //<-gf13
        if(this.type==0){//rotate button
            if (mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
                mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
            {
                // check for click
                if (mousePressed)
                {
                    if(triangle_showflag)
                        click_flag=true;
                }

                canvas.style.cursor = "pointer";
            }
            else
            {
                canvas.style.cursor = "default";
            }
        }else{//tyr button, continue button
            if (mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
                mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
            {
                this.state = 1;
                // check for click
                if(mousePressed){
                    temp_flag=true;
                }
                if (mouseUpflag)
                {
                    this.state = 2;

                    if (!isClicking)
                    {
                        if(this.type==1){//continue button click
                            step2_subcounter++;

                            if(step2_subcounter<5){
                                if(step2_subcounter<3){
                                    aim_pos=null;
                                    m_flag=-1;
                                    select_counter=-1;
                                    triangle_showflag=false;
                                    round_boders[step2_subcounter].type=0;
                                    this.type=0;
                                }else if(step2_subcounter==3){
                                    step2_subcounter=0;
                                    anim_flag=false;
                                    anim_deltaX=-1;
                                    anim_deltaY=-1;
                                    anim_pointer=0;
                                    this.type=0;
                                    triangle_showflag=false;

                                    sceneNo=14;
                                    step3_hintcounter=0;
                                    trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
                                    trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
                                    step3_subcounter=2;
                                    step3_subpos=1;

                                    round_boders[0]=new RoundBorder(ctx, 125, 260, 270, 281, 0, 0);
                                    round_boders[1]=new RoundBorder(ctx, 515, 260, 270, 281, 1, 1);
                                    round_boders[2]=new RoundBorder(ctx, 895, 260, 270, 281, 2, 2);
                                    triangles1[0]=new Triangle(ctx, 500, 570, 256, 184, 1, 1, 0, gm_points);
                                    triangles1[1]=new Triangle(ctx, 700, 570, 256, 184, 1, 1, 1, gm_points);
                                    triangles2[0]=new Triangle(ctx, 500, 570, 305, 126, 2, 1, 0, gm_points);
                                    triangles2[1]=new Triangle(ctx, 700, 570, 305, 126, 2, 1, 1, gm_points);
                                    triangles3[0]=new Triangle(ctx, 500, 570, 168, 138, 3, 1, 0, gm_points);
                                    triangles3[1]=new Triangle(ctx, 700, 570, 168, 138, 3, 1, 1, gm_points);
                                    aim_pos=null;
                                    step2_trybt_flag=false;
                                }else if(step2_subcounter==4){
                                    //gf14->
                                    // Original:
                                    // ---------
                                    // step2_subcounter=2;
                                    // anim_flag=false;
                                    // step2_trybt_flag=true;
                                    // ----------------------
                                    // Changes:
                                    // --------
                                    // Below is a most of the logic for the step2_subcounter==3 above whch
                                    // sets up and transfers to scene 14
                                    //
                                    // Previously we came in here and went back to scene 13 allow a Try Again for
                                    // the three sets of triangles. But it was redundant as you cannnot leave the
                                    // scene without successfully completing the three triangles -> parallelogram
                                    // tasks.
                                    //
                                    // anim_flag=false;
                                    // triangle_showflag=false;

                                    sceneNo=14;
									if (sceneNo=14){
	}
                                    exist_vals=[];
                                    select_counter=-1;
                                    trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
                                    trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
                                    step3_successflag=0;
                                    step3_hintcounter=0;
                                    step3_subcounter=2;
                                    step3_subpos=1;
                                    //<-gf14
                                }
                            } else {
                                step2_subcounter=0;
                                anim_flag=false;
                                anim_deltaX=-1;
                                anim_deltaY=-1;
                                anim_pointer=0;
                                this.type=0;
                                triangle_showflag=false;

                                sceneNo=14;
                                step3_hintcounter=0;
                                trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
                                trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
                                step3_subcounter=2;
                                step3_subpos=1;
                            }
                        }else if(this.type==2){//try button click
                            // console.log("type 2");
                        }
                        isClicking = true;
                    }
                    mouseUpflag=false;
                }
                else
                {
                    isClicking = false;
                }
                canvas.style.cursor = "pointer";
            }
            else
            {
                this.state = 0;
                canvas.style.cursor = "default";
            }
        }
        //gf->
        // }     // select_counter==-1
        //<-gf
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();
        if(this.type==0){// rotate button
            var img = new Image();
            if(click_flag){
                img.src = 'img/rotate2.png';
            }else{
                img.src = 'img/rotate1.png';
            }
            this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }else{//try or continue button
            if(this.type==1){//continue button
                var img = new Image();
                img.src = this.continue_images[this.state];
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }else{//try button
                var img = new Image();
                img.src = this.try_images[this.state];
                this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }
        }

        this.ctx.restore();
    };
}
function RotateButton(ctx, x, y, w, h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.ctx=ctx;

    this.update = function() {
        // check for hover
        if (mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.w) &&
            mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.h))
        {
            // check for click
            if (mousePressed)
            {
                click_flag=true;
            }

            canvas.style.cursor = "pointer";
        }
        else
        {
            canvas.style.cursor = "default";
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();
        var img = new Image();
        if(click_flag){
            img.src = 'img/rotate_select.png';
        }else{
            img.src = 'img/rotate_button.png';
        }
        this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
        this.ctx.restore();
    };
}
function QuadTile(ctx, x, y, w, h, no, style, flag, type){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.ctx = ctx;
    this.no=no;
    this.style=style;
    this.substyle=0;
    this.flag=flag;
    this.deltaX=-1;
    this.deltaY=-1;
    this.targetobj=null;
    this.type=type;
    var isClicking = false;

    /**
     * Check to see if the user is hovering over or clicking on the button.
     */
    this.update = function() {
        //gf12
        // check for hover
        if ( tile_enable_flag && !help_flag && this.flag==0 && mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
            mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height)) {
            // check for click
            if (mousePressed) {

                // console.log('mousePressed, isClicking ',isClicking, "selectNo", selectNo, "this.no", this.no, "this.style", this.style);

                if (selectNo==-1 && !isClicking) {
                    if(mousePositionX!='undefined'){
                        disX=mousePositionX/ratio-this.x;
                        disY=mousePositionY/ratio-this.y;
                    }else{
                        disX=0;
                        disY=0;
                    }
                    selectNo=this.no;
                    isClicking = true;
                }
            }
            else {
                isClicking = false;
            }
        }
        if(!help_flag && this.flag==0 && mousePressed && selectNo==this.no){
            this.x=mousePositionX/ratio-this.width/2;
            this.y=mousePositionY/ratio-this.height/2;
            //for(var i=0; i< blocks_size[sceneNo]; i++){
            var end_val;
            // target box width in shapes
            if(sceneNo==9)
                end_val=3;              // squares
            else if(sceneNo==10)
                end_val=4;              // rectangles
            else if(sceneNo==11)
                end_val=3;              // parallelograms - each line must have the same orientation TODO: FixMe Same Orientation
            for(var i=0; i<3; i++){
                for(var j=0; j<end_val; j++) {
                    if ((blocks_flag[sceneNo][i*end_val+j] == this.no) || typeof blocks_flag[sceneNo][i*end_val+j] == 'undefined') {
                        var x = raxy[sceneNo][i][j][0]+subsceneNo*305;
                        var y = raxy[sceneNo][i][j][1];
                        var delta = Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
                        if (delta < 10) {
                            // console.log("Try Snap-TO");
                            //gf13->
                            //     if(raxy_state[subsceneNo][i]==-1){
                            //         this.x = x;
                            //         this.y = y;
                            //         mousePressed = false;
                            //         blocks_flag[sceneNo][i*end_val+j] = this.no;
                            //         raxy_state[subsceneNo][i]=this.substyle;
                            //         this.flag=1;
                            //     }else if(this.substyle==raxy_state[subsceneNo][i]){
                            //         this.x = x;
                            //         this.y = y;
                            //         mousePressed = false;
                            //         blocks_flag[sceneNo][i*end_val+j] = this.no;
                            //         this.flag=1;
                            //     }
                            if (sceneNo==9 || sceneNo==10) {
                                this.x = x;
                                this.y = y;
                                mousePressed = false;
                                blocks_flag[sceneNo][i * end_val + j] = this.no;
                                this.flag = 1;
								
                            }
                            else if (sceneNo == 11) {

                                if (raxy_state[subsceneNo][i] == -1) {

                                    raxy_state[subsceneNo][i] = this.substyle;

                                    this.x = x;
                                    this.y = y;
                                    mousePressed = false;
                                    blocks_flag[sceneNo][i * end_val + j] = this.no;
                                    this.flag = 1;
                                }
                                else if(this.substyle==raxy_state[subsceneNo][i]){

                                    this.x = x;
                                    this.y = y;
                                    mousePressed = false;
                                    blocks_flag[sceneNo][i*end_val+j] = this.no;
                                    this.flag=1;
                                } else {
                                    // console.log("Apa ini");
                                }
                            }
                            //<-gf13
                        }
                    }else {
                        //blocks_flag[sceneNo][i]=-1;
                    }
                }
            }
        }
        if(sceneNo==11){
            // gfremove->
            // if(this.flag==1 && step2_hitpos==this.no-1 && step2_hintflag && this.no!=0 && this.type==subsceneNo){
            //     console.log('aaa');
            //     if(this.targetobj==null){
            //         var i=parseInt(this.no/3);
            //         var j=this.no%3;
            //         this.targetobj=[raxy[sceneNo][i][j][0]+305*subsceneNo,raxy[sceneNo][i][j][1]];
            //         this.deltaX=(this.targetobj[0]-this.x)/30;
            //         this.deltaY=(this.targetobj[1]-this.y)/30;
            //     }
            //     this.x+=this.deltaX;
            //     this.y+=this.deltaY;
            //     if(step2_dis_vals[subsceneNo][this.no]==1)
            //         this.style=3;
            //     else
            //         this.style=4;
            //     var delta = Math.sqrt(Math.pow((this.x - this.targetobj[0]), 2) + Math.pow((this.y - this.targetobj[1]), 2));
            //     if(delta<10){
            //         console.log("Try Rotate--------------------------------------------");
            //         selectNo=-1;
            //         this.x=this.targetobj[0];
            //         this.y=this.targetobj[1];
            //         step2_hitpos++;
            //         this.flag=1;
            //         if(step2_hitpos==8){
            //             subsceneNo++;
            //             if(subsceneNo==1){
            //                 step2_hitpos=0;
            //                 tiles2[0].flag=1;
            //             }else if(subsceneNo==2){
            //                 step2_hitpos=0;
            //                 tiles3[0].flag=1;
            //             }else{
            //                 success_flag=3;
            //                 continuebtn.flag=1;
            //                 step2_hitpos=0;
            //                 step2_hintflag=false;
            //             }
            //         }
            //     }
            // }
            //<-gfremove
        }else{
            if(this.flag==1 && step2_hitpos==this.no && step2_hintflag){
                if(this.targetobj==null){
                    var val;
                    if(sceneNo==9)
                        val=3;
                    else if(sceneNo==10)
                        val=4;
                    var i=parseInt(this.no/val);
                    var j=this.no%val;
                    this.targetobj=raxy[sceneNo][i][j];
                    this.deltaX=(this.targetobj[0]-this.x)/30;
                    this.deltaY=(this.targetobj[1]-this.y)/30;
                }
                this.x+=this.deltaX;
                this.y+=this.deltaY;

                var delta = Math.sqrt(Math.pow((this.x - this.targetobj[0]), 2) + Math.pow((this.y - this.targetobj[1]), 2));
                if(delta<10){
                    this.x=this.targetobj[0];
                    this.y=this.targetobj[1];
                    step2_hitpos++;
                    switch (sceneNo){
                        case 9:
                            if(step2_hitpos==9){
                                success_flag=3;
                                continuebtn.flag=1;
                                step2_hitpos=0;
                                step2_hintflag=false;
                            }
                            break;
                        case 10:
                            if(step2_hitpos==12){
                                success_flag=3;
                                continuebtn.flag=1;
                                step2_hitpos=0;
                                step2_hintflag=false;
                            }
                            break;
                    }
                }
            }
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();

        var img = new Image();

        //gfexperimental2->
        // if(selectNo==this.no && (this.flag==0)){
        //       switch(this.style){
        //           case 1:
        //               img.src = "img/quadtile_select.png";
        //               break;
        //           case 2:
        //               img.src = "img/quadtile1_select.png";
        //               break;
        //           case 3:
        //               img.src="img/quadtile2_select.png";
        //               break;
        //           case 4:
        //               img.src="img/quadtile3_select.png";
        //               break;
        //       }
        //   }else{
        //       switch(this.style){
        //           case 1:
        //               img.src = "img/quadtile.png";
        //               break;
        //           case 2:
        //               img.src = "img/quadtile1.png";
        //               break;
        //           case 3:
        //               img.src="img/quadtile2.png";
        //               if(this.flag==-1)
        //                   img.src="img/quadtile4.png";
        //               break;
        //           case 4:
        //               img.src="img/quadtile3.png";
        //               break;
        //       }
        //   }
        if (this.flag == 1) {
            // Snapped
            switch(this.style){
                case 1:
                    img.src = "img/quadtile_snapped.png";
                    break;
                case 2:
                    img.src = "img/quadtile1_snapped.png";
                    break;
                case 3:
                    img.src="img/quadtile2_snapped.png";
                    break;
                case 4:
                    img.src="img/quadtile3_snapped.png";
                    break;
            }
        } else {
            // Live
            if(selectNo==this.no){
                // Currently selected
                switch(this.style){
                    case 1:
                        img.src = "img/quadtile_select.png";
                        break;
                    case 2:
                        img.src = "img/quadtile1_select.png";
                        break;
                    case 3:
                        img.src="img/quadtile2_select.png";
                        break;
                    case 4:
                        img.src="img/quadtile3_select.png";
                        break;
                }
            } else {
                // Not selected
                switch(this.style){
                    case 1:
                        img.src = "img/quadtile.png";
                        break;
                    case 2:
                        img.src = "img/quadtile1.png";
                        break;
                    case 3:
                        img.src="img/quadtile2.png";
                        if(this.flag==-1)
                            img.src="img/quadtile4.png";
                        break;
                    case 4:
                        img.src="img/quadtile3.png";
                        break;
                }
            }
        }
        //<-gfexperimental2

        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        this.ctx.restore();
    };
}
function Triangle(ctx, x, y, w, h, type, value, no, centerpoints){
    this.ctx=ctx;
    this.initialX=x;
    this.initialY=y;
    this.x=x;
    this.y=y;
    this.width=w/2;
    this.height=h/2;
    this.type=type;
    this.value=value;
    this.no=no;
    this.flag=true;
    this.centerpoints=centerpoints;
    var isClicking = false;

    /**
     * Check to see if the user is hovering over or clicking on the button.
     */
    this.update = function() {
        // check for hover
        // if (this.flag && mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
        //     mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
        //
        // console.log('help_flag',help_flag);
        //
        if (!help_flag && this.flag && mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
            mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
        {
            // check for click
            if (mousePressed)
            {
                if (!isClicking)
                {
                    if(select_counter==-1){
                        select_counter=this.no;
                        disX=mousePositionX/ratio-this.x;
                        disY=mousePositionY/ratio-this.y;
                    }
                    isClicking = true;
                }
            }
            else
            {
                isClicking = false;
                select_counter=-1;
            }
        }

        if(this.flag && mousePressed && select_counter==this.no){
            //moving
            //this.x=mousePositionX/ratio-disX;
            //this.y=mousePositionY/ratio-disY;
            if(this.type==1){
                if(this.value==1){
                    this.x=mousePositionX/ratio-this.width*0.9/2;
                    this.y=mousePositionY/ratio-this.height*0.7/2;
                }else if(this.value==2){
                    this.x=mousePositionX/ratio-this.width*1.2/2;
                    this.y=mousePositionY/ratio-this.height*0.8/2;
                }else if(this.value==3){
                    this.x=mousePositionX/ratio-this.width*1/2;
                    this.y=mousePositionY/ratio-this.height*1.25/2;
                }else{
                    this.x=mousePositionX/ratio-this.width*0.8/2;
                    this.y=mousePositionY/ratio-this.height*1.1/2;
                }

            }else if(this.type==2){
                if(this.value==1){
                    this.x=mousePositionX/ratio-this.width*1/2;
                    this.y=mousePositionY/ratio-this.height*0.8/2;
                }else if(this.value==2){
                    this.x=mousePositionX/ratio-this.width*1.05/2;
                    this.y=mousePositionY/ratio-this.height*0.95/2;
                }else if(this.value==3){
                    this.x=mousePositionX/ratio-this.width*0.95/2;
                    this.y=mousePositionY/ratio-this.height*1/2;
                }else{
                    this.x=mousePositionX/ratio-this.width*0.9/2;
                    this.y=mousePositionY/ratio-this.height*1/2;
                }
            }else if(this.type==3){
                if(this.value==1){
                    this.x=mousePositionX/ratio-this.width*1.1/2;
                    this.y=mousePositionY/ratio-this.height*0.8/2;
                }else if(this.value==2){
                    this.x=mousePositionX/ratio-this.width*0.9/2;
                    this.y=mousePositionY/ratio-this.height*0.95/2;
                }else if(this.value==3){
                    this.x=mousePositionX/ratio-this.width*0.75/2;
                    this.y=mousePositionY/ratio-this.height*1/2;
                }else{
                    this.x=mousePositionX/ratio-this.width*0.9/2;
                    this.y=mousePositionY/ratio-this.height*0.8/2;
                }
            }


            //selecting aim pos object
            if(step2_subcounter==0){
                if(this.no==0)
                    aim_pos=triangles1[1];
                else
                    aim_pos=triangles1[0];
            }else if(step2_subcounter==1){
                if(this.no==0)
                    aim_pos=triangles2[1];
                else
                    aim_pos=triangles2[0];
            }else{
                if(this.no==0)
                    aim_pos=triangles3[1];
                else
                    aim_pos=triangles3[0];
            }

            //confirm if the objects are set on frame
            var aim_pos_flag=false;
            if(aim_pos.x>round_boders[step2_subcounter].x && (aim_pos.x+aim_pos.width)<round_boders[step2_subcounter].x+round_boders[step2_subcounter].width &&
                aim_pos.y>round_boders[step2_subcounter].y && (aim_pos.y+aim_pos.height<round_boders[step2_subcounter].y+round_boders[step2_subcounter].height))
                aim_pos_flag=true;


            var me_flag=false;
            if(this.x>round_boders[step2_subcounter].x && (this.x+this.width)<round_boders[step2_subcounter].x+round_boders[step2_subcounter].width &&
                this.y>round_boders[step2_subcounter].y && this.y+(this.height)<round_boders[step2_subcounter].y+round_boders[step2_subcounter].height)
                me_flag=true;

            var type_flag=false;
            var type_val=-1;
            if(aim_pos_flag && me_flag && Math.abs(aim_pos.value-this.value)==2){
                if(this.value==1){
                    if(step2_subcounter==0){
                        if(Math.abs(this.x-aim_pos.x)<5 && (aim_pos.y-this.y)<20 && (aim_pos.y-this.y)>0){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-12;
                        }

                        if((aim_pos.x-this.x)<45 && (aim_pos.x-this.x)>34 && (aim_pos.y-this.y)<-75 && (aim_pos.y-this.y)>-85){
                            type_flag=true;
                            this.x=aim_pos.x-40;
                            this.y=aim_pos.y+80;
                        }
                        if((aim_pos.x-this.x)<-80 && (aim_pos.x-this.x)>-90 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x+85;
                            this.y=aim_pos.y;
                        }
                    }else if(step2_subcounter==1){
                        if(Math.abs(this.x-aim_pos.x)<5 && (aim_pos.y-this.y)<68 && (aim_pos.y-this.y)>58){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-63;
                        }
                        if((aim_pos.x-this.x)<95 && (aim_pos.x-this.x)>85 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x-90;
                            this.y=aim_pos.y;
                        }
                        if((aim_pos.x-this.x)<-55 && (aim_pos.x-this.x)>-65 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x+60;
                            this.y=aim_pos.y;
                        }
                    }else if(step2_subcounter==2){
                        if(Math.abs(this.y-aim_pos.y)<5 && (aim_pos.x-this.x)<82 && (aim_pos.x-this.x)>0){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x-82;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<38 && (aim_pos.y-this.y)>28){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-33;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<-31 && (aim_pos.y-this.y)>-41){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+36;
                        }
                    }

                }else if(this.value==2){
                    if(step2_subcounter==0){

                        if(Math.abs(this.y-aim_pos.y)<5 && (aim_pos.x-this.x)<20){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x+12;
                        }

                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<-80 && (aim_pos.y-this.y)>-90){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+85;
                        }
                        if((aim_pos.x-this.x)<85 && (aim_pos.x-this.x)>75 && (aim_pos.y-this.y)<47 && (aim_pos.y-this.y)>37){
                            type_flag=true;
                            this.x=aim_pos.x-80;
                            this.y=aim_pos.y-42;
                        }
                    }else if(step2_subcounter==1){
                        //console.log('dx:'+(aim_pos.x-this.x));
                        //console.log('dy:'+(aim_pos.y-this.y));
                        if(Math.abs(this.y-aim_pos.y)<5 && (aim_pos.x-this.x)<-58 && (aim_pos.x-this.x)>-68){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x+63;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<-55 && (aim_pos.y-this.y)>-65){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+60;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<95 && (aim_pos.y-this.y)>85){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-90;
                        }
                    }else if(step2_subcounter==2){
                        if(Math.abs(this.x-aim_pos.x)<5 && (aim_pos.y-this.y)<82){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-82;
                        }

                        if((aim_pos.x-this.x)<40 && (aim_pos.x-this.x)>30 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x-35;
                            this.y=aim_pos.y;
                        }
                        if((aim_pos.x-this.x)<-27 && (aim_pos.x-this.x)>-37 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x+32;
                            this.y=aim_pos.y;
                        }
                    }
                }else if(this.value==3){
                    if(step2_subcounter==0){
                        if(Math.abs(this.x-aim_pos.x)<5 && (this.y-aim_pos.y)<17 && (this.y-aim_pos.y)>7){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+12;
                        }

                        if((aim_pos.x-this.x)<90 && (aim_pos.x-this.x)>80 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x-85;
                            this.y=aim_pos.y;
                        }
                        if((aim_pos.x-this.x)<-35 && (aim_pos.x-this.x)>-45 && (aim_pos.y-this.y)<85 && (aim_pos.y-this.y)>75){
                            type_flag=true;
                            this.x=aim_pos.x+40;
                            this.y=aim_pos.y-80;
                        }
                    }else if(step2_subcounter==1){
                        if(Math.abs(this.x-aim_pos.x)<5 && (this.y-aim_pos.y)<68 && (this.y-aim_pos.y)>58){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+63;
                        }

                        if((aim_pos.x-this.x)<-85 && (aim_pos.x-this.x)>-95 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x+90;
                            this.y=aim_pos.y;
                        }
                        if((aim_pos.x-this.x)<65 && (aim_pos.x-this.x)>55 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x-60;
                            this.y=aim_pos.y;
                        }
                    }else if(step2_subcounter==2){
                        if(Math.abs(this.y-aim_pos.y)<5 && (this.x-aim_pos.x)<82){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x+82;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<-28 && (aim_pos.y-this.y)>-38){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+33;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<41 && (aim_pos.y-this.y)>31){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-36;
                        }
                    }
                }else if(this.value==4){
                    if(step2_subcounter==0){
                        if(Math.abs(this.y-aim_pos.y)<5 && (aim_pos.x-this.x)<20){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x-12;
                        }

                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<90 && (aim_pos.y-this.y)>80){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-85;
                        }
                        if((aim_pos.x-this.x)<-75 && (aim_pos.x-this.x)>-85 && (aim_pos.y-this.y)<-37 && (aim_pos.y-this.y)>-47){
                            type_flag=true;
                            this.x=aim_pos.x+80;
                            this.y=aim_pos.y+42;
                        }
                    }else if(step2_subcounter==1){
                        if(Math.abs(this.y-aim_pos.y)<5 && (aim_pos.x-this.x)<68 && (aim_pos.x-this.x)>58){
                            type_flag=true;
                            this.y=aim_pos.y;
                            this.x=aim_pos.x-63;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<65 && (aim_pos.y-this.y)>55){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y-60;
                        }
                        if((aim_pos.x-this.x)<5 && (aim_pos.x-this.x)>-5 && (aim_pos.y-this.y)<-85 && (aim_pos.y-this.y)>-95){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+90;
                        }
                    }else if(step2_subcounter==2){
                        if(Math.abs(this.x-aim_pos.x)<5 && (aim_pos.y-this.y)<82){
                            type_flag=true;
                            this.x=aim_pos.x;
                            this.y=aim_pos.y+82;
                        }
                        if((aim_pos.x-this.x)<-30 && (aim_pos.x-this.x)>-40 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x+35;
                            this.y=aim_pos.y;
                        }
                        if((aim_pos.x-this.x)<37 && (aim_pos.x-this.x)>27 && (aim_pos.y-this.y)<5 && (aim_pos.y-this.y)>-5){
                            type_flag=true;
                            this.x=aim_pos.x-32;
                            this.y=aim_pos.y;
                        }
                    }
                }
            }
            if(aim_pos_flag && me_flag && type_flag){
                round_boders[step2_subcounter].flag=true;
                m_flag=true;
                step2_bottombt.type=1;
                //step2_trybt_flag=true;
                aim_pos.flag=false;
                this.flag=false;
                if(step2_subcounter==2){
                    anim_counterflag=true;
                }else{
                    step2_subcounter+=1;
                    mousePressed=false;
                    round_boders[step2_subcounter].type=0;
                }

                //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                // console.log('aaaa');
                triangle_showflag=true;
                //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            }
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();

        var img = new Image();
        if(this.type==1){
            if(this.value==1){
                img.src="img/triangle1/1.png";
            }else if(this.value==2){
                img.src="img/triangle1/2.png";
            }else if(this.value==3){
                img.src="img/triangle1/3.png";
            }else{
                img.src="img/triangle1/4.png";
            }

        }else if(this.type==2){
            if(this.value==1){
                img.src="img/triangle2/1.png";
            }else if(this.value==2){
                img.src="img/triangle2/2.png";
            }else if(this.value==3){
                img.src="img/triangle2/3.png";
            }else{
                img.src="img/triangle2/4.png";
            }

        }else{
            if(this.value==1){
                img.src="img/triangle3/1.png";
            }else if(this.value==2){
                img.src="img/triangle3/2.png";
            }else if(this.value==3){
                img.src="img/triangle3/3.png";
            }else{
                img.src="img/triangle3/4.png";
            }
        }
        this.width=img.width/2;
        this.height=img.height/2;
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        this.ctx.restore();
    };
}
function RoundBorder(ctx, x, y, w, h, type, no){
    this.ctx=ctx;
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
    this.type=type;
    this.flag=false;
    this.no=no;
    var isClicking = false;

    this.update = function() {
        // check for hover
        if (!this.flag && mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
            mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
        {
            // check for click
            if (mousePressed)
            {

                if (!isClicking)
                {
                    isClicking = true;
                }
            }
            else
            {
                isClicking = false;
                if(select_counter!=-1 && aim_pos==null && this.type==0){
                    if(step2_subcounter==0){
                        triangles1[select_counter].x=this.x+this.width/2-triangles1[select_counter].width/2;
                        triangles1[select_counter].y=this.y+this.height/3-triangles1[select_counter].height/2;
                        //triangles1[select_counter].flag=false;
                        aim_pos=triangles1[select_counter];
                    }
                    if(step2_subcounter==1 && aim_pos==null && this.type==0){
                        triangles2[select_counter].x=this.x+this.width/2-triangles2[select_counter].width/2;
                        triangles2[select_counter].y=this.y+10;
                        //triangles2[select_counter].flag=false;
                        aim_pos=triangles2[select_counter];
                    }
                    if(step2_subcounter==2 && aim_pos==null && this.type==0){
                        triangles3[select_counter].x=this.x+this.width/4-triangles3[select_counter].width/2;
                        triangles3[select_counter].y=this.y+this.height/3-triangles3[select_counter].height/2;
                        //triangles3[select_counter].flag=false;
                        aim_pos=triangles3[select_counter];
                    }
                    select_counter=-1;
                }
            }
        }
    };

    /**
     * Draw the button.
     */
    this.draw = function() {
        this.ctx.save();

        var img = new Image();
        if(this.type==0){
            img.src = "img/round_dialog.png";
        }else if(this.type==1){
            img.src ="img/dialog_disable1.png";
        }else{
            img.src ="img/dialog_disable2.png";
        }
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        //if(this.flag){
        //    var successlabel=new Image();
        //    if(this.no==0){
        //        successlabel.src="img/successlabel_1.png";
        //        this.ctx.drawImage(successlabel, this.x+110, this.y+this.height-80, 160, 58);
        //    }
        //    if(this.no==1){
        //        successlabel.src="img/successlabel_2.png";
        //        this.ctx.drawImage(successlabel, this.x+110, this.y+this.height-70, 150, 60);
        //    }
        //    if(this.no==2){
        //        successlabel.src="img/successlabel_3.png";
        //        this.ctx.drawImage(successlabel, this.x+45, this.y+this.height-70, 250, 60);
        //    }
        //
        //}
        this.ctx.restore();
    };
}
function NewTriangle(ctx, x, y, w, h, type, no, flag){
    this.ctx=ctx;
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
    this.type=type;
    this.no=no;
    this.flag=flag;
    var isClicking=false;

    // console.log('hint_flag',hint_flag,'step3_successflag',step3_successflag,'this.flag',this.flag);

    this.update = function() {
        if (!hint_flag && step3_successflag==0 && !this.flag && mousePositionX >= ratio*this.x && mousePositionX <= ratio*(this.x + this.width) &&
            mousePositionY >= ratio*this.y && mousePositionY <= ratio*(this.y + this.height))
        {
            if (mousePressed)
            {
                // console.log('mousePressed, isClicking ',isClicking, 'select_counter', select_counter, 'this.no', this.no);

                if (!isClicking)
                {
                    select_counter=this.no;
                    disX=mousePositionX/ratio-this.x;
                    disY=mousePositionY/ratio-this.y;
                    isClicking = true;
                }
            }
            else
            {
                isClicking = false;
                select_counter=-1;
            }
        }

        if(!hint_flag && step3_successflag==0 && !this.flag && mousePressed && isClicking) {
            //this.x = mousePositionX/ratio - disX;
            //this.y = mousePositionY/ratio - disY;

            this.x=mousePositionX/ratio-this.width/2;
            this.y=mousePositionY/ratio-this.height/2;

            var count=7;
            if(sceneNo==14){
                count=8;
            }else if(sceneNo==15){
                count=8;
            }else if(sceneNo==16){
                count=9;
            }else if(sceneNo==17){
                count=9;
            }
            for(var i=0; i<success_vals_X[sceneNo-14].length; i++){
                var x=success_vals_X[sceneNo-14][i];
                var y=success_vals_Y[sceneNo-14][i];
                var delta = Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
                if(delta<10 && success_types[sceneNo-14][i]==this.type && typeof(exist_vals[i])=='undefined'){
                    this.flag=true;
                    this.x=x;
                    this.y=y;
                    step3_subcounter++;
                    step3_subpos++;
                    exist_vals[i]=1;

                    //gfsc->
                    select_counter=-1;
                    //<-gfsc

                    if(sceneNo==14)
                        trs1[step3_subpos]=new NewTriangle(ctx, 845, 190, 103, 205, 0, step3_subpos, false);
                    else if(sceneNo==15)
                        trs2[step3_subpos]=new NewTriangle(ctx, 845, 190, 160, 161, 0, step3_subpos, false);
                    else if(sceneNo==16)
                        trs3[step3_subpos]=new NewTriangle(ctx, 845, 190, 165, 108, 0, step3_subpos, false);
                    else if(sceneNo==17)
                        trs4[step3_subpos]=new NewTriangle(ctx, 845, 190, 139, 211, 0, step3_subpos, false);
                    if(step3_subcounter>count){
                        if(step3_hintcounter<4)
                            step3_successflag=2;
                        else
                            step3_successflag=1;
                    }
                }
            }
        }
        if(hint_flag && step3_subpos==this.no){
            this.type=hint_type;
            this.x+=hint_deltaX;
            this.y+=hint_deltaY;
            var hint_delta = Math.sqrt(Math.pow((this.x - hint_aimX), 2) + Math.pow((this.y - hint_aimY), 2));
            if(hint_delta<10){
                hint_flag=false;
                this.x=hint_aimX;
                this.y=hint_aimY;
                exist_vals[hit_no]=1;
                this.flag=true;
                step3_subcounter++;
                step3_subpos++;

                //gfsc->
                select_counter=-1;
                //<-gfsc

                if(sceneNo==14)
                    trs1[step3_subpos]=new NewTriangle(ctx, 845, 190, 103, 205, 0, step3_subpos, false);
                else if(sceneNo==15)
                    trs2[step3_subpos]=new NewTriangle(ctx, 845, 190, 160, 161, 0, step3_subpos, false);
                else if(sceneNo==16)
                    trs3[step3_subpos]=new NewTriangle(ctx, 845, 190, 165, 108, 0, step3_subpos, false);
                else if(sceneNo==17)
                    trs4[step3_subpos]=new NewTriangle(ctx, 845, 190, 139, 211, 0, step3_subpos, false);
                var count=7;
                if(sceneNo==14){
                    count=8;
                }else if(sceneNo==15){
                    count=8;
                }else if(sceneNo==16){
                    count=9;
                }else if(sceneNo==17){
                    count=9;
                }
                if(step3_subcounter>count){
                    if(step3_hintcounter<4)
                        step3_successflag=2;
                    else
                        step3_successflag=1;
                }
            }
        }
    };

    this.draw = function(){
        this.ctx.save();

        var img = new Image();
        switch (sceneNo){
            case 14:
                if(this.type==0){
                    img.src="img/new_triangles/1_0.png";
                }else{
                    img.src="img/new_triangles/1_1.png";
                }
                break;
            case 15:
                if(this.type==0){
                    img.src="img/new_triangles/2_0.png";
                }else{
                    img.src="img/new_triangles/2_1.png";
                }
                break;
            case 16:
                if(this.type==0){
                    img.src="img/new_triangles/3_0.png";
                }else{
                    img.src="img/new_triangles/3_1.png";
                }
                break;
            case 17:
                if(this.type==0){
                    img.src="img/new_triangles/4_0.png";
                }else{
                    img.src="img/new_triangles/4_1.png";
                }
                break;
        }
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        this.ctx.restore();
    };
}
function AnimObj(ctx, x, y, w, h, no, type, image){
    this.ctx=ctx;
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
    this.image=image;
    this.no=no;
    this.type=type;
    this.flag=false;
    this.update=function(){
        if(this.type==1 && anim_flag && !this.flag){
            if(anim_deltaX==-1){
                anim_deltaX=(anim_gols[this.no][0]-anim_objs[this.no].x)/40;
                anim_deltaY=(anim_gols[this.no][1]-anim_objs[this.no].y)/40;
            }
            this.x+=anim_deltaX;
            this.y+=anim_deltaY;
            var delta=Math.sqrt(Math.pow((anim_gols[this.no][0]-this.x), 2) + Math.pow((anim_gols[this.no][1]-this.y), 2));
            if(delta<10){
                this.x=anim_gols[this.no][0];
                this.y=anim_gols[this.no][1];
                this.flag=true;
                anim_pointer++;
                if(anim_pointer>2){
                    anim_pointer=2;
                    step2_anim_flag=true;
                }

                anim_deltaX=-1;
                anim_deltaY=-1;
            }
        }

    };

    this.draw = function(){
        this.ctx.save();
        var img = new Image();
        img.src=this.image;
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        this.ctx.restore();
    };
}
//////////////////////////////
function DrawInitEachFrame(no){

    if(no!=9 && no!=10 && no!=11 && no!=14){
        var background = new Image();
        background.src = backimg[no];
        if(no==13 && step2_subcounter==3){
            var player;
					player = window.parent.GetPlayer();
			player.SetVar("twoTriangle", "pass");
            background.src="";
			
            //step2_bottombt.y=630;
        }else
            step2_bottombt.y=670;

        ctx.drawImage(background, 0, 0, 1280, ctx.canvas.height);
    }

    switch (no){
        case 9:

            var background = new Image();
            background.src="img/backgrounds/back_9.png";
            ctx.drawImage(background, 0, 0, 1280, ctx.canvas.height);

            var border = new Image();
            border.src = "img/border.png";
            ctx.drawImage(border, 490, 360, 310, 310);

            //text
            var label = new Image();
            label.src = "img/label9.png";
            ctx.drawImage(label, 110, 30);
            break;
        case 10:
            var background = new Image();
            background.src="img/backgrounds/back_10.png";
            ctx.drawImage(background, 0, 0, 1280, ctx.canvas.height);

            var border = new Image();
            border.src = "img/border1.png";
            ctx.drawImage(border, 490, 360, 253, 341);

            //text
            var label = new Image();
            label.src = "img/label10.png";
            ctx.drawImage(label, 110, 30);
            break;
        case 11:

            var background = new Image();
            background.src="img/backgrounds/back_11.png";
            ctx.drawImage(background, 0, 0, 1280, ctx.canvas.height);
            var border1 = new Image();
            border1.src = "img/border1.png";
            ctx.drawImage(border1, 215, 360, 253, 338);
            var border2 = new Image();
            border2.src = "img/border1.png";
            ctx.drawImage(border2, 520, 360, 253, 338);
            var border3 = new Image();
            border3.src = "img/border1.png";
            ctx.drawImage(border3, 825, 360, 253, 338);
            var label = new Image();
            label.src = "img/label11.png";
            ctx.drawImage(label, 5, 0);
            break;
        case 12:
            var img1=new Image();
            img1.src="img/success_1.png";
            ctx.drawImage(img1, 100, 355, 253, 338);
            var img2=new Image();
            img2.src="img/success_2.png";
            ctx.drawImage(img2, 370, 355, 253, 338);
            var img3=new Image();
            img3.src="img/success_3.png";
            ctx.drawImage(img3, 640, 355, 253, 338);
            var img4=new Image();
            img4.src="img/success_4.png";
            ctx.drawImage(img4, 910, 355, 253, 338);
            //text
            var label = new Image();
            label.src = "img/label11.png";
            ctx.drawImage(label, 5, 0);

            var alery_imag=new Image();
            alery_imag.src="img/correct_alert2.png";
            ctx.drawImage(alery_imag, 750, 80, 367, 205);
            break;
        case 14:
		var player;
					player = window.parent.GetPlayer();
			player.SetVar("twoTriangle", "pass");
            
		
            /*if(step3_successflag>0){
                var successlabel=new Image();
                if(step3_successflag==1)
                    successlabel.src="img/success_less.png";
                else
                    successlabel.src="img/success_best.png";
                ctx.drawImage(successlabel,  350, 530, 504, 103);
            }            */
			break;
        case 15:
            /*if(step3_successflag>0){
                var successlabel=new Image();
                if(step3_successflag==1)
                    successlabel.src="img/success_less.png";
                else
                    successlabel.src="img/success_best.png";
                ctx.drawImage(successlabel,  350, 530, 504, 103);
            }*/
            break;
        case 16:
            /*if(step3_successflag>0){
                var successlabel=new Image();
                if(step3_successflag==1)
                    successlabel.src="img/success_less.png";
                else
                    successlabel.src="img/success_best.png";
                ctx.drawImage(successlabel,  350, 530, 504, 103);
            }*/
            break;
        case 17:
            if(step3_successflag>0){
                var successlabel=new Image();
                successlabel.src='img/success_end.png';
                ctx.drawImage(successlabel,  420, 430, 504, 103);
            }
            break;
    }
}
function DrawInitButtons(){
    continuebtn = new Button(
        ctx,
        1100, 650, 150, 50,
        true,
        '1',
        null,
        ["img/btn_proceed.png", "img/btn_proceed1.png", "img/btn_proceed_disable.png"],

        function () {

            sceneNo ++;
            // console.log("Scene: ",sceneNo,subsceneNo);
            if(sub_error_flag==2){
                sub_error_flag=0;
                sceneNo=12;
                success_flag=2;
            }
            if(sceneNo == 9){
                DrawTiles(1);
                blocks_flag[9]=[];
                blocks_size[9]=9;
                success_flag=0;

                //sceneNo=11;
                //success_flag=2;

                //sceneNo=13;
                //triangle_showflag=true;
                //step2_subcounter=0;
                ////step2_bottombt.type=1;
                ////anim_flag=true;
                //success_flag=2;

                // GF:dev jump to scene 14
                //             sceneNo=14;

                // GF:dev jump to scene 13
                //             sceneNo=13;
                //             triangle_showflag=true;
                //             step2_subcounter=0;
                //             success_flag=2;
            }

            if(sceneNo==10){
                if(success_flag==2 || success_flag==3){
                    blocks_flag[10]=[];
                    blocks_size[10]=12;
                    //raxy_state[]=[-1, -1, -1];
                    DrawTiles(2);
                    success_flag=0;
                }else{
                    success_flag=1;
                    sceneNo=9;
                    step2_hintcounter++;
                }
            }
            if(sceneNo==11){
                if(success_flag==2 || success_flag==3){
                    blocks_flag[11]=[];
                    blocks_size[11]=9;
                    raxy_state[0]=[0, -1, -1];
                    raxy_state[1]=[0, -1, -1];
                    raxy_state[2]=[0, -1, -1];
                    DrawTiles(3);
                    success_flag=0;
                    continuebtn.flag=false;
                    //gf12->
                    help_flag=true;
                    //<-gf12
                }else{
                    success_flag=1;
                    sceneNo=10;
                    step2_hintcounter++;
                }
            }
            //gf12->
            if(sceneNo==12){ // We're on page 11 - already bumped above
                sub_error_flag=0;
                if(success_flag!=2){

                    //gf12->
                    // If two re-attempts then allow to Proceed...they're only kids...
                    if (hitcounter12==2) {
                        sceneNo=13;
                    }
                    //<-gf12

                    //success_flag=1;
                    //sceneNo=11;
                    //step2_hintcounter++;
                    triangle_showflag=true;
                    step2_subcounter=0;
                } else {
                    sceneNo=13;
                    triangle_showflag=true;
                    step2_subcounter=0;
                    //success_flag=0;
                }
            }
            //<-gf12
            if(sceneNo==13){
                //gf->
				
                help_flag = true;
                //<-gf
                round_boders[0]=new RoundBorder(ctx, 125, 260, 270, 281, 0, 0);
                round_boders[1]=new RoundBorder(ctx, 515, 260, 270, 281, 1, 1);
                round_boders[2]=new RoundBorder(ctx, 895, 260, 270, 281, 2, 2);

                //gf:
                // This is the initial position of triangles as scene 13 starts
                // They cannot be drawn in the odd positions reported by client
                triangles1[0]=new Triangle(ctx, 500, 570, 256, 184, 1, 1, 0, gm_points);
                triangles1[1]=new Triangle(ctx, 700, 570, 256, 184, 1, 1, 1, gm_points);
                triangles2[0]=new Triangle(ctx, 500, 570, 305, 126, 2, 1, 0, gm_points);
                triangles2[1]=new Triangle(ctx, 700, 570, 305, 126, 2, 1, 1, gm_points);
                triangles3[0]=new Triangle(ctx, 500, 570, 168, 138, 3, 1, 0, gm_points);
                triangles3[1]=new Triangle(ctx, 700, 570, 168, 138, 3, 1, 1, gm_points);
				
				
            }
            if(sceneNo==14){
				
                /*step3_hintcounter=0;
                trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
                trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
                step3_subcounter=2;
                step3_subpos=1;*/
				
				
            }
            if(sceneNo==15){
				
                step3_hintcounter=0;
                trs2[0]=new NewTriangle(ctx, 229, 206, 160, 161, 1, 0, true);
                trs2[1]=new NewTriangle(ctx, 845, 190, 161, 161, 0, 1, false);
                step3_subcounter=2;
                step3_subpos=1;
            }
            if(sceneNo==16){
                step3_hintcounter=0;
                trs3[0]=new NewTriangle(ctx, 221, 215, 165, 108, 0, 0, true);
                trs3[1]=new NewTriangle(ctx, 845, 190, 165, 108, 0, 1, false);
                step3_subcounter=2;
                step3_subpos=1;
            }
            if(sceneNo==17){
                step3_hintcounter=0;
                trs4[0]=new NewTriangle(ctx, 163, 179, 139, 211, 0, 0, true);
                trs4[1]=new NewTriangle(ctx, 845, 190, 139, 211, 0, 1, false);
                step3_subcounter=2;
                step3_subpos=1;
                exist_vals=[];
            }
        }
    );
    homebtn = new Button(ctx, 1180, 70, 70, 70, true, 'close', null, ["img/btn_back.png", "img/btn_back1.png", ""], function () {
        sceneNo --;
    });

    rotatebtn=new RotateButton(ctx, 1125, 500, 100, 100);
    helpbutton = new Button(ctx, 1100, 580, 150, 50, true, '1', null, ["img/btn_help.png", "img/btn_help1.png", "img/btn_help1.png"], function () {
        help_flag=true;
    });

    //gf12->
    // Activated when the page 11 'Try Again' button is clicked
    trybtn12 = new Button(ctx, 1100, 580, 150, 50, false, '1', null, ["img/tryagain.png", "img/tryagain1.png", "img/tryagain_disable.png"],
        function () {
            // console.log("Try Again 12, btn enabled", trybtn12.flag, "subsceneNo", subsceneNo);
            if (trybtn12.flag == true) {
                trybtn12.flag = false;
                // 2 attempts
                hitcounter12++;
                //
                // re-enable relevant scene 12 game: sub-scene 1 or subscene 2
                //
                if (subsceneNo == 2) { // Already bumped to 2 from 1 (implies current sub-scene is currently 1
                    subsceneNo=1;
                    // re-draw live tiles
                    for(var i=1; i<9; i++){
                        tiles2[i].x=150+110*i;
                        tiles2[i].y=240;
                        tiles2[i].flag=0;
                        tiles2[i].style=3;
                    }
                    // re-start snapped tiles array
                    raxy_state[1]=[0, -1, -1];
                } else {                 // Nastiness - weird number for subSceneNo (Not 3)
                    subsceneNo=2;
                    for(var i=1; i<9; i++){
                        tiles3[i].x=150+110*i;
                        tiles3[i].y=240;
                        tiles3[i].flag=0;
                        tiles3[i].style=3;
                    }
                    raxy_state[2]=[0, -1, -1];
                }
                tile_enable_flag = true;
                sub_error_flag = 0;
                blocks_flag[sceneNo]=[];
            }
        }
    );
    // Takes us back to page 11 after showin page 12 help
    backbtn12 = new Button(ctx, 1180, 85, 70, 70, true, '1', null, ["img/btn_back.png", "img/btn_back1.png", "img/btn_back1.png"], function () {
        sceneNo=11;
    });
    //<-gf12

    //gf12->
    // help_closebt= new HelpButton(ctx, 800, 280, 50, 50, true, '1', null, ["img/help_close.png", "img/help_close.png", "img/help_close.png"], function () {
    help_closebt= new HelpButton(ctx, 800, 310, 50, 50, true, '1', null, ["img/help_close.png", "img/help_close.png", "img/help_close.png"], function () {
        //<-gf12
        help_flag=false;
    });
    //gf->
    // step2_generatebt=new Button(ctx, 80, 620, 198, 89, true, '1', null, ['img/generatebt_none.png', 'img/generatebt_select.png', 'generatebt_none.png'], function(){
    //    triangle_showflag=true;
    // });
    //<-gf
    //gfexperimental->
    // step2_bottombt=new BottomButton(ctx, 1000, 670, 160, 40, 0, ["img/btn_continue.png", "img/btn_continue.png", "img/btn_continue.png"], ["img/tryagain.jpg", "img/tryagain1.jpg", "img/tryagain.jpg"]);
/////    step2_bottombt=new BottomButton(ctx, 1000, 670, 160, 40, 0, ["img/btn_continue.png", "img/btn_continue1.png", "img/btn_continue.png"], ["img/tryagain.jpg", "img/tryagain1.jpg", "img/tryagain.jpg"]);
    step2_bottombt=new BottomButton(ctx, 1000, 670, 160, 40, 0, ["img/btn_proceed.png", "img/btn_proceed1.png", "img/btn_proceed.png"], ["img/tryagain.jpg", "img/tryagain1.jpg", "img/tryagain.jpg"]);
    //<-gfexperimental

    step3_hintbutton=new Button(ctx, 1125, 640, 67, 67, true, '1', null, ['img/hint_bt1.png', 'img/hint_bt1.png', 'img/hint_bt1.png'],
        function(){

            for(var i=0; i<success_vals_X[sceneNo-14].length; i++){
                if(typeof(exist_vals[i])=='undefined'){
                    hint_flag=true;
                    hit_no=i;
                    hint_aimX=success_vals_X[sceneNo-14][i];
                    hint_aimY=success_vals_Y[sceneNo-14][i];
                    hint_type=success_types[sceneNo-14][i];
                    step3_hintcounter++;
                    switch  (sceneNo){
                        case 14:
                            hint_deltaX=(hint_aimX-trs1[step3_subpos].x)/34;
                            hint_deltaY=(hint_aimY-trs1[step3_subpos].y)/34;
                            break;
                        case 15:
                            hint_deltaX=(hint_aimX-trs2[step3_subpos].x)/34;
                            hint_deltaY=(hint_aimY-trs2[step3_subpos].y)/34;
                            break;
                        case 16:
                            hint_deltaX=(hint_aimX-trs3[step3_subpos].x)/34;
                            hint_deltaY=(hint_aimY-trs3[step3_subpos].y)/34;
                            break;
                        case 17:
                            hint_deltaX=(hint_aimX-trs4[step3_subpos].x)/34;
                            hint_deltaY=(hint_aimY-trs4[step3_subpos].y)/34;
                            break;
                    }

                    break;
                }
            }
        }
    );
    //gfexperimental->
    // step3_rotatebutton=new Button(ctx, 800, 540, 200, 63, true, '1', null, ['img/rotate1.png', 'img/rotate2.png', 'img/rotate1.png'], function(){
    //     switch (sceneNo){
    //         case 14:
    //             if(trs1[step3_subpos].type==0)
    //                 trs1[step3_subpos].type=1;
    //             else
    //                 trs1[step3_subpos].type=0;
    //             break;
    //         case 15:
    //             if(trs2[step3_subpos].type==0)
    //                 trs2[step3_subpos].type=1;
    //             else
    //                 trs2[step3_subpos].type=0;
    //             break;
    //         case 16:
    //             if(trs3[step3_subpos].type==0)
    //                 trs3[step3_subpos].type=1;
    //             else
    //                 trs3[step3_subpos].type=0;
    //             break;
    //         case 17:
    //             if(trs4[step3_subpos].type==0)
    //                 trs4[step3_subpos].type=1;
    //             else
    //                 trs4[step3_subpos].type=0;
    //             break;
    //     }
    // });
    //<-gfexperimental

    //gfexperimental->
    // step3_continuebt=new Button(ctx, 900, 550, 200, 63, true, '1', null, ['img/btn_continue.png', 'img/btn_continue.png', 'img/tryagain.jpg'], function(){
    step3_continuebt=new Button(ctx, 900, 550, 200, 63, true, '1', null, ['img/btn_continue.png', 'img/btn_continue1.png', 'img/tryagain.jpg'], function(){
        //<-gfexperimental
        sceneNo++;
        step3_successflag=0;
        exist_vals=[];
        if(sceneNo>17){
			
            sceneNo=0;
            subsceneNo=0;
            selectNo=-1;
        }

        if(sceneNo==14){
			
            step3_hintcounter=0;
            trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
            trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
			
			
        }
        if(sceneNo==15){
            step3_hintcounter=0;
            trs2[0]=new NewTriangle(ctx, 229, 206, 160, 161, 1, 0, true);
            trs2[1]=new NewTriangle(ctx, 845, 190, 161, 161, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
        }
        if(sceneNo==16){
            step3_hintcounter=0;
            trs3[0]=new NewTriangle(ctx, 221, 215, 165, 108, 0, 0, true);
            trs3[1]=new NewTriangle(ctx, 845, 190, 165, 108, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
        }
        if(sceneNo==17){
            step3_hintcounter=0;
            trs4[0]=new NewTriangle(ctx, 163, 179, 139, 211, 0, 0, true);
            trs4[1]=new NewTriangle(ctx, 845, 190, 139, 211, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
            exist_vals=[];
        }
    });

}
function DrawTiles(levelno){
    switch (levelno){
        case 1:
            for(var i=0; i<9; i++)
            {
                tiles[i] = new QuadTile(ctx, 150+110*i, 240, 100, 100, i, 1, 0, 0);
            }
            break;
        case 2:
            for(var i=0; i<blocks_size[10]; i++)
            {
                tiles[i] = new QuadTile(ctx, 150+80*i, 240, 61, 111, i, 2, 0, 0);
            }
            break;
        case 3:
            for(var i=1; i<9; i++)
            {
                tiles[i] = new QuadTile(ctx, 150+110*i, 240, 121, 112, i, 3, 0, 0);
                tiles2[i] = new QuadTile(ctx, 150+110*i, 240, 121, 112, i, 3, 0, 1);
                tiles3[i] = new QuadTile(ctx, 150+110*i, 240, 121, 112, i, 3, 0, 2);
            }
            tiles[0]=new QuadTile(ctx,raxy[sceneNo][0][0][0], raxy[sceneNo][0][0][1], 121, 112, 0, 3, 1, 0);
            tiles2[0]=new QuadTile(ctx,raxy[sceneNo][0][0][0]+305, raxy[sceneNo][0][0][1], 121, 112, 0, 3, -1, 1);
            tiles3[0]=new QuadTile(ctx,raxy[sceneNo][0][0][0]+610, raxy[sceneNo][0][0][1], 121, 112, 0, 3, -1, 2);
            break;
    }
}
function UpdateButtons(no){

    var size=0;
    var count=0;
    switch (no){
        case 9:
            size=9;
            break;
        case 10:
            size=12;
            break;
        case 11:
            size=9;
            blocks_flag[sceneNo][0]=0;
            tiles2[0].update();
            tiles2[0].draw();
            tiles3[0].update();
            tiles3[0].draw();
            //gf12->
            // helpbutton.update();
            // helpbutton.draw();
            trybtn12.update();
            trybtn12.draw();
            //<-gf12
            break;
        //gf12->
        case 12:
            // console.log("UpdateButtons scene 12");
            backbtn12.update();
            backbtn12.draw();
            break;
        //<-gf12
        case 13:
            //gf:case13
            if(step2_subcounter<3){
                //if(step2_bottombt.type==0){
                //    step2_generatebt.update();
                //    step2_generatebt.draw();
                //}
                for(var i=0; i<3; i++){
                    round_boders[i].update();
                    round_boders[i].draw();
                }
                if(triangle_showflag){
                    if(step2_subcounter==0){
                        triangles1[0].update();
                        triangles1[0].draw();
                        triangles1[1].update();
                        triangles1[1].draw();
                    }
                    if(step2_subcounter==1){
                        //gf-> switch off after first box if not already ...
                        help_flag=false;
                        //<-gf
                        triangles1[0].update();
                        triangles1[0].draw();
                        triangles1[1].update();
                        triangles1[1].draw();
                        triangles2[0].update();
                        triangles2[0].draw();
                        triangles2[1].update();
                        triangles2[1].draw();
                    }
                    if(step2_subcounter==2){
                        triangles1[0].update();
                        triangles1[0].draw();
                        triangles1[1].update();
                        triangles1[1].draw();
                        triangles2[0].update();
                        triangles2[0].draw();
                        triangles2[1].update();
                        triangles2[1].draw();
                        triangles3[0].update();
                        triangles3[0].draw();
                        triangles3[1].update();
                        triangles3[1].draw();
                        if(step2_trybt_flag){
                            //gf14->
                            // step2_trybutton.update();
                            // step2_trybutton.draw();
                            //<-gf14
                        }
                    }
                }
                if(step2_subcounter==1){
                    triangles1[0].update();
                    triangles1[0].draw();
                    triangles1[1].update();
                    triangles1[1].draw();
                }else if(step2_subcounter==2){
                    triangles1[0].update();
                    triangles1[0].draw();
                    triangles1[1].update();
                    triangles1[1].draw();
                    triangles2[0].update();
                    triangles2[0].draw();
                    triangles2[1].update();
                    triangles2[1].draw();
                }
            }
			else{
                if(anim_pointer<3){
                    for(var i=0; i<=anim_pointer; i++){
                        anim_points[i].draw();
                        anim_objs[i].update();
                        anim_objs[i].draw();
                    }
                }
            }
            if(step2_anim_flag){
                step2_bottombt.update();
                step2_bottombt.draw();
            }

            for(var i=0; i<3; i++){
                if(round_boders[i].flag && !anim_flag){
                    var successlabel=new Image();
                    if(round_boders[i].no==0){
                        successlabel.src="img/successlabel_1.png";
                        round_boders[i].ctx.drawImage(successlabel, round_boders[i].x+8, round_boders[i].y+round_boders[i].height+5, successlabel.width, successlabel.height);
                    if(audio_count == 0){
						audio.play();
						audio_count = 1;
					}}
                    if(round_boders[i].no==1){
                        successlabel.src="img/successlabel_2.png";
                        round_boders[i].ctx.drawImage(successlabel, round_boders[i].x+14, round_boders[i].y+round_boders[i].height+5, successlabel.width, successlabel.height);
                    if(audio2_count == 0){
						audio2.play();
						audio2_count = 1;
					}}
                    if(round_boders[i].no==2){
                        successlabel.src="img/successlabel_3.png";
                        round_boders[i].ctx.drawImage(successlabel, round_boders[i].x+11, round_boders[i].y+round_boders[i].height+5, successlabel.width, successlabel.height);
                    if(audio3_count == 0){
						audio3.play();
						audio3_count = 1;
					}}
                }
            }
            break;
        case 14:

            //if(step3_successflag==0){
             //   step3_hintbutton.update();
             //   step3_hintbutton.draw();
                //gfexperimental->
                // step3_rotatebutton.update();
                // step3_rotatebutton.draw();
                //<-gfexperimental
            //}else{
            //    step3_continuebt.update();
            //    step3_continuebt.draw();
            //}

            //for(var i=0; i<step3_subcounter; i++){
            //for(var i=step3_subcounter-1; i>=0; i--){
            //    trs1[i].update();
            //    trs1[i].draw();
            //}
            break;
        case 15:
            if(step3_successflag==0){
                step3_hintbutton.update();
                step3_hintbutton.draw();
                //gfexperimental->
                // step3_rotatebutton.update();
                // step3_rotatebutton.draw();
                //<-gfexperimental
            }else{
                step3_continuebt.update();
                step3_continuebt.draw();
            }

            for(var i=0; i<step3_subcounter; i++){
                trs2[i].update();
                trs2[i].draw();
            }
            break;
        case 16:
            if(step3_successflag==0){
                step3_hintbutton.update();
                step3_hintbutton.draw();
                //gfexperimental->
                // step3_rotatebutton.update();
                // step3_rotatebutton.draw();
                //<-gfexperimental
            }else{
                step3_continuebt.update();
                step3_continuebt.draw();
            }

            for(var i=0; i<step3_subcounter; i++){
                trs3[i].update();
                trs3[i].draw();
            }
            break;
        case 17:
            if(step3_successflag==0){
                step3_hintbutton.update();
                step3_hintbutton.draw();
                //gfexperimental->
                // step3_rotatebutton.update();
                // step3_rotatebutton.draw();
                //<-gfexperimental
            }else{
                step3_continuebt.update();
                step3_continuebt.draw();
            }
            for(var i=0; i<step3_subcounter; i++){
                trs4[i].update();
                trs4[i].draw();
            }
            break;
    }
    if(no==9 || no==10 || no==11){
        //<-gfexperimental

        //hint_animation

        for(var i=0; i<size; i++){
            if(subsceneNo==0){
                // console.log('selectNo',selectNo);
                if(selectNo!=i){            // selectNo == currently selected tile
                    //gfexperimental2->
                    // tiles[i].update();      // update all non-selected positions
                    // tiles[i].draw();        // draw (dumb)
                    //<-gfexperimental2
                }
            }else if(subsceneNo==1){
                tiles[i].update();
                tiles[i].draw();
                if(selectNo!=i){
                    //gfexperimental2->
                    // tiles2[i].update();
                    // tiles2[i].draw();
                    //<-gfexperimental2
                }

            }else if(subsceneNo==2){
                tiles[i].update();
                tiles[i].draw();
                tiles2[i].update();
                tiles2[i].draw();
                if(selectNo!=i){
                    //gfexperimental2->
                    // tiles3[i].update();
                    // tiles3[i].draw();
                    //<-gfexperimental2
                }
            }
            else{
                // we come here when last sub-scene box has been completed
                tiles[i].update();
                tiles[i].draw();
                tiles2[i].update();
                tiles2[i].draw();
                tiles3[i].update();
                tiles3[i].draw();
            }
        } // end for

        //gfexperimental2->
        //
        // Draw snapped tiles before live tiles
        //
        // Live tiles now get a higher Z-order
        //
        var snapped = [];
        var live = [];
        if (subsceneNo == 0) {
            for (var i = 0; i < size; i++) {
                if (selectNo != i) {        // selectNo == currently selected tile .. updated below
                    if (tiles[i].flag == 1) {
                        snapped.push(tiles[i]);
                    } else {
                        live.push(tiles[i]);
                    }
                }
            }
            for (var i = 0; i < snapped.length; i++) {
                snapped[i].update();
                snapped[i].draw();
            }
            for (var i = 0; i < live.length; i++) {
                live[i].update();
                live[i].draw();
            }
        }
        else if (subsceneNo == 1) {
            for (var i = 0; i < size; i++) {
                if (selectNo != i) {        // selectNo == currently selected tile .. updated below
                    if (tiles2[i].flag == 1) {
                        snapped.push(tiles2[i]);
                    } else {
                        live.push(tiles2[i]);
                    }
                }
            }
            for (var i = 0; i < snapped.length; i++) {
                snapped[i].update();
                snapped[i].draw();
            }
            for (var i = 0; i < live.length; i++) {
                live[i].update();
                live[i].draw();
            }
        }
        else if (subsceneNo == 2) {
            for (var i = 0; i < size; i++) {
                if (selectNo != i) {        // selectNo == currently selected tile .. updated below
                    if (tiles3[i].flag == 1) {
                        snapped.push(tiles3[i]);
                    } else {
                        live.push(tiles3[i]);
                    }
                }
            }
            for (var i = 0; i < snapped.length; i++) {
                snapped[i].update();
                snapped[i].draw();
            }
            for (var i = 0; i < live.length; i++) {
                live[i].update();
                live[i].draw();
            }
        }
        //<-gfexperimental2

        if(selectNo!=-1)            // Update and draw the currently selected tile - if any
        {
            if(subsceneNo==0){
                tiles[selectNo].update();
                tiles[selectNo].draw();
            }
            if(subsceneNo==1){
                tiles2[selectNo].update();
                tiles2[selectNo].draw();
            }
            if(subsceneNo==2){
                tiles3[selectNo].update();
                tiles3[selectNo].draw();
            }
        }

        //GF:1->
        if (sceneNo != 12) {
            //<-GF:
            count = 0;
            for (var i = 0; i < blocks_flag[sceneNo].length; i++)
                if (typeof blocks_flag[sceneNo][i] != 'undefined')
                    count++;
            if (count == size) {
                // Blocks are all snapped for this scene/subscene
                // Confirm success or duplicated sub-scene
                if (sceneNo == 11) {
                    // //gfxb-bump After use->
                    // subsceneNo++;
                    // //<-gfxb
                    //gfxb->
                    // if (subsceneNo == 1) {
                    if (subsceneNo == 0) {
                        //<-gfxb
                        // Always correct w.r.t. other two sub-scenes - as they not attempted yet
                        tiles2[0].flag = 1;
                        for (var i = 0; i < blocks_flag[sceneNo].length; i++)
                            tiles[i].flag = 1;
                        blocks_flag[sceneNo] = [];
                        //gfxb->
                        // } else if (subsceneNo == 2) {
                    } else if (subsceneNo == 1) {
                        //<-gfxb
                        if (raxy_state[0][0] == raxy_state[1][0] && raxy_state[0][1] == raxy_state[1][1] && raxy_state[0][2] == raxy_state[1][2]) {
                            // Error: All 3 rows of sub-scene 0 and sub-scene 1 have the same orientation.
                            //
                            // Previously commented
                            //subsceneNo=1;
                            //for(var i=1; i<9; i++){
                            //    tiles2[i].x=150+110*i;
                            //    tiles2[i].y=240;
                            //    tiles2[i].flag=0;
                            //    tiles2[i].style=3;
                            //}
                            //raxy_state[1]=[0, -1, -1];
                            tile_enable_flag = false;
                            sub_error_flag = 1;
                            continuebtn.flag = true;
                            //gf12->
                            trybtn12.flag = true;
                            //<-gf12
                            tiles3[0].flag = 1;
                        } else {
                            tiles3[0].flag = 1;
                            for (var i = 0; i < blocks_flag[sceneNo].length; i++)
                                tiles2[i].flag = 1;
                        }
                        blocks_flag[sceneNo] = [];
                        //gfxb->
                        // } else {
                    } else if (subsceneNo == 2) {
                        //<-gfxb
                        if ((raxy_state[1][0] == raxy_state[2][0] && raxy_state[1][1] == raxy_state[2][1] && raxy_state[1][2] == raxy_state[2][2])
                            // Error: All 3 rows of sub-scene 1 and sub-scene 2 have the same orientation.
                            ||
                            (raxy_state[0][0] == raxy_state[2][0] && raxy_state[0][1] == raxy_state[2][1] && raxy_state[0][2] == raxy_state[2][2])) {
                            // Error: All 3 rows of sub-scene 0 and sub-scene 2 have the same orientation.
                            //
                            // sub-scene 0 and sub-scene 1 have already been 'passed as ok in the test clause for sub-scene 1
                            //
                            // Previously commented
                            //subsceneNo=2;
                            //for(var i=1; i<9; i++){
                            //    tiles3[i].x=150+110*i;
                            //    tiles3[i].y=240;
                            //    tiles3[i].flag=0;
                            //    tiles3[i].style=3;
                            //}
                            //raxy_state[2]=[0, -1, -1];
                            //success_flag=-1;
                            //blocks_flag[sceneNo]=[];
                            tile_enable_flag = false;
                            sub_error_flag = 1;
                            continuebtn.flag = true;
                            //gf12->
                            trybtn12.flag = true;
                            //<-gf12
                        } else {
                            //Game Success

                            success_flag = 2;
                            continuebtn.flag = true;

                        }
                    }
                    //gfxb->
                    subsceneNo++;
                    //<-gfxb
                } else {
                    //Game Success
                    success_flag = 2;
                }
            }
            //GF->
        } // <- not scene 12
        //<-GF
        if(success_flag==1 && step2_hintcounter!=2){
            var wrong = new Image();
            wrong.src = 'img/wrong2.png';
            ctx.drawImage(wrong, 400, 200);
            continuebtn.flag=false;
        }
        if(success_flag==1 && step2_hintcounter==2 && sceneNo==11){
            var wrong = new Image();
            wrong.src = 'img/wrong2.png';
            ctx.drawImage(wrong, 400, 200);
            continuebtn.flag=false;
        }

        if(success_flag==2){
            var correct = new Image();
            correct.src = 'img/correct.png';
            ctx.drawImage(correct, 400, 200);
        }
        if(success_flag==3){
            var correct = new Image();
            correct.src = 'img/correct_3.png';
            ctx.drawImage(correct, 430, 200);
        }
        if(step2_hintcounter==2){
            if(sceneNo==9 || sceneNo==10){
                var anim_img = new Image();
                anim_img.src = 'img/correct_anim.png';
                ctx.drawImage(anim_img, 730, 50);
            }
        }
        if(sub_error_flag==1){
            var wrong = new Image();
            wrong.src = 'img/wrong1.png';
            ctx.drawImage(wrong, 400, 200);
        }
    }

    if(click_flag==1){
        var rotate_frame = new Image();
        rotate_frame.src = 'img/correct_alert.png';
        ctx.drawImage(rotate_frame, 500, 630);
    }

    if(anim_counterflag){
        anim_timecounter++;
        if(anim_timecounter>400){
            anim_flag=true;
            anim_timecounter=0;
            anim_counterflag=false;
            step2_subcounter++;
            anim_completeflag=true;
            anim_pointer= 0;
			
			var player;
					player = window.parent.GetPlayer();
			player.SetVar("twoTriangle", "pass");
			/*if(audio4_count == 0){
				audio4.play();
				audio4_count = 1;
			}*/

            anim_points[0]=new AnimObj(ctx, 150, 280, 225, 78, 0, 0, "img/step2_anims/1_2.png");
            anim_points[1]=new AnimObj(ctx, 400, 500, 241, 107, 1, 0, "img/step2_anims/2_2.png");
            anim_points[2]=new AnimObj(ctx, 750, 280, 221, 103, 2, 0, "img/step2_anims/3_2.png");
            anim_objs[0]=new AnimObj(ctx, 500, 50, 225, 78, 0, 1, "img/step2_anims/1_1.png");
            anim_objs[1]=new AnimObj(ctx, 500, 50, 216, 107, 1, 1, "img/step2_anims/2_1.png");
            anim_objs[2]=new AnimObj(ctx, 500, 50, 219, 106, 2, 1, "img/step2_anims/3_1.png");
        }
    }

    if(help_flag){
        var help_frame=new Image();
        help_frame.src="img/help_frame.png";
        //gf12->
        // ctx.drawImage(help_frame, 390, 270);
        ctx.drawImage(help_frame, 390, 300);
        //<-gf12
        help_closebt.update();
        help_closebt.draw();
    }

}

function DrawScene(){
    /**GF:*/
    ratio = ctx.canvas.clientWidth/1280;
    // ratio = ctx.canvas.clientWidth/ctx.canvas.clientHeight;
    /**GF:*/
    clear();
    DrawInitEachFrame(sceneNo);
    //gf12->
    // if(sceneNo<13)
		
    if(sceneNo<12)
    //<-gf12
    {
        continuebtn.update();
        continuebtn.draw();
    }

    if(sceneNo>0 && sceneNo<9){
        homebtn.update();
        homebtn.draw();
    }
    if(sceneNo>8){
        UpdateButtons(sceneNo);
		
    }

	
}

/*
 * Here be Dragons!!!
 */
$(function() {
    /**GF:**/
    // Scrollbars off in browser - mobile not sure - tested in Chrome, IE 11
    $("body").css("overflow", "hidden");
    //
    canvas = document.getElementById('gameCanvas');
    // canvas = document.getElementById('main');
    /**GF:**/

    ctx = canvas.getContext('2d');

    /**GF:**/
    function redraw() {
        //
        // http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/#disqus_thread
        //
        var gameArea = document.getElementById('gameArea'); // DIV wrapping the canvas
        var widthToHeight = 1280 / 960;                     // ***Must*** match to pick up mouse pointer
        // var widthToHeight = 1280 / 960;                     // ***Must*** match to pick up mouse pointer
        var newWidth = window.innerWidth;                   // Not sure if cross-browser
        var newHeight = window.innerHeight;                 //       -- ditto --
        var newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            canvas.style.height = newHeight + 'px';         // Changed to canvas from div
            canvas.style.width = newWidth + 'px';           // Changed to canvas from div
        } else {
            // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            canvas.style.width = newWidth + 'px';           // Changed to canvas from div
            canvas.style.height = newHeight + 'px';         // Changed to canvas from div
        }
        //
        canvas.style.marginTop = (-newHeight / 2) + 'px';   // Read the link
        canvas.style.marginLeft = (-newWidth / 2) + 'px';   // Read the link
    }
	
		function forceProceedBtn()
	{
			  console.log("entered here NOW");
       sceneNo ++;
        if(sub_error_flag==2){
            sub_error_flag=0;
            sceneNo=12;
            success_flag=2;
        }
        if(sceneNo == 9){
            DrawTiles(1);
            blocks_flag[9]=[];
            blocks_size[9]=9;
            success_flag=0;

            //sceneNo=11;
            //success_flag=2;

            //sceneNo=13;
            //triangle_showflag=true;
            //step2_subcounter=0;
            ////step2_bottombt.type=1;
            ////anim_flag=true;
           // success_flag=2;

// GF:dev jump to scene 12
            // sceneNo=12;
        }
        if(sceneNo==10){
            if(success_flag==2 || success_flag==3){
                blocks_flag[10]=[];
                blocks_size[10]=12;
                //raxy_state[]=[-1, -1, -1];
                DrawTiles(2);
                success_flag=0;
            }else{
                success_flag=1;
                sceneNo=9;
                step2_hintcounter++;
            }
        }
        if(sceneNo==11){
            if(success_flag==2 || success_flag==3){
                blocks_flag[11]=[];
                blocks_size[11]=9;
                raxy_state[0]=[0, -1, -1];
                raxy_state[1]=[0, -1, -1];
                raxy_state[2]=[0, -1, -1];
                DrawTiles(3);
                success_flag=0;
                continuebtn.flag=false;
                help_flag=true;
            }else{
                success_flag=1;
                sceneNo=10;
                step2_hintcounter++;
            }
        }
        if(sceneNo==12){
            sub_error_flag=0;
            if(success_flag!=2){
                //success_flag=1;
                //sceneNo=11;
                //step2_hintcounter++;
                triangle_showflag=true;
                step2_subcounter=0;
            }else{
                sceneNo=13;
                triangle_showflag=true;
                step2_subcounter=0;
                //success_flag=0;
            }
        }
        if(sceneNo==13){
            //gf->
            help_flag = true;
            //<-gf
            round_boders[0]=new RoundBorder(ctx, 125, 440, 270, 281, 0, 0);
            round_boders[1]=new RoundBorder(ctx, 515, 440, 270, 281, 1, 1);
            round_boders[2]=new RoundBorder(ctx, 895, 440, 270, 281, 2, 2);

            triangles1[0]=new Triangle(ctx, 500, 800, 256, 184, 1, 1, 0, gm_points);
            triangles1[1]=new Triangle(ctx, 700, 800, 256, 184, 1, 1, 1, gm_points);
            triangles2[0]=new Triangle(ctx, 500, 800, 305, 126, 2, 1, 0, gm_points);
            triangles2[1]=new Triangle(ctx, 700, 800, 305, 126, 2, 1, 1, gm_points);
            triangles3[0]=new Triangle(ctx, 500, 800, 168, 138, 3, 1, 0, gm_points);
            triangles3[1]=new Triangle(ctx, 700, 800, 168, 138, 3, 1, 1, gm_points);
        }
        if(sceneNo==14){
			
            /*step3_hintcounter=0;
            trs1[0]=new NewTriangle(ctx, 170, 271, 103, 205, 0, 0, true);
            trs1[1]=new NewTriangle(ctx, 845, 190, 103, 205, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;*/
        }
        if(sceneNo==15){
            /*step3_hintcounter=0;
            trs2[0]=new NewTriangle(ctx, 229, 206, 160, 161, 1, 0, true);
            trs2[1]=new NewTriangle(ctx, 845, 190, 161, 161, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;*/
        }
        if(sceneNo==16){
            step3_hintcounter=0;
            trs3[0]=new NewTriangle(ctx, 221, 215, 165, 108, 0, 0, true);
            trs3[1]=new NewTriangle(ctx, 845, 190, 165, 108, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
        }
        if(sceneNo==17){
            step3_hintcounter=0;
            trs4[0]=new NewTriangle(ctx, 163, 179, 139, 211, 0, 0, true);
            trs4[1]=new NewTriangle(ctx, 845, 190, 139, 211, 0, 1, false);
            step3_subcounter=2;
            step3_subpos=1;
            exist_vals=[];
        }
	}
    // update on any window size change.
    window.addEventListener("resize", redraw);
    // first draw - just do it - now!
    redraw();
    /**GF:**/

    DrawInitButtons();
    //Level 1
	
	if(sceneNo==11)
	{
		forceProceedBtn();
		forceProceedBtn();
	}

	
    raxy[9]= [
        [[496, 366], [596, 366], [696, 366]],
        [[496, 466], [596, 466], [696, 466]],
        [[496, 566], [596, 566], [696, 566]]
    ];
    //Level 2
    raxy[10]= [
        [[494, 365], [555, 365], [616, 365], [677, 365]],
        [[494, 476], [555, 476], [616, 476], [677, 476]],
        [[494, 586], [555, 586], [616, 586], [677, 586]]
    ];
    //Level 3
    raxy[11]= [
        [[220, 365], [281, 365], [342, 365]],
        [[220, 473], [281, 473], [342, 473]],
        [[220, 582], [281, 582], [342, 582]]
    ];

    //gfjq->
    $("#gameCanvas").mousemove(function(event){
    // canvas.addEventListener('mousemove', function (event) {
    //<-gfjq
        if(!touch_endflag){
            var x=event.offsetX || event.layerX;
            var y=event.offsetY || event.layerY;
            var deltax=mousePositionX-x;
            var deltay=mousePositionY-y;
            if(Math.abs(deltax)>1 || Math.abs(deltay)>1){
                mouseMoving = true;
            }
            //gf11->
            else {
                if (sceneNo != 13) {
                    mouseMoving = false;
                }
            }
            //<-gf11
            // Global Position
            mousePositionX=x;
            mousePositionY=y;
        }
    });


    //gfjq->
    $("#gameCanvas").mousedown(function(event){
    // canvas.addEventListener('mousedown', function () {
    //<-gfjq
        // console.log("mouse down");
        if(!touch_endflag){
            mousePressed = true;
            mouseMoving = false;
            mouseUpflag=false;
            if(success_flag==1){
                success_flag=0;
                continuebtn.flag=true;

                //step2 hint confirm
                if(step2_hintcounter==2){
                    step2_hintcounter=0;
                    step2_hintflag=true;
                    switch (sceneNo){
                        case 9:
                            for(var i=0; i<9; i++)
                            {
                                tiles[i].x=150+110*i;
                                tiles[i].y=240;
                                tiles[i].flag=1;
                            }
                            step2_hitpos=0;
                            continuebtn.flag=false;
                            break;
                        case 10:
                            for(var i=0; i<blocks_size[10]; i++)
                            {
                                tiles[i].x=150+80*i;
                                tiles[i].y=240;
                                tiles[i].flag=1;
                            }
                            step2_hitpos=0;
                            continuebtn.flag=false;
                            break;
                        case 11:
                            step2_hintflag=false;
                            sceneNo=12;
                            success_flag=0;
                            break;
                    }
                }
            }
        }
    });


    //gfjq->
    $("#gameCanvas").mouseup(function(event){
    // canvas.addEventListener('mouseup', function (event) {
    //gfjq->
        // console.log("mouse up");
        mousePositionX=event.offsetX || event.layerX;
        mousePositionY=event.offsetY || event.layerY;
        if(!touch_endflag){
            if(temp_flag){
                mouseUpflag=true;
                temp_flag=false;
            }

            //gf13->
            if (sceneNo==13) {
                //<-gf13
                if (selectNo != -1 && click_flag)
                    click_flag = false;
                if (select_counter != -1 && !mouseMoving) {
                    if (step2_subcounter == 0) {
                        triangles1[select_counter].value++;
                        if (triangles1[select_counter].value > 4)
                            triangles1[select_counter].value = 1;

                        if (triangles1[select_counter].value == 1) {
                            triangles1[select_counter].x = mousePositionX / ratio - triangles1[select_counter].width * 0.9 / 2;
                            triangles1[select_counter].y = mousePositionY / ratio - triangles1[select_counter].height * 0.6 / 2;
                        } else if (triangles1[select_counter].value == 2) {
                            triangles1[select_counter].x = mousePositionX / ratio - triangles1[select_counter].width * 1 / 2;
                            triangles1[select_counter].y = mousePositionY / ratio - triangles1[select_counter].height * 1.1 / 2;
                        } else if (triangles1[select_counter].value == 3) {
                            triangles1[select_counter].x = mousePositionX / ratio - triangles1[select_counter].width * 1.4 / 2;
                            triangles1[select_counter].y = mousePositionY / ratio - triangles1[select_counter].height * 0.8 / 2;
                        } else {
                            triangles1[select_counter].x = mousePositionX / ratio - triangles1[select_counter].width * 0.4 / 2;
                            triangles1[select_counter].y = mousePositionY / ratio - triangles1[select_counter].height * 1.2 / 2;
                        }
                    }
                    if (step2_subcounter == 1) {
                        triangles2[select_counter].value++;
                        if (triangles2[select_counter].value > 4)
                            triangles2[select_counter].value = 1;

                        if (triangles2[select_counter].value == 1) {
                            triangles2[select_counter].x = mousePositionX / ratio - triangles2[select_counter].width * 2.4 / 2;
                            triangles2[select_counter].y = mousePositionY / ratio - triangles2[select_counter].height * 0.5 / 2;
                        } else if (triangles2[select_counter].value == 2) {
                            triangles2[select_counter].x = mousePositionX / ratio - triangles2[select_counter].width * 0.3 / 2;
                            triangles2[select_counter].y = mousePositionY / ratio - triangles2[select_counter].height * 2.1 / 2;
                        } else if (triangles2[select_counter].value == 3) {
                            triangles2[select_counter].x = mousePositionX / ratio - triangles2[select_counter].width * 1.75 / 2;
                            triangles2[select_counter].y = mousePositionY / ratio - triangles2[select_counter].height * 0.3 / 2;
                        } else {
                            triangles2[select_counter].x = mousePositionX / ratio - triangles2[select_counter].width * 0.5 / 2;
                            triangles2[select_counter].y = mousePositionY / ratio - triangles2[select_counter].height * 2 / 2;
                        }
                    }
                    if (step2_subcounter == 2) {
                        triangles3[select_counter].value++;
                        if (triangles3[select_counter].value > 4)
                            triangles3[select_counter].value = 1;

                        if (triangles3[select_counter].value == 1) {
                            triangles3[select_counter].x = mousePositionX / ratio - triangles3[select_counter].width * 1.3 / 2;
                            triangles3[select_counter].y = mousePositionY / ratio - triangles3[select_counter].height * 0.8 / 2;
                        } else if (triangles3[select_counter].value == 2) {
                            triangles3[select_counter].x = mousePositionX / ratio - triangles3[select_counter].width * 0.9 / 2;
                            triangles3[select_counter].y = mousePositionY / ratio - triangles3[select_counter].height * 1.3 / 2;
                        } else if (triangles3[select_counter].value == 3) {
                            triangles3[select_counter].x = mousePositionX / ratio - triangles3[select_counter].width * 0.75 / 2;
                            triangles3[select_counter].y = mousePositionY / ratio - triangles3[select_counter].height * 0.8 / 2;
                        } else {
                            triangles3[select_counter].x = mousePositionX / ratio - triangles3[select_counter].width * 0.9 / 2;
                            triangles3[select_counter].y = mousePositionY / ratio - triangles3[select_counter].height * 0.8 / 2;
                        }
                    }
                    click_flag = false;
                }
                //gf13->
            }
            //<-gf13
            if(selectNo!=-1 && !mouseMoving){
                if(sceneNo==11 && subsceneNo==0 && tiles[selectNo].flag==0){
                    // console.log("ROTATE 11 0");
                    if(tiles[selectNo].style==3){
                        tiles[selectNo].style=4;
                        tiles[selectNo].substyle=1;
                    }
                    else{
                        tiles[selectNo].style=3;
                        tiles[selectNo].substyle=0;
                    }
                }
                //gf11->
                // if(sceneNo==11 && subsceneNo==1) {
                if(sceneNo==11 && subsceneNo==1 && tiles2[selectNo].flag==0) {
                //<-gf11
                    // console.log("ROTATE 11 1");
                    if(tiles2[selectNo].style==3){
                        tiles2[selectNo].style=4;
                        tiles2[selectNo].substyle=1;
                    }
                    else{
                        tiles2[selectNo].style=3;
                        tiles2[selectNo].substyle=0;
                    }
                }
                //gf11->
                // if(sceneNo==11 && subsceneNo==2) {
                if(sceneNo==11 && subsceneNo==2 && tiles3[selectNo].flag==0) {
                //<-gf11
                    // console.log("ROTATE 11 2");
                    if(tiles3[selectNo].style==3){
                        tiles3[selectNo].style=4;
                        tiles3[selectNo].substyle=1;
                    }
                    else{
                        tiles3[selectNo].style=3;
                        tiles3[selectNo].substyle=0;
                    }
                }
            }

            //gfexperimental->
            if ((select_counter!=-1) && !mouseMoving) {
                if (sceneNo == 14) {
                    // console.log("ROTATE 14, select_counter", select_counter);
                    if(trs1[step3_subpos].type==0)
                        trs1[step3_subpos].type=1;
                    else
                        trs1[step3_subpos].type=0;
                }
                if (sceneNo == 15) {
                    // console.log("ROTATE 15");
                    if(trs2[step3_subpos].type==0)
                        trs2[step3_subpos].type=1;
                    else
                        trs2[step3_subpos].type=0;
                }
                if (sceneNo == 16) {
                    // console.log("ROTATE 16");
                    if(trs3[step3_subpos].type==0)
                        trs3[step3_subpos].type=1;
                    else
                        trs3[step3_subpos].type=0;
                }
                if (sceneNo == 17) {
                    // console.log("ROTATE 17");
                    if(trs4[step3_subpos].type==0)
                        trs4[step3_subpos].type=1;
                    else
                        trs4[step3_subpos].type=0;
                }
            }
            //<-gfexperimental

            selectNo=-1;
            mousePressed = false;
            mouseMoving = false;
        }
    });


    //gfnotouch->
    // canvas.addEventListener('touchstart', function (event){
    //     mousePressed = true;
    //     mouseMoving = false;
    //     mouseUpflag=false;
    //     if(mousePositionX!='undefined'){
    //         mousePositionX=event.targetTouches[0].pageX;
    //         mousePositionY=event.targetTouches[0].pageY;
    //     }
    //
    //     if(success_flag==1){
    //         success_flag=0;
    //         continuebtn.flag=true;
    //
    //         //step2 hint confirm
    //         if(step2_hintcounter==2){
    //             step2_hintcounter=0;
    //             step2_hintflag=true;
    //             switch (sceneNo){
    //                 case 9:
    //                     for(var i=0; i<9; i++)
    //                     {
    //                         tiles[i].x=150+110*i;
    //                         tiles[i].y=240;
    //                         tiles[i].flag=1;
    //                     }
    //                     step2_hitpos=0;
    //                     continuebtn.flag=false;
    //                     break;
    //                 case 10:
    //                     for(var i=0; i<blocks_size[10]; i++)
    //                     {
    //                         tiles[i].x=150+80*i;
    //                         tiles[i].y=240;
    //                         tiles[i].flag=1;
    //                     }
    //                     step2_hitpos=0;
    //                     continuebtn.flag=false;
    //                     break;
    //                 case 11:
    //                     step2_hintflag=false;
    //                     sceneNo=12;
    //                     success_flag=0;
    //                     //continuebtn.flag=false;
    //                     break;
    //             }
    //         }
    //     }
    //     if(touch_endflag)
    //         touch_endflag=false;
    //     touch_startflag=true;
    // }, false);
    //
    //gfnotouch->
    // canvas.addEventListener('touchmove', function(event){
    //     var x=event.targetTouches[0].pageX;
    //     var y=event.targetTouches[0].pageY;
    //     var deltax= 0, deltay=0;
    //     if(mousePositionX!='undefined'){
    //         deltax=mousePositionX-x;
    //         deltay=mousePositionY-y;
    //     }
    //
    //     if(Math.abs(deltax)>1 || Math.abs(deltay)>1){
    //         mouseMoving = true;
    //     }
    //     mousePositionX=x;
    //     mousePositionY=y;
    // }, false);
    // canvas.addEventListener('touchend', function(event){
    //
    //     if(temp_flag){
    //         mouseUpflag=true;
    //         temp_flag=false;
    //     }
    //
    //     if(selectNo!=-1 && click_flag)
    //         click_flag=false;
    //     if(select_counter!=-1 && click_flag){
    //         if(step2_subcounter==0){
    //             triangles1[select_counter].value++;
    //             if(triangles1[select_counter].value>4)
    //                 triangles1[select_counter].value=1;
    //         }
    //         if(step2_subcounter==1){
    //             triangles2[select_counter].value++;
    //             if(triangles2[select_counter].value>4)
    //                 triangles2[select_counter].value=1;
    //         }
    //         if(step2_subcounter==2){
    //             triangles3[select_counter].value++;
    //             if(triangles3[select_counter].value>4)
    //                 triangles3[select_counter].value=1;
    //         }
    //         click_flag=false;
    //     }
    //     if(selectNo!=-1 && !mouseMoving){
    //         if(sceneNo==11 && subsceneNo==0){
    //             if(tiles[selectNo].style==3){
    //                 tiles[selectNo].style=4;
    //                 tiles[selectNo].substyle=1;
    //             }
    //             else{
    //                 tiles[selectNo].style=3;
    //                 tiles[selectNo].substyle=0;
    //             }
    //         }
    //         if(sceneNo==11 && subsceneNo==1){
    //             if(tiles2[selectNo].style==3){
    //                 tiles2[selectNo].style=4;
    //                 tiles2[selectNo].substyle=1;
    //             }
    //             else{
    //                 tiles2[selectNo].style=3;
    //                 tiles2[selectNo].substyle=0;
    //             }
    //         }
    //         if(sceneNo==11 && subsceneNo==2){
    //             if(tiles3[selectNo].style==3){
    //                 tiles3[selectNo].style=4;
    //                 tiles3[selectNo].substyle=1;
    //             }
    //             else{
    //                 tiles3[selectNo].style=3;
    //                 tiles3[selectNo].substyle=0;
    //             }
    //         }
    //     }
    //
    //     selectNo=-1;
    //     mousePressed = false;
    //     mouseMoving = false;
    //
    //     if(touch_startflag){
    //         touch_startflag=false;
    //         touch_endflag=true;
    //     }
    // }, false);
    //<-gfnotouch

    setInterval(DrawScene, 20/*30*/);
});

