import createEngine from '../engine'
import createBouncingBalls from '../bouncingBalls'
import { getDemoScript } from '../../demo'

const Loader = ( ) => {

  const getScripts = ( ) => {
    const demoIterator = getDemoScript( );

    const scripts = []
    for ( let i = 0 ; i < 25 ; i++ ){
      scripts.push({
        getEngine( settings ){
          return createEngine({
            onThumbnail: demoIterator.next( ).value
          });
        }
      });
    }

    scripts[ 12 ] =  { getEngine( ){ return createBouncingBalls( ) } };
    return scripts
  }

  return {
    getScripts
  }
}

export default Loader;
