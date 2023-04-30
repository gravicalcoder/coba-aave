const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
const { abi: V3SwapRouterABI } = require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json')
const withdrawWMATIC = require('./withdraw-WMATIC-class');
require('dotenv').config();

class SwapUSDCtoMATIC {
  constructor() {
    this.contract = new web3.eth.Contract(V3SwapRouterABI, '0xE592427A0AEce92De3Edee1F18E0157C05861564');
    this.senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
    this.walletAddress = process.env.WALLET_ADDRESS;
    this.walletSecret = process.env.WALLET_SECRET;
    this.withdraw = new withdrawWMATIC('sedang dilakukan konversi dari WMATIC ke MATIC');
  }

  async swap(jumlahUSDC) {
    const nonce = await web3.eth.getTransactionCount(this.senderAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;  /// karena desimal USDC itu 6 kah?
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    const params = {
      tokenIn: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC polygon
      tokenOut: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC address
      fee: 3000,
      recipient: this.walletAddress,
      deadline: deadline,
      amountIn: jumlahUSDC,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    };

    const txData = await this.contract.methods.exactInputSingle(params).encodeABI();
    const tx = {
      to: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      from: this.walletAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      gas: 30000,
      value: '0',
      data: txData
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(tx, this.walletSecret);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(receipt);

    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('Waited for 10 seconds.');

    await this.withdraw.sayHello(); // konversi WMATIC ke MATIC

    console.log('semua proses selesai');
  }
}

module.exports = SwapUSDCtoMATIC;
