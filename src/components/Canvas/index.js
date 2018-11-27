import React from 'react'
import styled from 'styled-components'


const CanvasComponent = styled.canvas`
  width: 90px;
  height: 90px;
  transition: width 2s , height 2s , margin 2s;
  margin: 10px;
  display: ${ props => props.width === 0 ? "none" : "block"};
`

class Canvas extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
    this.arcadeCanvas = React.createRef( )
  }

  componentDidMount = ( ) => {
    const { engine } = this.props;
    if( engine ){
      engine.thumbnail( this.arcadeCanvas );
    }
  }

  handleClick = ( e ) => {
    e.preventDefault( )
    const { onClick , index } = this.props;
    if( onClick ){
      onClick( index , this.arcadeCanvas );
    }
  }

  changeSize = ( width , height ) => {
    this.arcadeCanvas.current.style.width = width;
    this.arcadeCanvas.current.style.height = height;
  }

  changeMargin = ( value ) => {
    this.arcadeCanvas.current.style.margin = value;
  }

  grow = ( ) => {
    this.changeSize( "100vw" , "100vh" );
    this.changeMargin("0");
  }

  shrink = ( ) => {
    this.changeSize( "0px" , "0px" );
    this.changeMargin("0");
  }

  reset = ( ) => {
    this.changeSize( "90px" , "90px" );
    this.changeMargin("10px");
  }

  render(){
    return (
      <CanvasComponent
        ref={ this.arcadeCanvas }
        onClick={ this.handleClick }
      />
    )
  }

}

export default Canvas;
