const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));


require('dotenv').config()
const { abi: V3SwapRouterABI } = require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json')
const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const address1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon
const address0 = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'  // wmatic address


const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET


const contract = new web3.eth.Contract(V3SwapRouterABI, ROUTER_ADDRESS);
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';

async function swap() {
  //const jumlahnya = await web3.utils.toWei('1.38', 'ether');
  const jumlahnya = await web3.utils.toWei('5', 'ether');
  //const amountToDeposit = '1000000000000000000';
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000;


  const deadline = Math.floor(Date.now() / 1000) + (60 * 10)


  const params = {
      tokenIn: address0,
       tokenOut: address1,
      fee: 3000,
      //fee: fee3persen, // fee uniswap
      recipient: WALLET_ADDRESS,
      deadline: deadline,
      amountIn: jumlahnya,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
  }

 

  const txData = await contract.methods.exactInputSingle(  params).encodeABI();
  const tx = {
    to: ROUTER_ADDRESS,
    from: WALLET_ADDRESS,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 30000,
    value: jumlahnya ,
    //value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, WALLET_SECRET);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

swap();