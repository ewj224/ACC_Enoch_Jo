import * as PIXI from 'pixi.js'
import { Model, SceneState } from './model/model'
import { SceneOne } from './views/sceneOne';
import { SceneTwo } from './views/sceneTwo';
import { gsap } from "gsap";
import * as filters from 'pixi-filters'
import { AdjustmentFilter } from 'pixi-filters';
import { guiSetup } from './controllers/gui';

let mModel = new Model();
let sceneOne: SceneOne = new SceneOne(mModel);
let sceneTwo: SceneTwo = new SceneTwo(mModel);

let tl = gsap.timeline();

let graphs: Array<PIXI.Graphics> = []
let sizes: Array<any> = []
let colors: Array<any> = []



var x = 0;
var y = 0;

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0x000000});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);


    let graphics = new PIXI.Graphics();  

    for (let i=0; i<window.innerWidth; i+=100) {
    
        for (let g=0; g<window.innerHeight; g+=100) {
            graphics.beginFill(0x808080);
            graphics.drawRect(x+i,y+g,100, 100);

            graphics.beginFill(0x000000);
            graphics.drawRect((x+50)+i, (y+50)+g, 50,50);

            graphics.beginFill(0xFFFFFF);
            graphics.drawCircle(x+50+i,y+50+g,25);
            graphics.drawCircle(x+i,y+g,25);
            graphics.drawCircle(x+100+i,y+g,25);
            graphics.drawCircle(x+i,y+100+g,25);
            graphics.drawCircle(x+100+i, y+100+g,25);

        }
    }
    

    
    app.stage.addChild(graphics);
    document.body.appendChild(app.view);


    
    // Load assets
    await load(app);
    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    mModel.elapsedTime += delta;

	graphs.forEach((graph, i) => {
		graph.clear()
		if(graph.filters != null && 
            graph.filters[0] instanceof AdjustmentFilter) {
			graph.filters[0].red = colors[i].r;
			graph.filters[0].green = colors[i].g;
			graph.filters[0].blue = colors[i].b;
		}
		graph.beginFill(0xffffff)
		graph.drawCircle(0,0,sizes[i].value)
	})

    switch (mModel.sceneState) {
        case SceneState.first:
            sceneOne.container.visible = true;
            sceneTwo.container.visible = false;
            sceneOne.update();
            break;
        
        case SceneState.second:
            sceneOne.container.visible = false;
            sceneTwo.container.visible = true;
            sceneTwo.update();
            break;
    
        default:
            break;
    }
};


main();