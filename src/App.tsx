import "./App.global.css";
import styles from "./App.module.css";

// 메타마스크
import { Navigation } from "./components/Navigation";
import { Display } from "./components/Display";
import { MetaMaskError } from "./components/MetaMaskError";
import { MetaMaskContextProvider } from "./hooks/useMetaMask";
////

// 월렛커넥트
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";

const chains = [arbitrum, mainnet, polygon];
const projectId = "4a86cb8e0f4ac8b0500a103a0bf85eb7";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
////

export const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <MetaMaskContextProvider>
        <div className={styles.appContainer}>
          <Navigation />
          <Web3Button />
          <Display />
          <MetaMaskError />
        </div>
      </MetaMaskContextProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};
