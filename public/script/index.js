var type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type)

const HEIGHT = 250,
    WIDTH = 500

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
    renderer = autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

PIXI.loader
    .add([
        "public/assets/images/dunjo_cover.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%")
}

createjs.Sound.registerSound("public/assets/sound/laser/laser1.wav", "laser");

function setup() {

    const texture = TextureCache["public/assets/images/dunjo_cover.png"];
    let wall;

    const top_right_corner = new Rectangle(43, 75, 25, 25);
    wall = new Sprite(texture);
    texture.frame = top_right_corner;
    stage.addChild(wall)

    const right_wall = new Rectangle(86, 75, 25, 25);
    wall = new Sprite(texture);
    wall.x = 0
    wall.y = 25
    texture.frame = right_wall;
    stage.addChild(wall)

    // rogue.x = HEIGHT / 2
    // rogue.y = WIDTH / 2
    // rogue.scale.x = 2
    // rogue.scale.y = 2

    //stage.addChild(wall)
    renderer.render(stage)

    createjs.Sound.play("laser");
}