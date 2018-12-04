import Engine from '../engine'
import { Ball } from './elements'
import { SimplePhysics } from './physics'
import { Vector2 } from './vector'

let animationId = null;

export default class BouncingBalls {
  constructor( settings ){
    this.interaction = settings.interaction
    this.previous = null;
  }

  onThumbnail = ( cvs ) => {
    const ctx = cvs.getContext("2d")
    ctx.beginPath();
    ctx.arc(cvs.width/2,cvs.height/2,40,0,2*Math.PI);
    const COLOR = "#00aaff"
    ctx.fillStyle = COLOR;
    ctx.strokeStyle = COLOR;
    ctx.fill( )
    ctx.stroke( );
  }

  onLoad = ( cvs ) => {
    this.onClear( cvs );
    this.physics = new SimplePhysics( );
    const initalPosition = new Vector2( cvs.width - 50 , cvs.height - 50 );
    const initialVelocity = new Vector2( -10 , -25 );
    const initialAcceleration = new Vector2( 0 , 0.45 );

    const withOnlyGravity = new Ball({
      position: initalPosition,
      velocity: initialVelocity,
      acceleration: initialAcceleration,
      color: "#ff0000",
      friction: 0,
    })

    const withOnlyFriction = new Ball({
      position: initalPosition,
      velocity: initialVelocity,
      color: "#00ff00",
    })

    const withGravityFriction = new Ball({
      position: initalPosition ,
      velocity: initialVelocity ,
      acceleration: initialAcceleration ,
    });

    const withNothing = new Ball({
      position: initalPosition ,
      velocity: initialVelocity ,
      color: "#ffff00" ,
      friction: 0,
    })

    this.physics.addElement( withGravityFriction )
    this.physics.addElement( withOnlyFriction )
    this.physics.addElement( withOnlyGravity )
    this.physics.addElement( withNothing )
  }

  onTick = ( cvs , t ) => {
    if( !this.previous ){
      this.previous = t;
    }
    const delta = t - this.previous
    this.previous = t;
    this.onClear( cvs );
    this.physics.update( delta/20 , cvs );
    animationId = window.requestAnimationFrame( ( t ) => this.onTick( cvs , t ) );
  }

  onCleanUp = ( cvs ) => {
    this.onClear( cvs )
    if( animationId ){
      window.cancelAnimationFrame( animationId );
    }
  }

  onStart = ( cvs ) => {
    animationId = window.requestAnimationFrame( ( t ) => this.onTick( cvs , t ) );
  }

  onClear = ( cvs ) => {
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height)
  }

  onClick = ( ...args ) => {
    this.interaction.onClick( ...args )
  }

}
