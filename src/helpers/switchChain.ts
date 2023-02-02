/* eslint-disable @typescript-eslint/no-explicit-any */

import { getChainInfo } from "../config/chain";

declare let window: any;
export const switchChainInMetamask = async (): Promise<boolean> => {
  const { name, symbol, explorerUrl, rpcUrls, chainId } = getChainInfo();

  // Desktop and MetaMask!
  if (window.ethereum && window.ethereum.isMetaMask) {
    // Switch Network
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
      return true;
    } catch (error: any) {
      console.log("I am here 1", error);

      // Error Code 4902 means the network we're trying to switch is not available so we have to add it first
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainId,
                chainName: name,
                rpcUrls,
                // iconUrls: [logoUrl],
                blockExplorerUrls: [explorerUrl],
                nativeCurrency: {
                  name: symbol,
                  symbol: symbol,
                  decimals: 18,
                },
              },
            ],
          });
          return true;
        } catch (error: any) {
          return false;
        }
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

export default switchChainInMetamask;
