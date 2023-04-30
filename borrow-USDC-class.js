const Web3 = require('web3');
require('dotenv').config();
const contractABI = require('./abi-borrow-USDC.js');
const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';
const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const privateKey = process.env.WALLET_SECRET;


class Borrow {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
    this.senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
    this.privateKey = privateKey;
    this.USDCAddress = USDCAddress;
  }

  async borrow(jumlahnya) {
    const interestRateMode = 2;
    const referalCode = 0;
    const nonce = await this.web3.eth.getTransactionCount(this.senderAddress);
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = 488000;
    const txData = await this.contract.methods.borrow(this.USDCAddress, jumlahnya, interestRateMode, referalCode, this.senderAddress).encodeABI();
    const tx = {
      to: this.contract.options.address,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      gas: 3000,
      value: '0',
      data: txData
    };
    const signedTransaction = await this.web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(receipt);
  }
}

module.exports = Borrow;
