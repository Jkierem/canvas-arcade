const defaultSettings = {
  interactionEngine: undefined,
  options: {
    frame: 0,
    keyFrame: undefined,
    isAnimated: false,
  }
}

export default class Engine {

  constructor( settings = defaultSettings ){
    this.interactionEngine = settings.interactionEngine;
    const { options } = settings;
    this.frame = options.frame;
    this.keyFrame = options.keyFrame;
    this.isAnimated = options.isAnimated;
  }

  onThumbnail = ( cvs ) => {
    const ctx = cvs.getContext("2d")
    ctx.beginPath();
    ctx.arc(cvs.width/2,cvs.height/2,40,0,2*Math.PI);
    ctx.stroke();
  }

  onClear = ( cvs ) => {
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height)
  }

  onLoad = ( cvs ) => {
    this.onClear( cvs )
  }

  onTick = ( cvs ) => {

  }

}
