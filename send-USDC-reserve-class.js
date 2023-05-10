const Web3 = require('web3');
const abi = require('./abi-USDC.js');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

class USDCreserve {
  constructor() {
    this.loadEnv();
    this.contract = new web3.eth.Contract(abi, this.contractAddress);
    this.gasLimit = 288000000000000;
    this.gas = 30000000000;
  }

  loadEnv() {
    require('dotenv').config();
    this.senderAddress = process.env.WALLET_ADDRESS2;
    this.privateKey = process.env.WALLET_SECRET2;
    this.receiverAddress = process.env.WALLET_ADDRESS;
    this.contractAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  }

  async sendUSDC(transferValue) {
    const nonce = await web3.eth.getTransactionCount(this.senderAddress);
    const gasPrice = await web3.eth.getGasPrice();

    const transferData = this.contract.methods.transfer(this.receiverAddress, transferValue).encodeABI();

    const tx = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: this.gasLimit,
      gas: this.gas,
      to: this.contractAddress,
      value: '0',
      data: transferData
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(receipt);
  }
}

module.exports = USDCreserve;
