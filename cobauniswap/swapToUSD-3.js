const { createEthereumProvider } = require("@ethersproject/providers");
const { UniswapV2Pair, ethers } = require("@uniswap/sdk");

// Connect to the Polygon network
const provider = new createEthereumProvider("https://polygon-rpc.com/");

require('dotenv').config()


// Define the private key of the sender address
const privateKey = process.env.WALLET_SECRET;

// Connect to the sender address
const wallet = new ethers.Wallet(privateKey, provider);

// Define the address of the sender
const senderAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";

// Define the amount of ETH to swap
const amount = ethers.utils.parseEther("1.0");

// Define the USDC token address
const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";


async function swap(){

    // Get the pair for ETH-USDC
    const pair = await UniswapV2Pair.fetchData(usdcAddress, provider);

    // Calculate the minimum amount of USDC expected from the trade
    const expectedReturn = await pair.getOutputAmount(amount);

    // Create the transaction to swap ETH for USDC
    const transaction = await pair.swapExactETHForExactTokens(amount, expectedReturn, {
      gasLimit: 200000,
      gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
      nonce: await provider.getTransactionCount(senderAddress),
    });

    // Sign and send the transaction
    const signedTransaction = await wallet.sign(transaction);
    const result = await signedTransaction.send();

    console.log("Transaction Hash:", result.hash);

}

swap()
