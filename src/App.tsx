import "./App.css";
import Player from "./components/player/Player";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Player />
      </div>
    </Provider>
  );
}

export default App;
