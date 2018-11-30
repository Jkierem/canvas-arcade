export default class Engine {

  constructor( interactionEngine ){
    this.keyFrame = null;
    this.interactionEngine = interactionEngine;
    this.frame = 0;
  }

  onThumbnail = ( cvs ) => {
    const ctx = cvs.getContext("2d")
    ctx.beginPath();
    ctx.arc(cvs.width/2,cvs.height/2,40,0,2*Math.PI);
    ctx.stroke();
  }

  beforeStart = ( ctx ) => {

  }

  onStart = ( ctx ) => {

  }

  tick = ( ctx ) => {

  }

  beforeEnd = ( ctx ) => {

  }

  onEnd = ( ctx ) => {

  }

}
