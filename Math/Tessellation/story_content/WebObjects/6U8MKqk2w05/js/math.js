
var canvas;
var mathGame;
var ctx;



function GameWindow(){        
        this.resize = function(){           
            /* http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/#disqus_thread
            */
            var widthToHeight = 1280 / 960;                     // ***Must*** match to pick up mouse pointer
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
        
            canvas.style.marginTop = (-newHeight / 2) + 'px';   // Read the link
            canvas.style.marginLeft = (-newWidth / 2) + 'px';   // Read the link
            
            
        };
        this.highlightCanvas = function(){
            canvas.style.backgroundColor = "gray";
        }
        
    }

function Game(){
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');    
       
    this.gameArea = new GameWindow();
    this.gameObjects = [];    
    this.background = '';
    this.gameBoard = null;    
    this.selected = null;
    this.clicked = null;
    this.prevX = 0;
    this.prevY = 0; 
    this.prevXHis = 0;
    this.prevYHis = 0;
    this.successAudio = new Audio('sound/excellent.mp3');
    this.failAudio = new Audio('sound/good_try.mp3');
    this.blockInput = false;
    this.history = [];
    
    
    
    this.setBoard = function(gameBoard){
        this.gameBoard = gameBoard;
        mathGame.addObject(gameBoard);
    };   
    
    this.addObject = function(gameObject){
        gameObject.onboard = false;
        gameObject.zIndex = mathGame.gameObjects.length;
        mathGame.gameObjects.push(gameObject);
    };
    
    this.addToBoard = function(gameObject){
        gameObject.updatePosition(mathGame.gameBoard.x, mathGame.gameBoard.y);        
        gameObject.onboard = true;
        gameObject.zIndex = mathGame.gameObjects.length;
        mathGame.gameObjects.push(gameObject);
    };
    
    this.drawScene = function(){
       
        if(mathGame.background){
            var img = document.createElement('img');
            img.src = mathGame.background;   
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);             
        }        
        
        for(var i = 0; i < mathGame.gameObjects.length; i++){
            mathGame.gameObjects[i].draw(ctx);             
        }
        
        
        
        requestAnimFrame(mathGame.drawScene);
    };  
    
    this.sortObjects = function(){
        var gObjs = [];
        
        for(var i = 0; i < mathGame.gameObjects.length; i++){
            gObjs[mathGame.gameObjects[i].zIndex] = mathGame.gameObjects[i];
        }
        
        mathGame.gameObjects = gObjs;
    };
    
    this.propagateClick = function(event){
              
        
    };  
    
    this.propagateMouseDown = function(event){   
        if(!mathGame.blockInput){
       
        mathGame.sortObjects();
        var found = false;
        
        for(var i = mathGame.gameObjects.length - 1; i > -1; i--){
            if('click' in mathGame.gameObjects[i]){
                    if(!found && mathGame.gameObjects[i].click(event.pageX, event.pageY)){
                        if('select'in mathGame.gameObjects[i])
                        {
                            mathGame.gameObjects[i].select(true);
                            mathGame.selected = mathGame.gameObjects[i];
                            mathGame.prevX = event.pageX;
                            mathGame.prevY = event.pageY;  
                            var his = new History(mathGame.gameObjects[i]);
                            mathGame.history.push(his);
                            window.addEventListener("mousemove", mathGame.propagateMouseMove);
                        }
                        found = true;
                        mathGame.clicked = mathGame.gameObjects[i];
                    }
                    else if('select' in mathGame.gameObjects[i]){
                        mathGame.gameObjects[i].select(false);
                    }
                }
                             
        }
        //window.removeEventListener("mousedown", mathGame.propagateMouseDown);
        
             
        }
    };
    
    this.propagateMouseMove = function(event){
         if(mathGame.selected){
             var styleWidth = Number(canvas.style.width.slice(0, canvas.style.width.length - 2));
             var styleHeight = Number(canvas.style.height.slice(0, canvas.style.height.length - 2));
             var xRatio = styleWidth/canvas.width;
             var yRatio = styleHeight/canvas.height;
             var newX = mathGame.selected.x + (event.pageX - mathGame.prevX)/xRatio;
             var newY = mathGame.selected.y + (event.pageY - mathGame.prevY)/yRatio;
             
             mathGame.prevX = event.pageX;
             mathGame.prevY = event.pageY;
             
             var boardEndX = mathGame.gameBoard.x + mathGame.gameBoard.width - mathGame.selected.width;
             var boardEndY = mathGame.gameBoard.y + mathGame.gameBoard.height - mathGame.selected.height;
             
             if(newX < mathGame.gameBoard.x) newX = mathGame.gameBoard.x;
             else if(newX > boardEndX) newX = boardEndX;
             if(newY < mathGame.gameBoard.y) newY = mathGame.gameBoard.y;
             else  if(newY > boardEndY) newY = boardEndY;            
            
             
             mathGame.selected.updatePosition(newX, newY);
         }       
    };
    
    this.propagateMouseUp = function(event){
        window.removeEventListener("mousemove", mathGame.propagateMouseMove);
        
        if(mathGame.clicked){
            if('clickfinish' in mathGame.clicked){
                mathGame.clicked.clickfinish();
                mathGame.clicked = null;
            }
            else{
                 var undo = function(){
                     mathGame.clicked.x = mathGame.prevXHis;
                     mathGame.clicked.y = mathGame.prevYHis;
                 };
                 mathGame.clicked = null;
            }
        }
        //window.addEventListener("mousedown", mathGame.propagateMouseDown);
        //window.removeEventListener("mouseup", mathGame.propagateMouseUp);
    };
    
    this.rotateSelected = function(){
        if(mathGame.selected){
            mathGame.selected.select(true);
            mathGame.selected.update = mathGame.selected.rotate;
        }
    };
    
    this.stopRotateSelected = function(){
        if(mathGame.selected){
            mathGame.selected.update = function(){
                
            };
        }
    };
    
    this.clearAll = function(){
        var gameObjs = [];
        
        for(var i = 0; i < mathGame.gameObjects.length; i++){
            if(!mathGame.gameObjects[i].onboard && !('postReview' in mathGame.gameObjects[i])){
                gameObjs.push(mathGame.gameObjects[i]);
            }
        }
        
        mathGame.gameObjects = gameObjs;
    };
    
    this.reviewAnswers = function(){
        var excellent = true;
        
        for(var i = 0; i < mathGame.gameObjects.length; i++){
            if('isChecked' in mathGame.gameObjects[i]){
                if(mathGame.gameObjects[i].isChecked != mathGame.gameObjects[i].correctAnswer)
                {
                    excellent = false;
                    break;
                }                
            }
        }
        
        if(excellent) mathGame.success();
        else mathGame.fail();
    };
    
    this.success = function(){
        var successImage = new GameObject('img/success.jpg', 30, 280, 850, 500);
        successImage.postReview = true;
        mathGame.addObject(successImage);
        mathGame.blockInput = true;
        mathGame.successAudio.play();
        window.setTimeout(mathGame.allowProceed, 9000);
    };
    
    this.fail = function(){
        var failImage = new GameObject('img/wrong.jpg', 30,280, 850, 500);
        failImage.postReview = true;
        mathGame.addObject(failImage);
        mathGame.blockInput = true;
        mathGame.failAudio.play();       
        window.setTimeout(mathGame.allowTryAgain, 17000);
    };
    
    this.allowTryAgain = function(){
        var tryAgainBtn = new GameButton('img/btn_tryagain.png', 800, 850);
        tryAgainBtn.postReview = true;
        tryAgainBtn.onclick = function(){
            mathGame.clearAll();
        };
        mathGame.addObject(tryAgainBtn);
       mathGame.blockInput = false;
    };
    
    this.allowProceed = function(){
        var proceedBtn = new GameButton('img/btn_proceed1.png', 1000, 850);
        mathGame.addObject(proceedBtn);
        mathGame.blockInput = false;
    };
    
    this.undoLastAction = function(){
        if(mathGame.history.length > 0){
            var his = mathGame.history.pop();
            his.revert();
        }
    }
    
}

