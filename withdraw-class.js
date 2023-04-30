const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const contractAddress = '0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c';
const contractABI = require('./abi-withdraw-MATIC.js');
require('dotenv').config()
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
const privateKey = process.env.WALLET_SECRET;

class Withdrawal {
  constructor(jumlahnya) {
    this.jumlahnya = jumlahnya;
    this.contract = new web3.eth.Contract(contractABI, contractAddress);
    this.gasLimit = 4880000;
    this.senderAddress = senderAddress;
    this.privateKey = privateKey;
  }

  async withdraw() {
    const referalCode = 0;
    const nonce = await web3.eth.getTransactionCount(this.senderAddress);
    const gasPrice = await web3.eth.getGasPrice();

    const txData = await this.contract.methods.withdrawETH(this.senderAddress, web3.utils.toWei(this.jumlahnya.toString(), 'ether'), this.senderAddress).encodeABI();
    const tx = {
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: this.gasLimit,
      gas: 3000,
      data: txData
    };

    
    const signedTransaction = await web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);


    console.log(receipt);
  }
}

module.exports = Withdrawal;
