import { TonConnectButton } from "@tonconnect/ui-react";
import styles from "./styles.module.scss";


const AuthPage = () => {
  
  return (
    <div className={styles.wrapper}>
      <TonConnectButton className={styles.TONButton} />
    </div>
  );
};

export default AuthPage;
