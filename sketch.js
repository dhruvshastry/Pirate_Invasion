const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon,cannonball;
var Balls = []
//var Dhruv=["Hi",12,"Abhiyaansh",5,true,["a","b","C"]]
//console.log(Dhruv)
//console.log(Dhruv[5][2])
//Dhruv.push(false)
//console.log(Dhruv)
//Dhruv.pop()
//console.log(Dhruv)
var boat;
var Boats = []
var BoatAnimation = []
var BoatSpriteData, BoatSpriteSheet;
var BBoatAnimation = []
var BBoatSpriteData, BBoatSpriteSheet;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  BoatSpriteData = loadJSON("assets/boat/boat.json")
  BoatSpriteSheet = loadImage("assets/boat/boat.png")
  BBoatSpriteData  = loadJSON("assets/boat/broken_boat.json")
  BBoatSpriteSheet = loadImage("assets/boat/broken_boat.png")

}

function setup() {
  var angle=-PI/4;
  var boatFrame = BoatSpriteData.frames;
  for(var i=0; i<boatFrame.length;i++){
    var pos=boatFrame[i].position;
    var img=BoatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
    BoatAnimation.push(img) 
  }
  //var brokenBoatFrame = BBoatSpriteData.frames;
  //for(var i=0; i<brokenboatFrame.length;i++){
    //var pos=brokenboatFrame[i].position;
   // var img=BBoatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
    //BBoatAnimation.push(img) 
    console.log(BoatAnimation)
  
  canvas = createCanvas(windowWidth-100,windowHeight-80);
  engine = Engine.create();
  world = engine.world;
  tower = new Tower(width/2-550,height-250, 250, 480);
  ground = new Ground(0,height-1,width*2,1)
  cannon = new Cannon(width/2-500,height/2-240,120,35,angle)
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);



  Engine.update(engine);
  ground.display();
  

  tower.display();
  cannon.display();

  for(var i=0;i<Balls.length;i++){
    showCannonBalls(Balls[i],i);
    for(var j=0;j<Boats.length;j++){
       if(Balls[i]!==undefined && Boats[j]!==undefined){
         var collision=Matter.SAT.collides(Balls[i].body,Boats[j].body)
         if(collision.collided){
           Boats[j].remove[j]
           Matter.World.remove(world,Balls[i].body)
           Balls.slice(i,1)
           i--
         }
       }
    }
  }
  showBoats();

}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var cannonball = new CannonBalls(cannon.x,cannon.y)
    Balls.push(cannonball)
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    Balls[Balls.length-1].shoot();
  }
}

function showCannonBalls(ball,index){
    ball.display();
    if(ball.body.position.x>= width || ball.body.position.y>= height-50){
      Matter.World.remove(world,ball.body)
      Balls.slice(index,1);
    }
}

function showBoats(){
   if(Boats.length>0){
     if(Boats.length<4 && Boats[Boats.length-1].body.position.x<width-300){
        var positions=[-130,-100,-120,-80]
        var position=random(positions)
        var boat=new Boat(width,height-100,200,200,position,BoatAnimation)
        Boats.push(boat)
     }
     for(var i = 0;i<Boats.length;i++){
      Matter.Body.setVelocity(Boats[i].body,{x:-0.9,y:0})
      Boats[i].display();
      Boats[i].animate();
     }   
   }
   else{
     var boat= new Boat(width,height-100,200,200,-100,BoatAnimation)
     Boats.push(boat)
   }
}







