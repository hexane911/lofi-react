import { TonConnectButton } from "@tonconnect/ui-react";
import styles from "./styles.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.auth}>
      <TonConnectButton />
    </div>
  );
};

export default AuthPage;