function GameObject(path, x, y, w, h){
    this.x = x;
    this.y = y;
    this.relX = x/canvas.width;
    this.relY = y/canvas.height;  
    this.width = w;
    this.height = h;
    this.relWidth = w/canvas.width;
    this.relHeight = h/canvas.height;
    this.angle = 0;
    
    this.img = document.createElement('img');
    this.img.src = path;
    this.path = path;
    
    this.updatePosition = function(newX, newY){
        this.x = newX;
        this.y = newY;
        this.relX = newX/canvas.width;
        this.relY = newY/canvas.height; 
    };
    
    this.rotate = function(){
        if(this.angle <= 360) this.angle++;
        else this.angle = 0;
    }
    
    
    this.draw = function(ctx){ 
        this.update();
        ctx.save();
        ctx.translate(this.x + (this.width/2), this.y + (this.height/2));
        ctx.rotate(this.angle * (Math.PI/180));
        ctx.drawImage(this.img, 0 - (this.width/2), 0 - (this.height/2), this.width, this.height);         
        ctx.restore();
    };
    
    this.update = function(){
        
    };
}

function ButtonPrototype(path, x, y, w, h){
    var gameobject = new GameObject(path, x, y, w, h);
    var btn = Object.create(gameobject);
    btn.onclick = function(){
        
		var player = window.parent.GetPlayer();
		player.SetVar("polygon", "pass");
		
    };
    
    btn.clickPaddingHorizontal = 0;  
    btn.clickPaddingVertical = 0;
    
    btn.click = function(pointX, pointY){
         var styleWidth = Number(canvas.style.width.slice(0, canvas.style.width.length - 2));
         var styleHeight = Number(canvas.style.height.slice(0, canvas.style.height.length - 2));
        
        var xOffset = (window.innerWidth - styleWidth)/2;
         var yOffset = (window.innerHeight - styleHeight)/2;
        
         var thisLeft = (this.relX * styleWidth) + xOffset;
         var thisTop = (this.relY * styleHeight) + yOffset;
        
        var  thisXEnd = (thisLeft + (this.relWidth * styleWidth));
        var thisYEnd = (thisTop + (this.relHeight * styleHeight));
        
        var paddingHorizontal = (this.clickPaddingHorizontal/100) * (thisXEnd - thisLeft);
        var paddingVertical = (this.clickPaddingVertical/100) * (thisYEnd - thisTop);
        
        thisLeft += paddingHorizontal;
        thisTop += paddingVertical;
        thisXEnd -= paddingHorizontal;
        thisYEnd -= paddingVertical;
        
         var inX = pointX > thisLeft && pointX < thisXEnd;
        
         var inY = pointY > thisTop && pointY < thisYEnd;
        
         if(inX && inY) {
             this.onclick();
             return true;
         }
    };
    
    return btn;
}

