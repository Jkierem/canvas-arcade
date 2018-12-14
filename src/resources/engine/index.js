const defaultOnThumbnail = (arg) => arg
const defaultOnStart = ( cvs ) => console.log("Start")
const defaultOnCleanUp = ( cvs ) => console.log("CleanUp")
const defaultOnLoad = ( cvs ) => console.log("Loaded")
const defaultOnClear = ( cvs ) => {
  const ctx = cvs.getContext("2d");
  ctx.clearRect(0,0,cvs.width,cvs.height)
}

const defaultSettings = {
  onThumbnail: defaultOnThumbnail,
  onLoad: defaultOnLoad,
  onStart: defaultOnStart,
  onCleanUp: defaultOnCleanUp,
  onClear: defaultOnClear,
}

const createEngine = ({
  onThumbnail = defaultOnThumbnail,
  onLoad = defaultOnLoad,
  onStart = defaultOnStart,
  onCleanUp = defaultOnCleanUp,
  onClear = defaultOnClear,
} = defaultSettings ) => {
  return Object.assign({} , {
    onThumbnail,
    onLoad,
    onStart,
    onCleanUp,
    onClear,
  })
}

export default createEngine
