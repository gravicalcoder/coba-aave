const { ethers } = require('ethers')
const Web3 = require('web3')

require('dotenv').config()

const { abi: V3SwapRouterABI } = require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json')
const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
const WMATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'

const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
const contract = new web3.eth.Contract(V3SwapRouterABI, ROUTER_ADDRESS);

async function getPrice() {
  const decimalsUSDC = 6;
  const inputAmount = 1;
  const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimalsUSDC)

  const amounts = await contract.methods.getAmountsOut(amountIn, [USDC_ADDRESS, WMATIC_ADDRESS]).call({ gasLimit: web3.utils.toHex(500000) });

  console.log(`Amount Out: ${amounts[1]}`);
}

getPrice();
