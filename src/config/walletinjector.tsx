import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 5, 137, 42, 3337888, 80001],
});
