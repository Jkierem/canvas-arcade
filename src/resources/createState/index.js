import cloneDeep from 'lodash/cloneDeep'

const createState = ( initState ) => {
  let state = cloneDeep(initState)
  return {
    getState: ( ) => state ,
    setState: ( obj ) => {
      const wasObject = typeof state === "object"
      const isObject = typeof obj === "object"
      state = wasObject ? state : {}
      state = isObject ? Object.assign({},{ ...state , ...obj }) : obj ; 
    }
  }
}

export default createState
