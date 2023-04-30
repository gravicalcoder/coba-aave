// loan.js

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const contractABI = require('./abi-borrow-USDC.js');
const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';
require('dotenv').config()
const privateKey = process.env.WALLET_SECRET;
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';

class repayLoan {
  constructor() {
    this.privateKey = privateKey;
    this.senderAddress = senderAddress;
    this.contract = new web3.eth.Contract(contractABI, contractAddress);
  }

  async repay(jumlahnya) {
    const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
    const interestRateMode = 2;
    const referalCode = 0;
    
    //const nonce = await web3.eth.getTransactionCount(this.senderAddress);
    const nonce = await web3.eth.getTransactionCount(senderAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 488000;
    
    const txData = await this.contract.methods.repay(
      USDCAddress, jumlahnya, interestRateMode, this.senderAddress
    ).encodeABI();
    
    const tx = {
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      gas: 30000,
      value: '0',
      data: txData
    };
    
    const signedTransaction = await web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(receipt);
  }
}

module.exports = repayLoan;
