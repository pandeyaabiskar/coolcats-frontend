/* eslint-disable no-throw-literal */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Web3 from "web3";
import { ContractType, getContractAddress } from "../config/chain";
import { ContractService } from "./contract";
export class CrowdSaleContractService extends ContractService {
    // constructor(contractAddress: string, abi: unknown) {
    //     super(contractAddress, abi);
    // }
    //tocheck if the sale is paused

    getTokenPrice = async () => {
        const price = await this.readContract.methods.price().call();
        /* Converting the price from Wei to Ether. */
        // return Web3.utils.fromWei(String(price), "ether");
        return price;
    };

    getPauseStatus = async () => {
        const status = await this.readContract.methods.paused().call();
        return status;
    };
    getClosingTime = async () => {
        const closingTime = await this.readContract.methods
            .closingTime()
            .call();
        return closingTime;
    };
    getOpeningTime = async () => {
        const closingTime = await this.readContract.methods
            .openingTime()
            .call();
        return closingTime;
    };

    getTokenCap = async () => {
        const tokenCap = await this.readContract.methods.cap().call();
        return tokenCap;
    };

    getTokenSold = async () => {
        const tokenSold = await this.readContract.methods.tokenSold().call();
        return tokenSold;
    };

    getUserPurchasedCount = async (walletAddress: string) => {
        const userPurchaseCount = await this.readContract.methods
            .purchase(walletAddress)
            .call();
        return userPurchaseCount;
    };

    getUserPurchaseLimit = async (walletAddress: string) => {
        const userPurchaseLimit = await this.readContract.methods
            .purchaseLimit(walletAddress)
            .call();
        return userPurchaseLimit;
    };

    getIsWalletWhitelisted = async (walletAddress: string) => {
        const isWhitelisted = await this.readContract.methods
            .isWhiteListed(walletAddress)
            .call();
        return isWhitelisted;
    };

    getUniqueID = () => {
        const account = this.web3.eth.accounts.create();
        return account;
    };

    getTokensByUniqueID = async (uid: string) => {
        const tokens = await this.readContract.methods
            .getTokensByUID(uid)
            .call();
        return tokens;
    };

    validateMintData = async (
        walletAddress: string,
        mintTokenPrice: number,
        quantity: number
    ) => {
        const userBalance = await this.web3.eth.getBalance(walletAddress);
        const userBalanceETH = Number(
            Web3.utils.fromWei(String(userBalance), "ether")
        );

        if (userBalanceETH < mintTokenPrice * quantity) {
            throw {
                message: "Insufficient Balance!",
                code: "MINT_VALIDATION_FAILED",
            };
        }

        const isPaused = await this.getPauseStatus();
        if (isPaused) {
            throw {
                message: "CrowdSale is Paused!",
                code: "MINT_VALIDATION_FAILED",
            };
        }
    };

    // Mint Tokens

    mintTokens = async (
        walletAddress: string,
        mintTokenPrice: number,
        quantity: number
    ) => {
        // console.log(price);

        const totalTokenPrice = mintTokenPrice * quantity;

        return await this._validateChainAndContinue(async () => {
            // await this.validateMintData(
            //     walletAddress,
            //     mintTokenPrice,
            //     quantity
            // );

            try {
                // const estimatedGasFee = await this.writeContract.methods
                //     .buyTokens(
                //         walletAddress,
                //         uid,
                //         hashedNumber,
                //         Number(v),
                //         r,
                //         s
                //     )
                //     .estimateGas({
                //         from: walletAddress,
                //         value: this.web3.utils.toWei(
                //             String(totalTokenPrice),
                //             "ether"
                //         ),
                //     });

                //console.log("Estimated Gas Feees", estimatedGasFee);
                await this.writeContract.methods.buyTokens().send({
                    from: walletAddress,
                    value: totalTokenPrice,
                });
            } catch (error) {
                console.log("Error", error);
                throw error;
            }
        });
    };
}

/* Creating a new instance of the CrowdSaleContractService class. */
export const generateCrowdsaleContract = () => {
    const crowdSaleContractConfig = getContractAddress(
        ContractType.PUBLIC_SALE
    );

    return new CrowdSaleContractService(
        crowdSaleContractConfig.address,
        crowdSaleContractConfig.abi
    );
};
