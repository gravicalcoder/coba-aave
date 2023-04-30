const ethers = require('ethers');
const uniswap = require('@uniswap/sdk');

import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

//const provider = new ethers.providers.InfuraProvider('polygon', 'YOUR_PROJECT_ID_HERE');
//const provider = new ethers.providers.HttpProvider("https://polygon-rpc.com/");
//const provider = new ethers.providers.HttpProvider("https://polygon-rpc.com/");
const provider = new providers.JsonRpcProvider(rpc.parent);
const signer = new ethers.Signer(provider, '0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560');
//const privateKey = '0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560';

async function swapEthForUsdc() {
  // Get the latest exchange rate for ETH to USDC
  const ethUsdcRate = await uniswap.uniswap.getEthToTokenInputPrice(
    uniswap.token.getAddress('USDC'),
    1
  );

  // Calculate the amount of USDC you will receive for 1 ETH
  const usdcAmount = ethUsdcRate.times(1);

  // Create the transaction
  const swap = uniswap.uniswap.createExactETHForTokensSwapInput(
    ethUsdcRate,
    usdcAmount,
    uniswap.token.getAddress('USDC'),
    signer
  );

  // Send the transaction
  await swap.send();
}

swapEthForUsdc();