class Cannon{
    constructor(x,y,width,height,angle){

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.angle=angle;
    }

    
    display(){
        if(keyIsDown(RIGHT_ARROW) && this.angle<0.10){
            this.angle+= 0.02
        }
        if(keyIsDown(LEFT_ARROW) && this.angle>-1.45){
            this.angle-= 0.02
        }
        fill("black")
        push()
        translate(this.x,this.y)
        rotate(this.angle)
        rect(-10,-20,this.width,this.height)
        pop()
        arc(this.x-50,this.y+90,180,230,PI,TWO_PI)
        noFill()
    }
}