function SelectablePrototype(path, x, y, w, h){
    var gameobject = new ButtonPrototype(path, 0, 0, w, h);
    var selectable = Object.create(gameobject);
    selectable.selectPath = '';
    selectable.onclick = function(){
        
    };
    selectable.onselect = function(select){
        if(select && this.selectPath) {
            this.img.src = this.selectPath;            
        }
        else{
            this.img.src = this.path;            
        }
    };
    
    selectable.select = function(select){
        this.onselect(select);
    };
    
    
    
    return selectable;
}

function PolygonBtn(path, x, y, w, h){
    var gameobject = new ButtonPrototype(path, x, y, w, h);
    var btn = Object.create(gameobject);
    btn.clickPaddingHorizontal = 30;
    btn.clickPaddingVertical = 30;
    btn.selectPath = '';
    btn.onclick = function(){
        var polygon = new Polygon(this.path, this.width, this.height);
        polygon.selectPath = this.selectPath;
        mathGame.addToBoard(polygon);
    };
    return btn;
}

function CheckBox(value, x, y){
    var gameobject = new ButtonPrototype('img/checkbutton/none.jpg', x, y, 44, 50);
    var checkbox = Object.create(gameobject);
    
    checkbox.value = value;
    checkbox.isChecked = false;
    checkbox.correctAnswer = false;
    checkbox.onclick = function(){        
        if(this.isChecked){
            this.img.src = 'img/checkbutton/none.jpg';
            this.isChecked = false; 
        }
        else{
            this.img.src = 'img/checkbutton/click.jpg';
            this.isChecked = true;
        }
        
    }
    return checkbox;
}

function GameButton(path, x, y){
    var gameobject = new ButtonPrototype(path, x, y, 198, 60);
    var btn = Object.create(gameobject);
    return btn;
}

function GameBoard(x, y){
    var gameobject = new GameObject('img/board.jpg', x, y, 600, 400);
    var checkbox = Object.create(gameobject);
    return checkbox;
}

function Polygon(path, w, h){
    var selectable = new SelectablePrototype(path, 0, 0, w, h);
    var polygon = Object.create(selectable);
    polygon.clickPaddingHorizontal = 0;
    polygon.clickPaddingVertical = 0;
    
    return polygon;
}

function HistoryPrototype(gameObject){
    this.gameObject = gameObject;
    this.revert = function(){
        alert('reverted');
    };
}

