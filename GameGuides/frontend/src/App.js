import "./App.css";
import "axios";
import axios from "axios";
import { useState } from "react";
import { Route, Routes, Link, Router } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import CreateAGuide from "./components/CreateAGuide";
import ResponsiveAppBar from "./components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider,darkTheme } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MyGuides from "./components/MyGuides";
import Market from "./components/Market";
import CreateAListing from "./components/CreateAListing";
import LensHome from "./components/Lens/LensHome";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CreateAGuide2 from "./components/CreateAGuide2";

const darkTheme_MUI = createTheme({
  palette: {
    mode: 'dark',
  },
});

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: "f8TXTM1cuIoEj67B3c9Cm73LeT0xvLR2" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <>
    <ThemeProvider theme={darkTheme_MUI}>
      <CssBaseline />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <ResponsiveAppBar></ResponsiveAppBar>
        </RainbowKitProvider>
      </WagmiConfig>
      <WagmiConfig client={wagmiClient}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/details" element={<Details></Details>}></Route>
          <Route
            path="/CreateAGuide"
            element={<CreateAGuide2></CreateAGuide2>}
          ></Route>
          <Route path="/MyGuides" element={<MyGuides></MyGuides>}></Route>
          <Route path="/Market" element={<Market></Market>}></Route>
          <Route path="/CreateAListing" element={<CreateAListing></CreateAListing>}></Route>
          <Route path="/Lens" element={<LensHome></LensHome>}></Route>
        </Routes> 
      </WagmiConfig>
      </ThemeProvider>
    </>
  );
}

export default App;
