import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Player from "./components/player/Player";

function App() {

  return (
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl="https://hexane911.github.io/lofi-react/tonconnect-manifest.json">
        <div className="App">
          {/* <Pages /> */}
          <Player />
        </div>
      </TonConnectUIProvider>
    </Provider>
  );
}

export default App;
