var type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type)

const HEIGHT = 1000,
    WIDTH = 1000

//Aliases
const Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.TextureCache,
    Rectangle = PIXI.Rectangle

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1000, 1000);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
    .add([
        "public/assets/images/rogue.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%")

    //If you gave your files names as the first argument 
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
}

createjs.Sound.registerSound("public/assets/sound/laser/laser1.wav", "laser");

//This `setup` function will run when the image has loaded
function setup() {
    //Create the `cat` sprite, add it to the stage, and render it
    //const rogue = new Sprite(resources["public/assets/images/rogue.png"].texture);
    const texture = TextureCache["public/assets/images/rogue.png"];

    const rectangle = new Rectangle(0, 0, 300, 300);

    //Tell the texture to use that rectangular section
    texture.frame = rectangle;

    //Create the sprite from the texture
    let rogue = new Sprite(texture);

    //Change the sprite's position
    rogue.x = HEIGHT / 2
    rogue.y = WIDTH / 2
    //Change the sprite's size
    rogue.scale.x = 4
    rogue.scale.y = 4
    //add sprit to view
    stage.addChild(rogue)
    renderer.render(stage)

    createjs.Sound.play("laser");
}