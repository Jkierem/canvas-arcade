import { DOM } from '../../inject'
import { ON_LOAD , ON_START , ON_THUMBNAIL , ON_CLEAN_UP } from './constants'
import createState from '../../resources/createState'
import './style.scss'

const callEngineFunction = ( name ) => ( engine , ...args ) => {
  typeof engine[name] === "function" ?
  engine[name](...args)
  :
  console.warn(`No ${name} function defined on engine`)
}

const callOnLoad = callEngineFunction(ON_LOAD)
const callOnStart = callEngineFunction(ON_START)
const callOnThumbnail = callEngineFunction(ON_THUMBNAIL)
const callOnCleanUp = callEngineFunction(ON_CLEAN_UP)

const toggleClass = className => domNode => domNode.classList.toggle(className)
const toggleCanvasShrink = toggleClass("canvas--shrink")
const toggleCanvasGrow = toggleClass("canvas--grow")
const resetClasses = (cvs) => {
  if( cvs.classList.contains("canvas--grow") ){ toggleCanvasGrow(cvs) }
  if( cvs.classList.contains("canvas--shrink") ){ toggleCanvasShrink(cvs) }
}

const setSize = ( width , height ) => ( domNode ) => {
  domNode.width = width;
  domNode.height = height;
}
const setGrowSize = (cvs) => setSize( window.innerWidth , window.innerHeight )(cvs)
const setDefaultSize = setSize( "90" , "90" )

const createHandleMount = ( getState , setState ) => function( ){
  const { props , domNode } = getState( )
  callOnThumbnail( props.engine , domNode );
}

const createHandleReset = ( getState , setState ) => function( ){
  const { domNode: cvs , timeoutID , props , shouldCleanUp } = getState( )
  if( timeoutID ){
    window.clearTimeout( timeoutID );
    setState({ timeoutID: null })
  }
  if( shouldCleanUp ){
    callOnCleanUp( props.engine , cvs );
    setState({ shouldCleanUp: false })
  }
  resetClasses( cvs )
  setDefaultSize( cvs )
  callOnThumbnail( props.engine , cvs );
}

const createHandleGrow = ( getState , setState ) => function( ) {
  const { domNode: cvs , props } = getState( )
  setGrowSize(cvs)
  callOnThumbnail( props.engine , cvs );
  toggleCanvasGrow(cvs)
  setState({
    timeoutID: window.setTimeout( ( ) => {
      setState({ shouldCleanUp: true })
      callOnLoad( props.engine , cvs );
      callOnStart( props.engine , cvs );
    }, 1100 )
  })
}

const createHandleShrink = ( getState , setState ) => function( ) {
  const { timeoutID , domNode } = getState( )
  if( timeoutID ){
    window.clearTimeout( timeoutID );
    setState({
      timeoutID: null,
    })
  }
  toggleCanvasShrink(domNode)
}

const createHandleClick = ( getState , setState ) => function( e ){
  const { props } = getState( )
  if( props.onClick ){
    props.onClick( getState( ) )
  }
}

const Canvas = ( props ) => {

  const { getState , setState } = createState({
    shouldCleanUp: false,
    timeoutID: null,
    domNode: null,
    props,
  })

  if( props.index === undefined && props.index === null ){
    console.warn("Each canvas must have an unique index prop");
  }

  const optional = props.index !== undefined && props.index !== null ? { id: `canvas_${props.index}` , "data-index": props.index } : { } ;

  const domNode = DOM.canvas({
    ...optional,
    className: "canvas" ,
    width:"90" ,
    height: "90",
    onMount: createHandleMount( getState , setState ),
    onReset: createHandleReset( getState , setState ),
    onGrow: createHandleGrow( getState , setState ),
    onShrink: createHandleShrink( getState , setState ),
    onClick: createHandleClick( getState , setState ),
    extraProps: {
      shouldResize: ( ) => { console.warn("Resize functionality is not stable") },
    },
  })

  setState({
    domNode,
  })

  return domNode
}

export default Canvas
