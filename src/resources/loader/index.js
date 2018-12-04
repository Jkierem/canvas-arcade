import Engine from '../engine'
import BouncingBalls from '../bouncingBalls'
import { getDemoScript } from '../../demo'

const Loader = ( ) => {

  const getScripts = ( ) => {
    const demoIterator = getDemoScript( );

    const scripts = []
    for ( let i = 0 ; i < 25 ; i++ ){
      scripts.push({
        getEngine( settings ){
          const eng = new Engine( settings );
          eng.onThumbnail = demoIterator.next( ).value ;
          return eng;
        }
      });
    }

    scripts[ 12 ] =  { getEngine( settings ){ return new BouncingBalls( settings ) } };
    return scripts
  }

  return {
    getScripts
  }
}

export default Loader;
