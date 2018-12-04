import { Vector } from './vector'

const ZeroVector = new Vector( 0 , 0)

export class Ball {
  constructor({ position=ZeroVector , velocity=ZeroVector , acceleration=ZeroVector , color="#0000ff" , radius=40 , friction=0.0025 }){
    this.pos = position
    this.vel = velocity
    this.acc = acceleration
    this.color = color
    this.radius = radius;
    this.friction = friction;
  }

  updateVelocity = ( t ) => {
    this.vel = this.vel.translate( this.acc.scalarMult( t ) ).scalarMult( 1 - this.friction );
  }

  updatePosition = ( t ) => {
    this.pos = this.pos.translate( this.vel.scalarMult( t ) );
  }

  update = ( t ) => {
    this.updateVelocity(t);
    this.updatePosition(t);
  }

  draw( cvs ){
    const ctx = cvs.getContext("2d");
    ctx.beginPath( );
    ctx.arc( this.pos.x , this.pos.y , this.radius , 0 , 2*Math.PI);
    ctx.fillStyle = this.color
    ctx.strokeStyle = "#000000"
    ctx.fill( );
    ctx.stroke( );
  }
}
