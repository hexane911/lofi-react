import { useTonWallet } from "@tonconnect/ui-react";
import Player from "../player/Player";
import AuthPage from "../auth/AuthPage";

const Pages = () => {
  const wallet = useTonWallet();

    console.log(wallet, 'ВОЛЛЕТ')

  return <>{wallet ? <Player /> : <AuthPage />}</>;
};

export default Pages;
