import { DOM } from '../../inject'
import Canvas from '../Canvas'
import createState from '../../resources/createState'
import './style.scss'

const call = att => ( obj , ...args ) => obj[att](...args)
const callReset = call("onReset");
const callGrow = call("onGrow");
const callShrink = call("onShrink");

const createToggleSelectedCanvas = ( getState , setState ) => ( cvsState ) => {
  const { active , canvasses } =  getState( )
  if( !active ){
    const clicked = cvsState.props.index
    setState({
      active: true,
    })
    callGrow( canvasses[clicked] )
    const notClicked = ( cvs , index ) => index !== clicked
    canvasses.filter(notClicked).forEach(callShrink)
  } else {
    canvasses.forEach(callReset)
    setState({
      active: false,
    })
  }
}

const CanvasManager = ({ engines }) => {

  const { getState , setState } = createState({
    active: false,
    canvasses: [],
  })
  const onCanvasClick = createToggleSelectedCanvas( getState , setState )

  const canvasContainer = engines.map( ( engine , index ) => {
    return Canvas({
      onClick: onCanvasClick,
      engine,
      index,
    })
  })

  setState({ canvasses: canvasContainer })
  return DOM.div( {
    className: "container",
  } , canvasContainer )
}

export default CanvasManager
