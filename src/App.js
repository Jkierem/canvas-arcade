import { DOM } from './inject'
import CanvasManager from './components/CanvasManager'
import Loader from './resources/loader'

const engines = Loader().getScripts().map( e => e.getEngine({ onClick: () => {} }) )

const App = DOM.div({},[
  CanvasManager({ engines })
]);

export default App;
