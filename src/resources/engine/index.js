export default class Engine {
  constructor( {interaction} ){
    this.interaction = interaction;
  }

  onClear = ( cvs ) => {
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height)
  }

  onLoad  = ( cvs ) => {
    this.onClear( cvs )
  }

  onClick = ( ...args ) => {
    this.interaction.onClick( ...args )
  }

  onThumbnail = ( cvs ) => {}
  onTick  = ( cvs ) => {}
  onStart = ( cvs ) => {}
  onCleanUp = ( cvs ) => {}
}
