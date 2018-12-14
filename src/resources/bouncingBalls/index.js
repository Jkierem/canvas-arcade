import createEngine from '../engine'
import createState from '../createState'
import { Ball } from './elements'
import { SimplePhysics } from './physics'
import { Vector2 } from './vector'

const onThumbnail = ( cvs ) => {
  const ctx = cvs.getContext("2d")
  ctx.beginPath();
  ctx.arc(cvs.width/2,cvs.height/2,40,0,2*Math.PI);
  const COLOR = "#00aaff"
  ctx.fillStyle = COLOR;
  ctx.strokeStyle = COLOR;
  ctx.fill( )
  ctx.stroke( );
}

const createOnLoad = ( getState , setState ) => function( cvs ){
  this.onClear( cvs )
  setState({
    physics: new SimplePhysics( )
  })

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

  const { physics } = getState( )
  physics.addElement( withGravityFriction )
  physics.addElement( withOnlyFriction )
  physics.addElement( withOnlyGravity )
  physics.addElement( withNothing )
}

const createOnTick = ( getState , setState ) => function( cvs , t ){
  const { previous=t , physics , active } = getState( )
  const delta = t - previous
  setState({ previous: t })
  this.onClear( cvs )
  physics.update( delta/20 , cvs );
  if( active ){
    const newId = window.requestAnimationFrame( ( t ) => this.onTick( cvs , t ) );
    setState({
      animationId: newId,
    })
  }
}

const createOnCleanUp = ( getState , setState ) => function ( cvs ) {
  this.onClear( cvs )
  const { animationId , active } = getState( );
  if( active ){
    window.cancelAnimationFrame( animationId );
    setState({
      active: false,
      animationId: null,
      previous: undefined,
      physics: null,
    })
  }
}

const createOnStart = ( getState , setState ) => function( cvs ){
  const animationId = window.requestAnimationFrame( ( t ) => this.onTick( cvs , t ) );
  setState({
    active:true,
    animationId
  })
}

function createBouncingBalls( ){
  const { getState , setState } = createState({
    active: false,
    animationId: null,
    previous: undefined,
    physics: null,
  })

  return Object.assign( createEngine({}) , {
    onThumbnail: onThumbnail,
    onLoad: createOnLoad( getState , setState ),
    onTick: createOnTick( getState , setState ),
    onCleanUp: createOnCleanUp( getState , setState ),
    onStart: createOnStart( getState , setState ),
  })
}

export default createBouncingBalls;
