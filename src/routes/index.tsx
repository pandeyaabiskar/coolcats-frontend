import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MetaMaskProvider } from "../hoc/Metamask";

import Web3 from "web3";
import Home from "../components/organisms/Home";
import MintPage from "../components/organisms/Mint";
import { LayoutProvider } from "../hoc/LayoutProvider";
import routes from '../constants/routes'

function getLibrary(provider: any, connector: any) {
    console.log("Provider", provider);
    return new Web3(provider);
}

const Routing = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
                <BrowserRouter>
                    <LayoutProvider>
                        <Routes>
                            <Route path={routes.HOMEPAGE} element={<Home />} />
                            {/* <Route path="/mint" element={<MintPage />} /> */}
                        </Routes>
                    </LayoutProvider>
                </BrowserRouter>
            </MetaMaskProvider>
        </Web3ReactProvider>
    );
};

export default Routing;
