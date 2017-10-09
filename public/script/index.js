const HEIGHT = 250,
    WIDTH = 500

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const sprites = {}
const textures = {}

PIXI.loader
    .add([
        "public/assets/images/dunjo_cover.png"
    ])
    .on("progress", (loader, resources) => {
        console.log("loading: " + resources.url);
        console.log("progress: " + loader.progress + "%")
    })
    .on("load", (loader, resources) => {
        // Wall init
        textures.wall_up_left = new PIXI.Texture(resources.texture, new PIXI.Rectangle(43, 75, 25, 25));
        sprites.wall_up_left = new PIXI.Sprite(textures.wall_up_left)

        textures.wall_up_right = new PIXI.Texture(resources.texture, new PIXI.Rectangle(94, 75, 25, 25));
        sprites.wall_up_right = new PIXI.Sprite(textures.wall_up_right)

        textures.wall_bottom_left = new PIXI.Texture(resources.texture, new PIXI.Rectangle(43, 126, 25, 25));
        sprites.wall_bottom_left = new PIXI.Sprite(textures.wall_bottom_left)

        textures.wall_bottom_right = new PIXI.Texture(resources.texture, new PIXI.Rectangle(94, 126, 25, 25));
        sprites.wall_bottom_right = new PIXI.Sprite(textures.wall_bottom_right)

        textures.wall_right = new PIXI.Texture(resources.texture, new PIXI.Rectangle(45, 103, 25, 25));
        sprites.wall_right = new PIXI.Sprite(textures.wall_right)

        // Persona init
        textures.player = new PIXI.Texture(resources.texture, new PIXI.Rectangle(128, 132, 14, 16));
        sprites.player = new PIXI.Sprite(textures.player)
    })
    .load(setup);

// Create sound register
createjs.Sound.registerSound("public/assets/sound/laser/laser1.wav", "laser");
// Initialization de la map
const MAP_SIZE = {
    width: 5,
    height: 5
}

function setup() {

    // for (let i = 0; i < MAP_SIZE.width; i++) {
    //     for (let j = 0; j < MAP_SIZE.height; i++) {
    //         sprites.wall_right.x = 150
    //         sprites.wall_right.y = 160
    //         stage.addChild(sprites.wall_right)
    //     }
    // }

    sprites.wall_up_left.x = 0
    sprites.wall_up_left.y = 0
    stage.addChild(sprites.wall_up_left);

    sprites.wall_up_right.x = 100
    sprites.wall_up_right.y = 0
    stage.addChild(sprites.wall_up_right);

    sprites.wall_bottom_left.x = 0
    sprites.wall_bottom_left.y = 100
    stage.addChild(sprites.wall_bottom_left);

    sprites.wall_bottom_right.x = 100
    sprites.wall_bottom_right.y = 100
    stage.addChild(sprites.wall_bottom_right);

    sprites.player.x = 150
    sprites.player.y = 150
    stage.addChild(sprites.player)

    renderer.render(stage)

    createjs.Sound.play("laser");
}