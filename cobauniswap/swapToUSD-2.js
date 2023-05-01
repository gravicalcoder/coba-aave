const ethers = require('ethers');
const uniswap = require('@uniswap/sdk');

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');

require('dotenv').config()
const privateKey = process.env.WALLET_SECRET;

const signer = new ethers.Wallet( privateKey , provider);


async function swapMaticForUsdc() {
  // Get the latest exchange rate for Matic to USDC
  const maticUsdcRate = await uniswap.uniswap.getTokenToTokenInputPrice(
    uniswap.token.getAddress('MATIC'),
    uniswap.token.getAddress('USDC'),
    1
  );

  // Calculate the amount of USDC you will receive for 1 Matic
  const usdcAmount = await maticUsdcRate.times(1);

  // Create the transaction
  const swap = await uniswap.uniswap.createExactTokenToTokenSwapInput(
    uniswap.token.getAddress('MATIC'),
    1,
    uniswap.token.getAddress('USDC'),
    usdcAmount,
    signer,
    privateKey
  );

  // Send the transaction
  await swap.send();
}

swapMaticForUsdc();
