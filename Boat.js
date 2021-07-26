class Boat{
   constructor(x,y,width,height,boatPos,BoatAnimation){
    
    var options={
        restitution:0.8,
        friction:1,
        density:1
    }


    this.animation=BoatAnimation
    this.body=Bodies.rectangle(x,y,width,height,options);
    this.boatPosition=boatPos;
    this.width=width;
    this.height=height;
    this.image=loadImage("assets/boat.png");
    World.add(world,this.body);
   }

   remove(index){
    Matter.World.remove(world,Boats[index].body)
    alert(index+" in voat")
    Boats.slice(index,1)
  }

    animate(){
     this.speed+=0.5%1.1
  }

   display(){
       var pos=this.body.position;
       var angle=this.body.angle;
       var index=floor(this.speed%this.animation.length)
       push()
       translate(pos.x,pos.y)
       rotate(angle)
       imageMode(CENTER)
       alert(index);
       image(this.animation[index],0,this.boatPosition,this.width,this.height)
       noTint()
       pop()
   }




}