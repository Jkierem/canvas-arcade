import { Vector } from './vector'
export class SimplePhysics {
  constructor( ){
    this.elements = []
  }

  update = ( t , cvs ) => {
    this.elements.forEach( e => {
      e.update( t )
      const { x , y } = e.pos;
      if( x > cvs.width || x < 0 ){
        e.pos = new Vector( x >= cvs.width ? cvs.width : 0 , e.pos.y )
        e.vel = e.vel.scale( new Vector( -1 , 1 ) )
      }
      if( y > cvs.height || y < 0 ){
        e.pos = new Vector( e.pos.x , y > cvs.height ? cvs.height : 0 )
        e.vel = e.vel.scale( new Vector( 1 , -1 ) )
      }
      e.draw( cvs )
    });
  }

  addElement = ( e ) => {
    this.elements.push( e );
  }
}
