const Web3 = require('web3');

class DepositETH {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
    this.contractAddress = '0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c';
    this.contractABI = require('./abi-deposit-MATIC.js');
    require('dotenv').config();
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    this.senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
    this.privateKey = process.env.WALLET_SECRET;
  }

  async deposit(jumlahnya) {
    jumlahnya = await this.web3.utils.toWei(jumlahnya.toString(), 'ether');
    const referalCode = 100;
    const nonce = await this.web3.eth.getTransactionCount(this.senderAddress);
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = 4880000;

    const txData = await this.contract.methods.depositETH(this.senderAddress, this.senderAddress, referalCode).encodeABI();
    const tx = {
      to: this.contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      gas: 30000,
      value: jumlahnya,
      data: txData
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(receipt);
  }
}

module.exports = DepositETH;
