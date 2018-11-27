import React from 'react'
import styled from 'styled-components'
import Canvas from './components/Canvas'

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color = `${color}${letters[Math.floor(Math.random() * 16)]}`
  }
  return color;
}

const createDemoScript = ( color ) => {
  return ( canvasRef ) => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    ctx.rect( 0 , 0 , cvs.width , cvs.height );
    ctx.fillStyle = color || "red" ;
    ctx.fill( );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat( 5 , 1fr );
  width: 100vw;
  height: 100vh;
  justify-items: center;
  align-items: center;
`

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      reverse: false,
    }
    this.cvsRefs = []
  }

  handleClick = ( index , canvasRef ) => {
    this.setState({ reverse : !this.state.reverse })
    this.cvsRefs.forEach( ({ ref } , i ) => {
      if( i === index ){
        if( this.state.reverse ){
          ref.current.reset( )
        }else{
          ref.current.grow( )
        }
      }else{
        if( this.state.reverse ){
          ref.current.reset( )
        }else{
          ref.current.shrink( )
        }
      }
    })
  }

  generateCanvas = ( n ) => {
    const { cvsRefs } = this;

    if( this.cvsRefs.length === 0){
      for( let i = 0 ; i < n ; i++ ){
        const color = getRandomColor( );
        const currentRef = React.createRef( );
        cvsRefs.push({
          ref: currentRef,
          component: (
            <Canvas
              key={ i }
              index = { i }
              ref = { currentRef }
              engine={ { thumbnail: createDemoScript( color )} }
              onClick={ this.handleClick }
            />
          )
        })
      }
    }
    return cvsRefs.map( (obj) => obj.component );
  }

  render(){
    return (
      <Container>
        { this.generateCanvas( 25 ) }
      </Container>
    )
  }

}

export default App;
