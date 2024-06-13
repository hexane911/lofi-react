import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import Pages from "./components/pages/Pages";

function App() {

  return (
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl="https://hexane911.github.io/lofi-react/tonconnect-manifest.json">
        <div className="App">{/* <Player /> */}
          {/* <Pages /> */}
          <Player />
        </div>
      </TonConnectUIProvider>
    </Provider>
  );
}

export default App;
