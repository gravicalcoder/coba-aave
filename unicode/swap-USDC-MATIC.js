const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
const withdrawWMATIC = require('./withdraw-WMATIC-class');

const konversi = new withdrawWMATIC('sedang dilakukan konversi dari WMATIC ke MATIC');




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

  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000;  /// karena desimal USDC itu 6 kah?

  //const jumlahUSDC = 1553507;
 // const jumlahUSDC = 2493283
// const jumlahUSDC = 59846
  const jumlahUSDC = 4607481
 

  const deadline = Math.floor(Date.now() / 1000) + (60 * 10)



  const params = {
      tokenIn: address1,
       tokenOut: address0,
      fee: 3000,
      recipient: WALLET_ADDRESS,
      deadline: deadline,
      amountIn: jumlahUSDC ,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
  }

 

  const txData = await contract.methods.exactInputSingle(  params).encodeABI();
  const tx = {
    to: ROUTER_ADDRESS,
    from: WALLET_ADDRESS,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 30000,
    value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, WALLET_SECRET);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);

  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log('Waited for 10 seconds.');

  await konversi.sayHello(); // konversi WMATIC ke MATIC

  console.log('semua proses selesai')
}

swap();