import React from 'react'
import styled from 'styled-components'
import Canvas from './components/Canvas'
import Engine from './engine';
import { getMockEngine } from './demo'

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
    const engineIt = getMockEngine( );
    if( this.cvsRefs.length === 0){
      for( let i = 0 ; i < n ; i++ ){
        const currentRef = React.createRef( );
        cvsRefs.push({
          ref: currentRef,
          component: (
            <Canvas
              key={ i }
              index = { i }
              ref = { currentRef }
              engine={ i === 12 ? new Engine( ) : engineIt.next( ).value }
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
