import './App.css'
import Visualizer from './components/Visualizer'

function App() {


  return (
    <div>
      <div className="fixed bottom-14 left-0 right-0 mx-auto">
        <Visualizer ArraySize={10} />
      </div>
    </div>
  );
}

export default App
