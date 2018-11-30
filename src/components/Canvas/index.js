import React from 'react'
import styled from 'styled-components'

const CanvasComponent = styled.canvas`
  width: 90px;
  height: 90px;
  transition: width 1s , height 1s , margin 1s;
`

class Canvas extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      width: "90",
      height: "90",
      visible: true,
    }
    this.arcadeCanvas = React.createRef( )
  }

  componentDidMount = ( ) => {
    const { engine } = this.props;
    if( engine ){
      engine.onThumbnail( this.arcadeCanvas.current );
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
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    }, () => {
      this.props.engine.onThumbnail( this.arcadeCanvas.current )
      this.changeSize( "100vw" , "100vh" );
    })
  }

  shrink = ( ) => {
    this.changeSize( "0px" , "0px" );
  }

  reset = ( ) => {
    this.setState({
      width: "90",
      height: "90",
    },() => {
      this.changeSize( "90px" , "90px" );
      this.props.engine.onThumbnail( this.arcadeCanvas.current )
    })
  }

  render(){
    return (
      <CanvasComponent
        ref={ this.arcadeCanvas }
        onClick={ this.handleClick }
        width = { this.state.width }
        height = { this.state.height }
      />
    )
  }

}

export default Canvas;
