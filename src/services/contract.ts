/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Web3 from "web3";
import { chainConfigs, getChainInfo } from "../config/chain";
import switchChainInMetamask from "../helpers/switchChain";

declare let window: any;
// const historicalBlocks = 5;

// const formatFeeHistory = (result: any, includePending: any) => {
//   let blockNum = Number(result.oldestBlock);
//   let index = 0;
//   const blocks = [];
//   while (blockNum < Number(result.oldestBlock) + historicalBlocks) {
//     blocks.push({
//       number: blockNum,
//       baseFeePerGas: Number(result.baseFeePerGas[index]),
//       gasUsedRatio: Number(result.gasUsedRatio[index]),
//       priorityFeePerGas: result.reward[index].map((x: any) => Number(x)),
//     });
//     blockNum += 1;
//     index += 1;
//   }
//   if (includePending) {
//     blocks.push({
//       number: "pending",
//       baseFeePerGas: Number(result.baseFeePerGas[historicalBlocks]),
//       gasUsedRatio: NaN,
//       priorityFeePerGas: [],
//     });
//   }
//   return blocks;
// };

export class ContractService {
  web3: Web3;
  writeContract: any;
  readWeb3: Web3;
  readContract: any;
  address: string;

  constructor(contractAddress: string, abi: unknown) {
    const { rpcUrls } = getChainInfo();
    this.web3 = new Web3(window.ethereum);
    this.writeContract = new this.web3.eth.Contract(
      abi as any,
      contractAddress
    );

    this.readWeb3 = new Web3(rpcUrls[0]);
    this.readContract = new this.readWeb3.eth.Contract(
      abi as any,
      contractAddress
    );
    this.address = contractAddress;
  }

  //   #estimatePriorityFee = async () => {
  //     try {
  //       const feeHistories = await this.web3.eth.getFeeHistory(
  //         historicalBlocks,
  //         "pending",
  //         [10]
  //       );
  //       const blocks = formatFeeHistory(feeHistories, false);
  //       const firstPercentilePriorityFees = blocks.map(
  //         (b) => b.priorityFeePerGas[0]
  //       );
  //       const sum = firstPercentilePriorityFees.reduce((a, v) => a + v);
  //       const value = Math.ceil(sum / firstPercentilePriorityFees.length);
  //       return value;
  //     } catch (e) {
  //       console.log(e);
  //       throw e;
  //     }
  //   };

  //   initiateTransaction = async (cb: any, options: any) => {
  //     try {
  //       const gasPrice = await this.web3.eth.getGasPrice();
  //       const gasPriceBN = Web3.utils.toBN(gasPrice);
  //       const finalGasPrice = gasPriceBN
  //         .add(this.web3.utils.toBN(parseInt(String(1 * gasPriceBN.toNumber()))))
  //         .toString();
  //       const gasEstimate = await cb.estimateGas({ ...options });
  //       const estimatedPriorityFee = await this.#estimatePriorityFee();
  //       const finalMaxFeePerGas = this.web3.utils
  //         .toBN(finalGasPrice)
  //         .add(this.web3.utils.toBN(parseInt(String(1 * estimatedPriorityFee))))
  //         .toString();

  //       console.log("Gas Estimate", gasEstimate);

  //       return await cb.send({
  //         ...options,
  //         gasLimit: gasEstimate * 2,
  //         gasPrice: finalGasPrice,
  //         maxFeePerGas: finalMaxFeePerGas,
  //         maxPriorityFeePerGas: estimatedPriorityFee,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   };

  // //General ERC20 Token

  // getTotalSupply = async () => {
  //   const totalSupply = await this.readContract.methods.totalSupply().call();
  //   return Number(Web3.utils.fromWei(String(totalSupply), 'ether'));
  // };

  // getBalanceOf = async (walletAddress: string) => {
  //   const totalBalance = await this.readContract.methods.balanceOf(walletAddress).call();
  //   return Number(Web3.utils.fromWei(String(totalBalance), 'ether'));
  // };

  // To check if the metamask if connected with different network
  _validateChainAndContinue = async (next: any) => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const method = "eth_requestAccounts";
      const accounts = await window.ethereum.request({ method });
      console.log(accounts);
      const { chainId } = getChainInfo();
      const web3 = new Web3(window.ethereum);
      const connectedChainId = await web3.eth.getChainId();
      if (Number(chainId) === Number(connectedChainId)) {
        return await next(); //Since the contract and the metamask are in same network, we can proceed
      } else {
        //If the contract and the metamask are in different network, first switch the metmask network and then call the contract
        const isSwitched = await switchChainInMetamask();
        if (isSwitched) return await next();
        else throw Error("Error while switching the network");
      }
    } else throw Error("Metamask Provider couldn't be detected!");
  };
}
