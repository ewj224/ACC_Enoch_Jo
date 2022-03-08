import * as PIXI from 'pixi.js'
import { Model, SceneState } from './model/model'
import { SceneOne } from './views/sceneOne';
import { SceneTwo } from './views/sceneTwo';
import { gsap } from "gsap";
import * as filters from 'pixi-filters'
import { AdjustmentFilter } from 'pixi-filters';
import { guiSetup } from './controllers/gui';

let app = new PIXI.Application({antialias: true, backgroundColor: 0xccd5ae});
let tl = gsap.timeline();
let sizes1: Array<any> = [];
let sizes2: Array<any> = [];
let sizes3: Array<any> = [];
let sizes4: Array<any> = [];

let graphs: Array<PIXI.Graphics> = []
let graphs2: Array<PIXI.Graphics> = []
let graphs3: Array<PIXI.Graphics> = []
let graphs4: Array<PIXI.Graphics> = [] 

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    
    var graphics = new PIXI.Graphics();
    
    graphics.beginFill(0xfaedcd);
    graphics.drawRect((window.innerWidth/2)-200, (window.innerHeight/2)-200, 400,400);//base rect for square breathing

    
    app.stage.addChild(graphics);
    
    
   


    //section for button
    let button = new PIXI.Graphics();
    button.beginFill(0xd4a373);
    button.drawRect((window.innerWidth/2)-350, (window.innerHeight/2) + 250, 200, 50);
    button.interactive = true;
    button.buttonMode = true;
    
   
    button
        .on('pointerdown', relaxation)

    // Load assets

    //Putting things together

    app.stage.addChild(button);

    let text1 = new PIXI.Text('Click Here to Begin!',{fontFamily: 'Arial', fontSize: 20, fill: 0x7f5539});
    text1.x = (window.innerWidth/2) - 340
    text1.y = (window.innerHeight/2) + 265
    app.stage.addChild(text1);
    
    let text2 = new PIXI.Text("Breathe In",{fontFamily: 'Arial', fontSize: 30, fill: 0x7f5539});
    text2.x = (window.innerWidth/2) - 375
    text2.y = (window.innerHeight/2) -25
    app.stage.addChild(text2);


    let text3 = new PIXI.Text("Hold",{fontFamily: 'Arial', fontSize: 30, fill: 0x7f5539});
    text3.x = (window.innerWidth/2) - 25
    text3.y = (window.innerHeight/2) -300
    app.stage.addChild(text3);


    let text4 = new PIXI.Text("Breathe Out",{fontFamily: 'Arial', fontSize: 30, fill: 0x7f5539});
    text4.x = (window.innerWidth/2) +250
    text4.y = (window.innerHeight/2) -25
    app.stage.addChild(text4);


    let text5 = new PIXI.Text("Hold",{fontFamily: 'Arial', fontSize: 30, fill: 0x7f5539});
    text5.x = (window.innerWidth/2) -25
    text5.y = (window.innerHeight/2) +250
    app.stage.addChild(text5);
    
    document.body.appendChild(app.view);


    await load(app);


    app.ticker.add(update);

}
//BUTTON FUNCTIONS
function relaxation(){
    for (let i = 0; i < 5; i++){
        const circleOne = new PIXI.Graphics();

        circleOne.x = (window.innerWidth/2)-300
        circleOne.y = (window.innerHeight/2)+40 - (70*i)
        graphs.push(circleOne);
        app.stage.addChild(circleOne);

        sizes1[i] = {radius: 0}
    }
    for (let j = 0; j < 5; j++){
        const circleTwo = new PIXI.Graphics();
        circleTwo.x = (window.innerWidth/2) + (70*j)
        circleTwo.y = (window.innerHeight/2)
        graphs2.push(circleTwo);
        app.stage.addChild(circleTwo);

        sizes2[j] = {radius:0}
        
    }

    for (let k = 0; k < 5; k++){
        const circleThree = new PIXI.Graphics();
        circleThree.x = (window.innerWidth/2)+100 
        circleThree.y = (window.innerHeight/2) - 140 + (70*k)
        graphs3.push(circleThree);
        app.stage.addChild(circleThree);

        sizes3[k] = {radius:0}
        
    }

    for (let l = 0; l < 5; l++){
        const circleFour = new PIXI.Graphics();
        circleFour.x = (window.innerWidth/2)- 140 - (70*l)
        circleFour.y = (window.innerHeight/2) + 100
        graphs4.push(circleFour);
        app.stage.addChild(circleFour);

        sizes4[l] = {radius:0}
        
    }


        
        

    sizes1.forEach((size,i) =>{
        tl.to(size,{radius:25, duration: 1}, i)
    })

    sizes2.forEach((size,j) =>{
        tl.to(size,{radius:25, duration: 1}, ">")
    })

    sizes3.forEach((size,k) =>{
        tl.to(size,{radius:25, duration: 1}, ">")
    })

    sizes4.forEach((size,k) =>{
        tl.to(size,{radius:25, duration: 1}, ">")
    })
}



//add button to initiate the whole process
function update(delta:number){
    graphs.forEach((graph, i) => {
        graph.clear()
        graph.beginFill(0xd4a373)
        graph.drawCircle(100,100,sizes1[i].radius);
    })
    graphs2.forEach((graphing, j)=>{
        graphing.beginFill(0xd4a373)
        graphing.drawCircle(-140,-200, sizes2[j].radius)
    })

    graphs3.forEach((graph2, k)=>{
        graph2.beginFill(0xd4a373)
        graph2.drawCircle(100,0, sizes3[k].radius)
    })

    graphs4.forEach((graph4, l)=>{
        graph4.beginFill(0xd4a373)
        graph4.drawCircle(280,100, sizes4[l].radius)
    })
} 


main();