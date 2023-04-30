const Web3 = require('web3');
const { ethers } = require('ethers')
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

const decimals0 = 18
const inputAmount = 0.05
// .001 => 1 000 000 000 000 000
const amountIn = ethers.utils.parseUnits(
  inputAmount.toString(),
  decimals0
)


const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon
//const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564' // SwapRouter contract address

const USDC_ABI = [
  // ERC20 standard functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function transfer(address recipient, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)',
  // Additional USDC functions
  'function decimals() external view returns (uint8)',
  'function DOMAIN_SEPARATOR() external view returns (bytes32)',
  'function nonces(address owner) external view returns (uint256)',
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'
];

const usdcContract = new web3.eth.Contract(USDC_ABI, USDC_ADDRESS);
const usdcAmount = ethers.utils.parseUnits('100', 6); // Approve 100 USDC

async function approve() {
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 100000;

  const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

  const approveData = await usdcContract.methods.approve(
    ROUTER_ADDRESS, // Spender address
    usdcAmount // Amount to approve
  ).encodeABI();

  const approveTx = {
    to: USDC_ADDRESS,
    from: WALLET_ADDRESS,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    data: approveData,
  };

  const signedApproveTx = await web3.eth.accounts.signTransaction(approveTx, WALLET_SECRET);
  const approveReceipt = await web3.eth.sendSignedTransaction(signedApproveTx.rawTransaction);
  console.log('USDC approved:', approveReceipt.transactionHash);
}

approve()
/*
async function swap() {
  //const jumlahnya = await web3.utils.toWei('1.38', 'ether');
  //const jumlahnya = await web3.utils.toWei('0.3', 'ether');
                  //1000000000000000000
  //const jumlahnya = 100000000000000

  const jumlahnya = amountIn
  //const amountToDeposit = '1000000000000000000';
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 488000;

 

  const deadline = Math.floor(Date.now() / 1000) + (60 * 10)


  const params = {
      tokenIn: address1,
       tokenOut: address0,
      fee: 3000,
      //fee: fee3persen, // fee uniswap
      recipient: WALLET_ADDRESS,
      deadline: deadline,
      amountIn: jumlahnya,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
  }

 

  const txData = await contract.methods.exactInputSingle(params).encodeABI();
  const tx = {
    to: ROUTER_ADDRESS,
    from: WALLET_ADDRESS,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 30000,
    //value: jumlahnya ,
    value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, WALLET_SECRET);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

swap();

*/