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

const poolAbi = [{"inputs":[],"name":"slot0","outputs":[{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint128","name":"sqrtPriceX96","type":"uint128"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint160","name":"observationIndex","type":"uint160"},{"internalType":"uint32","name":"observationCardinality","type":"uint32"},{"internalType":"uint8","name":"feeProtocol","type":"uint8"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"}];

const poolAddress = '0xA374094527e1673A86dE625aa59517c5dE346d32'

const poolContract = new web3.eth.Contract(poolAbi, poolAddress);


  // Call the slot0 function to get the tick object
poolContract.methods.slot0().call()
.then((tick) => {
  // Extract the sqrtPriceX96 and tickSpacing from the tick object
  const sqrtPriceX96 = tick.sqrtPriceX96;
  const tickSpacing = 1 / (2 ** 17);

  // Calculate the sqrtPriceLimitX96
  //const sqrtPriceLimitX96 = sqrtPriceX96 * (1 + tickSpacing);

  console.log('sqrtPriceLimitX96:', sqrtPriceX96);
})
.catch((error) => {
  console.error(error);
});