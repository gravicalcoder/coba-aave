const { ethers } = require('ethers')
const { abi: IUniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const { abi: SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const { getPoolImmutables, getPoolState } = require('./helpers')
const ERC20ABI = require('./abi.json')
const ERC20ABI2 = require('./abi2.json')

require('dotenv').config()
const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

//const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET) // Ropsten
var url = 'https://polygon-rpc.com/';
const provider = new ethers.providers.JsonRpcProvider(url);
//const poolAddress = "0x4D7C363DED4B3b4e1F954494d2Bc3955e49699cC" // UNI/WETH
//const poolAddress = "0x45dDa9cb7c25131DF268515131f647d726f50608"  // USDC/WETH
const poolAddress = "0xA374094527e1673A86dE625aa59517c5dE346d32"  // matic usdc
//const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564' // polygon
/*
const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
*/
const name0 = 'Wrapped Matic'
const symbol0 = 'WMATIC'
const decimals0 = 18
//const address0 = '0xc778417e063141139fce010982780140aa0cd5ab'
const address0 = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'

/*
const name1 = 'Uniswap Token'
const symbol1 = 'UNI'
*/

const name1 = 'USDC Token'
const symbol1 = 'USDC'
const decimals1 = 18
//const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
const address1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon

async function main() {
  const poolContract = await new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  )

  const immutables = await getPoolImmutables(poolContract)
  const state = await getPoolState(poolContract)

  const wallet = await new ethers.Wallet(WALLET_SECRET)
  const connectedWallet = wallet.connect(provider)

  const swapRouterContract = await new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  )

  //const inputAmount = 0.001
  const inputAmount =1000000000000000000
  //const inputAmount = 1
  // .001 => 1 000 000 000 000 000
  const amountIn = await ethers.utils.parseUnits(
    inputAmount.toString(),
    decimals0
  )

  //const approvalAmount = (amountIn * 100000).toString()
  const approvalAmount = 10000
  const tokenContract0 = await new ethers.Contract(
    address0,
    ERC20ABI,
    provider
  )

  const approvalAmount2 = 10000000
  /*
  const tokenContract1 = await new ethers.Contract(
    address1,
    ERC20ABI2,
    provider
  )
  */
  const approvalResponse = await tokenContract0.connect(connectedWallet).approve(
    swapRouterAddress,
    approvalAmount
  )

  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: WALLET_ADDRESS,
    deadline: Math.floor(Date.now() / 1000) + (60 * 10),
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }

  const transaction = await swapRouterContract.connect(connectedWallet).exactInputSingle(
    params,
    {
      gasLimit: ethers.utils.hexlify(1000000000)
    }
  ).then(transaction => {
    console.log(transaction)
  })
}

main()