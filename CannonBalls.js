class CannonBalls {
    constructor(x,y){
        var options={
            restitution:0.8,
            friction:1,  
            density:1,
            isStatic:true
        }
        this.r=40;
        this.body=Bodies.circle(x,y,this.r,options);
        this.image=loadImage("./assets/cannonball.png");
        this.black=loadImage("./assets/Black.png");
        this.trajectory=[]
        World.add(world,this.body);

    }
    shoot(){
        var velocity=p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20); 
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});
     }

    display(){
       var angle=this.body.angle;
       var pos=this.body.position;
       push()
       translate(pos.x,pos.y);
       rotate(angle);
       imageMode(CENTER);
       image(this.image,0,0,this.r,this.r);
       pop()
       if(this.body.velocity.x>0 && this.body.position.x>0){
           var position=[this.body.position.x,this.body.position.y]
           this.trajectory.push(position);
       }
       //this.trajectory=[[x1,y1],[x2,y2],[x3,y3]....[xn,yn]]
       for (var i = 0; i < this.trajectory.length; i++) {
            image(this.black, this.trajectory[i][0], this.trajectory[i][1], 5, 5); 
        }

    }
}