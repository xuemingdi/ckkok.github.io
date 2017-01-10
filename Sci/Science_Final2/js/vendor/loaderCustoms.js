var canvas = document.getElementById("main");
var sceneChecked;

//gfexp->
// gcanv = document.getElementById('grahpic');
// gctx = gcanv.getContext('2d');
//<-gfexp

// Babylon
var engine = new BABYLON.Engine(canvas, true);
var scene;

var loadCustomScene = function (demoConstructor, then, noAttachControl)
{
    BABYLON.SceneLoader.ShowLoadingScreen = false;
    engine.displayLoadingUI();

    setTimeout(function ()
    {
        scene = demoConstructor(engine);

        if (scene.activeCamera && !noAttachControl)
        {
            //scene.activeCamera.attachControl(canvas, false);
        }

        scene.executeWhenReady(function ()
        {
            canvas.style.opacity = 1;
            engine.hideLoadingUI();
            BABYLON.SceneLoader.ShowLoadingScreen = true;
            if (then)
            {
                then(scene);
            }
        });
    }, 15);
    return;
};

// Render loop
var renderFunction = function ()
{
    // Render scene
    if (scene)
    {
        if (!sceneChecked)
        {
            var remaining = scene.getWaitingItemsCount();
            engine.loadingUIText = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
        }
        scene.render();


        // Streams
        if (scene.useDelayedTextureLoading)
        {
            var waiting = scene.getWaitingItemsCount();
            if (waiting > 0)
            {
                status.innerHTML = "Streaming items..." + waiting + " remaining";
            }
            else
            {
                status.innerHTML = "";
            }
        }
    }
};

// Launch render loop
engine.runRenderLoop(renderFunction);

// Resize
window.addEventListener("resize", function ()
{
    //gfgui-> Apa ini
    // if(gui) {
    //     // gui.updateCamera();   // moves gui objects off the gui layer - so disappears the gui stuff
    //     gui.resize();            // works on the wrong coords given by the onresize event handler?
    // }
    //gfgui
   engine.resize();
});

// Check support
if (!BABYLON.Engine.isSupported())
{
    document.getElementById("notSupported").className = "";
}
else
{
    loadCustomScene(clickobj.constructor, clickobj.onload, clickobj.noAttachControl);
};