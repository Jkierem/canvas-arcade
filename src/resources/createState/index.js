const createState = ( state ) => {
  return {
    getState: ( ) => state ,
    setState: ( obj ) => { state = Object.assign({},{ ...state , ...obj }) ; return state }
  }
}

export default createState
