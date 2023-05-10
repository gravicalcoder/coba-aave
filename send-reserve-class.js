const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
require('dotenv').config()

class MaticReserveSender {
  constructor(jumlahnya) {
    this.jumlahnya = jumlahnya;
    this.account = process.env.WALLET_ADDRESS2;
    this.privateKey = process.env.WALLET_SECRET2;
  }

  async sendMATIC() {
    const recipient = '0xD065833450C9AB16C35BEe9377593800628fC29A'; // main
    const amount = await web3.utils.toWei(this.jumlahnya.toString(), 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 488000000;
    const tx = {
      from: this.account,
      to: recipient,
      value: amount,
      gas: gasLimit, // gas limit
      gasPrice: gasPrice, // gas price in wei (10 gwei)
      gasLimit: gasLimit,
      nonce: await web3.eth.getTransactionCount(this.account), // nonce
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction sent: ${receipt.transactionHash}`);
  }
}

module.exports = MaticReserveSender;