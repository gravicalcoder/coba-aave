const { ethers } = require('ethers')
require('dotenv').config()
const { abi: V3SwapRouterABI } = require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json')
const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const address1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon
const address0 = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'  // wmatic address


const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

var url = 'https://polygon-rpc.com/';
const provider = new ethers.providers.JsonRpcProvider(url);

const signer = new ethers.Wallet(WALLET_SECRET, provider)


const router = new ethers.Contract(
    ROUTER_ADDRESS,
    V3SwapRouterABI,
    provider
  )

 //const inputAmount = ethers.utils.parseEther( ether: '0.01')
 //const inputAmount = ethers.utils.parseEther( '0.01')
 const inputAmount = ethers.utils.parseEther( '1.3')

                     //1000000000000000000
                      // 10000000000000000 
 //const inputAmount = 1000000000000000
   //const inputAmount = 100000000000000000
   

 async function main(){
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10)


    const params = {
        tokenIn: address0,
         tokenOut: address1,
        fee: 9000,
        recipient: WALLET_ADDRESS,
        deadline: deadline,
        amountIn: inputAmount,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
    }

    //const data = router.interface.encodeFunctionData(functionFragment: "exactInputSingle", values:[params])
    const data = await router.interface.encodeFunctionData('exactInputSingle', [params])

    const txArgs ={
        to: ROUTER_ADDRESS,
        from: WALLET_ADDRESS,
        data:data,
        value:inputAmount,
        //gasLimit: '3000000',
        gasLimit: '25000000',
        //gasPrice: '20000000000'
        gasPrice: '220000000'


    }

    console.log('sending nihhh')

    const tx = await signer.sendTransaction(txArgs)
    const receipt = await tx.wait()

    console.log('kumplit lahh')

    console.log(receipt);

 }

 main()