import { HTML_TAGS , CUSTOM_PROPS , CUSTOM_EVENTS , SPECIAL_EVENTS } from './constants'
import curry from 'lodash/curry'
import negate from 'lodash/negate'
import overEvery from 'lodash/overEvery'
import compose from 'lodash/fp/compose'
import { default as prop } from 'lodash/property'
const keysOf = Object.keys
const toArray = Array.from
const satisfies = (...funks) => overEvery([...funks])

const mapAttributeToArray = ( att ) => compose( toArray , prop(att) )
const mapAddedNodesToArray = mapAttributeToArray("addedNodes")
const castChildNodesToArray = mapAttributeToArray("childNodes")
const isDefinedIn = ( obj ) => ( e ) => obj[e] !== undefined ? true : false

const convertStringToTextNode = (value) => typeof value === "string" ? DOM.textNode(value) : value ;
const capitalizeFirstLetter = (str) => `${str.slice(0,1).toUpperCase()}${str.slice(1)}`
const getEventName = (value) => value.slice(2).toLowerCase( )
const getOnEventName = (str) => `on${capitalizeFirstLetter(str)}`
const getName = prop("name")

const isCustomProp = (value) => CUSTOM_PROPS.includes(value)
const isNotCustomProp = negate(isCustomProp)

const isEventProp = (value) => /^on/.test(value)
const isNotEventProp = negate(isEventProp)

const isSpecialEvent = compose( SPECIAL_EVENTS.map(getName).includes , getEventName )
const isNotSpecialEvent = negate(isSpecialEvent)

const isCustomEvent = compose( CUSTOM_EVENTS.includes , getEventName )
const isNotCustomEvent = negate(isCustomEvent)

const isCommonProp = satisfies( isNotCustomProp , isNotEventProp )
const isDOMEvent = satisfies( isEventProp , isNotCustomEvent , isNotSpecialEvent )

const setAttribute = curry( ( element , name , value ) => {
  if ( typeof  value === "boolean") {
    if( value ){
      element.setAttribute( name , value )
      element[name] = true
    } else {
      element[name] = false
    }
  } else {
    element.setAttribute( name , value )
  }
})

const addCommonProps = ( element , props ) => {
  keysOf( props )
    .filter( isCommonProp )
    .forEach( key => setAttribute( element , key , props[key] ) )
}

const addEventListeners = ( element , props ) => {
  keysOf( props )
    .filter( isDOMEvent )
    .forEach( key => element.addEventListener( getEventName( key ) , props[key] ) )
}

const addCustomProp = ( element , key , value ) => {
  if ( key === "className" ) {
    element.setAttribute( 'class' , value )
  } else if ( key === "extraProps" ) {
    keysOf(value).forEach( k => {
      element[k] = value[k]
    } )
  }
}

const addCustomProps = ( element , props ) => {
  keysOf( props )
    .filter( isCustomProp )
    .forEach( key => addCustomProp( element , key , props[key] ) )
}

const attachCustomEvents = ( element , props ) => {
  CUSTOM_EVENTS
    .map( getOnEventName )
    .filter( isDefinedIn(props) )
    .forEach( e => element[e] = props[e] )
}

const callOnMount = ( node ) => {
  if( node.onMount ){
    node.onMount( node )
  }
  if( node.childElementCount > 0 ){
    castChildNodesToArray( node ).forEach( callOnMount )
  }
}

const attachSpecialEvent = ( callback ) => ( event ) => {
  if( event === "onResize" ){
    window.addEventListener( "resize" , callback )
  }
}

const attachSpecialEvents = ( node , props ) => {
  SPECIAL_EVENTS
    .map( compose( getOnEventName , getName ) )
    .filter( isDefinedIn(props) )
    // .map( e => { console.log("Event" , e , ) ; return e })
    .forEach( e => attachSpecialEvent(props[e])(e) )
}

const attachObserver = ( node ) => {
  const callback = ( mutationList , observer ) => {
    mutationList
      .filter( mutation => mutation.type === "childList" )
      .flatMap( mapAddedNodesToArray )
      .forEach( node => callOnMount(node) )
    observer.disconnect( )
  }
  const observer = new MutationObserver(callback)
  const config = { childList: true }
  observer.observe( node , config )
}

const createElement = ( type ) => ( props={} , children = [] ) => {
  let element = {}
  if( !Array.isArray(children) ){
    children = [ children ]
  }
  if( typeof props === "string" ){
    children = [ props , ...children ]
    props = {}
  }
  if( type === "text" ){
    element = document.createTextNode( props.value )
    delete props.value
  }else{
    element = document.createElement( type )
  }
  addCommonProps( element , props )
  addEventListeners( element , props )
  addCustomProps( element , props )
  attachCustomEvents( element , props )
  attachSpecialEvents( element , props )
  injectAll( element , children.map(convertStringToTextNode) )
  return element;
}

export const inject = ( domNode , element  ) => {
  domNode.appendChild( element )
  return domNode
}

export const injectAll = ( domNode , elements ) => {
  elements.forEach( e => inject( domNode , e ) )
  return domNode
}

const injectToDOM = ( domNode , node ) => {
  attachObserver( domNode )
  inject( domNode , node )
}

export const DOM = HTML_TAGS.reduce( (obj,tag) => {
  return {
    ...obj,
    [tag]: createElement(tag)
  };
} , {
  textNode: ( value ) => { return createElement("text")({ value }) },
  createElement: ( type , props , children ) => createElement(type)(props,children)
})

export default injectToDOM;
