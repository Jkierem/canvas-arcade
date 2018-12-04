import React from 'react'
import styled from 'styled-components'
import Canvas from './components/Canvas'
import Loader from './resources/loader'

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
      selected: -1,
    }
    this.canvasRefs = []
    this.loader = Loader( )
  }

  handleSelect = ( index ) => {
    this.setState({ selected: index })
    this.canvasRefs.forEach( ( ref , i ) => {
      if( i === index ){
        ref.current.grow( );
      } else {
        ref.current.shrink( );
      }
    })
  }

  handleReset = ( ) => {
    this.setState({ selected: -1 })
    this.canvasRefs.forEach( ( ref , i ) => {
      ref.current.reset( );
    })
  }

  handleClick = ( index ) => {
    if( this.state.selected < 0 ){
      this.handleSelect( index )
    }else{
      this.handleReset( );
    }
  }

  generateCanvas = ( ) => {
    this.canvasRefs = []
    const interaction = {
      onClick: this.handleClick,
    }
    const scripts = this.loader.getScripts( );
    return scripts.map( ( script , index ) => {
      const currentRef = React.createRef( );
      const canvasComponent = (
        <Canvas
          key={ index }
          index = { index }
          ref = { currentRef }
          engine={ script.getEngine({
            interaction,
          }) }
        />
      )
      this.canvasRefs = [ ...this.canvasRefs , currentRef ]
      return canvasComponent
    })
  }

  render(){
    return (
      <Container>
        { this.generateCanvas( ) }
      </Container>
    )
  }

}

export default App;
