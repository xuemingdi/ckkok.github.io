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
