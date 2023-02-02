import PublicSaleContract from "../contracts/CCOFPublicsale.json";
import InventoryContract from "../contracts/CCOFInventory.json";

export interface IChainConfigs {
    [key: string]: IBlockchainInfo;
}

export enum ContractType {
    PUBLIC_SALE = "publicSale",
    INVENTORY = "inventory",
}

export interface IBlockchainInfo {
    name: string;
    symbol: string;
    shortName: string;
    icon?: { black: string; white: string; color: string };
    logoUrl?: string;
    explorerUrl?: string;
    rpcUrls: string[];
    chainId: string;
}

export const chainConfigs: IChainConfigs = {
    mainnet: {
        name: "Ethereum Mainnet",
        rpcUrls: [
            "https://mainnet.infura.io/v3/0aab62a52a9a4340b584578c39a5a4a3",
        ],
        chainId: "0x1",
        symbol: "ETH",
        shortName: "Ethereum",
        explorerUrl: "https://etherscan.io/",
    },
    // devnet: {
    //   name: "Goerli Test Network",
    //   rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    //   chainId: "0x5",
    //   symbol: "gETH",
    //   shortName: "Goerli",
    //   explorerUrl: "https://goerli.etherscan.io/",
    // },

    testnet: {
        name: "Mumbai Test Network",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        chainId: "0x13881",
        symbol: "MATIC",
        shortName: "MUMBAI",
        explorerUrl: "https://polygonscan.com/",
    },

    devnet: {
        name: "Goerli Test Network",
        rpcUrls: [
            "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ],
        chainId: "0x5",
        symbol: "gETH",
        shortName: "Goerli",
        explorerUrl: "https://goerli.etherscan.io/",
    },
};

export const getChainInfo = () => {
    return chainConfigs[process.env.REACT_APP_CHAIN || "testnet"];
};

export const contractConfigs = {
    publicSale: {
        address:
            process.env.REACT_APP_PUBLICSALE_CONTRACT_ADDRESS ||
            "0x01482F4a55A1bA1AD6181B030CF04F82e21EbE9A",
        abi: PublicSaleContract.abi,
    },
    inventory: {
        address:
            process.env.REACT_APP_INVENTORY_CONTRACT_ADDRESS ||
            "0xB4032f28bAf9aEbF30D882c71d4CFF605248A08d",
        abi: InventoryContract.abi,
    },
};

export const getContractAddress = (type: ContractType) => {
    return contractConfigs[type] || contractConfigs["publicSale"];
};
