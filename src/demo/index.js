import Engine from '../engine';
import Color from './Color'

const generateFade = ( startColor , endColor , steps=10 ) => {
  const deltaP = 1/(steps-1);
  let percentage = 0;
  const diffColor = endColor.sub( startColor );
  const colors = [];
  for ( let i = 0; i < steps - 1; i++ ) {
    const newColor = diffColor.mult(percentage).add(startColor);
    percentage += deltaP;
    colors.push( newColor.toHexString( ) );
  }
  colors.push( endColor.toHexString( ) );
  return colors;
}

const gradient = generateFade( new Color(255,0,0) , new Color(0,0,255) , 25 );

const createDemoScript = ( color ) => {
  return ( cvs ) => {
    const ctx = cvs.getContext("2d");
    ctx.rect( 0 , 0 , cvs.width , cvs.height );
    ctx.fillStyle = color || "red" ;
    ctx.fill( );
  }
}

export function* getMockEngine( ){
  for ( let i = 0 ; i < 25 ; i++ ){
    const eng = new Engine( );
    eng.onThumbnail = createDemoScript( gradient[i] );
    yield eng;
  }
}