function History(gameObject){
    var history = new HistoryPrototype(gameObject);
    var positionHistory = Object.create(history);
    positionHistory.x = gameObject.x;
    positionHistory.y = gameObject.y;
    positionHistory.angle = gameObject.angle;
    positionHistory.revert = function(){
        this.gameObject.updatePosition(this.x, this.y);
        this.gameObject.angle = this.angle;
    };
    return positionHistory;
}

function initializeGame(){   
    mathGame = new Game();
    mathGame.gameArea.resize();
    //mathGame.gameArea.highlightCanvas();
    mathGame.background = 'img/background.jpg';
    
    var triangleBtn = new PolygonBtn('img/shape60/1.png', 1000, 110, 74, 62); 
    triangleBtn.selectPath = 'img/shape60/1_a.png';
    
    var squareBtn = new PolygonBtn('img/shape90/1.png', 1000, 220, 70, 70);
    squareBtn.selectPath = 'img/shape90/1_a.png';
    
    var pentagonBtn = new PolygonBtn('img/shape108/1.png', 1000, 320, 80, 80);
    pentagonBtn.selectPath = 'img/shape108/1_a.png';
    
    var hexagonBtn = new PolygonBtn('img/shape120/1.png', 1000, 450, 90, 90);
    hexagonBtn.selectPath = 'img/shape120/1_a.png';
    
    var heptagonBtn = new PolygonBtn('img/shape128.6/1.png', 1000, 590, 100, 100);
    heptagonBtn.selectPath = 'img/shape128.6/1_a.png';
    
    var octagonBtn = new PolygonBtn('img/shape135/1.png', 1000, 740, 80, 80);
    octagonBtn.selectPath = 'img/shape135/1_a.png';
    
    var triangleCheckBox = new CheckBox('triangle',1110, 120);
    triangleCheckBox.correctAnswer = true;
    
    var squareCheckBox = new CheckBox('square',1110, 230);
    squareCheckBox.correctAnswer = true;
    
    var pentagonCheckBox = new CheckBox('pentagon',1110, 340);
    
    var hexagonCheckBox = new CheckBox('hexagon',1110, 470);
    hexagonCheckBox.correctAnswer = true;
    
    var heptagonCheckBox = new CheckBox('heptagon',1110, 610);
    
    var octagonCheckBox = new CheckBox('octagon',1110, 760);
    
    var submitBtn = new GameButton('img/btn_submit.png', 1000, 850);
    submitBtn.onclick = function(){
        mathGame.reviewAnswers();
    };
    
    var rotateBtn = new GameButton('img/btn_rotate.png', 40, 370);
    rotateBtn.onclick = function(){        
        mathGame.rotateSelected();
        var his = new History(mathGame.selected);
        mathGame.history.push(his);
    };
    
    rotateBtn.clickfinish = function(){
        mathGame.stopRotateSelected();
    };
    
    var undoBtn = new GameButton('img/btn_undo.png', 40, 470);
    undoBtn.onclick = function(){
        mathGame.undoLastAction();
    };
    var clearBtn = new GameButton('img/btn_clear-all.png', 40, 570);
    clearBtn.onclick = function(){
        mathGame.clearAll();
    };
    
    var gameBoard = new GameBoard(250, 300);  
    
    
    mathGame.addObject(triangleBtn);
    mathGame.addObject(squareBtn);
    mathGame.addObject(pentagonBtn);
    mathGame.addObject(hexagonBtn);
    mathGame.addObject(heptagonBtn);
    mathGame.addObject(octagonBtn);
    
    mathGame.addObject(triangleCheckBox);
    mathGame.addObject(squareCheckBox);
    mathGame.addObject(pentagonCheckBox);
    mathGame.addObject(hexagonCheckBox);
    mathGame.addObject(heptagonCheckBox);
    mathGame.addObject(octagonCheckBox);    
    
    mathGame.addObject(submitBtn);
    mathGame.addObject(rotateBtn);
    mathGame.addObject(undoBtn);
    mathGame.addObject(clearBtn);
    
    mathGame.setBoard(gameBoard);
    
    
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
    })();     
    
    window.addEventListener("resize", mathGame.gameArea.resize);
    
    
    mathGame.drawScene();
    //window.addEventListener("click", mathGame.propagateClick);
    window.addEventListener("mousedown", mathGame.propagateMouseDown);
    window.addEventListener("mouseup", mathGame.propagateMouseUp);
}


window.addEventListener("load", initializeGame);


    
    
    
    



 